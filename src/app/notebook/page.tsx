"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { QuizCard } from "@/components/quiz-card";
import { BookOpen, Bookmark, Loader2, ArrowRight } from "lucide-react";
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

interface NotebookData {
  limitReached?: boolean;
  used?: number;
  max?: number;
  question?: Question | null;
  empty?: boolean;
}

export default function NotebookPage() {
  const router = useRouter();
  const [data, setData] = useState<NotebookData | null>(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [userPlan, setUserPlan] = useState("free");
  const [skippedIds, setSkippedIds] = useState<string[]>([]);

  const fetchQuestion = useCallback(async (excludeList: string[] = []) => {
    setLoading(true);
    try {
      const query = excludeList.length > 0 ? `?exclude=${excludeList.join(",")}` : "";
      const [meRes, notebookRes] = await Promise.all([
        fetch("/api/auth/me"),
        fetch(`/api/quiz/notebook${query}`),
      ]);
      if (meRes.status === 401) { router.push("/login"); return; }
      const meData = await meRes.json();
      setUserName(meData.user?.name || "");
      setUserPlan(meData.user?.plan || "free");
      const nb: NotebookData = await notebookRes.json();
      setData(nb);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchQuestion(skippedIds);
  }, [fetchQuestion]);

  const handleSkip = () => {
    if (!data?.question) return;
    const nextSkipped = [...skippedIds, data.question.id];
    setSkippedIds(nextSkipped);
    fetchQuestion(nextSkipped);
  };

  const handleAnswered = () => {
    fetchQuestion(skippedIds);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 size={28} className="animate-spin text-zinc-600 dark:text-zinc-400" />
        </div>
      </div>
    );
  }

  const used = data?.used ?? 0;
  const max = data?.max ?? 20;
  const pct = Math.min(Math.round((used / max) * 100), 100);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Navbar userName={userName} plan={userPlan} />

      <main className="mx-auto max-w-3xl px-4 py-8">
        {/* Header Bar */}
        <div className="mb-6 flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
              <BookOpen size={16} className="text-zinc-700 dark:text-zinc-300" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Caderno de Erros & Favoritos
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Treino direcionado de questões salvas • Cota: {used} de {max} hoje
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div
                className="h-full rounded-full bg-zinc-700 transition-all duration-500 dark:bg-zinc-400"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-xs font-semibold tabular-nums text-zinc-600 dark:text-zinc-400">
              {pct}%
            </span>
          </div>
        </div>

        {/* Empty state */}
        {data?.empty && (
          <div className="flex flex-col items-center rounded-xl border border-zinc-200 bg-white px-6 py-14 text-center shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
              <Bookmark size={22} className="text-zinc-400 dark:text-zinc-500" />
            </div>
            <h2 className="mb-1 text-base font-bold text-zinc-900 dark:text-zinc-50">
              Caderno de Erros vazio
            </h2>
            <p className="mb-6 max-w-sm text-xs text-zinc-500 dark:text-zinc-400">
              As questões que você errar durante o quiz ou clicar no ícone de salvar serão arquivadas aqui para treino sob demanda.
            </p>
            <Link
              href="/quiz"
              className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#f59e0b] via-[#ea580c] to-[#c2410c] hover:from-[#d97706] hover:via-[#c2410c] hover:to-[#9a3412] px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-orange-950/20 transition-all"
            >
              Iniciar Quiz Diário
              <ArrowRight size={13} />
            </Link>
          </div>
        )}

        {/* Limit reached */}
        {data?.limitReached && (
          <div className="flex flex-col items-center rounded-xl border border-zinc-200 bg-white px-6 py-14 text-center shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
              <BookOpen size={22} className="text-zinc-600 dark:text-zinc-300" />
            </div>
            <h2 className="mb-1 text-base font-bold text-zinc-900 dark:text-zinc-50">
              Cota do Caderno atingida
            </h2>
            <p className="mb-6 text-xs text-zinc-500 dark:text-zinc-400">
              Você revisou {data.used} de {data.max} questões do caderno hoje. O limite será renovado amanhã.
            </p>
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
            >
              Voltar ao Painel de Estudos
            </Link>
          </div>
        )}

        {/* Question */}
        {data?.question && !data.limitReached && (
          <QuizCard
            question={data.question}
            mode="notebook"
            onAnswered={handleAnswered}
            onSkip={handleSkip}
            initialBookmarked={true}
          />
        )}
      </main>
    </div>
  );
}
