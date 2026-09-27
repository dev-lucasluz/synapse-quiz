import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getTodayString } from "@/lib/utils";

/**
 * GET /api/simulations
 * Pro-only: Generates a randomized exam simulation questions set.
 */
export async function GET(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { plan: true },
  });

  if (user?.plan !== "pro") {
    return NextResponse.json(
      { error: "O Modo Simulado é exclusivo para assinantes do Plano Pro.", isProRequired: true },
      { status: 403 }
    );
  }

  const { searchParams } = new URL(request.url);
  const subjectId = searchParams.get("subjectId") || undefined;
  const countParam = parseInt(searchParams.get("count") || "10", 10);
  const count = Math.min(Math.max(countParam, 5), 30);

  const whereClause: { subjectId?: string; isActive: boolean } = { isActive: true };
  if (subjectId) whereClause.subjectId = subjectId;

  const allQuestions = await prisma.question.findMany({
    where: whereClause,
    include: { subject: { select: { name: true, period: true } } },
  });

  if (allQuestions.length === 0) {
    return NextResponse.json({ error: "Nenhuma questão encontrada para este filtro" }, { status: 404 });
  }

  // Shuffle questions randomly
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);

  const formattedQuestions = selected.map((q) => ({
    id: q.id,
    text: q.text,
    imageUrl: q.imageUrl,
    options: JSON.parse(q.options) as string[],
    correctOption: q.correctOption,
    explanation: q.explanation,
    source: q.source,
    year: q.year,
    subject: q.subject.name,
    period: q.subject.period,
    subtopic: q.subtopic,
  }));

  return NextResponse.json({
    questions: formattedQuestions,
    total: formattedQuestions.length,
  });
}

/**
 * POST /api/simulations
 * Pro-only: Saves finished simulation and records AnswerLogs.
 */
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const body = await request.json();
  const { title, subjectName, totalQuestions, correctCount, durationSeconds, answers } = body;

  if (typeof totalQuestions !== "number" || typeof correctCount !== "number") {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const simulation = await prisma.simulation.create({
    data: {
      userId: session.userId,
      title: title || "Simulado Cronometrado",
      subjectName: subjectName || "Geral (Todos os Períodos)",
      totalQuestions,
      correctCount,
      durationSeconds: durationSeconds || 0,
    },
  });

  // Record AnswerLogs in batch
  if (Array.isArray(answers) && answers.length > 0) {
    await prisma.answerLog.createMany({
      data: answers.map((ans: { questionId: string; selectedOption: number; isCorrect: boolean; timeSpentSeconds?: number }) => ({
        userId: session.userId,
        questionId: ans.questionId,
        selectedOption: ans.selectedOption,
        isCorrect: ans.isCorrect,
        mode: "simulation",
        timeSpentSeconds: ans.timeSpentSeconds ?? null,
      })),
    });
  }

  // Update streak if needed
  const today = getTodayString();
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { streakCount: true, lastActiveDate: true },
  });

  if (user) {
    let nextStreak = user.streakCount || 0;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    if (user.lastActiveDate === today) {
      // Streak already counted for today
    } else if (user.lastActiveDate === yesterdayStr) {
      nextStreak += 1;
    } else {
      nextStreak = 1;
    }

    await prisma.user.update({
      where: { id: session.userId },
      data: {
        lastActiveDate: today,
        streakCount: nextStreak,
      },
    });
  }

  return NextResponse.json({ success: true, simulationId: simulation.id });
}
