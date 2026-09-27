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

  const { questionId, selectedOption, mode } = await request.json();
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
