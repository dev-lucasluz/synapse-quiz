"use client";

import { AvatarRenderer } from "@/components/profile/avatar-renderer";
import { ArrowUpRight, Zap, TrendingUp } from "lucide-react";
import Link from "next/link";

interface CurrentUserRank {
  rank: number;
  xp: number;
  correctCount: number;
  totalQuestions: number;
  accuracy: number;
  aheadUserXp?: number | null;
  diffToAhead?: number;
}

interface StickyUserRankProps {
  currentUser: CurrentUserRank | null;
  userName?: string | null;
  avatarUrl?: string | null;
}

export function StickyUserRank({ currentUser, userName, avatarUrl }: StickyUserRankProps) {
  if (!currentUser) return null;

  return (
    <aside
      aria-label="Sua posição no ranking"
      className="fixed bottom-20 md:bottom-6 inset-x-3 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 w-auto md:w-[500px] z-30 animate-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-teal-500/40 bg-white/95 p-3 sm:px-4 shadow-xl shadow-teal-950/10 backdrop-blur-md dark:border-teal-500/30 dark:bg-zinc-900/95">
        {/* Esquerda: Avatar + Posição */}
        <div className="flex items-center gap-2.5 min-w-0">
          <AvatarRenderer
            avatarUrl={avatarUrl}
            name={userName}
            size="sm"
            className="ring-2 ring-teal-500/40"
          />

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-50">
                Sua Posição: <span className="text-teal-700 dark:text-teal-400">#{currentUser.rank}</span>
              </span>
              <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300">
                • {currentUser.xp} XP
              </span>
            </div>

            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate flex items-center gap-1">
              <TrendingUp size={11} className="text-teal-600 dark:text-teal-400" />
              {currentUser.diffToAhead && currentUser.diffToAhead > 0
                ? `Faltam ${currentUser.diffToAhead} XP para subir de colocação`
                : "Você está na liderança da categoria!"}
            </p>
          </div>
        </div>

        {/* Direita: Botão de ação rápida para responder questões */}
        <Link
          href="/quiz"
          className="flex items-center gap-1.5 shrink-0 rounded-xl bg-teal-700 px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition-transform hover:scale-105 active:scale-95 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500"
        >
          <Zap size={12} className="fill-white" />
          <span>Pontuar</span>
          <ArrowUpRight size={12} />
        </Link>
      </div>
    </aside>
  );
}
