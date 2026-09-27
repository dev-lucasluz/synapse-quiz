import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/subjects
 * Returns all subjects with question counts, grouped by period/category.
 */
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const subjects = await prisma.subject.findMany({
    include: {
      _count: { select: { questions: true } },
    },
    orderBy: [{ period: "asc" }, { name: "asc" }],
  });

  // Get user's reviewed question counts per subject
  const userReviews = await prisma.userCardReview.findMany({
    where: { userId: session.userId },
    include: { question: { select: { subjectId: true } } },
  });

  const reviewedBySubject = new Map<string, number>();
  for (const review of userReviews) {
    const sid = review.question.subjectId;
    reviewedBySubject.set(sid, (reviewedBySubject.get(sid) ?? 0) + 1);
  }

  const data = subjects.map((s) => ({
    id: s.id,
    name: s.name,
    period: s.period,
    category: s.category,
    totalQuestions: s._count.questions,
    reviewedQuestions: reviewedBySubject.get(s.id) ?? 0,
  }));

  return NextResponse.json({ subjects: data });
}
