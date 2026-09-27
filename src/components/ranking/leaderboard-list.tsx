"use client";

import { AvatarRenderer } from "@/components/profile/avatar-renderer";
import { type LeaderboardItem } from "@/components/ranking/podium-top3";
import { Zap, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaderboardListProps {
  items: LeaderboardItem[];
  currentUserId?: string | null;
}

export function LeaderboardList({ items, currentUserId }: LeaderboardListProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-200 p-8 text-center dark:border-zinc-800">
        <Award className="mx-auto h-8 w-8 text-zinc-400" />
        <p className="mt-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          Nenhum estudante nesta categoria ainda
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Resolva questões hoje e seja o primeiro colocado no ranking!
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white shadow-xs overflow-hidden dark:border-zinc-800 dark:bg-zinc-900">
      <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
        {items.map((item) => {
          const isCurrentUser = item.userId === currentUserId;

          return (
            <div
              key={item.userId}
              className={cn(
                "flex items-center justify-between gap-3 p-3.5 sm:px-5 transition-colors",
                isCurrentUser
                  ? "bg-teal-50/70 dark:bg-teal-950/40 ring-1 ring-inset ring-teal-500/20"
                  : "hover:bg-zinc-50/80 dark:hover:bg-zinc-800/50"
              )}
            >
              {/* Lado Esquerdo: Posição + Avatar + Informações */}
              <div className="flex items-center gap-3 min-w-0">
                {/* Posição */}
                <div
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold",
                    item.rank === 1 && "bg-amber-400 text-amber-950",
                    item.rank === 2 && "bg-slate-200 text-slate-700 dark:bg-zinc-700 dark:text-zinc-200",
                    item.rank === 3 && "bg-amber-700/20 text-amber-800 dark:text-orange-300",
                    item.rank > 3 && "text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800"
                  )}
                >
                  #{item.rank}
                </div>

                {/* Avatar */}
                <AvatarRenderer
                  avatarUrl={item.avatarUrl}
                  name={item.name}
                  size="sm"
                />

                {/* Nome, Faculdade e Período */}
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-semibold text-xs text-zinc-900 dark:text-zinc-50 truncate max-w-[120px] sm:max-w-[200px]">
                      {item.name}
                    </span>
                    {isCurrentUser && (
                      <span className="rounded-full bg-teal-100 px-1.5 py-0.2 text-[9px] font-bold text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                        Você
                      </span>
                    )}
                    {item.plan === "pro" && (
                      <span className="rounded-full bg-teal-100/60 px-1.5 py-0.2 text-[9px] font-bold text-teal-700 dark:bg-teal-950/80 dark:text-teal-400">
                        PRO
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate max-w-[180px] sm:max-w-xs mt-0.5">
                    {item.college || "Medicina"}
                    {item.period ? ` • ${item.period}` : ""}
                  </p>
                </div>
              </div>

              {/* Lado Direito: Acurácia + XP */}
              <div className="flex items-center gap-3 shrink-0">
                {item.totalQuestions > 0 && (
                  <span className="hidden sm:inline-block text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                    {item.accuracy}% acerto
                  </span>
                )}

                <div className="flex items-center gap-1 rounded-xl bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-800 dark:bg-teal-950/80 dark:text-teal-300">
                  <Zap size={12} className="text-teal-600 dark:text-teal-400" />
                  <span>{item.xp} XP</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
