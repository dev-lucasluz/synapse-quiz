import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

const prisma = new PrismaClient();

async function main() {
  console.log("👤 Configurando usuário com acesso ilimitado (Plano Pro)...");

  const email = process.env.SEED_PRO_EMAIL || "janaina.pereira@test.com";
  const name = process.env.SEED_PRO_NAME || "Dra. Janaína Pereira";
  const generated = !process.env.SEED_PRO_PASSWORD;
  const passwordPlain = process.env.SEED_PRO_PASSWORD || randomBytes(9).toString("base64url");
  const passwordHash = await bcrypt.hash(passwordPlain, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      // Conta existente só troca de senha se SEED_PRO_PASSWORD for informada
      ...(generated ? {} : { passwordHash }),
      plan: "pro", // Sem limites de questões ou funcionalidades
      name,
    },
    create: {
      email,
      name,
      passwordHash,
      plan: "pro", // Plano Pro permanente
      referralCode: "SYN-JANAINA",
    },
  });

  console.log(`✅ Usuário configurado com sucesso:`);
  console.log(`   - ID: ${user.id}`);
  console.log(`   - Nome: ${user.name}`);
  console.log(`   - E-mail: ${user.email}`);
  console.log(`   - Plano: ${user.plan.toUpperCase()} (SEM LIMITES)`);
  console.log(`   - Código de Indicação: ${user.referralCode}`);
  if (generated) console.log(`   - Senha gerada (anote, não será mostrada de novo): ${passwordPlain}`);

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
