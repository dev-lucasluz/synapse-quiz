"use client";

import { CalendarDays, CalendarRange, Globe, Building2, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface RankingFiltersProps {
  timeframe: "weekly" | "monthly";
  onTimeframeChange: (timeframe: "weekly" | "monthly") => void;
  scope: "all" | "my_college" | "my_period";
  onScopeChange: (scope: "all" | "my_college" | "my_period") => void;
  userCollege?: string | null;
  userPeriod?: string | null;
}

export function RankingFilters({
  timeframe,
  onTimeframeChange,
  scope,
  onScopeChange,
  userCollege,
  userPeriod,
}: RankingFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-white p-3 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
      {/* ── Timeframe Pills (Semanal / Mensal) ─────────────────────────────── */}
      <div className="inline-flex w-full sm:w-auto items-center rounded-xl bg-zinc-100 p-1 dark:bg-zinc-800/80">
        <button
          type="button"
          onClick={() => onTimeframeChange("weekly")}
          className={cn(
            "flex flex-1 sm:flex-none items-center justify-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all",
            timeframe === "weekly"
              ? "bg-white text-zinc-900 shadow-2xs dark:bg-zinc-700 dark:text-zinc-50"
              : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
          )}
        >
          <CalendarDays size={13} className="text-teal-600 dark:text-teal-400" />
          <span>Semanal</span>
        </button>

        <button
          type="button"
          onClick={() => onTimeframeChange("monthly")}
          className={cn(
            "flex flex-1 sm:flex-none items-center justify-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all",
            timeframe === "monthly"
              ? "bg-white text-zinc-900 shadow-2xs dark:bg-zinc-700 dark:text-zinc-50"
              : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
          )}
        >
          <CalendarRange size={13} className="text-teal-600 dark:text-teal-400" />
          <span>Mensal</span>
        </button>
      </div>

      {/* ── Scope Filter Buttons ───────────────────────────────────────────── */}
      <div className="flex w-full sm:w-auto items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
        {/* Geral */}
        <button
          type="button"
          onClick={() => onScopeChange("all")}
          className={cn(
            "flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap",
            scope === "all"
              ? "border-teal-500 bg-teal-50/80 text-teal-800 dark:border-teal-600 dark:bg-teal-950/60 dark:text-teal-300 font-semibold shadow-2xs"
              : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700"
          )}
        >
          <Globe size={13} />
          <span>Geral</span>
        </button>

        {/* Minha Faculdade */}
        <button
          type="button"
          onClick={() => onScopeChange("my_college")}
          className={cn(
            "flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap",
            scope === "my_college"
              ? "border-teal-500 bg-teal-50/80 text-teal-800 dark:border-teal-600 dark:bg-teal-950/60 dark:text-teal-300 font-semibold shadow-2xs"
              : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700"
          )}
          title={userCollege ? `Filtrar apenas ${userCollege}` : "Configure sua faculdade no Perfil"}
        >
          <Building2 size={13} />
          <span>{userCollege ? "Minha Faculdade" : "Minha Faculdade"}</span>
        </button>

        {/* Meu Período */}
        <button
          type="button"
          onClick={() => onScopeChange("my_period")}
          className={cn(
            "flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap",
            scope === "my_period"
              ? "border-teal-500 bg-teal-50/80 text-teal-800 dark:border-teal-600 dark:bg-teal-950/60 dark:text-teal-300 font-semibold shadow-2xs"
              : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700"
          )}
          title={userPeriod ? `Filtrar apenas ${userPeriod}` : "Configure seu período no Perfil"}
        >
          <GraduationCap size={13} />
          <span>{userPeriod ? "Meu Período" : "Meu Período"}</span>
        </button>
      </div>
    </div>
  );
}
