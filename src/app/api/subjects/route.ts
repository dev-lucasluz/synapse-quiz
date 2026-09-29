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
      _count: { select: { questions: { where: { isActive: true } } } },
      questions: {
        where: { isActive: true },
        select: { subtopic: true },
        distinct: ["subtopic"],
      },
    },
    orderBy: [{ name: "asc" }],
  });

  // Get user's reviewed question counts per subject
  const userReviews = await prisma.userCardReview.findMany({
    where: { userId: session.userId },
    include: { question: { select: { subjectId: true } } },
  });

  // Quantas questões com imagem cada matéria tem (para o filtro "só com imagem").
  const imageCounts = await prisma.question.groupBy({
    by: ["subjectId"],
    where: { isActive: true, imageUrl: { not: null } },
    _count: { _all: true },
  });
  const imagesBySubject = new Map(imageCounts.map((r) => [r.subjectId, r._count._all]));

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
    imageQuestions: imagesBySubject.get(s.id) ?? 0,
    subtopics: s.questions.map((q) => q.subtopic).filter(Boolean) as string[],
  }));

  return NextResponse.json(
    { subjects: data },
    { headers: { "Cache-Control": "private, max-age=15, stale-while-revalidate=60" } }
  );
}
