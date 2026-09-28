import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getTodayString, getYesterdayString } from "@/lib/utils";
import { calculateNextReview } from "@/lib/srs";
import { getDailyQuota, type Plan } from "@/lib/billing";

/**
 * POST /api/quiz/submit
 * Submit an answer, update SRS card, daily usage, return explanation.
 *
 * A cota diária é verificada aqui (servidor) — não basta o GET /api/quiz/daily,
 * senão qualquer cliente poderia responder além do limite chamando a API direto.
 */
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo da requisição inválido" }, { status: 400 });
  }

  const { questionId, selectedOption, mode: rawMode, timeSpentSeconds } = (body ?? {}) as {
    questionId?: unknown;
    selectedOption?: unknown;
    mode?: unknown;
    timeSpentSeconds?: unknown;
  };

  // mode: "daily" | "notebook"
  const mode: "daily" | "notebook" = rawMode === "notebook" ? "notebook" : "daily";

  if (typeof questionId !== "string" || questionId.length === 0 || questionId.length > 100) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }
  if (typeof selectedOption !== "number" || !Number.isInteger(selectedOption)) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const question = await prisma.question.findUnique({
    where: { id: questionId },
    include: { subject: true },
  });

  if (!question) {
    return NextResponse.json({ error: "Questão não encontrada" }, { status: 404 });
  }

  const options = JSON.parse(question.options) as string[];
  if (selectedOption < 0 || selectedOption >= options.length) {
    return NextResponse.json({ error: "Alternativa inválida" }, { status: 400 });
  }

  const today = getTodayString();

  // ── Cota diária (validada no servidor) ──────────────────────────────────────
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      plan: true,
      streakCount: true,
      lastActiveDate: true,
      _count: { select: { referrals: true } },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
  }

  const { mainMax, notebookMax } = getDailyQuota(user.plan as Plan, user._count.referrals);
  const currentUsage = await prisma.dailyUsage.findUnique({
    where: { userId_date: { userId: session.userId, date: today } },
  });
  const used =
    mode === "notebook"
      ? currentUsage?.notebookCardsReviewed ?? 0
      : currentUsage?.mainCardsReviewed ?? 0;
  const max = mode === "notebook" ? notebookMax : mainMax;

  // Exceção: questões com imagem no modo "Questões com imagem" do quiz não
  // travam na cota (mesma regra do GET /api/quiz/daily?filter=images).
  const isImageQuestion = mode === "daily" && !!question.imageUrl;

  if (used >= max && !isImageQuestion) {
    return NextResponse.json(
      { error: "Cota diária atingida", limitReached: true, used, max },
      { status: 429 }
    );
  }

  const correct = selectedOption === question.correctOption;

  // Get or create SRS card
  const existingCard = await prisma.userCardReview.findUnique({
    where: { userId_questionId: { userId: session.userId, questionId } },
  });

  const cardData = existingCard ?? {
    repetitionCount: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  };

  const nextReview = calculateNextReview(cardData, correct);

  await prisma.userCardReview.upsert({
    where: { userId_questionId: { userId: session.userId, questionId } },
    create: {
      userId: session.userId,
      questionId,
      ...nextReview,
      lastReviewedAt: new Date(),
    },
    update: {
      ...nextReview,
      lastReviewedAt: new Date(),
    },
  });

  // Update daily usage
  const usageUpdate =
    mode === "notebook"
      ? { notebookCardsReviewed: { increment: 1 } }
      : { mainCardsReviewed: { increment: 1 } };

  await prisma.dailyUsage.upsert({
    where: { userId_date: { userId: session.userId, date: today } },
    create: {
      userId: session.userId,
      date: today,
      mainCardsReviewed: mode === "notebook" ? 0 : 1,
      notebookCardsReviewed: mode === "notebook" ? 1 : 0,
    },
    update: usageUpdate,
  });

  // Record AnswerLog for high-fidelity analytics
  const spentSeconds =
    typeof timeSpentSeconds === "number" &&
    Number.isFinite(timeSpentSeconds) &&
    timeSpentSeconds >= 0 &&
    timeSpentSeconds <= 24 * 60 * 60
      ? Math.round(timeSpentSeconds)
      : null;
  await prisma.answerLog.create({
    data: {
      userId: session.userId,
      questionId,
      selectedOption,
      isCorrect: correct,
      mode,
      timeSpentSeconds: spentSeconds,
    },
  });

  // Update streak efficiently (O(1), zero N+1 loops)
  // "Hoje" e "ontem" seguem o dia de estudo (vira às 05:00, horário de Brasília).
  let nextStreak = user.streakCount || 0;
  const yesterdayStr = getYesterdayString();

  if (user.lastActiveDate === today) {
    // Already studied today - streak unchanged
  } else if (user.lastActiveDate === yesterdayStr) {
    // Studied yesterday - advance streak!
    nextStreak += 1;
  } else {
    // First day or streak broken
    nextStreak = 1;
  }

  await prisma.user.update({
    where: { id: session.userId },
    data: {
      lastActiveDate: today,
      streakCount: nextStreak,
    },
  });

  // Auto-bookmark on wrong answer
  if (!correct) {
    await prisma.bookmark.upsert({
      where: {
        userId_questionId: { userId: session.userId, questionId },
      },
      create: { userId: session.userId, questionId },
      update: {},
    });
  }

  return NextResponse.json({
    correct,
    correctOption: question.correctOption,
    explanation: question.explanation,
    nextReviewIn: nextReview.intervalDays,
    options,
  });
}
