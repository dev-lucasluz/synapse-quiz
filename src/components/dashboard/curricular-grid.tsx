"use client";

import { useState } from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface Subject {
  id: string;
  name: string;
  period: number;
  category: string;
  totalQuestions: number;
  reviewedQuestions: number;
}

interface CurricularGridProps {
  subjects: Subject[];
}

type CycleFilter = "all" | "basic" | "defense" | "clinical";

const CYCLE_FILTERS: { id: CycleFilter; label: string; periods: number[] }[] = [
  { id: "all", label: "Todos os períodos", periods: [1, 2, 3, 4, 5, 6] },
  { id: "basic", label: "Ciclo Básico (1º–2º)", periods: [1, 2] },
  { id: "defense", label: "Agressão & Defesa (3º–4º)", periods: [3, 4] },
  { id: "clinical", label: "Ciclo Clínico (5º–6º)", periods: [5, 6] },
];

const PERIOD_COLORS: Record<number, { dot: string; text: string }> = {
  1: { dot: "bg-violet-500", text: "text-violet-700 dark:text-violet-400" },
  2: { dot: "bg-blue-500",   text: "text-blue-700 dark:text-blue-400" },
  3: { dot: "bg-amber-500",  text: "text-amber-700 dark:text-amber-400" },
  4: { dot: "bg-rose-500",   text: "text-rose-700 dark:text-rose-400" },
  5: { dot: "bg-orange-500", text: "text-orange-700 dark:text-orange-400" },
  6: { dot: "bg-emerald-600", text: "text-emerald-700 dark:text-emerald-400" },
};

function SubjectCard({ subject }: { subject: Subject }) {
  const pct = subject.totalQuestions > 0
    ? Math.round((subject.reviewedQuestions / subject.totalQuestions) * 100)
    : 0;
  const colors = PERIOD_COLORS[subject.period] ?? { dot: "bg-zinc-400", text: "text-zinc-600" };

  return (
    <div className="group flex flex-col rounded-xl border border-zinc-200 bg-white p-4.5 shadow-xs transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
      {/* Period badge */}
      <div className="mb-2.5 flex items-center gap-2">
        <span className={cn("h-2 w-2 rounded-full shrink-0", colors.dot)} />
        <span className={cn("text-[11px] font-semibold uppercase tracking-wider", colors.text)}>
          {subject.period}º Período
        </span>
      </div>

      {/* Name */}
      <h3 className="mb-1.5 text-sm font-bold leading-snug text-zinc-900 dark:text-zinc-50">
        {subject.name}
      </h3>

      {/* Stats */}
      <div className="mb-3 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
        <BookOpen size={12} className="text-zinc-400" />
        <span>
          {subject.totalQuestions} questão{subject.totalQuestions !== 1 ? "s" : ""}
        </span>
        {subject.reviewedQuestions > 0 && (
          <>
            <span className="text-zinc-300 dark:text-zinc-600">•</span>
            <span>{subject.reviewedQuestions} revisadas</span>
          </>
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-3.5 h-1 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Button */}
      <button
        onClick={() => {
          window.location.href = `/quiz?subjectId=${encodeURIComponent(subject.id)}`;
        }}
        className="mt-auto flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50/70 px-3 py-2 text-xs font-semibold text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        <span>Praticar Disciplina</span>
        <ArrowRight size={12} className="text-zinc-400 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}

export function CurricularGrid({ subjects }: CurricularGridProps) {
  const [activeFilter, setActiveFilter] = useState<CycleFilter>("all");

  const activeConfig = CYCLE_FILTERS.find((f) => f.id === activeFilter)!;
  const filtered = subjects.filter((s) => activeConfig.periods.includes(s.period));

  return (
    <div>
      {/* Filter tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {CYCLE_FILTERS.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors",
              activeFilter === filter.id
                ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-200"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center rounded-xl border border-dashed border-zinc-200 bg-white py-12 text-center shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <BookOpen size={22} className="mb-2 text-zinc-400 dark:text-zinc-500" />
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Nenhuma matéria encontrada neste ciclo</p>
        </div>
      ) : (
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      )}
    </div>
  );
}
