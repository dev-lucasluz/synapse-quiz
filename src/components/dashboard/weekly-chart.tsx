"use client";

interface DayData {
  date: string;
  label: string;
  total: number;
  main: number;
  notebook: number;
}

import { cn } from "@/lib/utils";

interface WeeklyChartProps {
  data: DayData[];
  className?: string;
}

export function WeeklyChart({ data, className }: WeeklyChartProps) {
  const maxTotal = Math.max(...data.map((d) => d.total), 1);
  const today = new Date().toISOString().split("T")[0];
  const weekTotal = data.reduce((s, d) => s + d.total, 0);

  return (
    <div className={cn("rounded-xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900", className)}>
      {/* Chart Header */}
      <div className="mb-5 flex items-baseline justify-between">
        <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          Volume de Estudos Diário
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {weekTotal === 0 ? "Nenhuma questão respondida nesta semana" : `${weekTotal} questões na semana`}
        </p>
      </div>

      {/* Bar Chart */}
      <div className="flex items-end justify-between gap-2" style={{ height: 120 }}>
        {data.map((day) => {
          const isToday = day.date === today;
          const heightPct = maxTotal > 0 ? (day.total / maxTotal) * 100 : 0;
          const hasData = day.total > 0;

          return (
            <div key={day.date} className="group relative flex flex-1 flex-col items-center gap-1.5">
              {/* Tooltip on Hover */}
              {hasData && (
                <div className="pointer-events-none absolute bottom-full mb-2 hidden -translate-x-1/2 left-1/2 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 shadow-md dark:border-zinc-700 dark:bg-zinc-800 group-hover:block z-20 whitespace-nowrap">
                  <p className="text-[11px] font-bold text-zinc-900 dark:text-zinc-50">
                    {day.total} questão{day.total !== 1 ? "s" : ""}
                  </p>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                    {day.main > 0 && `${day.main} diário`}
                    {day.main > 0 && day.notebook > 0 && " • "}
                    {day.notebook > 0 && `${day.notebook} caderno`}
                  </p>
                </div>
              )}

              {/* Bar */}
              <div
                className="w-full rounded-t-md transition-all duration-500"
                style={{
                  height: `${Math.max(heightPct, hasData ? 6 : 0)}%`,
                  backgroundColor: isToday
                    ? "#ea580c" // sunset orange
                    : hasData
                    ? "#fb923c" // sunset amber/orange
                    : "transparent",
                  borderWidth: isToday ? 0 : hasData ? 0 : 1,
                  borderStyle: "dashed",
                  borderColor: "#d4d4d8", // zinc-300
                  minHeight: hasData ? 6 : 0,
                }}
              />

              {/* Day Label */}
              <span className={`text-[11px] font-medium tabular-nums ${
                isToday
                  ? "text-orange-600 dark:text-amber-400 font-bold"
                  : "text-zinc-600 dark:text-zinc-400"
              }`}>
                {day.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-5 border-t border-zinc-100 pt-3 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-3.5 rounded-xs" style={{ backgroundColor: "#ea580c" }} />
          <span className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium">Hoje</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-3.5 rounded-xs" style={{ backgroundColor: "#fb923c" }} />
          <span className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium">Dias anteriores</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-3.5 rounded-xs border border-dashed border-zinc-300 dark:border-zinc-700" />
          <span className="text-[11px] text-zinc-500 dark:text-zinc-400">Sem atividade</span>
        </div>
      </div>
    </div>
  );
}
