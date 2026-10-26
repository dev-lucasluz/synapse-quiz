import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

const subjects = [
  // 1º Período
  { name: "Anatomia Humana", period: 1, category: "Ciclo Básico" },
  { name: "Histologia & Embriologia", period: 1, category: "Ciclo Básico" },
  // 2º Período
  { name: "Fisiologia Humana", period: 2, category: "Ciclo Básico" },
  { name: "Bioquímica Médica", period: 2, category: "Ciclo Básico" },
  // 3º Período
  { name: "Patologia Geral", period: 3, category: "Ciclo Básico" },
  { name: "Imunologia & Microbiologia", period: 3, category: "Ciclo Básico" },
  // 4º Período
  { name: "Farmacologia Básica", period: 4, category: "Ciclo Básico" },
  { name: "Semiologia Médica I", period: 4, category: "Ciclo Básico" },
  // 5º Período
  { name: "Semiologia Médica II", period: 5, category: "Ciclo Clínico Inicial" },
  { name: "Farmacologia Clínica", period: 5, category: "Ciclo Clínico Inicial" },
  // 6º Período
  { name: "Diagnóstico por Imagem", period: 6, category: "Ciclo Clínico Inicial" },
  { name: "Saúde Coletiva & Epidemiologia", period: 6, category: "Ciclo Clínico Inicial" },
];

// Senhas das contas de demonstração: vêm do ambiente ou são geradas na hora e impressas no console.
function seedPassword(envName: string): { value: string; generated: boolean } {
  const fromEnv = process.env[envName];
  if (fromEnv) return { value: fromEnv, generated: false };
  return { value: randomBytes(9).toString("base64url"), generated: true };
}
const PRO_EMAIL = process.env.SEED_PRO_EMAIL || "pro@synapse.med";
const PRO_NAME = process.env.SEED_PRO_NAME || "Estudante Pro";

async function main() {
  console.log("🌱 Iniciando seed do banco de dados...");

  // 1. Criar usuário Demo (Free)
  const demoPw = seedPassword("SEED_DEMO_PASSWORD");
  const passwordHash = await bcrypt.hash(demoPw.value, 10);
  const demoUser = await prisma.user.upsert({
    where: { email: "demo@synapse.med" },
    update: {},
    create: {
      name: "Estudante Demo",
      email: "demo@synapse.med",
      passwordHash,
      referralCode: "SYN-DEMO",
    },
  });
  console.log(`✅ Usuário demo criado: ${demoUser.email}`);
  if (demoPw.generated) console.log(`   Senha gerada (anote, não será mostrada de novo): ${demoPw.value}`);

  // 2. Criar usuário Pro sem limites
  const proPw = seedPassword("SEED_PRO_PASSWORD");
  const proPasswordHash = await bcrypt.hash(proPw.value, 10);
  const proUser = await prisma.user.upsert({
    where: { email: PRO_EMAIL },
    update: { plan: "pro" },
    create: {
      name: PRO_NAME,
      email: PRO_EMAIL,
      passwordHash: proPasswordHash,
      plan: "pro",
      referralCode: "SYN-PRO",
    },
  });
  console.log(`✅ Usuário Pro ilimitado criado: ${proUser.email}`);
  if (proPw.generated) console.log(`   Senha gerada (anote, não será mostrada de novo): ${proPw.value}`);

  // 3. Criar matérias
  const subjectMap: Record<string, string> = {};
  for (const subjectData of subjects) {
    const existing = await prisma.subject.findFirst({
      where: { name: subjectData.name },
    });
    if (existing) {
      subjectMap[subjectData.name] = existing.id;
    } else {
      const subject = await prisma.subject.create({ data: subjectData });
      subjectMap[subjectData.name] = subject.id;
    }
  }
  console.log(`📚 ${Object.keys(subjectMap).length} matérias verificadas/criadas.`);

  // 4. Carregar acervo de questões
  const jsonPath = path.resolve(process.cwd(), "synapse_questoes_completo.json");

  if (fs.existsSync(jsonPath)) {
    console.log(`📖 Carregando questões de ${jsonPath}...`);
    const rawData = fs.readFileSync(jsonPath, "utf8");
    const questionsData = JSON.parse(rawData);

    let createdCount = 0;
    let updatedCount = 0;

    for (const q of questionsData) {
      const normalizedSubject =
        q.disciplina === "Saúde Coletiva e Epidemiologia"
          ? "Saúde Coletiva & Epidemiologia"
          : q.disciplina;

      const subjectId = subjectMap[normalizedSubject];
      if (!subjectId) {
        console.warn(`⚠️ Matéria não encontrada para: ${q.disciplina}`);
        continue;
      }

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
          create: {
            id: qId,
            ...questionPayload,
          },
        });
        updatedCount++;
      } else {
        const existing = await prisma.question.findFirst({
          where: { text: q.enunciado },
        });
        if (!existing) {
          await prisma.question.create({ data: questionPayload });
          createdCount++;
        }
      }
    }

    console.log(`✅ Seed de questões concluído: ${updatedCount + createdCount} questões sincronizadas no banco.`);
  } else {
    console.warn(`⚠️ Arquivo synapse_questoes_completo.json não encontrado em ${jsonPath}.`);
  }

  console.log("🎉 Seed geral finalizado com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
