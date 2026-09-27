import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const subjects = await prisma.subject.findMany({
    include: {
      questions: {
        select: { id: true, text: true, source: true, year: true, imageUrl: true }
      }
    },
    orderBy: [{ period: 'asc' }, { name: 'asc' }]
  });

  for (const s of subjects) {
    console.log(`\n============================================================`);
    console.log(`[PERÍODO ${s.period}] ${s.name} (${s.questions.length} questões)`);
    console.log(`============================================================`);
    s.questions.forEach((q, i) => {
      console.log(`  ${String(i + 1).padStart(2, ' ')}. ${q.text.substring(0, 110)}...`);
    });
  }
}

main().finally(() => prisma.$disconnect());
