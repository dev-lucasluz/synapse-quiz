import { createClient } from "@libsql/client";
import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";
import { expansionQuestions } from "../prisma/seed-expansion";

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
    "text" TEXT NOT NULL,
    "imageUrl" TEXT,
    "options" TEXT NOT NULL,
    "correctOption" INTEGER NOT NULL,
    "explanation" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "accessLevel" TEXT NOT NULL DEFAULT 'free',
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

  `CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "User_referralCode_key" ON "User"("referralCode");`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "User_stripeCustomerId_key" ON "User"("stripeCustomerId");`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "User_stripeSubscriptionId_key" ON "User"("stripeSubscriptionId");`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "Subscription_userId_key" ON "Subscription"("userId");`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "Subscription_stripeSubscriptionId_key" ON "Subscription"("stripeSubscriptionId");`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "UserCardReview_userId_questionId_key" ON "UserCardReview"("userId", "questionId");`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "Bookmark_userId_questionId_key" ON "Bookmark"("userId", "questionId");`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "DailyUsage_userId_date_key" ON "DailyUsage"("userId", "date");`,
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
  console.log("✅ [Turso] Tabelas e índices criados com sucesso.");

  // Inicializar Prisma Client conectado ao Turso
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
  const demoHash = await bcrypt.hash("senha-removida", 10);
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

  // 3. Criar Usuário Pro Ilimitado (Janaína)
  const proHash = await bcrypt.hash("senha-removida", 10);
  const proUser = await prisma.user.upsert({
    where: { email: "pro@exemplo.com" },
    update: { plan: "pro" },
    create: {
      name: "Estudante Pro",
      email: "pro@exemplo.com",
      passwordHash: proHash,
      plan: "pro",
      referralCode: "SYN-PRO",
    },
  });
  console.log(`✅ [Turso] Usuários criados: ${demoUser.email} (Free) e ${proUser.email} (Pro Ilimitado).`);

  // 4. Inserir Questões
  console.log(`📚 [Turso] Inserindo acervo de questões (${expansionQuestions.length} questões)...`);
  let inserted = 0;
  for (const q of expansionQuestions) {
    const normalizedName = q.subjectName === "Saúde Coletiva e Epidemiologia" ? "Saúde Coletiva & Epidemiologia" : q.subjectName;
    const subjectId = subjectMap[normalizedName];
    if (!subjectId) continue;

    const exists = await prisma.question.findFirst({ where: { text: q.text } });
    if (!exists) {
      await prisma.question.create({
        data: {
          subjectId,
          text: q.text,
          options: typeof q.options === "string" ? q.options : JSON.stringify(q.options),
          correctOption: q.correctOption,
          explanation: q.explanation,
          source: q.source,
          year: q.year,
          imageUrl: q.imageUrl ?? null,
        },
      });
      inserted++;
    }
  }

  // 5. Adicionar favoritos de imagens para ambos os usuários
  const imgQuestions = await prisma.question.findMany({ where: { imageUrl: { not: null } } });
  for (const u of [demoUser, proUser]) {
    for (const imgQ of imgQuestions) {
      const bExists = await prisma.bookmark.findUnique({
        where: { userId_questionId: { userId: u.id, questionId: imgQ.id } },
      });
      if (!bExists) {
        await prisma.bookmark.create({
          data: { userId: u.id, questionId: imgQ.id },
        });
      }
    }
  }

  const total = await prisma.question.count();
  const totalImgs = await prisma.question.count({ where: { imageUrl: { not: null } } });

  console.log("\n========================================================");
  console.log(`🎉 BANCO TURSO SINCRONIZADO COM SUCESSO!`);
  console.log(`📊 Questões inseridas nesta sessão: ${inserted}`);
  console.log(`📊 TOTAL de questões no Turso: ${total}`);
  console.log(`🖼️ TOTAL de questões COM IMAGEM no Turso: ${totalImgs}`);
  console.log(`👤 Usuário Ilimitado: pro@exemplo.com / (senha removida)`);
  console.log("========================================================\n");

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error("❌ Erro na sincronização com o Turso:", err);
  process.exit(1);
});
