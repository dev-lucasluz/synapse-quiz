import { PrismaClient } from "@prisma/client";
import { farmacoEpidemiologiaQuestions } from "./questions-batch-farmaco-epidemiologia";
import { patologiaFarmacoBasicaQuestions } from "./questions-batch-patologia-farmacobasica";
import { anatomiaHumanaQuestions } from "./questions-batch-anatomia";

const prisma = new PrismaClient();

// Função para embaralhar opções de forma determinística/balanceada
function shuffleOptions(options: string[], originalCorrectIndex: number): { shuffled: string[]; newCorrectIndex: number } {
  const correctOptionText = options[originalCorrectIndex];
  
  // Clone do array
  const shuffled = [...options];
  
  // Fisher-Yates shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  const newCorrectIndex = shuffled.indexOf(correctOptionText);
  return { shuffled, newCorrectIndex };
}

function normalizeSubject(name: string): string {
  if (name === "Saúde Coletiva e Epidemiologia") {
    return "Saúde Coletiva & Epidemiologia";
  }
  return name;
}

async function main() {
  console.log("🌱 Iniciando inserção das 120 novas questões médicas...");

  const all120 = [
    ...farmacoEpidemiologiaQuestions,
    ...patologiaFarmacoBasicaQuestions,
    ...anatomiaHumanaQuestions,
  ];

  console.log(`📋 Total de questões preparadas para inserção: ${all120.length}`);

  const subjects = await prisma.subject.findMany();
  const subjectMap = new Map<string, string>();
  subjects.forEach((s) => subjectMap.set(s.name, s.id));

  let insertedCount = 0;
  let skippedCount = 0;

  for (const q of all120) {
    const targetSubject = normalizeSubject(q.subjectName);
    const subjectId = subjectMap.get(targetSubject);

    if (!subjectId) {
      console.error(`❌ Matéria não encontrada no banco: "${targetSubject}" (original: "${q.subjectName}")`);
      continue;
    }

    const existing = await prisma.question.findFirst({
      where: { text: q.text },
    });

    if (!existing) {
      const rawOptions: string[] = typeof q.options === "string" ? JSON.parse(q.options) : q.options;
      const { shuffled, newCorrectIndex } = shuffleOptions(rawOptions, q.correctOption ?? 0);

      await prisma.question.create({
        data: {
          subjectId,
          text: q.text,
          options: JSON.stringify(shuffled),
          correctOption: newCorrectIndex,
          explanation: q.explanation,
          source: q.source,
          year: q.year,
        },
      });
      insertedCount++;
    } else {
      skippedCount++;
    }
  }

  const totalInDb = await prisma.question.count();

  // Contagem por matéria
  const countBySubject = await prisma.question.groupBy({
    by: ["subjectId"],
    _count: { id: true },
  });

  console.log("\n==========================================");
  console.log(`🎉 Inserção concluída com sucesso!`);
  console.log(`📥 Novas questões inseridas: ${insertedCount}`);
  console.log(`⏭️ Questões já existentes (ignoradas): ${skippedCount}`);
  console.log(`📊 TOTAL GERAL DE QUESTÕES NO BANCO: ${totalInDb}`);
  console.log("==========================================\n");

  console.log("Distribuição atual por matéria no banco de dados:");
  for (const group of countBySubject) {
    const s = subjects.find((subj) => subj.id === group.subjectId);
    console.log(`- ${s?.name || group.subjectId}: ${group._count.id} questões`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
