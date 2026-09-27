import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getTodayString } from "@/lib/utils";
import { calculateNextReview } from "@/lib/srs";

/**
 * POST /api/quiz/submit
 * Submit an answer, update SRS card, daily usage, return explanation.
 */
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const body = await request.json();
  const { questionId, selectedOption, mode, timeSpentSeconds } = body;
  // mode: "daily" | "notebook"

  if (questionId === undefined || selectedOption === undefined) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const question = await prisma.question.findUnique({
    where: { id: questionId },
    include: { subject: true },
  });

  if (!question) {
    return NextResponse.json({ error: "Questão não encontrada" }, { status: 404 });
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
  const today = getTodayString();
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
  const spentSeconds = typeof timeSpentSeconds === "number" ? timeSpentSeconds : null;
  await prisma.answerLog.create({
    data: {
      userId: session.userId,
      questionId,
      selectedOption,
      isCorrect: correct,
      mode: mode || "daily",
      timeSpentSeconds: spentSeconds,
    },
  });

  // Update streak efficiently (O(1), zero N+1 loops)
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
  }

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
    options: JSON.parse(question.options),
  });
}
