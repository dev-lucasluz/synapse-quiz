import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getTodayString } from "@/lib/utils";

/**
 * GET /api/quiz/notebook
 * Returns questions from user's bookmarks for the notebook session.
 * Quota: 20 per day.
 */
export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const excludeParam = searchParams.get("exclude");
  const clientExcludeIds = excludeParam
    ? excludeParam.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  const today = getTodayString();

  const dailyUsage = await prisma.dailyUsage.findUnique({
    where: { userId_date: { userId: session.userId, date: today } },
  });

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });
  const isPro = user?.plan === "pro";

  const notebookUsed = dailyUsage?.notebookCardsReviewed ?? 0;
  const NOTEBOOK_MAX = isPro ? 9999 : 20;

  if (notebookUsed >= NOTEBOOK_MAX && !isPro) {
    return NextResponse.json({
      limitReached: true,
      used: notebookUsed,
      max: NOTEBOOK_MAX,
    });
  }

  // Obter questões do caderno (excluindo as puladas nesta sessão se possível)
  const allBookmarks = await prisma.bookmark.findMany({
    where: { userId: session.userId },
    include: {
      question: { include: { subject: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  if (allBookmarks.length === 0) {
    return NextResponse.json({
      limitReached: false,
      used: notebookUsed,
      max: NOTEBOOK_MAX,
      question: null,
      empty: true,
    });
  }

  // Filtrar as excluídas
  let availableBookmarks = allBookmarks.filter(
    (b) => !clientExcludeIds.includes(b.questionId)
  );

  // Se o usuário pulou todas as questões do caderno, reinicia a lista
  if (availableBookmarks.length === 0) {
    availableBookmarks = allBookmarks;
  }

  // Pick a random bookmarked question
  const randomBookmark = availableBookmarks[Math.floor(Math.random() * availableBookmarks.length)];
  const q = randomBookmark.question;

  return NextResponse.json({
    limitReached: false,
    used: notebookUsed,
    max: NOTEBOOK_MAX,
    question: {
      id: q.id,
      text: q.text,
      imageUrl: q.imageUrl,
      options: JSON.parse(q.options),
      source: q.source,
      year: q.year,
      subject: q.subject.name,
      period: q.subject.period,
    },
  });
}
