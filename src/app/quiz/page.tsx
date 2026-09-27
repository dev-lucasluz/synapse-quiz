"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { QuizCard } from "@/components/quiz-card";
import { ReferralModal } from "@/components/referral-modal";
import { Brain, BookOpen, Loader2, RefreshCw, Image as ImageIcon, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  text: string;
  imageUrl?: string | null;
  options: string[];
  source: string;
  year: number;
  subject: string;
  period: number;
}

interface DailyData {
  limitReached?: boolean;
  used?: number;
  max?: number;
  plan?: string;
  referralCode?: string;
  referralCount?: number;
  question?: Question;
}

interface MeData {
  user: { name: string; plan: string; referralCode: string };
  quota: { mainUsed: number; mainMax: number; referralCount: number };
}

function QuizContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialFilter = searchParams.get("filter") === "images" ? "images" : "all";

  const [filter, setFilter] = useState<"all" | "images">(initialFilter);
  const [data, setData] = useState<DailyData | null>(null);
  const [meData, setMeData] = useState<MeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showReferralModal, setShowReferralModal] = useState(false);

  const fetchQuestion = useCallback(async (activeFilter: "all" | "images", showModal = false) => {
    setLoading(true);
    try {
      const url = activeFilter === "images" ? "/api/quiz/daily?filter=images" : "/api/quiz/daily";
      const [meRes, quizRes] = await Promise.all([
        fetch("/api/auth/me"),
        fetch(url),
      ]);
      if (meRes.status === 401) { router.push("/login"); return; }
      const me: MeData = await meRes.json();
      setMeData(me);
      const quizData: DailyData = await quizRes.json();
      setData(quizData);

      if (quizData.limitReached && showModal) {
        setShowReferralModal(true);
      }
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchQuestion(filter);
  }, [filter, fetchQuestion]);

  const handleAnswered = () => {
    fetchQuestion(filter, true);
  };

  const handleFilterChange = (newFilter: "all" | "images") => {
    setFilter(newFilter);
  };

  function QuotaDots({ used, max }: { used: number; max: number }) {
    if (data?.plan === "pro") {
      return (
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-teal-700 dark:text-teal-400">
          <Sparkles size={12} /> Cota Ilimitada Ativa
        </div>
      );
    }
    const dots = Math.min(max, 20);
    return (
      <div className="flex flex-wrap gap-1">
        {Array.from({ length: dots }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 w-1.5 rounded-full transition-all duration-300",
              i < used
                ? "bg-teal-700 dark:bg-teal-500"
                : "bg-zinc-200 dark:bg-zinc-700"
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <Navbar userName={meData?.user.name} plan={meData?.user.plan} />

      {/* Referral modal */}
      {showReferralModal && meData && data && (
        <ReferralModal
          referralCode={meData.user.referralCode}
          used={data.used ?? 0}
          max={data.max ?? 10}
          onClose={() => setShowReferralModal(false)}
        />
      )}

      <main className="mx-auto max-w-3xl px-4 py-8">
        {/* Filter Pill Switcher */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleFilterChange("all")}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all",
                filter === "all"
                  ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 shadow-xs"
                  : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
              )}
            >
              Todas as Questões (Geral)
            </button>
            <button
              onClick={() => handleFilterChange("images")}
              className={cn(
                "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all",
                filter === "images"
                  ? "border-teal-700 bg-teal-700 text-white dark:border-teal-500 dark:bg-teal-600 shadow-xs"
                  : "border-teal-200 bg-teal-50/80 text-teal-800 hover:border-teal-300 dark:border-teal-900 dark:bg-teal-950/40 dark:text-teal-300"
              )}
            >
              <ImageIcon size={13} />
              Casos Clínicos com Imagem
              <span className="ml-1 rounded-full bg-teal-800/20 px-1.5 py-0.2 text-[10px] font-bold dark:bg-teal-300/20">
                20
              </span>
            </button>
          </div>

          {filter === "images" && (
            <span className="flex items-center gap-1 text-[11px] font-medium text-teal-700 dark:text-teal-400">
              <Sparkles size={12} />
              Modo Visual Ativo (Radio, Dermato, ECG, Histo, USG)
            </span>
          )}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex min-h-[45vh] items-center justify-center">
            <Loader2 size={28} className="animate-spin text-teal-700 dark:text-teal-400" />
          </div>
        )}

        {/* Progress Header */}
        {!loading && data && !data.limitReached && (
          <div className="mb-6 flex items-center gap-4 rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-50 dark:bg-teal-950">
              <Brain size={16} className="text-teal-700 dark:text-teal-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  {filter === "images" ? "Sessão: Casos Clínicos Ilustrados" : "Sessão Diária de Estudos"}
                </p>
                {data.plan === "pro" ? (
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                    Acesso Ilimitado
                  </span>
                ) : (
                  <span className="text-xs font-semibold tabular-nums text-zinc-700 dark:text-zinc-300">
                    {data.used} de {data.max}
                  </span>
                )}
              </div>
              <QuotaDots used={data.used ?? 0} max={data.max ?? 10} />
            </div>
            <button
              onClick={() => fetchQuestion(filter)}
              className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
              title="Próxima questão"
            >
              <RefreshCw size={13} />
            </button>
          </div>
        )}

        {/* Limit reached state */}
        {!loading && data?.limitReached && !showReferralModal && (
          <div className="flex flex-col items-center rounded-xl border border-zinc-200 bg-white px-6 py-12 text-center shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-950">
              <Brain size={24} className="text-teal-700 dark:text-teal-400" />
            </div>

            <h2 className="mb-1 text-base font-bold text-zinc-900 dark:text-zinc-50">
              Sessão Diária Concluída
            </h2>
            <p className="mb-1 text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm">
              Você completou {data.used} de {data.max} questões hoje.
            </p>
            <p className="mb-6 text-xs text-zinc-500 dark:text-zinc-400">
              Retorne amanhã ou continue treinando no Caderno de Erros.
            </p>

            <div className="flex w-full max-w-xs flex-col gap-2.5">
              <button
                onClick={() => setShowReferralModal(true)}
                className="flex items-center justify-center gap-2 rounded-lg bg-teal-700 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700"
              >
                Desbloquear +5 Questões Hoje
              </button>
              <Link
                href="/notebook"
                className="flex items-center justify-center gap-1.5 rounded-lg border border-zinc-200 bg-white py-2.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
              >
                <BookOpen size={13} />
                Revisar Caderno de Erros
              </Link>
            </div>
          </div>
        )}

        {/* Question card */}
        {!loading && data?.question && !data.limitReached && (
          <QuizCard
            question={data.question}
            mode="daily"
            onAnswered={handleAnswered}
          />
        )}
      </main>
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-teal-700 border-t-transparent dark:border-teal-400" />
        </div>
      }
    >
      <QuizContent />
    </Suspense>
  );
}
