import { createClient, type Client } from "@libsql/client";
import { canonicalEmail } from "../src/lib/email-address";

/**
 * Migração idempotente: coluna User.emailCanonical + índice único + preenchimento das
 * contas existentes. Segura para rodar várias vezes.
 *
 * Uso direto (sem recriar dados de demonstração):
 *   Turso : TURSO_DATABASE_URL=... TURSO_AUTH_TOKEN=... npx tsx scripts/email-canonical-migration.ts
 *   Local : npx tsx scripts/email-canonical-migration.ts   (usa prisma/dev.db)
 */
export async function migrateEmailCanonical(client: Client): Promise<void> {
  const cols = (await client.execute(`PRAGMA table_info("User")`)).rows.map((r) => String(r.name));
  if (!cols.includes("emailCanonical")) {
    await client.execute(`ALTER TABLE "User" ADD COLUMN "emailCanonical" TEXT`);
  }

  // Preenche antes de criar o índice único, para detectar duplicatas com uma mensagem clara.
  const rows = (
    await client.execute(`SELECT "id", "email" FROM "User" WHERE "emailCanonical" IS NULL`)
  ).rows;
  const seen = new Map<string, string>();
  const existing = (
    await client.execute(`SELECT "email", "emailCanonical" FROM "User" WHERE "emailCanonical" IS NOT NULL`)
  ).rows;
  for (const r of existing) seen.set(String(r.emailCanonical), String(r.email));

  const skipped: string[] = [];
  for (const r of rows) {
    const email = String(r.email);
    const canonical = canonicalEmail(email);
    if (seen.has(canonical)) {
      // Duas contas antigas na mesma caixa do Gmail: mantém a primeira e deixa a outra sem
      // forma canônica (NULL não conflita no índice único). Revise manualmente.
      skipped.push(`${email} (conflita com ${seen.get(canonical)})`);
      continue;
    }
    seen.set(canonical, email);
    await client.execute({
      sql: `UPDATE "User" SET "emailCanonical" = ? WHERE "id" = ?`,
      args: [canonical, String(r.id)],
    });
  }

  await client.execute(
    `CREATE UNIQUE INDEX IF NOT EXISTS "User_emailCanonical_key" ON "User"("emailCanonical")`
  );

  console.log(`✅ emailCanonical: ${rows.length - skipped.length} contas preenchidas.`);
  if (skipped.length > 0) {
    console.warn("⚠️  Contas duplicadas por alias do Gmail (revisar manualmente):");
    for (const s of skipped) console.warn("   -", s);
  }
}

async function main() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  const client = url && authToken
    ? createClient({ url, authToken })
    : createClient({ url: "file:prisma/dev.db" });
  await migrateEmailCanonical(client);
}

// Executa só quando chamado diretamente (não quando importado pelo turso-init).
if (process.argv[1]?.split("\\").join("/").endsWith("email-canonical-migration.ts")) {
  main().catch((error) => {
    console.error("❌ Falha na migração:", error);
    process.exit(1);
  });
}
