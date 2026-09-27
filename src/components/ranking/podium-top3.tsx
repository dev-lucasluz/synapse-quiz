"use client";

import { AvatarRenderer } from "@/components/profile/avatar-renderer";
import { Crown, Medal, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LeaderboardItem {
  rank: number;
  userId: string;
  name: string;
  avatarUrl?: string | null;
  college?: string | null;
  period?: string | null;
  plan: string;
  xp: number;
  correctCount: number;
  totalQuestions: number;
  accuracy: number;
}

interface PodiumTop3Props {
  top3: LeaderboardItem[];
}

export function PodiumTop3({ top3 }: PodiumTop3Props) {
  if (top3.length === 0) return null;

  const first = top3.find((u) => u.rank === 1);
  const second = top3.find((u) => u.rank === 2);
  const third = top3.find((u) => u.rank === 3);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 items-end pt-4 pb-2">
      {/* ── 2º Lugar (Prata - Esquerda) ─────────────────────────────────── */}
      {second ? (
        <div className="order-2 sm:order-1 flex flex-col items-center rounded-2xl border border-slate-300/80 bg-slate-50/70 p-4.5 text-center shadow-xs dark:border-zinc-700/80 dark:bg-zinc-800/40 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-slate-200 px-2.5 py-0.5 text-[10px] font-bold text-slate-700 shadow-2xs dark:bg-zinc-700 dark:text-zinc-200">
            <Medal size={11} className="text-slate-400" />
            <span>2º Lugar</span>
          </div>

          <div className="mt-2 relative">
            <AvatarRenderer
              avatarUrl={second.avatarUrl}
              name={second.name}
              size="lg"
              className="ring-3 ring-slate-300 dark:ring-zinc-600 shadow-sm"
            />
          </div>

          <h4 className="mt-2.5 font-bold text-xs text-zinc-900 dark:text-zinc-100 truncate max-w-[140px]">
            {second.name}
          </h4>

          <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate max-w-[140px] mt-0.5">
            {second.college ? second.college.split(" ")[0] : "Medicina"}
            {second.period ? ` • ${second.period.replace(" Período", "º")}` : ""}
          </p>

          <div className="mt-2.5 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-zinc-800 shadow-2xs dark:bg-zinc-700 dark:text-zinc-100">
            <Zap size={11} className="text-teal-600 dark:text-teal-400" />
            <span>{second.xp} XP</span>
          </div>
        </div>
      ) : (
        <div className="order-2 sm:order-1 hidden sm:block h-36 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800" />
      )}

      {/* ── 1º Lugar (Ouro - Centro, Maior) ──────────────────────────────── */}
      {first ? (
        <div className="order-1 sm:order-2 flex flex-col items-center rounded-2xl border-2 border-amber-400/90 bg-amber-50/70 p-5 text-center shadow-md dark:border-amber-500/80 dark:bg-amber-950/20 relative sm:-translate-y-2">
          {/* Coroa de Campeão */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-amber-400 px-3 py-0.5 text-[11px] font-bold text-amber-950 shadow-xs dark:bg-amber-500 dark:text-zinc-950">
            <Crown size={12} className="fill-amber-950 dark:fill-zinc-950" />
            <span>1º Lugar</span>
          </div>

          <div className="mt-2 relative">
            <AvatarRenderer
              avatarUrl={first.avatarUrl}
              name={first.name}
              size="xl"
              className="ring-4 ring-amber-400/70 dark:ring-amber-500/70 shadow-md"
            />
          </div>

          <h4 className="mt-3 font-bold text-sm text-zinc-900 dark:text-zinc-50 truncate max-w-[170px]">
            {first.name}
          </h4>

          <p className="text-[11px] text-amber-900/80 dark:text-amber-200/80 font-medium truncate max-w-[170px] mt-0.5">
            {first.college || "Estudante de Medicina"}
            {first.period ? ` • ${first.period}` : ""}
          </p>

          <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-amber-500 px-3.5 py-1 text-xs font-extrabold text-amber-950 shadow-xs dark:bg-amber-400">
            <Zap size={13} className="fill-amber-950" />
            <span>{first.xp} XP</span>
          </div>
        </div>
      ) : null}

      {/* ── 3º Lugar (Bronze - Direita) ─────────────────────────────────── */}
      {third ? (
        <div className="order-3 flex flex-col items-center rounded-2xl border border-amber-700/30 bg-orange-50/50 p-4.5 text-center shadow-xs dark:border-orange-900/40 dark:bg-orange-950/20 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-amber-800/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-900 shadow-2xs dark:bg-orange-950 dark:text-orange-200">
            <Medal size={11} className="text-amber-700" />
            <span>3º Lugar</span>
          </div>

          <div className="mt-2 relative">
            <AvatarRenderer
              avatarUrl={third.avatarUrl}
              name={third.name}
              size="lg"
              className="ring-3 ring-amber-600/40 dark:ring-orange-800/60 shadow-sm"
            />
          </div>

          <h4 className="mt-2.5 font-bold text-xs text-zinc-900 dark:text-zinc-100 truncate max-w-[140px]">
            {third.name}
          </h4>

          <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate max-w-[140px] mt-0.5">
            {third.college ? third.college.split(" ")[0] : "Medicina"}
            {third.period ? ` • ${third.period.replace(" Período", "º")}` : ""}
          </p>

          <div className="mt-2.5 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-zinc-800 shadow-2xs dark:bg-zinc-700 dark:text-zinc-100">
            <Zap size={11} className="text-teal-600 dark:text-teal-400" />
            <span>{third.xp} XP</span>
          </div>
        </div>
      ) : (
        <div className="order-3 hidden sm:block h-36 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800" />
      )}
    </div>
  );
}
