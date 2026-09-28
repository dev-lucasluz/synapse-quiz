import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { imageQuestionsBatch2 } from "./image-questions-batch2";

/**
 * Insere (ou atualiza) as 30 questões com imagem do lote 2. Idempotente: a chave de
 * identificação é o imageUrl, então rodar de novo não duplica nada.
 *
 *   Local : npx tsx scripts/insert-image-questions-batch2.ts
 *   Turso : TURSO_DATABASE_URL=... TURSO_AUTH_TOKEN=... npx tsx scripts/insert-image-questions-batch2.ts
 *
 * Não apaga nem altera nenhuma outra questão.
 */
function createClient(): PrismaClient {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (url && authToken) {
    return new PrismaClient({ adapter: new PrismaLibSql({ url, authToken }) });
  }
  return new PrismaClient();
}

async function main() {
  const prisma = createClient();
  const subjects = await prisma.subject.findMany();
  const subjectMap = new Map(subjects.map((s) => [s.name, s.id]));

  let inserted = 0;
  let updated = 0;
  for (const q of imageQuestionsBatch2) {
    const subjectId = subjectMap.get(q.subjectName);
    if (!subjectId) {
      console.error(`❌ Matéria não encontrada: "${q.subjectName}"`);
      continue;
    }
    const data = {
      subjectId,
      text: q.text,
      options: JSON.stringify(q.options),
      correctOption: q.correctOption,
      explanation: q.explanation,
      source: q.source,
      year: q.year,
      imageUrl: q.imageUrl,
    };
    const existing = await prisma.question.findFirst({ where: { imageUrl: q.imageUrl } });
    if (existing) {
      await prisma.question.update({ where: { id: existing.id }, data });
      updated++;
    } else {
      await prisma.question.create({ data });
      inserted++;
    }
  }

  const total = await prisma.question.count();
  const withImage = await prisma.question.count({ where: { imageUrl: { not: null } } });
  console.log(`✅ ${inserted} inseridas, ${updated} atualizadas. Total no banco: ${total} (${withImage} com imagem).`);
  await prisma.$disconnect();
}

main().catch((error) => {
  console.error("❌ Falha:", error);
  process.exit(1);
});
