import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/bookmarks - List all bookmarks
 * POST /api/bookmarks - Toggle bookmark for a question
 */
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const bookmarks = await prisma.bookmark.findMany({
    where: { userId: session.userId },
    include: {
      question: { include: { subject: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    bookmarks: bookmarks.map((b) => ({
      id: b.id,
      questionId: b.questionId,
      createdAt: b.createdAt,
      question: {
        id: b.question.id,
        text: b.question.text,
        source: b.question.source,
        year: b.question.year,
        subject: b.question.subject.name,
        period: b.question.subject.period,
      },
    })),
  });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const { questionId } = await request.json();
  if (!questionId) {
    return NextResponse.json({ error: "questionId é obrigatório" }, { status: 400 });
  }

  const existing = await prisma.bookmark.findUnique({
    where: { userId_questionId: { userId: session.userId, questionId } },
  });

  if (existing) {
    await prisma.bookmark.delete({ where: { id: existing.id } });
    return NextResponse.json({ bookmarked: false });
  } else {
    await prisma.bookmark.create({
      data: { userId: session.userId, questionId },
    });
    return NextResponse.json({ bookmarked: true });
  }
}
