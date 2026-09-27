"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { QuizCard } from "@/components/quiz-card";
import { ReferralModal } from "@/components/referral-modal";
import {
  Brain,
  BookOpen,
  Loader2,
  Sparkles,
  SkipForward,
  GraduationCap,
  X,
  Layers,
  ChevronDown,
} from "lucide-react";
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
  subtopic?: string | null;
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

interface SubjectItem {
  id: string;
  name: string;
  period: number;
  category: string;
  totalQuestions: number;
  reviewedQuestions: number;
  subtopics: string[];
}

function QuizContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialFilter = searchParams.get("filter") === "images" ? "images" : "all";
  const initialSubjectId = searchParams.get("subjectId") || "";
  const initialSubtopic = searchParams.get("subtopic") || "";

  const [filter, setFilter] = useState<"all" | "images">(initialFilter);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(initialSubjectId);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>(initialSubtopic);
  const [subjects, setSubjects] = useState<SubjectItem[]>([]);
  const [data, setData] = useState<DailyData | null>(null);
  const [meData, setMeData] = useState<MeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [skippedIds, setSkippedIds] = useState<string[]>([]);

  // Carregar lista de matérias com seus subtópicos
  useEffect(() => {
    fetch("/api/subjects")
      .then((res) => (res.ok ? res.json() : null))
      .then((resData) => {
        if (resData?.subjects) setSubjects(resData.subjects);
      })
      .catch(console.error);
  }, []);

  const activeSubjectObj = subjects.find((s) => s.id === selectedSubjectId);

  const fetchQuestion = useCallback(
    async (
      activeFilter: "all" | "images",
      subjectId = selectedSubjectId,
      subtopic = selectedSubtopic,
      showModal = false,
      excludeList: string[] = []
    ) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (activeFilter === "images") params.set("filter", "images");
        if (subjectId) params.set("subjectId", subjectId);
        if (subtopic) params.set("subtopic", subtopic);
        if (excludeList.length > 0) params.set("exclude", excludeList.join(","));
        const queryString = params.toString() ? `?${params.toString()}` : "";
        const url = `/api/quiz/daily${queryString}`;

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
    },
    [router, selectedSubjectId, selectedSubtopic]
  );

  useEffect(() => {
    fetchQuestion(filter, selectedSubjectId, selectedSubtopic, false, skippedIds);
  }, [filter, selectedSubjectId, selectedSubtopic, fetchQuestion]);

  const handleAnswered = () => {
    fetchQuestion(filter, selectedSubjectId, selectedSubtopic, true, skippedIds);
  };

  const handleSkip = () => {
    if (!data?.question) return;
    const nextSkipped = [...skippedIds, data.question.id];
    setSkippedIds(nextSkipped);
    fetchQuestion(filter, selectedSubjectId, selectedSubtopic, false, nextSkipped);
  };

  const handleFilterChange = (newFilter: "all" | "images") => {
    setFilter(newFilter);
    setSkippedIds([]);
    fetchQuestion(newFilter, selectedSubjectId, selectedSubtopic, false, []);
  };

  const handleSubjectChange = (newSubjectId: string) => {
    setSelectedSubjectId(newSubjectId);
    setSelectedSubtopic(""); // reset subtópico ao trocar de matéria
    setSkippedIds([]);
    fetchQuestion(filter, newSubjectId, "", false, []);
  };

  const handleSubtopicChange = (newSubtopic: string) => {
    setSelectedSubtopic(newSubtopic);
    setSkippedIds([]);
    fetchQuestion(filter, selectedSubjectId, newSubtopic, false, []);
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

  // Agrupar matérias por período para o select
  const periods = [1, 2, 3, 4, 5, 6];

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
        {/* Painel de Filtros e Tópicos */}
        <div className="mb-4 space-y-3">
          {/* Barra Unificada de Seleção de Disciplina */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-white p-3 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-400">
                <Brain size={15} />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Disciplina Selecionada
                </p>
                <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  {activeSubjectObj ? activeSubjectObj.name : "📚 Todas as Matérias (Misto Geral)"}
                </p>
              </div>
            </div>

            {/* Dropdown de Seleção de Tópico / Disciplina */}
            <div className="relative min-w-[240px]">
              <select
                value={selectedSubjectId}
                onChange={(e) => handleSubjectChange(e.target.value)}
                className="w-full appearance-none rounded-lg border border-zinc-200 bg-zinc-50/70 py-2 pl-3 pr-8 text-xs font-medium text-zinc-800 shadow-2xs outline-none transition-colors focus:border-teal-700 focus:bg-white focus:ring-1 focus:ring-teal-700 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-200 dark:focus:bg-zinc-800"
              >
                <option value="">📚 Todas as Matérias (Misto Geral)</option>
                {periods.map((p) => {
                  const pSubjects = subjects.filter((s) => s.period === p);
                  if (pSubjects.length === 0) return null;
                  return (
                    <optgroup key={p} label={`${p}º Período`}>
                      {pSubjects.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.totalQuestions} questões)
                        </option>
                      ))}
                    </optgroup>
                  );
                })}
              </select>
              <ChevronDown
                size={13}
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400"
              />
            </div>
          </div>
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
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 truncate">
                  {selectedSubtopic
                    ? `Subtópico: ${selectedSubtopic}`
                    : activeSubjectObj
                    ? `Disciplina: ${activeSubjectObj.name}`
                    : "Sessão Diária de Estudos"}
                </p>
                {data.plan === "pro" ? (
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 shrink-0">
                    Acesso Ilimitado
                  </span>
                ) : (
                  <span className="text-xs font-semibold tabular-nums text-zinc-700 dark:text-zinc-300 shrink-0">
                    {data.used} de {data.max}
                  </span>
                )}
              </div>
              <QuotaDots used={data.used ?? 0} max={data.max ?? 10} />
            </div>
            <button
              onClick={handleSkip}
              className="ml-2 flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-white"
              title="Pular para outra questão deste tópico (sem consumir cota)"
            >
              <SkipForward size={13} className="text-zinc-400 dark:text-zinc-400" />
              <span>Pular</span>
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
            onSkip={handleSkip}
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
