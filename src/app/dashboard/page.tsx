"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { WeeklyChart } from "@/components/dashboard/weekly-chart";
import { CurricularGrid } from "@/components/dashboard/curricular-grid";
import { MiniLeaderboard } from "@/components/dashboard/mini-leaderboard";
import {
  Brain,
  BookOpen,
  Flame,
  Target,
  Activity,
  Layers,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
interface UserData {
  user: {
    id: string;
    name: string;
    email: string;
    referralCode: string;
    plan: string;
    avatarUrl?: string | null;
    college?: string | null;
    period?: string | null;
  };
  quota: {
    mainUsed: number;
    mainMax: number;
    notebookUsed: number;
    notebookMax: number;
    referralCount: number;
  };
}

interface WeeklyStats {
  weeklyData: { date: string; label: string; total: number; main: number; notebook: number }[];
  weeklyTotal: number;
  weeklyAccuracy: number;
  longTermCount: number;
  streak: number;
}

interface SubjectData {
  id: string;
  name: string;
  period: number;
  category: string;
  totalQuestions: number;
  reviewedQuestions: number;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800", className)} />
  );
}

function QuotaCard({
  icon: Icon,
  label,
  used,
  max,
  href,
  buttonLabel,
  accent = false,
}: {
  icon: React.ElementType;
  label: string;
  used: number;
  max: number;
  href: string;
  buttonLabel: string;
  accent?: boolean;
}) {
  const pct = max > 0 ? Math.min(Math.round((used / max) * 100), 100) : 0;
  const remaining = Math.max(max - used, 0);
  const full = used >= max;

  return (
    <div className="flex flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg",
            accent ? "bg-amber-50 dark:bg-amber-950/40" : "bg-zinc-100 dark:bg-zinc-800"
          )}>
            <Icon size={16} className={accent ? "text-orange-600 dark:text-amber-400" : "text-zinc-600 dark:text-zinc-300"} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {label}
            </p>
            <p className="mt-0.5 text-xl font-bold tabular-nums text-zinc-900 dark:text-zinc-50">
              {used}
              <span className="ml-1 text-sm font-normal text-zinc-500 dark:text-zinc-400">
                / {max}
              </span>
            </p>
          </div>
        </div>
        <span className={cn(
          "rounded-full px-2.5 py-0.5 text-xs font-semibold tabular-nums",
          full
            ? "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
            : accent
            ? "bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-900"
            : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
        )}>
          {pct}%
        </span>
      </div>

      {/* Progress */}
      <div className="mb-1.5 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700",
            full ? "bg-zinc-300 dark:bg-zinc-600" : accent ? "bg-gradient-to-r from-amber-500 to-orange-500" : "bg-zinc-700 dark:bg-zinc-400"
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mb-5 text-xs text-zinc-500 dark:text-zinc-400">
        {full ? "Cota esgotada para hoje" : `${remaining} restantes hoje`}
      </p>

      {/* CTA */}
      <Link
        href={href}
        className={cn(
          "mt-auto flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-semibold tracking-wide shadow-xs transition-colors",
          accent
            ? "bg-gradient-to-r from-[#f59e0b] via-[#ea580c] to-[#c2410c] text-white hover:from-[#d97706] hover:via-[#c2410c] hover:to-[#9a3412] shadow-sm shadow-orange-950/20"
            : "border border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
        )}
      >
        {buttonLabel}
        <ArrowRight size={13} />
      </Link>
    </div>
  );
}

function StatPill({
  icon: Icon,
  value,
  label,
  sub,
}: {
  icon: React.ElementType;
  value: string | number;
  label: string;
  sub?: string;
}) {
  return (
    <div className="flex items-center gap-3.5 rounded-xl border border-zinc-200 bg-white p-4 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
        <Icon size={18} className="text-zinc-700 dark:text-zinc-300" />
      </div>
      <div>
        <p className="text-lg font-bold tabular-nums text-zinc-900 dark:text-zinc-50">
          {value}
        </p>
        <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{label}</p>
        {sub && <p className="text-[11px] text-zinc-400 dark:text-zinc-500">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStats | null>(null);
  const [subjects, setSubjects] = useState<SubjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setStatsLoading(true);

    try {
      const meRes = await fetch("/api/auth/me");
      if (meRes.status === 401) { router.push("/login"); return; }
      const meData = await meRes.json();
      setUserData(meData);
    } finally {
      setLoading(false);
    }

    try {
      const [statsRes, subjectsRes] = await Promise.all([
        fetch("/api/stats/weekly"),
        fetch("/api/subjects"),
      ]);
      if (statsRes.ok) setWeeklyStats(await statsRes.json());
      if (subjectsRes.ok) {
        const sd = await subjectsRes.json();
        setSubjects(sd.subjects ?? []);
      }
    } finally {
      setStatsLoading(false);
    }
  }, [router]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <Navbar />
        <main className="mx-auto max-w-5xl px-4 py-10">
          <Skeleton className="mb-2 h-7 w-44" />
          <Skeleton className="mb-10 h-4 w-80" />
          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <Skeleton className="h-44" />
            <Skeleton className="h-44" />
          </div>
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-20" />)}
          </div>
          <Skeleton className="h-52 mb-6" />
          <Skeleton className="h-64" />
        </main>
      </div>
    );
  }

  if (!userData) return null;

  const { user, quota } = userData;

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <Navbar
        userName={user.name}
        plan={user.plan}
        avatarUrl={user.avatarUrl}
        college={user.college}
        period={user.period}
      />

      <main className="mx-auto max-w-5xl px-4 py-10">

        {/* ── Cabeçalho Clínico ────────────────────────────────────────────── */}
        <header className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-2xl">
              Painel de Estudos
            </h1>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm">
              Acompanhamento diário de repetição espaçada e retenção clínica
              <span className="mx-1.5 text-zinc-300 dark:text-zinc-700">•</span>
              1º ao 6º Período
            </p>
          </div>
          <button
            onClick={fetchAll}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            title="Atualizar dados"
          >
            <RefreshCw size={13} />
          </button>
        </header>

        {/* ── Cards de Ação Rápida ─────────────────────────────────────────── */}
        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <QuotaCard
            icon={Brain}
            label="Quiz Diário · 5 min"
            used={quota.mainUsed}
            max={quota.mainMax}
            href="/quiz"
            buttonLabel="Iniciar Sessão Diária"
            accent
          />
          <QuotaCard
            icon={BookOpen}
            label="Caderno de Erros"
            used={quota.notebookUsed}
            max={quota.notebookMax}
            href="/notebook"
            buttonLabel="Revisar Caderno"
          />
          <div className="flex flex-col rounded-xl border border-amber-200 bg-white p-5 shadow-xs dark:border-amber-900/60 dark:bg-zinc-900">
            {/* Header */}
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-orange-600 dark:bg-amber-950/60 dark:text-amber-400">
                  <Target size={16} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-amber-400">
                    Simulado Cronometrado
                  </p>
                  <p className="mt-0.5 text-xl font-bold text-zinc-900 dark:text-zinc-50">
                    Ambiente de Prova
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">
                PRO
              </span>
            </div>

            {/* Accent bar */}
            <div className="mb-1.5 h-1.5 w-full overflow-hidden rounded-full bg-amber-100 dark:bg-amber-950/60">
              <div className="h-full w-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />
            </div>
            <p className="mb-5 text-xs text-zinc-500 dark:text-zinc-300">
              10 a 30 questões com timer estilo ENARE e residência.
            </p>

            {/* CTA */}
            <Link
              href="/simulation"
              className="mt-auto flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#f59e0b] via-[#ea580c] to-[#c2410c] hover:from-[#d97706] hover:via-[#c2410c] hover:to-[#9a3412] py-2.5 text-xs font-semibold tracking-wide text-white shadow-sm shadow-orange-950/20 transition-all"
            >
              <span>{user.plan === "pro" ? "Iniciar Simulado" : "Abrir Simulado"}</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </section>

        {/* ── Métricas Semanais ────────────────────────────────────────────── */}
        <section className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Desempenho — Últimos 7 dias
            </h2>
          </div>

          <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {statsLoading ? (
              [1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-20" />)
            ) : (
              <>
                <StatPill
                  icon={Target}
                  value={weeklyStats?.weeklyTotal ?? 0}
                  label="Questões na semana"
                  sub="total respondidas"
                />
                <StatPill
                  icon={Activity}
                  value={weeklyStats?.weeklyAccuracy != null ? `${weeklyStats.weeklyAccuracy}%` : "—"}
                  label="Taxa de precisão"
                  sub="acertos / total"
                />
                <StatPill
                  icon={Flame}
                  value={weeklyStats?.streak ?? 0}
                  label={`dia${(weeklyStats?.streak ?? 0) !== 1 ? "s" : ""} consecutivo${(weeklyStats?.streak ?? 0) !== 1 ? "s" : ""}`}
                  sub="sequência ativa"
                />
                <StatPill
                  icon={Layers}
                  value={weeklyStats?.longTermCount ?? 0}
                  label="na memória longa"
                  sub="intervalo > 21 dias"
                />
              </>
            )}
          </div>

          {/* Gráfico Semanal + Mini Ranking de Estudantes */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 items-stretch">
            <div className="lg:col-span-2">
              {statsLoading ? (
                <Skeleton className="h-56 rounded-xl" />
              ) : weeklyStats ? (
                <WeeklyChart data={weeklyStats.weeklyData} className="h-full" />
              ) : null}
            </div>
            <div className="lg:col-span-1">
              <MiniLeaderboard currentUserId={user.id} className="h-full" />
            </div>
          </div>
        </section>

        {/* ── Grade Curricular ─────────────────────────────────────────────── */}
        <section>
          <div className="mb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Grade Curricular & Áreas de Estudo
            </h2>
          </div>
          {statsLoading ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => <Skeleton key={i} className="h-28" />)}
            </div>
          ) : (
            <CurricularGrid subjects={subjects} />
          )}
        </section>

      </main>
    </div>
  );
}
