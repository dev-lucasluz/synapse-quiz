import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getTodayString } from "@/lib/utils";
import { getDailyQuota, type Plan } from "@/lib/billing";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: { referrals: true },
  });

  if (!user) {
    return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
  }

  const today = getTodayString();
  const dailyUsage = await prisma.dailyUsage.findUnique({
    where: { userId_date: { userId: user.id, date: today } },
  });

  const referralCount = user.referrals.length;
  const { mainMax, notebookMax } = getDailyQuota(user.plan as Plan, referralCount);

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      referralCode: user.referralCode,
      plan: user.plan, // expõe o plano para o frontend
      avatarUrl: user.avatarUrl,
      college: user.college,
      period: user.period,
      targetSpecialty: user.targetSpecialty,
    },
    quota: {
      mainUsed: dailyUsage?.mainCardsReviewed ?? 0,
      mainMax,
      notebookUsed: dailyUsage?.notebookCardsReviewed ?? 0,
      notebookMax,
      referralCount,
    },
  });
}
