import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const dayOfWeek = d.getDay();
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

  // Accuracy: count correct vs total reviews in last 7 days
  // We approximate from UserCardReview updated in the last 7 days
  const recentReviews = await prisma.userCardReview.findMany({
    where: {
      userId: session.userId,
      lastReviewedAt: { gte: sevenDaysAgo },
    },
    select: { repetitionCount: true, easeFactor: true },
  });

  // A review is "correct" if easeFactor > 2.3 (not heavily penalized)
  // More accurately: easeFactor starts at 2.5, goes down on wrong answers
  // We approximate: if easeFactor >= 2.4 after recent reviews, likely correct
  const correctApprox = recentReviews.filter((r) => r.easeFactor >= 2.3).length;
  const weeklyAccuracy =
    recentReviews.length > 0 ? Math.round((correctApprox / recentReviews.length) * 100) : 0;

  // SRS Retention: questions with intervalDays > 21 (long-term memory)
  const longTermCount = await prisma.userCardReview.count({
    where: {
      userId: session.userId,
      intervalDays: { gt: 21 },
    },
  });

  // Streak: consecutive days with any study activity
  let streak = 0;
  const today = new Date().toISOString().split("T")[0];

  // Check backwards from today
  let checkDate = new Date();
  while (true) {
    const dateStr = checkDate.toISOString().split("T")[0];
    const hasActivity = await prisma.dailyUsage.findFirst({
      where: {
        userId: session.userId,
        date: dateStr,
        OR: [
          { mainCardsReviewed: { gt: 0 } },
          { notebookCardsReviewed: { gt: 0 } },
        ],
      },
    });

    if (!hasActivity) {
      // Allow today to be empty if streak started yesterday
      if (dateStr === today && streak === 0) {
        checkDate.setDate(checkDate.getDate() - 1);
        continue;
      }
      break;
    }
    streak++;
    checkDate.setDate(checkDate.getDate() - 1);
    if (streak > 365) break; // safety cap
  }

  return NextResponse.json({
    weeklyData,
    weeklyTotal,
    weeklyAccuracy,
    longTermCount,
    streak,
  });
}
