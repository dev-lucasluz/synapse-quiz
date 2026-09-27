import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getTodayString } from "@/lib/utils";
import { getDailyQuota, canAccessQuestion, type Plan } from "@/lib/billing";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("filter"); // 'images' | null
  const subjectId = searchParams.get("subjectId");
  const subtopic = searchParams.get("subtopic");
  const excludeParam = searchParams.get("exclude");
  const clientExcludeIds = excludeParam
    ? excludeParam.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  const now = new Date();
  const today = getTodayString();

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: { referrals: true },
  });

  if (!user) {
    return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
  }

  const referralCount = user.referrals.length;
  const { mainMax } = getDailyQuota(user.plan as Plan, referralCount);

  const dailyUsage = await prisma.dailyUsage.findUnique({
    where: { userId_date: { userId: user.id, date: today } },
  });

  const used = dailyUsage?.mainCardsReviewed ?? 0;

  // Se não estiver em modo de teste de imagens específico e a cota atingiu o teto
  if (used >= mainMax && filter !== "images") {
    return NextResponse.json({
      limitReached: true,
      used,
      max: mainMax,
      plan: user.plan,
      referralCode: user.referralCode,
      referralCount,
    });
  }

  const imageFilter = filter === "images" ? { imageUrl: { not: null } } : {};
  const subjectFilter = subjectId ? { subjectId } : {};
  const subtopicFilter = subtopic ? { subtopic } : {};
  const topicFilter = {
    isActive: true,
    ...imageFilter,
    ...subjectFilter,
    ...subtopicFilter,
  };

  // 1ª prioridade: questão SRS com revisão vencida (respeitando filtros e exclude)
  const dueReview = await prisma.userCardReview.findFirst({
    where: {
      userId: user.id,
      dueDate: { lte: now },
      ...(clientExcludeIds.length > 0 ? { questionId: { notIn: clientExcludeIds } } : {}),
      question: {
        accessLevel: user.plan === "pro" ? undefined : "free",
        ...topicFilter,
      },
    },
    include: { question: { include: { subject: true } } },
    orderBy: { dueDate: "asc" },
  });

  if (dueReview) {
    const q = dueReview.question;
    return NextResponse.json({
      limitReached: false,
      used,
      max: mainMax,
      plan: user.plan,
      question: {
        id: q.id,
        text: q.text,
        imageUrl: q.imageUrl,
        options: JSON.parse(q.options),
        source: q.source,
        year: q.year,
        subjectId: q.subjectId,
        subject: q.subject.name,
        period: q.subject.period,
        subtopic: q.subtopic,
      },
    });
  }

  // 2ª prioridade: questão ainda não vista pelo usuário (respeitando filtros e exclude)
  const reviewedIds = await prisma.userCardReview.findMany({
    where: { userId: user.id },
    select: { questionId: true },
  });
  const excludeIds = reviewedIds.map((r) => r.questionId);
  const combinedExclude = Array.from(new Set([...excludeIds, ...clientExcludeIds]));

  const question = await prisma.question.findFirst({
    where: {
      ...(combinedExclude.length > 0 ? { id: { notIn: combinedExclude } } : {}),
      accessLevel: canAccessQuestion(user.plan as Plan, "pro") ? undefined : "free",
      ...topicFilter,
    },
    include: { subject: true },
    orderBy: { id: "asc" },
  });

  if (!question) {
    // Todas as questões foram vistas ou puladas → buscar aleatória com filtros excluindo as puladas nesta sessão
    let total = await prisma.question.count({
      where: {
        ...(clientExcludeIds.length > 0 ? { id: { notIn: clientExcludeIds } } : {}),
        accessLevel: user.plan === "pro" ? undefined : "free",
        ...topicFilter,
      },
    });

    let effectiveExclude = clientExcludeIds;
    // Se o exclude esgotou todas as questões do filtro, reinicia sem exclude
    if (total === 0) {
      effectiveExclude = [];
      total = await prisma.question.count({
        where: {
          accessLevel: user.plan === "pro" ? undefined : "free",
          ...topicFilter,
        },
      });
    }

    if (total === 0) {
      return NextResponse.json({ error: "Nenhuma questão disponível para este filtro" }, { status: 404 });
    }

    const skip = Math.floor(Math.random() * total);
    const randomQ = await prisma.question.findFirst({
      where: {
        ...(effectiveExclude.length > 0 ? { id: { notIn: effectiveExclude } } : {}),
        accessLevel: user.plan === "pro" ? undefined : "free",
        ...topicFilter,
      },
      include: { subject: true },
      skip,
    });

    if (!randomQ) {
      return NextResponse.json({ error: "Nenhuma questão disponível" }, { status: 404 });
    }

    return NextResponse.json({
      limitReached: false,
      used,
      max: mainMax,
      plan: user.plan,
      question: {
        id: randomQ.id,
        text: randomQ.text,
        imageUrl: randomQ.imageUrl,
        options: JSON.parse(randomQ.options),
        source: randomQ.source,
        year: randomQ.year,
        subjectId: randomQ.subjectId,
        subject: randomQ.subject.name,
        period: randomQ.subject.period,
        subtopic: randomQ.subtopic,
      },
    });
  }

  return NextResponse.json({
    limitReached: false,
    used,
    max: mainMax,
    plan: user.plan,
    question: {
      id: question.id,
      text: question.text,
      imageUrl: question.imageUrl,
      options: JSON.parse(question.options),
      source: question.source,
      year: question.year,
      subjectId: question.subjectId,
      subject: question.subject.name,
      period: question.subject.period,
      subtopic: question.subtopic,
    },
  });
}
