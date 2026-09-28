"use client";

import { useEffect, useState, useCallback } from "react";
import { Navbar } from "@/components/navbar";
import { RankingFilters } from "@/components/ranking/ranking-filters";
import { PodiumTop3, type LeaderboardItem } from "@/components/ranking/podium-top3";
import { LeaderboardList } from "@/components/ranking/leaderboard-list";
import { StickyUserRank } from "@/components/ranking/sticky-user-rank";
import { Trophy, Sparkles } from "lucide-react";

interface RankingResponse {
  leaderboard: LeaderboardItem[];
  currentUser: {
    rank: number;
    xp: number;
    correctCount: number;
    totalQuestions: number;
    accuracy: number;
    aheadUserXp?: number | null;
    diffToAhead?: number;
  } | null;
  timeframe: "weekly" | "monthly";
  scope: "all" | "my_college" | "my_period";
}

interface UserAuth {
  id: string;
  name: string;
  plan: string;
  avatarUrl?: string | null;
  college?: string | null;
  period?: string | null;
}

export default function RankingPage() {
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly">("weekly");
  const [scope, setScope] = useState<"all" | "my_college" | "my_period">("all");

  const [rankingData, setRankingData] = useState<RankingResponse | null>(null);
  const [userAuth, setUserAuth] = useState<UserAuth | null>(null);
  const [loading, setLoading] = useState(true);

  // Busca dados de autenticação do usuário
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json?.user) {
          setUserAuth(json.user);
        }
      })
      .catch(() => {});
  }, []);

  // Busca os dados do ranking dinamicamente
  const fetchRanking = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        timeframe,
        scope,
      });

      const res = await fetch(`/api/ranking?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        setRankingData(json);
      }
    } catch (err) {
      console.error("Erro ao carregar ranking:", err);
    } finally {
      setLoading(false);
    }
  }, [timeframe, scope]);

  useEffect(() => {
    fetchRanking();
  }, [fetchRanking]);

  const leaderboard = rankingData?.leaderboard || [];
  const top3 = leaderboard.slice(0, 3);
  const restOfList = leaderboard.slice(3);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 pb-40 md:pb-28 dark:bg-zinc-950 dark:text-zinc-50">
      <Navbar
        userName={userAuth?.name}
        plan={userAuth?.plan}
        avatarUrl={userAuth?.avatarUrl}
        college={userAuth?.college}
        period={userAuth?.period}
      />

      <main className="mx-auto max-w-4xl px-4 py-8 space-y-6">
        {/* ── Page Header ─────────────────────────────────────────────────── */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-400/20 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400">
                <Trophy size={18} />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Ranking de Estudantes
              </h1>
            </div>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              Disputa clínica saudável entre estudantes de medicina. Pontue acertando questões e mantendo sua sequência.
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-xl border border-amber-200/80 bg-amber-50/70 px-3 py-1.5 text-xs font-semibold text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300">
            <Sparkles size={13} />
            <span>+10 XP por acerto</span>
          </div>
        </header>

        {/* ── Filters (Timeframe + Scope) ─────────────────────────────────── */}
        <RankingFilters
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
          scope={scope}
          onScopeChange={setScope}
          userCollege={userAuth?.college}
          userPeriod={userAuth?.period}
        />

        {/* ── Content: Podium + Leaderboard ───────────────────────────────── */}
        {loading ? (
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="h-44 rounded-2xl bg-zinc-200/70 dark:bg-zinc-800/60 animate-pulse" />
              <div className="h-52 rounded-2xl bg-zinc-200/70 dark:bg-zinc-800/60 animate-pulse" />
              <div className="h-44 rounded-2xl bg-zinc-200/70 dark:bg-zinc-800/60 animate-pulse" />
            </div>
            <div className="h-64 rounded-2xl bg-zinc-200/70 dark:bg-zinc-800/60 animate-pulse" />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Pódio Top 3 */}
            {top3.length > 0 && <PodiumTop3 top3={top3} />}

            {/* Lista da 4ª colocação em diante (ou estado vazio se ninguém pontuou) */}
            {leaderboard.length === 0 ? (
              <LeaderboardList items={[]} currentUserId={userAuth?.id} />
            ) : restOfList.length > 0 ? (
              <div>
                <div className="mb-3 flex items-center justify-between px-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Demais Colocados
                  </h3>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500">
                    {leaderboard.length} participante{leaderboard.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <LeaderboardList
                  items={restOfList}
                  currentUserId={userAuth?.id}
                />
              </div>
            ) : (
              <div className="rounded-xl border border-zinc-200/80 bg-white/60 p-5 text-center dark:border-zinc-800/80 dark:bg-zinc-900/40">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Todos os estudantes pontuados nesta categoria estão no pódio acima. Continue respondendo questões para disputar a liderança!
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ── Sticky Bottom Bar: Posição do Usuário ─────────────────────────── */}
      <StickyUserRank
        currentUser={rankingData?.currentUser || null}
        userName={userAuth?.name}
        avatarUrl={userAuth?.avatarUrl}
      />
    </div>
  );
}
