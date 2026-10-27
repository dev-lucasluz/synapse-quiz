import { createClient } from "@libsql/client";
import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import fs from "fs";
import path from "path";
import { migrateEmailCanonical } from "./email-canonical-migration";

const DDL_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "referralCode" TEXT NOT NULL,
    "referredById" TEXT,
    "plan" TEXT NOT NULL DEFAULT 'free',
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "streakCount" INTEGER NOT NULL DEFAULT 0,
    "lastActiveDate" TEXT,
    "avatarUrl" TEXT,
    "college" TEXT,
    "period" TEXT,
    "targetSpecialty" TEXT,
    CONSTRAINT "User_referredById_fkey" FOREIGN KEY ("referredById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
  );`,

  `CREATE TABLE IF NOT EXISTS "Subscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "stripeSubscriptionId" TEXT NOT NULL,
    "stripePriceId" TEXT NOT NULL,
    "stripeCurrentPeriodEnd" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
  );`,

  `CREATE TABLE IF NOT EXISTS "Subject" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "period" INTEGER NOT NULL,
    "category" TEXT NOT NULL
  );`,

  `CREATE TABLE IF NOT EXISTS "Question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subjectId" TEXT NOT NULL,
    "subtopic" TEXT,
    "text" TEXT NOT NULL,
    "imageUrl" TEXT,
    "options" TEXT NOT NULL,
    "correctOption" INTEGER NOT NULL,
    "explanation" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "accessLevel" TEXT NOT NULL DEFAULT 'free',
    "isActive" BOOLEAN NOT NULL DEFAULT 1,
    CONSTRAINT "Question_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
  );`,

  `CREATE TABLE IF NOT EXISTS "UserCardReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "repetitionCount" INTEGER NOT NULL DEFAULT 0,
    "easeFactor" REAL NOT NULL DEFAULT 2.5,
    "intervalDays" INTEGER NOT NULL DEFAULT 0,
    "dueDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastReviewedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserCardReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserCardReview_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
  );`,

  `CREATE TABLE IF NOT EXISTS "Bookmark" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Bookmark_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
  );`,

  `CREATE TABLE IF NOT EXISTS "DailyUsage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "mainCardsReviewed" INTEGER NOT NULL DEFAULT 0,
    "notebookCardsReviewed" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "DailyUsage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
  );`,

  `CREATE TABLE IF NOT EXISTS "QuestionNote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "QuestionNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "QuestionNote_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE
  );`,

  `CREATE TABLE IF NOT EXISTS "QuestionReport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "comment" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "QuestionReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "QuestionReport_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE
  );`,

  `CREATE TABLE IF NOT EXISTS "AnswerLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "selectedOption" INTEGER NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "mode" TEXT NOT NULL,
    "timeSpentSeconds" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AnswerLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "AnswerLog_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE
  );`,

  `CREATE TABLE IF NOT EXISTS "Simulation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subjectName" TEXT,
    "totalQuestions" INTEGER NOT NULL,
    "correctCount" INTEGER NOT NULL,
    "durationSeconds" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Simulation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
  );`,

  `CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "User_referralCode_key" ON "User"("referralCode");`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "User_stripeCustomerId_key" ON "User"("stripeCustomerId");`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "User_stripeSubscriptionId_key" ON "User"("stripeSubscriptionId");`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "Subscription_userId_key" ON "Subscription"("userId");`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "Subscription_stripeSubscriptionId_key" ON "Subscription"("stripeSubscriptionId");`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "UserCardReview_userId_questionId_key" ON "UserCardReview"("userId", "questionId");`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "Bookmark_userId_questionId_key" ON "Bookmark"("userId", "questionId");`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "DailyUsage_userId_date_key" ON "DailyUsage"("userId", "date");`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "QuestionNote_userId_questionId_key" ON "QuestionNote"("userId", "questionId");`,
  `CREATE INDEX IF NOT EXISTS "AnswerLog_userId_createdAt_idx" ON "AnswerLog"("userId", "createdAt");`,
];

const INITIAL_SUBJECTS = [
  { name: "Anatomia Humana", period: 1, category: "Ciclo Básico" },
  { name: "Histologia & Embriologia", period: 1, category: "Ciclo Básico" },
  { name: "Fisiologia Humana", period: 2, category: "Ciclo Básico" },
  { name: "Bioquímica Médica", period: 2, category: "Ciclo Básico" },
  { name: "Patologia Geral", period: 3, category: "Ciclo Básico" },
  { name: "Imunologia & Microbiologia", period: 3, category: "Ciclo Básico" },
  { name: "Farmacologia Básica", period: 4, category: "Ciclo Básico" },
  { name: "Semiologia Médica I", period: 4, category: "Ciclo Básico" },
  { name: "Semiologia Médica II", period: 5, category: "Ciclo Clínico Inicial" },
  { name: "Farmacologia Clínica", period: 5, category: "Ciclo Clínico Inicial" },
  { name: "Diagnóstico por Imagem", period: 6, category: "Ciclo Clínico Inicial" },
  { name: "Saúde Coletiva & Epidemiologia", period: 6, category: "Ciclo Clínico Inicial" },
];

// Senhas das contas de demonstração: vêm do ambiente ou são geradas na hora e impressas no console.
function seedPassword(envName: string): { value: string; generated: boolean } {
  const fromEnv = process.env[envName];
  if (fromEnv) return { value: fromEnv, generated: false };
  return { value: randomBytes(9).toString("base64url"), generated: true };
}
// Conta Pro de teste (e-mail, nome e senha podem ser trocados por variáveis de ambiente).
const PRO_EMAIL = process.env.SEED_PRO_EMAIL || "janaina.pereira@test.com";
const PRO_NAME = process.env.SEED_PRO_NAME || "Dra. Janaína Pereira";

async function main() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    console.error("❌ ERRO: TURSO_DATABASE_URL ou TURSO_AUTH_TOKEN não foram configurados.");
    console.log("Defina as variáveis no seu ambiente ou arquivo .env:");
    console.log('  TURSO_DATABASE_URL="libsql://seu-banco.turso.io"');
    console.log('  TURSO_AUTH_TOKEN="seu-token"');
    process.exit(1);
  }

  console.log("🚀 [Turso] Conectando ao banco distribuído libSQL...");
  console.log(`📡 URL: ${url}`);

  const client = createClient({ url, authToken });

  console.log("🛠️ [Turso] Executando DDL das tabelas e índices...");
  for (const statement of DDL_STATEMENTS) {
    await client.execute(statement);
  }

  // Migrações incrementais para adicionar colunas em bancos Turso já existentes
  const ALTER_STATEMENTS = [
    `ALTER TABLE "User" ADD COLUMN "avatarUrl" TEXT;`,
    `ALTER TABLE "User" ADD COLUMN "college" TEXT;`,
    `ALTER TABLE "User" ADD COLUMN "period" TEXT;`,
    `ALTER TABLE "User" ADD COLUMN "targetSpecialty" TEXT;`,
  ];
  for (const alter of ALTER_STATEMENTS) {
    try {
      await client.execute(alter);
    } catch {
      // Ignora se a coluna já existir no banco
    }
  }

  // Verificação de e-mail: coluna nova + tabela de tokens.
  // O backfill roda SOMENTE quando a coluna acaba de ser criada, para as contas que já
  // existiam ficarem verificadas (não perdem bônus de indicação) sem "verificar" contas novas.
  await client.execute(`CREATE TABLE IF NOT EXISTS "EmailToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "usedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EmailToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
  );`);
  await client.execute(`CREATE UNIQUE INDEX IF NOT EXISTS "EmailToken_tokenHash_key" ON "EmailToken"("tokenHash");`);
  await client.execute(`CREATE INDEX IF NOT EXISTS "EmailToken_userId_type_createdAt_idx" ON "EmailToken"("userId", "type", "createdAt");`);
  try {
    await client.execute(`ALTER TABLE "User" ADD COLUMN "emailVerifiedAt" DATETIME;`);
    await client.execute(`UPDATE "User" SET "emailVerifiedAt" = "createdAt" WHERE "emailVerifiedAt" IS NULL;`);
    console.log("✅ [Turso] Coluna emailVerifiedAt criada; contas existentes marcadas como verificadas.");
  } catch {
    // Coluna já existe: nada a fazer (e o backfill nunca roda de novo)
  }
  await migrateEmailCanonical(client);
  console.log("✅ [Turso] Tabelas e índices criados/atualizados com sucesso.");

  const adapter = new PrismaLibSql({ url, authToken });
  const prisma = new PrismaClient({ adapter });

  console.log("🌱 [Turso] Populando matérias e usuários...");

  // 1. Criar Matérias
  const subjectMap: Record<string, string> = {};
  for (const s of INITIAL_SUBJECTS) {
    let sub = await prisma.subject.findFirst({ where: { name: s.name } });
    if (!sub) {
      sub = await prisma.subject.create({ data: s });
    }
    subjectMap[s.name] = sub.id;
  }
  console.log("✅ [Turso] 12 matérias configuradas.");

  // 2. Criar Usuário Demo
  const demoPw = seedPassword("SEED_DEMO_PASSWORD");
  const demoHash = await bcrypt.hash(demoPw.value, 10);
  const demoUser = await prisma.user.upsert({
    where: { email: "demo@synapse.med" },
    update: {},
    create: {
      name: "Estudante Demo",
      email: "demo@synapse.med",
      passwordHash: demoHash,
      referralCode: "SYN-DEMO",
      plan: "free",
    },
  });

  // 3. Criar Usuário Pro Ilimitado 
  let proPw: { value: string; generated: boolean } | null = null;
  if (PRO_EMAIL) {
    proPw = seedPassword("SEED_PRO_PASSWORD");
    const proHash = await bcrypt.hash(proPw.value, 10);
    await prisma.user.upsert({
      where: { email: PRO_EMAIL },
      update: { plan: "pro" },
      create: {
        name: PRO_NAME,
        email: PRO_EMAIL,
        passwordHash: proHash,
        plan: "pro",
        referralCode: "SYN-JANAINA",
      },
    });
  }
  console.log(`✅ [Turso] Usuário demo criado: ${demoUser.email}.${PRO_EMAIL ? ` Pro: ${PRO_EMAIL}.` : ""}`);

  // 4. Inserir Questões do arquivo completo
  const jsonPath = path.resolve(process.cwd(), "synapse_questoes_completo.json");
  let inserted = 0;

  if (fs.existsSync(jsonPath)) {
    const rawData = fs.readFileSync(jsonPath, "utf8");
    const questionsData = JSON.parse(rawData);
    console.log(`📚 [Turso] Sincronizando ${questionsData.length} questões...`);

    for (const q of questionsData) {
      const normalizedName =
        q.disciplina === "Saúde Coletiva e Epidemiologia"
          ? "Saúde Coletiva & Epidemiologia"
          : q.disciplina;

      const subjectId = subjectMap[normalizedName];
      if (!subjectId) continue;

      const qId = q.id || undefined;
      const questionPayload = {
        subjectId,
        subtopic: q.subtopico || null,
        text: q.enunciado,
        imageUrl: q.imagemUrl || null,
        options: JSON.stringify(q.alternativas),
        correctOption: q.alternativaCorretaIndice,
        explanation: q.comentarioExplicativo,
        source: q.bancaFonte || "Banca Médica",
        year: q.ano || 2024,
        accessLevel: q.nivelAcesso || "free",
        isActive: q.ativo !== false,
      };

      if (qId) {
        await prisma.question.upsert({
          where: { id: qId },
          update: questionPayload,
          create: { id: qId, ...questionPayload },
        });
        inserted++;
      }
    }
  }

  const total = await prisma.question.count();
  const totalImgs = await prisma.question.count({ where: { imageUrl: { not: null } } });

  console.log("\n========================================================");
  console.log(`🎉 BANCO TURSO SINCRONIZADO COM SUCESSO!`);
  console.log(`📊 Questões processadas: ${inserted}`);
  console.log(`📊 TOTAL de questões no Turso: ${total}`);
  console.log(`🖼️ TOTAL de questões COM IMAGEM no Turso: ${totalImgs}`);
  if (PRO_EMAIL) console.log(`👤 Usuário Ilimitado: ${PRO_EMAIL}${proPw?.generated ? ` / ${proPw.value} (senha gerada)` : ""}`);
  console.log("========================================================\n");

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error("❌ Erro na sincronização com o Turso:", err);
  process.exit(1);
});
