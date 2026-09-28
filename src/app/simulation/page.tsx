"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import {
  Target,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Flag,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Zap,
  Lock,
  Loader2,
  Strikethrough,
  ZoomIn,
  X,
  BookOpen,
  Award,
  ChevronRight,
  LayoutGrid,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  text: string;
  imageUrl?: string | null;
  options: string[];
  correctOption: number;
  explanation: string;
  source: string;
  year: number;
  subject: string;
  period: number;
  subtopic?: string | null;
}

interface Subject {
  id: string;
  name: string;
  period: number;
  totalQuestions: number;
}

interface UserData {
  user: { id: string; name: string; email: string; plan: string };
}

const OPTION_LABELS = ["A", "B", "C", "D"];

export default function SimulationPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Setup state
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [questionCount, setQuestionCount] = useState(15);
  const [timeMode, setTimeMode] = useState<"none" | "2min" | "3min">("2min");

  // In-simulation state
  const [stage, setStage] = useState<"setup" | "exam" | "results">("setup");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({}); // index -> selectedOption
  const [flagged, setFlagged] = useState<Record<number, boolean>>({}); // index -> boolean
  const [eliminatedMap, setEliminatedMap] = useState<Record<number, number[]>>({}); // index -> eliminated options
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);
  const [showGridModal, setShowGridModal] = useState(false);
  const [showFinishConfirm, setShowFinishConfirm] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [submittingExam, setSubmittingExam] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  // Results state
  const [score, setScore] = useState({ correct: 0, total: 0, percentage: 0 });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const examStartTimestamp = useRef<number>(0);

  // 1. Carregar usuário e checar permissões
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (res.status === 401) {
          router.push("/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setUserData(data);
      })
      .finally(() => setLoadingUser(false));

    fetch("/api/subjects")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.subjects) setSubjects(data.subjects);
      })
      .catch(() => {});
  }, [router]);

  // 2. Finalizar simulado
  const handleFinishExam = useCallback(async () => {
    if (submittingExam) return;
    setSubmittingExam(true);
    if (timerRef.current) clearInterval(timerRef.current);

    const elapsedSeconds = Math.round((Date.now() - examStartTimestamp.current) / 1000);
    setTotalTimeTaken(elapsedSeconds);

    let correctCount = 0;
    const answerLogsPayload = questions.map((q, idx) => {
      const selected = answers[idx] ?? -1;
      const isCorrect = selected === q.correctOption;
      if (isCorrect) correctCount++;
      return {
        questionId: q.id,
        selectedOption: selected,
        isCorrect,
        timeSpentSeconds: Math.round(elapsedSeconds / questions.length),
      };
    });

    const finalPct = Math.round((correctCount / questions.length) * 100);
    setScore({
      correct: correctCount,
      total: questions.length,
      percentage: finalPct,
    });

    try {
      const subjectObj = subjects.find((s) => s.id === selectedSubjectId);
      await fetch("/api/simulations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `Simulado: ${subjectObj ? subjectObj.name : "Geral (Misto)"}`,
          subjectName: subjectObj ? subjectObj.name : "Geral (Misto)",
          totalQuestions: questions.length,
          correctCount,
          durationSeconds: elapsedSeconds,
          answers: answerLogsPayload.filter((a) => a.selectedOption >= 0),
        }),
      });
    } catch (e) {
      console.error("Falha ao registrar simulado", e);
    } finally {
      setSubmittingExam(false);
      setShowFinishConfirm(false);
      setStage("results");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [submittingExam, questions, answers, subjects, selectedSubjectId]);

  // 3. Cronômetro regressivo
  useEffect(() => {
    if (stage === "exam" && timeLeft !== null) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(timerRef.current!);
            handleFinishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [stage, timeLeft, handleFinishExam]);

  // Iniciar Prova
  const handleStartExam = async () => {
    setLoadingQuestions(true);
    try {
      const params = new URLSearchParams();
      params.set("count", questionCount.toString());
      if (selectedSubjectId) params.set("subjectId", selectedSubjectId);

      const res = await fetch(`/api/simulations?${params.toString()}`);
      if (!res.ok) throw new Error("Erro ao carregar questões do simulado");

      const data = await res.json();
      if (!data.questions || data.questions.length === 0) {
        alert("Nenhuma questão encontrada para este tema.");
        return;
      }

      setQuestions(data.questions);
      setAnswers({});
      setFlagged({});
      setEliminatedMap({});
      setCurrentIndex(0);

      // Calcular tempo total em segundos
      let initialSeconds: number | null = null;
      if (timeMode === "2min") initialSeconds = data.questions.length * 120;
      else if (timeMode === "3min") initialSeconds = data.questions.length * 180;

      setTimeLeft(initialSeconds);
      examStartTimestamp.current = Date.now();
      setStage("exam");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      alert("Não foi possível iniciar o simulado. Verifique sua conexão.");
    } finally {
      setLoadingQuestions(false);
    }
  };

  // Alternar opção selecionada
  const handleSelectOption = (optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: optionIndex }));
  };

  // Riscar alternativa
  const handleToggleEliminate = (e: React.MouseEvent, optionIndex: number) => {
    e.stopPropagation();
    setEliminatedMap((prev) => {
      const currentList = prev[currentIndex] || [];
      const updated = currentList.includes(optionIndex)
        ? currentList.filter((i) => i !== optionIndex)
        : [...currentList, optionIndex];
      return { ...prev, [currentIndex]: updated };
    });
  };

  const handleToggleFlag = () => {
    setFlagged((prev) => ({ ...prev, [currentIndex]: !prev[currentIndex] }));
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (loadingUser) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 size={28} className="animate-spin text-orange-600 dark:text-amber-400" />
        </div>
      </div>
    );
  }

  // Paywall se o usuário não for Pro
  const isPro = userData?.user?.plan === "pro";
  if (!isPro) {
    return (
      <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        <Navbar userName={userData?.user.name} plan="free" />
        <main className="mx-auto max-w-3xl px-4 py-16 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800">
            <Lock size={32} className="text-orange-600 dark:text-amber-400" />
          </div>

          <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 dark:bg-amber-900/60 dark:text-amber-300">
            RECURSO PRO • EM BREVE
          </span>

          <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            Modo Simulado Cronometrado
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
            Treine no formato real das provas de residência (ENARE, USP, Revalida).
            Resolva blocos de 10 a 30 questões sob pressão de tempo, navegue livremente, risque alternativas e receba gabarito detalhado com tempo por questão.
          </p>

          <div className="mx-auto mt-8 grid max-w-lg gap-3 text-left sm:grid-cols-2">
            {[
              "Cronômetro regressivo de prova",
              "10 a 30 questões por bateria",
              "Grade de navegação e revisão",
              "Diagnóstico de desempenho e tempo",
            ].map((benefit, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white p-3 text-xs font-semibold text-zinc-800 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
              >
                <CheckCircle2 size={16} className="shrink-0 text-orange-600 dark:text-amber-400" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-md rounded-xl border border-amber-200/80 bg-amber-50/80 p-3.5 text-center dark:border-amber-900/60 dark:bg-amber-950/30">
            <p className="text-xs font-medium text-amber-800 dark:text-amber-300">
              ⏳ O Modo Simulado e a adesão ao Plano Pro serão liberados em breve. Fique atento às próximas atualizações!
            </p>
          </div>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/pricing"
              className="flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-800 shadow-2xs hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
            >
              <Clock size={16} className="text-amber-500" />
              Ver Planos (Em Breve)
            </Link>
            <Link
              href="/quiz"
              className="rounded-xl bg-gradient-to-r from-[#f59e0b] via-[#ea580c] to-[#c2410c] hover:from-[#d97706] hover:via-[#c2410c] hover:to-[#9a3412] px-6 py-3 text-sm font-bold text-white shadow-sm shadow-orange-950/20 transition-all"
            >
              Ir para o Quiz Diário Gratuito
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const eliminatedForCurrent = eliminatedMap[currentIndex] || [];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <Navbar userName={userData?.user.name} plan="pro" />

      {/* ─── ESTÁGIO 1: CONFIGURAÇÃO DO SIMULADO ───────────────────────────── */}
      {stage === "setup" && (
        <main className="mx-auto max-w-2xl px-4 py-12">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-orange-700 dark:bg-amber-950 dark:text-amber-300">
              <Target size={24} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Configurar Simulado de Prova
            </h1>
            <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
              Monte sua prova personalizada para treinar gestão de tempo e raciocínio clínico.
            </p>
          </div>

          <div className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            {/* Escolha do Tema */}
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Tema / Disciplina
              </label>
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white p-3 text-xs font-semibold text-zinc-800 outline-none focus:border-amber-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 sm:text-sm"
              >
                <option value="">📚 Simulado Geral (Misto - Todas as Matérias)</option>
                {[...subjects]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.totalQuestions} questões)
                    </option>
                  ))}
              </select>
            </div>

            {/* Quantidade de Questões */}
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Número de Questões
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[10, 15, 20].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setQuestionCount(count)}
                    className={cn(
                      "flex flex-col items-center justify-center rounded-xl border py-3 text-center transition-all",
                      questionCount === count
                        ? "border-amber-500 bg-amber-50 text-amber-950 font-bold dark:border-amber-500 dark:bg-amber-950/60 dark:text-amber-200 shadow-xs"
                        : "border-zinc-200 hover:bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:text-zinc-300"
                    )}
                  >
                    <span className="text-base font-bold">{count}</span>
                    <span className="text-[11px] font-normal opacity-75">questões</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Modo de Tempo */}
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Tempo de Prova
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "2min", label: "2 min/questão", desc: "Padrão ENARE/Residência" },
                  { id: "3min", label: "3 min/questão", desc: "Moderado" },
                  { id: "none", label: "Sem tempo", desc: "Estudo livre" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTimeMode(item.id as any)}
                    className={cn(
                      "flex flex-col items-center justify-center rounded-xl border p-2.5 text-center transition-all",
                      timeMode === item.id
                        ? "border-amber-500 bg-amber-50 text-amber-950 font-bold dark:border-amber-500 dark:bg-amber-950/60 dark:text-amber-200 shadow-xs"
                        : "border-zinc-200 hover:bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:text-zinc-300"
                    )}
                  >
                    <span className="text-xs font-bold">{item.label}</span>
                    <span className="text-[10px] font-normal opacity-75 mt-0.5">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Botão de Início */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleStartExam}
                disabled={loadingQuestions}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#f59e0b] via-[#ea580c] to-[#c2410c] hover:from-[#d97706] hover:via-[#c2410c] hover:to-[#9a3412] py-3.5 text-sm font-bold text-white shadow-sm shadow-orange-950/20 transition-all active:scale-98 disabled:opacity-50"
              >
                {loadingQuestions ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    <Target size={18} />
                    <span>Iniciar Simulado Agora</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </main>
      )}

      {/* ─── ESTÁGIO 2: AMBIENTE DE PROVA (IN-PROGRESS) ───────────────────── */}
      {stage === "exam" && currentQ && (
        <main className="mx-auto max-w-3xl px-4 py-6">
          {/* Top Bar Fixa de Prova */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-white p-3.5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-2.5">
              <span className="rounded-lg bg-gradient-to-r from-[#f59e0b] to-[#ea580c] px-2.5 py-1 text-xs font-bold text-white">
                Q {currentIndex + 1} de {questions.length}
              </span>

              {/* Botão da Grade */}
              <button
                type="button"
                onClick={() => setShowGridModal(true)}
                className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
              >
                <LayoutGrid size={13} />
                <span>Grade ({answeredCount}/{questions.length})</span>
              </button>
            </div>

            {/* Cronômetro */}
            {timeLeft !== null && (
              <div
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-mono font-bold tabular-nums",
                  timeLeft < 120
                    ? "bg-red-100 text-red-700 animate-pulse dark:bg-red-950 dark:text-red-300"
                    : "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                )}
              >
                <Clock size={13} />
                <span>{formatTimer(timeLeft)}</span>
              </div>
            )}

            {/* Botão Finalizar */}
            <button
              type="button"
              onClick={() => setShowFinishConfirm(true)}
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-700 hover:bg-red-100 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
            >
              Entregar Prova
            </button>
          </div>

          {/* Card da Questão */}
          <div className="space-y-4">
            {/* Header badges */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="rounded-full border border-zinc-200 bg-white px-2.5 py-0.5 font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
                  {currentQ.subject}
                </span>
                <span className="rounded-full border border-zinc-200 bg-white px-2.5 py-0.5 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                  {currentQ.source} • {currentQ.year}
                </span>
              </div>

              {/* Botão Marcar para Revisão */}
              <button
                type="button"
                onClick={handleToggleFlag}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors",
                  flagged[currentIndex]
                    ? "border-amber-400 bg-amber-50 text-amber-800 dark:border-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
                    : "border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
                )}
              >
                <Flag size={12} className={flagged[currentIndex] ? "fill-amber-500" : ""} />
                <span>{flagged[currentIndex] ? "Revisar mais tarde" : "Marcar p/ revisão"}</span>
              </button>
            </div>

            {/* Enunciado */}
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-sm leading-relaxed text-zinc-900 md:text-base dark:text-zinc-100">
                {currentQ.text}
              </p>
            </div>

            {/* Imagem clínica se houver */}
            {currentQ.imageUrl && (
              <div className="relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
                <img
                  src={currentQ.imageUrl}
                  alt="Imagem da questão"
                  className="w-full cursor-zoom-in object-cover"
                  style={{ maxHeight: 260 }}
                  onClick={() => setZoomedImage(currentQ.imageUrl!)}
                />
                <button
                  type="button"
                  onClick={() => setZoomedImage(currentQ.imageUrl!)}
                  className="absolute right-2.5 top-2.5 flex items-center gap-1.5 rounded-lg bg-zinc-900/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-xs"
                >
                  <ZoomIn size={13} /> Ampliar
                </button>
              </div>
            )}

            {/* Alternativas */}
            <div className="space-y-2.5">
              {currentQ.options.map((option, oIdx) => {
                const isSelected = answers[currentIndex] === oIdx;
                const isEliminated = eliminatedForCurrent.includes(oIdx);

                return (
                  <div
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-xl border p-3.5 text-left text-sm transition-all cursor-pointer sm:p-4",
                      isSelected
                        ? "border-amber-500 bg-amber-50/80 text-amber-950 font-medium dark:border-amber-500 dark:bg-amber-950/40 dark:text-amber-100 shadow-2xs"
                        : isEliminated
                        ? "border-zinc-200 bg-zinc-100/50 text-zinc-400 opacity-50 line-through dark:border-zinc-800 dark:bg-zinc-900/30 dark:text-zinc-500"
                        : "border-zinc-200 bg-white hover:border-amber-500 hover:bg-amber-50/30 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-amber-500/80"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-xs font-bold transition-colors",
                        isSelected
                          ? "border-orange-600 bg-orange-600 text-white dark:border-amber-500 dark:bg-amber-500"
                          : "border-zinc-200 bg-zinc-100 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                      )}
                    >
                      {OPTION_LABELS[oIdx]}
                    </span>

                    <span className="flex-1 leading-snug pt-0.5">{option}</span>

                    {/* Botão de Riscar */}
                    <button
                      type="button"
                      onClick={(e) => handleToggleEliminate(e, oIdx)}
                      title={isEliminated ? "Restaurar alternativa" : "Riscar alternativa"}
                      className={cn(
                        "flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold transition-all shadow-2xs",
                        isEliminated
                          ? "border-amber-400 bg-amber-100 text-amber-900 hover:bg-amber-200 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200"
                          : "border-zinc-300 bg-zinc-100 text-zinc-700 hover:border-red-300 hover:bg-red-50 hover:text-red-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:border-red-900/60 dark:hover:bg-red-950/40 dark:hover:text-red-300"
                      )}
                    >
                      <Strikethrough
                        size={13}
                        className={
                          isEliminated
                            ? "text-amber-700 dark:text-amber-300"
                            : "text-zinc-500 dark:text-zinc-400"
                        }
                      />
                      <span>{isEliminated ? "Restaurar" : "Riscar"}</span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Barra de Navegação Entre Questões */}
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 disabled:opacity-40 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
              >
                <ArrowLeft size={14} />
                <span>Anterior</span>
              </button>

              {currentIndex < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                  className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#f59e0b] via-[#ea580c] to-[#c2410c] hover:from-[#d97706] hover:via-[#c2410c] hover:to-[#9a3412] px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-orange-950/20"
                >
                  <span>Próxima</span>
                  <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowFinishConfirm(true)}
                  className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#c2410c] hover:to-[#9a3412] px-4 py-2 text-xs font-bold text-white shadow-sm shadow-orange-950/20"
                >
                  <span>Revisar & Finalizar</span>
                  <CheckCircle2 size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Modal da Grade de Questões */}
          {showGridModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-2xs">
              <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 animate-in fade-in zoom-in-95">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                    Grade de Navegação do Simulado
                  </h3>
                  <button
                    onClick={() => setShowGridModal(false)}
                    className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="mb-4 flex items-center gap-4 text-[11px] text-zinc-600 dark:text-zinc-400">
                  <div className="flex items-center gap-1">
                    <span className="h-3 w-3 rounded bg-orange-600 dark:bg-amber-500" />
                    <span>Respondida</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="h-3 w-3 rounded bg-amber-400" />
                    <span>Revisar</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="h-3 w-3 rounded border border-zinc-300 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800" />
                    <span>Em branco</span>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
                  {questions.map((_, idx) => {
                    const isAnswered = answers[idx] !== undefined;
                    const isFlagged = flagged[idx];
                    const isCurrent = currentIndex === idx;

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setCurrentIndex(idx);
                          setShowGridModal(false);
                        }}
                        className={cn(
                          "flex h-10 items-center justify-center rounded-lg text-xs font-bold transition-all",
                          isCurrent && "ring-2 ring-zinc-900 dark:ring-white",
                          isFlagged
                            ? "bg-amber-400 text-amber-950 font-bold"
                            : isAnswered
                            ? "bg-orange-600 text-white dark:bg-amber-500"
                            : "border border-zinc-200 bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-300"
                        )}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowGridModal(false)}
                    className="rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900"
                  >
                    Voltar à Questão
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal de Confirmação de Entrega */}
          {showFinishConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-2xs">
              <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mb-2 flex items-center gap-2 text-amber-600">
                  <AlertTriangle size={20} />
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                    Finalizar e Entregar Simulado?
                  </h3>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Você respondeu <strong>{answeredCount}</strong> de{" "}
                  <strong>{questions.length}</strong> questões.
                  {answeredCount < questions.length && (
                    <span className="block mt-1 text-red-600 dark:text-red-400 font-semibold">
                      Restam {questions.length - answeredCount} questão(ões) em branco!
                    </span>
                  )}
                </p>

                <div className="mt-5 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowFinishConfirm(false)}
                    className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300"
                  >
                    Continuar Prova
                  </button>
                  <button
                    type="button"
                    onClick={handleFinishExam}
                    disabled={submittingExam}
                    className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#f59e0b] via-[#ea580c] to-[#c2410c] px-4 py-1.5 text-xs font-bold text-white hover:opacity-95"
                  >
                    {submittingExam ? <Loader2 size={12} className="animate-spin" /> : null}
                    Confirmar Entrega
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      {/* ─── ESTÁGIO 3: RESULTADOS E GABARITO COMENTADO ───────────────────── */}
      {stage === "results" && (
        <main className="mx-auto max-w-3xl px-4 py-8">
          {/* Card de Desempenho Principal */}
          <div className="mb-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
            <div className="flex flex-col items-center text-center">
              <div
                className={cn(
                  "mb-3 flex h-16 w-16 items-center justify-center rounded-2xl",
                  score.percentage >= 70
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                    : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                )}
              >
                <Award size={32} />
              </div>

              <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-2xl">
                Resultado do Simulado
              </h1>

              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                {score.percentage >= 75
                  ? "🎉 Excelente desempenho! Rendimento compatível com aprovação direta."
                  : score.percentage >= 60
                  ? "👍 Bom aproveitamento! Revise as questões que errou para consolidar as lacunas."
                  : "⚠️ Atenção! Vale a pena focar a repetição espaçada nos tópicos deste simulado."}
              </p>

              {/* Estatísticas Chave */}
              <div className="mt-6 grid w-full max-w-md grid-cols-3 gap-3">
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Aproveitamento
                  </p>
                  <p className="mt-0.5 text-2xl font-black text-orange-600 dark:text-amber-400">
                    {score.percentage}%
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Acertos
                  </p>
                  <p className="mt-0.5 text-2xl font-black text-zinc-900 dark:text-zinc-50">
                    {score.correct}/{score.total}
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Tempo Total
                  </p>
                  <p className="mt-0.5 text-xl font-black text-zinc-900 dark:text-zinc-50">
                    {formatTimer(totalTimeTaken)}
                  </p>
                </div>
              </div>

              {/* Ações de Retorno */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setStage("setup")}
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#f59e0b] via-[#ea580c] to-[#c2410c] hover:from-[#d97706] hover:via-[#c2410c] hover:to-[#9a3412] px-5 py-2.5 text-xs font-bold text-white shadow-sm shadow-orange-950/20"
                >
                  <RotateCcw size={14} />
                  <span>Novo Simulado</span>
                </button>
                <Link
                  href="/dashboard"
                  className="rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                >
                  Voltar ao Dashboard
                </Link>
              </div>
            </div>
          </div>

          {/* Gabarito Detalhado Questão por Questão */}
          <div className="space-y-6">
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
              Gabarito Comentado da Prova ({questions.length} Questões)
            </h2>

            {questions.map((q, idx) => {
              const userChoice = answers[idx] ?? -1;
              const isCorrect = userChoice === q.correctOption;

              return (
                <div
                  key={q.id}
                  className={cn(
                    "rounded-xl border p-5 shadow-2xs transition-all",
                    isCorrect
                      ? "border-emerald-200 bg-white dark:border-emerald-950 dark:bg-zinc-900"
                      : "border-red-200 bg-white dark:border-red-950 dark:bg-zinc-900"
                  )}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs font-bold">
                      {isCorrect ? (
                        <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <XCircle size={16} className="text-red-600 dark:text-red-400" />
                      )}
                      <span>Questão {idx + 1}</span>
                      <span className="font-normal text-zinc-400">• {q.subject}</span>
                    </span>

                    <span
                      className={cn(
                        "rounded px-2 py-0.5 text-[10px] font-bold uppercase",
                        isCorrect
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                          : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
                      )}
                    >
                      {isCorrect ? "Acertou" : "Errou"}
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed text-zinc-800 dark:text-zinc-200 sm:text-sm">
                    {q.text}
                  </p>

                  {/* Imagem se houver */}
                  {q.imageUrl && (
                    <div className="my-3 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 max-w-sm">
                      <img
                        src={q.imageUrl}
                        alt="Imagem da questão"
                        className="max-h-48 w-full object-cover"
                      />
                    </div>
                  )}

                  {/* Alternativas com indicação de escolha vs correta */}
                  <div className="my-3 space-y-1.5">
                    {q.options.map((opt, oIdx) => {
                      const isGabarito = oIdx === q.correctOption;
                      const wasSelectedByUser = oIdx === userChoice;

                      return (
                        <div
                          key={oIdx}
                          className={cn(
                            "flex items-start gap-2 rounded-lg border px-3 py-2 text-xs",
                            isGabarito
                              ? "border-emerald-300 bg-emerald-50 text-emerald-950 font-semibold dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200"
                              : wasSelectedByUser && !isGabarito
                              ? "border-red-300 bg-red-50 text-red-950 dark:border-red-800 dark:bg-red-950/60 dark:text-red-200"
                              : "border-zinc-200 bg-zinc-50/50 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-400"
                          )}
                        >
                          <span className="font-bold">{OPTION_LABELS[oIdx]})</span>
                          <span className="flex-1">{opt}</span>
                          {isGabarito && (
                            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                              (Gabarito Oficial)
                            </span>
                          )}
                          {wasSelectedByUser && !isGabarito && (
                            <span className="text-[10px] font-bold text-red-700 dark:text-red-400">
                              (Sua Escolha)
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explicação da Questão */}
                  <div className="rounded-lg bg-zinc-100 p-3 text-xs leading-relaxed text-zinc-700 dark:bg-zinc-800/70 dark:text-zinc-300">
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100 mb-0.5">
                      💡 Comentário Clínico do Professor:
                    </p>
                    <p>{q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      )}

      {/* Modal de Zoom de Imagem */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setZoomedImage(null)}
        >
          <button
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white"
            onClick={() => setZoomedImage(null)}
          >
            <X size={20} />
          </button>
          <img
            src={zoomedImage}
            alt="Imagem ampliada"
            className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
