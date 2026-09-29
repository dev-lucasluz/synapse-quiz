import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getAdminEmails } from "@/lib/admin";
import { getRankingEpoch, streakDaysSinceEpoch } from "@/lib/ranking";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    const { searchParams } = new URL(req.url);

    const timeframe = searchParams.get("timeframe") === "monthly" ? "monthly" : "weekly";
    const scope = searchParams.get("scope") || "all";
    const collegeParam = searchParams.get("college");
    const periodParam = searchParams.get("period");

    // ─── 1. Cálculo da Data Inicial ──────────────────────────────────────────
    const now = new Date();
    let startDate: Date;

    if (timeframe === "monthly") {
      // Início do mês atual (dia 1 às 00:00:00)
      startDate = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    } else {
      // Início da semana atual (segunda-feira às 00:00:00)
      const dayOfWeek = now.getDay();
      const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      startDate = new Date(now);
      startDate.setDate(now.getDate() - diffToMonday);
      startDate.setHours(0, 0, 0, 0);
    }

    // Reinício do ranking: nada anterior à data de corte conta (veja lib/ranking.ts).
    const rankingEpoch = getRankingEpoch();
    if (startDate < rankingEpoch) startDate = rankingEpoch;

    // ─── 2. Informações do usuário logado para filtros de escopo ─────────────
    let currentUserProfile: { college: string | null; period: string | null } | null = null;
    if (session?.userId) {
      currentUserProfile = await prisma.user.findUnique({
        where: { id: session.userId },
        select: { college: true, period: true },
      });
    }

    // ─── 3. Construção do Filtro de Usuários ─────────────────────────────────
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userFilter: any = {};

    if (scope === "my_college" && currentUserProfile?.college) {
      userFilter.college = currentUserProfile.college;
    } else if (collegeParam) {
      userFilter.college = collegeParam;
    }

    if (scope === "my_period" && currentUserProfile?.period) {
      userFilter.period = currentUserProfile.period;
    } else if (periodParam) {
      userFilter.period = periodParam;
    }

    // Contas de administração (ADMIN_EMAILS) não entram no ranking.
    const adminEmails = getAdminEmails();
    if (adminEmails.length > 0) userFilter.email = { notIn: adminEmails };

    const users = await prisma.user.findMany({
      where: userFilter,
      select: {
        id: true,
        name: true,
        avatarUrl: true,
        college: true,
        period: true,
        plan: true,
        streakCount: true,
      },
    });

    if (users.length === 0) {
      return NextResponse.json({
        leaderboard: [],
        currentUser: null,
        timeframe,
        scope,
      });
    }

    const userIds = users.map((u) => u.id);

    // ─── 4. Busca das respostas no período ───────────────────────────────────
    const answerLogs = await prisma.answerLog.findMany({
      where: {
        createdAt: { gte: startDate },
        userId: { in: userIds },
      },
      select: {
        userId: true,
        isCorrect: true,
      },
    });

    // ─── 5. Agregação e Cálculo de XP ───────────────────────────────────────
    // Fórmula: (Acertos * 10) + (Erros * 2) + Math.min(Streak * 5, 35)
    const scoreMap = new Map<
      string,
      {
        user: (typeof users)[0];
        correctCount: number;
        totalCount: number;
        streakBonus: number;
      }
    >();

    for (const u of users) {
      scoreMap.set(u.id, {
        user: u,
        correctCount: 0,
        totalCount: 0,
        streakBonus: Math.min(streakDaysSinceEpoch(u.streakCount || 0, now) * 5, 35),
      });
    }

    for (const log of answerLogs) {
      const entry = scoreMap.get(log.userId);
      if (entry) {
        entry.totalCount += 1;
        if (log.isCorrect) entry.correctCount += 1;
      }
    }

    // Mapeia para lista ranqueável
    const rankedList = Array.from(scoreMap.values()).map((entry) => {
      const wrongCount = entry.totalCount - entry.correctCount;
      const xp = entry.correctCount * 10 + wrongCount * 2 + entry.streakBonus;
      const accuracy =
        entry.totalCount > 0
          ? Math.round((entry.correctCount / entry.totalCount) * 100)
          : 0;

      return {
        userId: entry.user.id,
        name: entry.user.name,
        avatarUrl: entry.user.avatarUrl,
        college: entry.user.college,
        period: entry.user.period,
        plan: entry.user.plan,
        xp,
        correctCount: entry.correctCount,
        totalQuestions: entry.totalCount,
        accuracy,
      };
    });

    // ─── 6. Ordenação ────────────────────────────────────────────────────────
    rankedList.sort((a, b) => {
      if (b.xp !== a.xp) return b.xp - a.xp;
      if (b.correctCount !== a.correctCount) return b.correctCount - a.correctCount;
      return b.accuracy - a.accuracy;
    });

    // Atribui posições (ranks)
    const leaderboard = rankedList.map((item, index) => ({
      ...item,
      rank: index + 1,
    }));

    // ─── 7. Localização do Usuário Logado ───────────────────────────────────
    let currentUserRank = null;
    if (session?.userId) {
      const userIndex = leaderboard.findIndex((item) => item.userId === session.userId);
      if (userIndex !== -1) {
        const userItem = leaderboard[userIndex];
        const aheadItem = userIndex > 0 ? leaderboard[userIndex - 1] : null;

        currentUserRank = {
          rank: userItem.rank,
          xp: userItem.xp,
          correctCount: userItem.correctCount,
          totalQuestions: userItem.totalQuestions,
          accuracy: userItem.accuracy,
          aheadUserXp: aheadItem ? aheadItem.xp : null,
          diffToAhead: aheadItem ? Math.max(0, aheadItem.xp - userItem.xp + 10) : 0,
        };
      }
    }

    return NextResponse.json({
      leaderboard,
      currentUser: currentUserRank,
      timeframe,
      scope,
    });
  } catch (error) {
    console.error("Erro ao gerar ranking:", error);
    return NextResponse.json(
      { error: "Erro interno ao calcular ranking." },
      { status: 500 }
    );
  }
}
