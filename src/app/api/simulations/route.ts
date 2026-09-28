import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getTodayString } from "@/lib/utils";

/**
 * GET /api/simulations
 * Pro-only: Generates a randomized exam simulation questions set.
 * NOTE: correctOption and explanation are intentionally omitted from this response
 * to prevent clients from reading answers before submitting.
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

  // correctOption and explanation are intentionally excluded — answers are
  // validated server-side in POST /api/simulations after submission.
  const formattedQuestions = selected.map((q) => ({
    id: q.id,
    text: q.text,
    imageUrl: q.imageUrl,
    options: JSON.parse(q.options) as string[],
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
 * correctCount and isCorrect are computed server-side from DB — client values are ignored.
 */
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const body = await request.json();
  const { title, subjectName, totalQuestions, durationSeconds, answers } = body;

  if (typeof totalQuestions !== "number" || !Array.isArray(answers) || answers.length === 0) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  // Validate answers server-side: fetch correct options from DB
  const questionIds: string[] = answers.map(
    (ans: { questionId: string }) => ans.questionId
  );

  const dbQuestions = await prisma.question.findMany({
    where: { id: { in: questionIds } },
    select: { id: true, correctOption: true, explanation: true },
  });

  const correctOptionMap = new Map(dbQuestions.map((q) => [q.id, q.correctOption]));
  const explanationMap = new Map(dbQuestions.map((q) => [q.id, q.explanation]));

  // Compute verified results — never trust client-sent isCorrect
  const verifiedAnswers = answers.map(
    (ans: { questionId: string; selectedOption: number; timeSpentSeconds?: number }) => {
      const correctOption = correctOptionMap.get(ans.questionId) ?? -1;
      return {
        questionId: ans.questionId,
        selectedOption: ans.selectedOption,
        isCorrect: ans.selectedOption === correctOption,
        timeSpentSeconds: ans.timeSpentSeconds ?? null,
        explanation: explanationMap.get(ans.questionId) ?? null,
      };
    }
  );

  const verifiedCorrectCount = verifiedAnswers.filter((a) => a.isCorrect).length;

  const simulation = await prisma.simulation.create({
    data: {
      userId: session.userId,
      title: title || "Simulado Cronometrado",
      subjectName: subjectName || "Simulado Geral",
      totalQuestions,
      correctCount: verifiedCorrectCount,
      durationSeconds: durationSeconds || 0,
    },
  });

  // Record AnswerLogs in batch using server-verified results
  await prisma.answerLog.createMany({
    data: verifiedAnswers.map((ans) => ({
      userId: session.userId,
      questionId: ans.questionId,
      selectedOption: ans.selectedOption,
      isCorrect: ans.isCorrect,
      mode: "simulation",
      timeSpentSeconds: ans.timeSpentSeconds,
    })),
  });

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

  return NextResponse.json({
    success: true,
    simulationId: simulation.id,
    correctCount: verifiedCorrectCount,
    // Return explanations only after submission
    results: verifiedAnswers.map((a) => ({
      questionId: a.questionId,
      isCorrect: a.isCorrect,
      explanation: a.explanation,
    })),
  });
}
