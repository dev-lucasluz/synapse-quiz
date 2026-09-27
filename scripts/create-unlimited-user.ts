import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("👤 Configurando usuário com acesso ilimitado (Plano Pro)...");

  const email = "pro@exemplo.com";
  const passwordPlain = "senha-removida";
  const passwordHash = await bcrypt.hash(passwordPlain, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      passwordHash,
      plan: "pro", // Sem limites de questões ou funcionalidades
      name: "Estudante Pro",
    },
    create: {
      email,
      name: "Estudante Pro",
      passwordHash,
      plan: "pro", // Plano Pro permanente
      referralCode: "SYN-PRO",
    },
  });

  console.log(`✅ Usuário configurado com sucesso:`);
  console.log(`   - ID: ${user.id}`);
  console.log(`   - Nome: ${user.name}`);
  console.log(`   - E-mail: ${user.email}`);
  console.log(`   - Plano: ${user.plan.toUpperCase()} (SEM LIMITES)`);
  console.log(`   - Código de Indicação: ${user.referralCode}`);

  // Adicionar as 20 questões com imagem aos favoritos para teste no Caderno de Erros
  const imageQuestions = await prisma.question.findMany({
    where: { imageUrl: { not: null } },
  });

  let bookmarkedCount = 0;
  for (const q of imageQuestions) {
    const existing = await prisma.bookmark.findUnique({
      where: {
        userId_questionId: {
          userId: user.id,
          questionId: q.id,
        },
      },
    });

    if (!existing) {
      await prisma.bookmark.create({
        data: {
          userId: user.id,
          questionId: q.id,
        },
      });
      bookmarkedCount++;
    }
  }

  console.log(`🔖 ${bookmarkedCount} questões ilustradas adicionadas ao Caderno de Erros.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
