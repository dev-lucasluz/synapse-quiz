"use client";

import { useEffect, useState } from "react";
import { AvatarRenderer } from "@/components/profile/avatar-renderer";
import { Trophy, ArrowRight, Zap, Medal } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LeaderboardItem {
  rank: number;
  userId: string;
  name: string;
  avatarUrl?: string | null;
  college?: string | null;
  period?: string | null;
  plan: string;
  xp: number;
}

interface CurrentUserRank {
  rank: number;
  xp: number;
}

export function MiniLeaderboard({
  currentUserId,
  className,
}: {
  currentUserId?: string;
  className?: string;
}) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
  const [currentUser, setCurrentUser] = useState<CurrentUserRank | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/ranking?timeframe=weekly&scope=all")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setLeaderboard(data.leaderboard || []);
          setCurrentUser(data.currentUser || null);
        }
      })
      .catch((err) => console.error("Erro ao carregar mini-ranking:", err))
      .finally(() => setLoading(false));
  }, []);

  const top3 = leaderboard.slice(0, 3);

  return (
    <div className={cn("rounded-xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 flex flex-col justify-between", className)}>
      <div>
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400/20 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400">
              <Trophy size={14} />
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                Top Estudantes da Semana
              </p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                Líderes em acertos e constância
              </p>
            </div>
          </div>

          <Link
            href="/ranking"
            className="flex items-center gap-1 text-[11px] font-semibold text-orange-600 hover:text-orange-700 dark:text-amber-400 dark:hover:text-amber-300 transition-colors"
          >
            <span>Ver ranking</span>
            <ArrowRight size={11} />
          </Link>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="space-y-2 py-1">
            <div className="h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
            <div className="h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
            <div className="h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
          </div>
        ) : top3.length > 0 ? (
          <div className="space-y-2">
            {top3.map((student) => {
              const isUser = student.userId === currentUserId;
              return (
                <div
                  key={student.userId}
                  className={cn(
                    "flex items-center justify-between rounded-lg p-2 transition-colors",
                    isUser
                      ? "bg-amber-50/80 dark:bg-amber-950/40 ring-1 ring-amber-500/20"
                      : "bg-zinc-50/70 hover:bg-zinc-100/70 dark:bg-zinc-800/40 dark:hover:bg-zinc-800/70"
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold",
                        student.rank === 1 && "bg-amber-400 text-amber-950",
                        student.rank === 2 && "bg-slate-200 text-slate-700 dark:bg-zinc-700 dark:text-zinc-200",
                        student.rank === 3 && "bg-amber-700/20 text-amber-800 dark:text-orange-300"
                      )}
                    >
                      {student.rank}
                    </span>

                    <AvatarRenderer
                      avatarUrl={student.avatarUrl}
                      name={student.name}
                      size="xs"
                    />

                    <div className="min-w-0 truncate">
                      <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate max-w-[120px]">
                        {student.name} {isUser && "(Você)"}
                      </p>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate max-w-[120px]">
                        {student.college ? student.college.split(" ")[0] : "Medicina"}
                        {student.period ? ` • ${student.period.replace(" Período", "º")}` : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 rounded-md bg-white px-2 py-0.5 text-[11px] font-bold text-zinc-800 shadow-2xs dark:bg-zinc-700 dark:text-zinc-100 shrink-0">
                    <Zap size={10} className="text-amber-500 dark:text-amber-400 fill-amber-500/30" />
                    <span>{student.xp} XP</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-zinc-200 p-4 text-center dark:border-zinc-800">
            <Medal className="mx-auto h-6 w-6 text-zinc-400" />
            <p className="mt-1 text-xs text-zinc-500">
              Seja o primeiro a responder questões nesta semana!
            </p>
          </div>
        )}
      </div>

      {/* Rodapé: Posição do usuário logado se estiver abaixo do top 3 */}
      {currentUser && (
        <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
          <span className="text-zinc-500 dark:text-zinc-400 text-[11px]">
            Sua colocação semanal:
          </span>
          <span className="font-bold text-orange-600 dark:text-amber-400">
            #{currentUser.rank} • {currentUser.xp} XP
          </span>
        </div>
      )}
    </div>
  );
}
