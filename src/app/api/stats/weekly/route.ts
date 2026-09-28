import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  getStudyDayStringDaysAgo,
  getTodayString,
  getWeekdayOfDateString,
  getYesterdayString,
} from "@/lib/utils";

/**
 * GET /api/stats/weekly
 * Returns last 7 days of study data for the bar chart.
 */
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  // Build last 7 days array (oldest first)
  const days: { date: string; label: string; shortLabel: string }[] = [];
  const DAY_LABELS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  for (let i = 6; i >= 0; i--) {
    const dateStr = getStudyDayStringDaysAgo(i);
    const dayOfWeek = getWeekdayOfDateString(dateStr);
    days.push({
      date: dateStr,
      label: DAY_LABELS[dayOfWeek],
      shortLabel: DAY_LABELS[dayOfWeek],
    });
  }

  const dateStrings = days.map((d) => d.date);

  // Fetch daily usage for last 7 days
  const usageRecords = await prisma.dailyUsage.findMany({
    where: {
      userId: session.userId,
      date: { in: dateStrings },
    },
  });

  const usageMap = new Map(usageRecords.map((r) => [r.date, r]));

  // Fetch reviews per day (for accuracy calculation)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const weeklyData = days.map((day) => {
    const usage = usageMap.get(day.date);
    return {
      date: day.date,
      label: day.label,
      total: (usage?.mainCardsReviewed ?? 0) + (usage?.notebookCardsReviewed ?? 0),
      main: usage?.mainCardsReviewed ?? 0,
      notebook: usage?.notebookCardsReviewed ?? 0,
    };
  });

  // Weekly totals
  const weeklyTotal = weeklyData.reduce((sum, d) => sum + d.total, 0);

  // Fetch accuracy from real AnswerLogs in the last 7 days
  const answerLogs = await prisma.answerLog.findMany({
    where: {
      userId: session.userId,
      createdAt: { gte: sevenDaysAgo },
    },
    select: { isCorrect: true },
  });

  let weeklyAccuracy = 0;
  if (answerLogs.length > 0) {
    const correctCount = answerLogs.filter((a) => a.isCorrect).length;
    weeklyAccuracy = Math.round((correctCount / answerLogs.length) * 100);
  } else {
    // Fallback if no AnswerLogs exist yet
    const recentReviews = await prisma.userCardReview.findMany({
      where: {
        userId: session.userId,
        lastReviewedAt: { gte: sevenDaysAgo },
      },
      select: { easeFactor: true },
    });
    if (recentReviews.length > 0) {
      const correctApprox = recentReviews.filter((r) => r.easeFactor >= 2.3).length;
      weeklyAccuracy = Math.round((correctApprox / recentReviews.length) * 100);
    }
  }

  // SRS Retention: questions with intervalDays > 21 (long-term memory)
  const longTermCount = await prisma.userCardReview.count({
    where: {
      userId: session.userId,
      intervalDays: { gt: 21 },
    },
  });

  // O(1) Streak retrieval (zero N+1 query loops)
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { streakCount: true, lastActiveDate: true },
  });

  let streak = user?.streakCount || 0;
  const today = getTodayString();
  const yesterdayStr = getYesterdayString();

  // If user hasn't studied today or yesterday, streak has expired
  if (user?.lastActiveDate !== today && user?.lastActiveDate !== yesterdayStr) {
    streak = 0;
  }

  return NextResponse.json({
    weeklyData,
    weeklyTotal,
    weeklyAccuracy,
    longTermCount,
    streak,
  });
}
