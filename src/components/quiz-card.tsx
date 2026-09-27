"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
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
  initialBookmarked?: boolean;
}

const OPTION_LABELS = ["A", "B", "C", "D"];

export function QuizCard({ question, mode, onAnswered, initialBookmarked = false }: QuizCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [imageZoomed, setImageZoomed] = useState(false);
  const explanationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelected(null);
    setResult(null);
    setBookmarked(initialBookmarked);
    setImageZoomed(false);
  }, [question.id, initialBookmarked]);

  const handleSelect = useCallback(
    async (optionIndex: number) => {
      if (selected !== null || loading) return;
      setSelected(optionIndex);
      setLoading(true);

      try {
        const res = await fetch("/api/quiz/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ questionId: question.id, selectedOption: optionIndex, mode }),
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

  const getOptionClass = (index: number): string => {
    if (selected === null) {
      return "border-zinc-200 bg-white text-zinc-900 hover:border-teal-600 hover:bg-teal-50/50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-teal-500 dark:hover:bg-teal-950/30 cursor-pointer";
    }
    if (!result) return "border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100";

    if (index === result.correctOption) return "option-correct";
    if (index === selected && !result.correct) return "option-incorrect";
    return "border-zinc-200 bg-zinc-50/60 text-zinc-400 opacity-60 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-500";
  };

  return (
    <div className="w-full space-y-4">
      {/* Question Header Badges */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="flex items-center gap-1 rounded-full border border-zinc-200 bg-white px-2.5 py-0.5 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
          <GraduationCap size={12} className="text-teal-700 dark:text-teal-400" />
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
        <span className="ml-auto flex items-center gap-1 rounded-full border border-teal-200 bg-teal-50 px-2.5 py-0.5 font-medium text-teal-700 dark:border-teal-800 dark:bg-teal-950/70 dark:text-teal-300">
          {question.period}º Período
        </span>
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

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={selected !== null || loading}
              className={cn(
                "flex w-full items-start gap-3.5 rounded-xl border p-4 text-left text-sm transition-all duration-150",
                getOptionClass(index)
              )}
            >
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-xs font-bold transition-colors",
                  selected === null
                    ? "border-zinc-200 bg-zinc-100 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                    : isCorrect
                    ? "border-emerald-600 bg-emerald-600 text-white dark:border-emerald-500 dark:bg-emerald-500"
                    : isWrong
                    ? "border-red-600 bg-red-600 text-white dark:border-red-500 dark:bg-red-500"
                    : "border-zinc-200 bg-zinc-100 text-zinc-400 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-500"
                )}
              >
                {OPTION_LABELS[index]}
              </span>
              <span className="flex-1 leading-snug pt-0.5">{option}</span>
              {result && isCorrect && (
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              )}
              {result && isWrong && (
                <XCircle size={18} className="mt-0.5 shrink-0 text-red-600 dark:text-red-400" />
              )}
            </button>
          );
        })}
      </div>

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
              Próxima revisão: {result.nextReviewIn === 1 ? "amanhã" : `em ${result.nextReviewIn} dias`}
            </span>
          </div>
          <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
            {result.explanation}
          </p>
        </div>
      )}

      {/* Bottom Actions */}
      {result && (
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={toggleBookmark}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors",
              bookmarked
                ? "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-800/80 dark:bg-amber-950/40 dark:text-amber-300"
                : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            )}
          >
            {bookmarked ? <BookmarkCheck size={14} className="text-amber-600 dark:text-amber-400" /> : <Bookmark size={14} />}
            {bookmarked ? "Salvo no Caderno" : "Salvar no Caderno"}
          </button>

          <button
            onClick={onAnswered}
            className="flex items-center gap-1.5 rounded-lg bg-teal-700 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700"
          >
            Próxima Questão
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
