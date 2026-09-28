import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getTodayString, getYesterdayString } from "@/lib/utils";

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

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo da requisição inválido" }, { status: 400 });
  }
  const { title, subjectName, totalQuestions, durationSeconds, answers } = body as {
    title?: unknown;
    subjectName?: unknown;
    totalQuestions?: unknown;
    durationSeconds?: unknown;
    answers?: unknown;
  };

  if (
    typeof totalQuestions !== "number" ||
    !Number.isInteger(totalQuestions) ||
    totalQuestions < 1 ||
    totalQuestions > 100 ||
    !Array.isArray(answers) ||
    answers.length === 0 ||
    answers.length > 100
  ) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  // Sanitiza respostas: questionId string, selectedOption inteiro, sem duplicatas
  const seen = new Set<string>();
  const cleanAnswers: { questionId: string; selectedOption: number; timeSpentSeconds?: number }[] = [];
  for (const raw of answers as unknown[]) {
    const ans = raw as { questionId?: unknown; selectedOption?: unknown; timeSpentSeconds?: unknown };
    if (
      typeof ans?.questionId !== "string" ||
      ans.questionId.length === 0 ||
      ans.questionId.length > 100 ||
      typeof ans.selectedOption !== "number" ||
      !Number.isInteger(ans.selectedOption) ||
      ans.selectedOption < 0 ||
      ans.selectedOption > 10
    ) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }
    if (seen.has(ans.questionId)) continue;
    seen.add(ans.questionId);
    cleanAnswers.push({
      questionId: ans.questionId,
      selectedOption: ans.selectedOption,
      timeSpentSeconds:
        typeof ans.timeSpentSeconds === "number" &&
        Number.isFinite(ans.timeSpentSeconds) &&
        ans.timeSpentSeconds >= 0 &&
        ans.timeSpentSeconds <= 24 * 60 * 60
          ? Math.round(ans.timeSpentSeconds)
          : undefined,
    });
  }

  const safeTitle = typeof title === "string" ? title.trim().slice(0, 120) : "";
  const safeSubjectName = typeof subjectName === "string" ? subjectName.trim().slice(0, 120) : "";
  const safeDuration =
    typeof durationSeconds === "number" && Number.isFinite(durationSeconds) && durationSeconds >= 0
      ? Math.min(Math.round(durationSeconds), 24 * 60 * 60)
      : 0;

  // Validate answers server-side: fetch correct options from DB
  const questionIds: string[] = cleanAnswers.map((ans) => ans.questionId);

  const dbQuestions = await prisma.question.findMany({
    where: { id: { in: questionIds } },
    select: { id: true, correctOption: true, explanation: true },
  });

  const correctOptionMap = new Map(dbQuestions.map((q) => [q.id, q.correctOption]));
  const explanationMap = new Map(dbQuestions.map((q) => [q.id, q.explanation]));

  // Compute verified results — never trust client-sent isCorrect
  // Respostas para questões inexistentes são descartadas (evita erro de FK).
  const verifiedAnswers = cleanAnswers
    .filter((ans) => correctOptionMap.has(ans.questionId))
    .map((ans) => {
      const correctOption = correctOptionMap.get(ans.questionId) ?? -1;
      return {
        questionId: ans.questionId,
        selectedOption: ans.selectedOption,
        isCorrect: ans.selectedOption === correctOption,
        timeSpentSeconds: ans.timeSpentSeconds ?? null,
        explanation: explanationMap.get(ans.questionId) ?? null,
      };
    });

  if (verifiedAnswers.length === 0) {
    return NextResponse.json({ error: "Nenhuma questão válida encontrada" }, { status: 400 });
  }

  const verifiedCorrectCount = verifiedAnswers.filter((a) => a.isCorrect).length;

  const simulation = await prisma.simulation.create({
    data: {
      userId: session.userId,
      title: safeTitle || "Simulado Cronometrado",
      subjectName: safeSubjectName || "Simulado Geral",
      totalQuestions: Math.max(totalQuestions, verifiedAnswers.length),
      correctCount: verifiedCorrectCount,
      durationSeconds: safeDuration,
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
    const yesterdayStr = getYesterdayString();

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
