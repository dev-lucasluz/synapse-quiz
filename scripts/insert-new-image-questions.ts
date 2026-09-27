import { PrismaClient } from "@prisma/client";
import { new15ImageQuestions } from "./new-image-questions";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Inserindo as 15 novas questões de alta dificuldade com imagens...");

  const subjects = await prisma.subject.findMany();
  const subjectMap = new Map<string, string>();
  subjects.forEach((s) => subjectMap.set(s.name, s.id));

  let insertedCount = 0;
  let updatedCount = 0;

  for (const q of new15ImageQuestions) {
    const subjectId = subjectMap.get(q.subjectName);
    if (!subjectId) {
      console.error(`❌ Matéria não encontrada: "${q.subjectName}"`);
      continue;
    }

    const existing = await prisma.question.findFirst({
      where: { text: q.text },
    });

    if (!existing) {
      const created = await prisma.question.create({
        data: {
          subjectId,
          text: q.text,
          options: JSON.stringify(q.options),
          correctOption: q.correctOption,
          explanation: q.explanation,
          source: q.source,
          year: q.year,
          imageUrl: q.imageUrl,
        },
      });
      insertedCount++;
      console.log(`✅ [${q.subjectName}] Inserida: ${q.imageUrl} | ${q.source} (${q.year})`);
    } else {
      await prisma.question.update({
        where: { id: existing.id },
        data: {
          imageUrl: q.imageUrl,
          options: JSON.stringify(q.options),
          correctOption: q.correctOption,
          explanation: q.explanation,
          source: q.source,
          year: q.year,
        },
      });
      updatedCount++;
      console.log(`🔄 [${q.subjectName}] Atualizada: ${q.imageUrl}`);
    }
  }

  // Obter usuário demo para garantir que ele possa testar no Caderno de Erros (/notebook)
  const demoUser = await prisma.user.findUnique({
    where: { email: "demo@synapse.med" },
  });

  if (demoUser) {
    // Obter todas as questões com imagem
    const allImageQuestions = await prisma.question.findMany({
      where: { imageUrl: { not: null } },
    });

    for (const imgQ of allImageQuestions) {
      const existingBookmark = await prisma.bookmark.findUnique({
        where: {
          userId_questionId: {
            userId: demoUser.id,
            questionId: imgQ.id,
          },
        },
      });
      if (!existingBookmark) {
        await prisma.bookmark.create({
          data: {
            userId: demoUser.id,
            questionId: imgQ.id,
          },
        });
      }
    }
    console.log(`🔖 Caderno de Erros da conta demo atualizado com todas as ${allImageQuestions.length} questões de imagem!`);
  }

  const totalQuestions = await prisma.question.count();
  const totalWithImages = await prisma.question.count({
    where: { imageUrl: { not: null } },
  });

  console.log(`\n🎉 Finalizado!`);
  console.log(`📊 Novas inseridas: ${insertedCount}`);
  console.log(`📊 Atualizadas: ${updatedCount}`);
  console.log(`📊 TOTAL de questões no banco: ${totalQuestions}`);
  console.log(`🖼️ TOTAL de questões COM IMAGEM: ${totalWithImages}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
