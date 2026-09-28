"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/toaster";
import {
  CheckCircle2,
  XCircle,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  ZoomIn,
  X,
  Clock,
  Building2,
  GraduationCap,
  SkipForward,
  Flag,
  FileEdit,
  Save,
  Check,
  Strikethrough,
  AlertTriangle,
  Send,
  Loader2,
} from "lucide-react";

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

interface AnswerResult {
  correct: boolean;
  correctOption: number;
  explanation: string;
  nextReviewIn: number;
  options: string[];
}

interface QuizCardProps {
  question: Question;
  mode: "daily" | "notebook";
  onAnswered: () => void;
  onSkip?: () => void;
  initialBookmarked?: boolean;
}

const OPTION_LABELS = ["A", "B", "C", "D"];

export function QuizCard({
  question,
  mode,
  onAnswered,
  onSkip,
  initialBookmarked = false,
}: QuizCardProps) {
  const { toast } = useToast();
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [imageZoomed, setImageZoomed] = useState(false);
  const explanationRef = useRef<HTMLDivElement>(null);

  // 1. Recurso de riscar alternativas
  const [eliminated, setEliminated] = useState<number[]>([]);

  // 2. Notas pessoais
  const [showNotes, setShowNotes] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [noteLoading, setNoteLoading] = useState(false);
  const [noteSaving, setNoteSaving] = useState(false);
  const [noteSavedBadge, setNoteSavedBadge] = useState(false);
  const [hasExistingNote, setHasExistingNote] = useState(false);

  // 3. Modal de Reportar Erro / Questionar Gabarito
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("gabarito_errado");
  const [reportComment, setReportComment] = useState("");
  const [reportSubmitting, setReportSubmitting] = useState(false);

  // Cronômetro para medir tempo gasto por questão (para AnswerLog)
  const startTimeRef = useRef<number>(Date.now());

  // Resetar ao trocar de questão
  useEffect(() => {
    setSelected(null);
    setResult(null);
    setBookmarked(initialBookmarked);
    setImageZoomed(false);
    setEliminated([]);
    setShowNotes(false);
    setNoteSavedBadge(false);
    startTimeRef.current = Date.now();

    // Carregar anotação existente desta questão
    let isCancelled = false;
    setNoteLoading(true);
    fetch(`/api/notes?questionId=${question.id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!isCancelled && data?.content !== undefined) {
          setNoteContent(data.content || "");
          setHasExistingNote(Boolean(data.content && data.content.trim().length > 0));
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!isCancelled) setNoteLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [question.id, initialBookmarked]);

  const toggleEliminate = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    if (selected !== null) return;
    setEliminated((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleSelect = useCallback(
    async (optionIndex: number) => {
      if (selected !== null || loading) return;
      setSelected(optionIndex);
      setLoading(true);

      const timeSpentSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);

      try {
        const res = await fetch("/api/quiz/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            questionId: question.id,
            selectedOption: optionIndex,
            mode,
            timeSpentSeconds,
          }),
        });
        const data: AnswerResult = await res.json();
        setResult(data);
        if (!data.correct) {
          setBookmarked(true);
        }
        setTimeout(() => {
          explanationRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 120);
      } catch {
        setSelected(null);
      } finally {
        setLoading(false);
      }
    },
    [selected, loading, question.id, mode]
  );

  // Atalhos de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignora se estiver digitando em campo de texto
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        showReportModal
      ) {
        return;
      }

      const key = e.key.toLowerCase();

      if (selected === null && !loading) {
        if (key === "1" || key === "a") handleSelect(0);
        else if (key === "2" || key === "b") handleSelect(1);
        else if (key === "3" || key === "c") handleSelect(2);
        else if (key === "4" || key === "d") handleSelect(3);
        else if (key === "p" && onSkip) onSkip();
      } else if (result !== null) {
        if (key === "enter" || key === " ") {
          e.preventDefault();
          onAnswered();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected, loading, result, handleSelect, onSkip, onAnswered, showReportModal]);

  const toggleBookmark = async () => {
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: question.id }),
      });
      const data = await res.json();
      setBookmarked(data.bookmarked);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveNote = async () => {
    setNoteSaving(true);
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: question.id, content: noteContent }),
      });
      if (res.ok) {
        setNoteSavedBadge(true);
        setHasExistingNote(Boolean(noteContent.trim().length > 0));
        toast({
          title: "Anotação salva!",
          description: "Seu lembrete pessoal estará disponível sempre que esta questão for exibida.",
          variant: "success",
        });
        setTimeout(() => setNoteSavedBadge(false), 3000);
      }
    } catch {
      toast({
        title: "Erro ao salvar anotação",
        description: "Tente novamente mais tarde.",
        variant: "error",
      });
    } finally {
      setNoteSaving(false);
    }
  };

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitting(true);
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: question.id,
          reason: reportReason,
          comment: reportComment,
        }),
      });

      if (res.ok) {
        toast({
          title: "Reporte enviado com sucesso!",
          description: "Nossa equipe médica revisará a questão e o gabarito. Obrigado pelo feedback!",
          variant: "success",
        });
        setShowReportModal(false);
        setReportComment("");
      } else {
        throw new Error();
      }
    } catch {
      toast({
        title: "Erro ao enviar reporte",
        description: "Não foi possível enviar agora. Tente novamente.",
        variant: "error",
      });
    } finally {
      setReportSubmitting(false);
    }
  };

  const getOptionClass = (index: number): string => {
    const isEliminated = eliminated.includes(index);

    if (selected === null) {
      if (isEliminated) {
        return "border-zinc-200 bg-zinc-100/60 text-zinc-400 opacity-50 line-through dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-500 hover:opacity-75";
      }
      return "border-zinc-200 bg-white text-zinc-900 hover:border-amber-500 hover:bg-amber-50/50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-amber-500/80 dark:hover:bg-amber-950/30 cursor-pointer";
    }

    if (!result) {
      return "border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100";
    }

    if (index === result.correctOption) return "option-correct";
    if (index === selected && !result.correct) return "option-incorrect";
    return "border-zinc-200 bg-zinc-50/60 text-zinc-400 opacity-60 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-500";
  };

  return (
    <div className="w-full space-y-4">
      {/* Question Header Badges & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="flex items-center gap-1 rounded-full border border-zinc-200 bg-white px-2.5 py-0.5 font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
            <GraduationCap size={12} className="text-orange-600 dark:text-amber-400" />
            {question.subject}
          </span>
          <span className="flex items-center gap-1 rounded-full border border-zinc-200 bg-white px-2.5 py-0.5 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            <Building2 size={12} className="text-zinc-400" />
            {question.source}
          </span>
          <span className="flex items-center gap-1 rounded-full border border-zinc-200 bg-white px-2.5 py-0.5 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            <Clock size={12} className="text-zinc-400" />
            {question.year}
          </span>
          {question.subtopic && (
            <span className="flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 font-medium text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/70 dark:text-amber-300">
              {question.subtopic}
            </span>
          )}
        </div>

        {/* Botão de Reportar Questão */}
        <button
          onClick={() => setShowReportModal(true)}
          className="flex items-center gap-1 text-[11px] font-medium text-zinc-400 transition-colors hover:text-red-600 dark:text-zinc-500 dark:hover:text-red-400"
          title="Questionar gabarito ou reportar erro nesta questão"
        >
          <Flag size={12} />
          <span className="hidden sm:inline">Reportar erro</span>
        </button>
      </div>

      {/* Question Text */}
      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm leading-relaxed text-zinc-900 md:text-base dark:text-zinc-100">
          {question.text}
        </p>
      </div>

      {/* Medical Image (if any) */}
      {question.imageUrl && (
        <div className="relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
          <img
            src={question.imageUrl}
            alt="Imagem clínica / lâmina"
            className="w-full cursor-zoom-in object-cover transition-opacity hover:opacity-95"
            style={{ maxHeight: 280 }}
            onClick={() => setImageZoomed(true)}
          />
          <button
            onClick={() => setImageZoomed(true)}
            className="absolute right-2.5 top-2.5 flex items-center gap-1.5 rounded-lg bg-zinc-900/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-xs hover:bg-zinc-900/90"
          >
            <ZoomIn size={13} /> Ampliar
          </button>
        </div>
      )}

      {/* Zoom Modal */}
      {imageZoomed && question.imageUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xs"
          onClick={() => setImageZoomed(false)}
        >
          <button
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => setImageZoomed(false)}
          >
            <X size={20} />
          </button>
          <img
            src={question.imageUrl}
            alt="Imagem ampliada"
            className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Options List */}
      <div className="space-y-2.5">
        {question.options.map((option, index) => {
          const isSelected = selected === index;
          const isCorrect = result && index === result.correctOption;
          const isWrong = result && isSelected && !result.correct;
          const isEliminated = eliminated.includes(index);

          return (
            <div
              key={index}
              onClick={() => handleSelect(index)}
              className={cn(
                "group relative flex w-full items-start gap-3 rounded-xl border p-3.5 text-left text-sm transition-all duration-150 sm:p-4",
                getOptionClass(index)
              )}
            >
              {/* Option Letter Badge */}
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-xs font-bold transition-colors",
                  selected === null
                    ? isEliminated
                      ? "border-zinc-300 bg-zinc-200 text-zinc-400 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-600"
                      : "border-zinc-200 bg-zinc-100 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                    : isCorrect
                    ? "border-emerald-600 bg-emerald-600 text-white dark:border-emerald-500 dark:bg-emerald-500"
                    : isWrong
                    ? "border-red-600 bg-red-600 text-white dark:border-red-500 dark:bg-red-500"
                    : "border-zinc-200 bg-zinc-100 text-zinc-400 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-500"
                )}
              >
                {OPTION_LABELS[index]}
              </span>

              {/* Option Text */}
              <span
                className={cn(
                  "flex-1 leading-snug pt-0.5",
                  isEliminated && selected === null && "line-through opacity-60"
                )}
              >
                {option}
              </span>

              {/* Feedback Icons (After submit) */}
              {result && isCorrect && (
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              )}
              {result && isWrong && (
                <XCircle size={18} className="mt-0.5 shrink-0 text-red-600 dark:text-red-400" />
              )}

              {/* Botão de Riscar / Descartar Alternativa (Antes de responder) */}
              {result === null && (
                <button
                  type="button"
                  onClick={(e) => toggleEliminate(e, index)}
                  title={
                    isEliminated
                      ? "Restaurar alternativa eliminada"
                      : "Riscar alternativa (eliminar do raciocínio)"
                  }
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
              )}
            </div>
          );
        })}
      </div>

      {/* Ações antes de responder (Pular questão, Salvar no Caderno e Anotações) */}
      {!result && (
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleBookmark}
              className={cn(
                "flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
                bookmarked
                  ? "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-800/80 dark:bg-amber-950/40 dark:text-amber-300"
                  : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
              )}
              title="Salvar no Caderno de Erros para estudar depois"
            >
              {bookmarked ? (
                <BookmarkCheck size={14} className="text-amber-600 dark:text-amber-400" />
              ) : (
                <Bookmark size={14} />
              )}
              <span>{bookmarked ? "Salvo para depois" : "Salvar p/ depois"}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowNotes(!showNotes)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
                hasExistingNote
                  ? "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
                  : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
              )}
              title="Anotar mnemônico ou resumo pessoal"
            >
              <FileEdit size={14} />
              <span>Anotações</span>
              {hasExistingNote && (
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 dark:bg-amber-400" />
              )}
            </button>
          </div>

          {onSkip && (
            <button
              type="button"
              onClick={onSkip}
              disabled={loading}
              className="group flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 shadow-2xs transition-all hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900 active:scale-98 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-white"
              title="Pular para outra questão sem gastar sua cota diária"
            >
              <SkipForward
                size={14}
                className="text-zinc-400 transition-transform group-hover:translate-x-0.5 dark:text-zinc-500"
              />
              <span>Pular Questão</span>
              <span className="hidden text-[10px] font-normal text-zinc-400 sm:inline dark:text-zinc-500">
                [P]
              </span>
            </button>
          )}
        </div>
      )}

      {/* Painel Expansível de Anotações Pessoais */}
      {showNotes && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 shadow-xs dark:border-amber-900/60 dark:bg-amber-950/20">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-200">
              <FileEdit size={14} />
              <span>Minha Anotação Clínica & Mnemônico</span>
            </div>
            {noteSavedBadge && (
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                <Check size={13} /> Salvo!
              </span>
            )}
          </div>
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Ex: 'Lembrar da tríade de Virchow: estase, hipercoagulabilidade e lesão endotelial...'"
            rows={3}
            className="w-full resize-y rounded-lg border border-amber-200 bg-white p-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-none dark:border-amber-900/60 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
          />
          <div className="mt-2 flex items-center justify-end gap-2">
            <button
              onClick={() => setShowNotes(false)}
              className="px-2.5 py-1 text-xs text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              Fechar
            </button>
            <button
              onClick={handleSaveNote}
              disabled={noteSaving || noteLoading}
              className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#f59e0b] via-[#ea580c] to-[#c2410c] hover:from-[#d97706] hover:via-[#c2410c] hover:to-[#9a3412] px-3 py-1.5 text-xs font-semibold text-white shadow-2xs transition-colors"
            >
              {noteSaving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
              Salvar Anotação
            </button>
          </div>
        </div>
      )}

      {/* Gabarito Comentado (Explanation) */}
      {result && (
        <div
          ref={explanationRef}
          className={cn(
            "rounded-xl border p-5 text-sm transition-all",
            result.correct
              ? "border-emerald-200 bg-emerald-50/70 text-zinc-900 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-zinc-100"
              : "border-red-200 bg-red-50/70 text-zinc-900 dark:border-red-900/60 dark:bg-red-950/30 dark:text-zinc-100"
          )}
        >
          <div className="mb-3 flex items-center gap-2">
            {result.correct ? (
              <>
                <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400" />
                <span className="font-semibold text-emerald-800 dark:text-emerald-300">
                  Resposta Correta
                </span>
              </>
            ) : (
              <>
                <XCircle size={18} className="text-red-600 dark:text-red-400" />
                <span className="font-semibold text-red-800 dark:text-red-300">
                  Resposta Incorreta
                </span>
              </>
            )}
            <span className="ml-auto text-xs text-zinc-500 dark:text-zinc-400">
              Próxima revisão:{" "}
              {result.nextReviewIn === 1 ? "amanhã" : `em ${result.nextReviewIn} dias`}
            </span>
          </div>
          <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
            {result.explanation}
          </p>
        </div>
      )}

      {/* Bottom Actions pós-resposta */}
      {result && (
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleBookmark}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors",
                bookmarked
                  ? "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-800/80 dark:bg-amber-950/40 dark:text-amber-300"
                  : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              )}
            >
              {bookmarked ? (
                <BookmarkCheck size={14} className="text-amber-600 dark:text-amber-400" />
              ) : (
                <Bookmark size={14} />
              )}
              {bookmarked ? "Salvo no Caderno" : "Salvar no Caderno"}
            </button>

            <button
              onClick={() => setShowNotes(!showNotes)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
                hasExistingNote
                  ? "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
                  : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              )}
            >
              <FileEdit size={14} />
              <span>Anotação</span>
              {hasExistingNote && (
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 dark:bg-amber-400" />
              )}
            </button>
          </div>

          <button
            onClick={onAnswered}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#f59e0b] via-[#ea580c] to-[#c2410c] hover:from-[#d97706] hover:via-[#c2410c] hover:to-[#9a3412] px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-orange-950/20 transition-all"
          >
            <span>Próxima Questão</span>
            <span className="text-[10px] opacity-75 hidden sm:inline">[Espaço]</span>
            <ChevronRight size={14} />
          </button>
        </div>
      )}

      {/* Modal de Reportar Erro / Questionar Gabarito */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-2xs">
          <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 animate-in fade-in zoom-in-95 duration-150">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <AlertTriangle size={18} />
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                  Reportar Erro ou Questionar Gabarito
                </h3>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmitReport} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Qual é o problema identificado?
                </label>
                <div className="space-y-2 text-xs">
                  {[
                    { id: "gabarito_errado", label: "Gabarito incorreto ou divergente de diretriz" },
                    { id: "desatualizado", label: "Questão ou conduta clínica desatualizada" },
                    { id: "erro_digitacao", label: "Erro de digitação ou enunciado confuso" },
                    { id: "imagem_problema", label: "Imagem cortada, ilegível ou ausente" },
                    { id: "outro", label: "Outro motivo" },
                  ].map((item) => (
                    <label
                      key={item.id}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg border p-2.5 cursor-pointer transition-colors",
                        reportReason === item.id
                          ? "border-amber-500 bg-amber-50/70 font-semibold text-amber-950 dark:border-amber-500 dark:bg-amber-950/40 dark:text-amber-200"
                          : "border-zinc-200 hover:bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:text-zinc-300"
                      )}
                    >
                      <input
                        type="radio"
                        name="reportReason"
                        value={item.id}
                        checked={reportReason === item.id}
                        onChange={(e) => setReportReason(e.target.value)}
                        className="text-orange-600 focus:ring-amber-500"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Comentário adicional (opcional)
                </label>
                <textarea
                  value={reportComment}
                  onChange={(e) => setReportComment(e.target.value)}
                  placeholder="Explique sua dúvida, fonte bibliográfica ou detalhe do erro..."
                  rows={3}
                  className="w-full resize-none rounded-lg border border-zinc-200 p-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={reportSubmitting}
                  className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-red-700 disabled:opacity-50"
                >
                  {reportSubmitting ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <Send size={12} />
                  )}
                  Enviar Reporte
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
