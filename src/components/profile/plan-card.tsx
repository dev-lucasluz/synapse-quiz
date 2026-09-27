"use client";

import { useState } from "react";
import { Zap, Check, Sparkles, ShieldCheck, ArrowRight, RefreshCw, Crown, AlertCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PlanCardProps {
  currentPlan: string;
  onPlanChange: (newPlan: "free" | "pro") => Promise<void>;
  className?: string;
}

export function PlanCard({ currentPlan, onPlanChange, className }: PlanCardProps) {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isPro = currentPlan === "pro";

  async function handleTogglePlan(targetPlan: "free" | "pro") {
    setLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      await onPlanChange(targetPlan);
      if (targetPlan === "pro") {
        setSuccessMsg("Parabéns! Conta PRO ativada com sucesso!");
      } else {
        setSuccessMsg("Plano alterado para Gratuito.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao alterar o plano.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  }

  const proFeatures = [
    { title: "Questões ilimitadas", desc: "Sem travas ou limites diários" },
    { title: "Banco de Residência", desc: "ENARE, USP, Revalida (R1/R3)" },
    { title: "Simulado com Cronômetro", desc: "Ambiente real com métricas" },
    { title: "Caderno sem limites", desc: "Armazene todos os erros" },
  ];

  return (
    <div
      id="plano-pro"
      className={cn(
        "rounded-2xl border p-6 shadow-xs flex flex-col justify-between transition-all",
        isPro
          ? "border-teal-300/80 bg-linear-to-b from-teal-50/40 to-white dark:border-teal-900/60 dark:from-teal-950/20 dark:to-zinc-900"
          : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900",
        className
      )}
    >
      <div>
        {/* ── Top Header ───────────────────────────────────────────────────── */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                isPro
                  ? "bg-teal-700 text-white dark:bg-teal-600 shadow-2xs"
                  : "bg-amber-400/20 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400"
              )}
            >
              {isPro ? <Crown size={18} /> : <Zap size={18} />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                  Plano & Assinatura
                </h3>
                {isPro ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-teal-100 px-2 py-0.5 text-[9px] font-bold text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                    <Sparkles size={10} />
                    <span>PRO ATIVO</span>
                  </span>
                ) : (
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[9px] font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    GRATUITO
                  </span>
                )}
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                {isPro ? "Acesso total liberado" : "Cotas diárias ativas"}
              </p>
            </div>
          </div>

          <Link
            href="/pricing"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 transition-colors"
          >
            <span>Planos</span>
            <ArrowRight size={11} />
          </Link>
        </div>

        {/* ── Mensagem de Feedback ─────────────────────────────────────────── */}
        {successMsg && (
          <div className="mb-3.5 flex items-center gap-2 rounded-xl border border-teal-200/90 bg-teal-50/80 p-2.5 text-xs text-teal-900 dark:border-teal-900/60 dark:bg-teal-950/50 dark:text-teal-200">
            <ShieldCheck size={14} className="text-teal-700 dark:text-teal-400 shrink-0" />
            <span className="font-medium text-[11px]">{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="mb-3.5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-2.5 text-xs text-red-900 dark:border-red-900/60 dark:bg-red-950/50 dark:text-red-200">
            <AlertCircle size={14} className="text-red-600 shrink-0" />
            <span className="font-medium text-[11px]">{errorMsg}</span>
          </div>
        )}

        {/* ── Subtítulo de Destaque ────────────────────────────────────────── */}
        <div className="mb-3">
          <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            {isPro
              ? "Você tem acesso ilimitado a todas as ferramentas:"
              : "Desbloqueie todo o potencial médico com o Pro:"}
          </p>
        </div>

        {/* ── Grid 2x2 de Benefícios ───────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {proFeatures.map((feat) => (
            <div
              key={feat.title}
              className={cn(
                "rounded-xl p-2 flex items-start gap-2 border transition-colors",
                isPro
                  ? "border-teal-200/60 bg-teal-50/40 dark:border-teal-900/40 dark:bg-teal-950/20"
                  : "border-zinc-100 bg-zinc-50/70 dark:border-zinc-800/80 dark:bg-zinc-800/40"
              )}
            >
              <div
                className={cn(
                  "flex h-4 w-4 shrink-0 items-center justify-center rounded-full mt-0.5",
                  isPro
                    ? "bg-teal-700 text-white dark:bg-teal-500"
                    : "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300"
                )}
              >
                <Check size={9} strokeWidth={3} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-zinc-900 dark:text-zinc-100 truncate">
                  {feat.title}
                </p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Ações no Rodapé ──────────────────────────────────────────────── */}
      <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
        {isPro ? (
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
              Modo de teste / demonstração
            </span>
            <button
              type="button"
              disabled={loading}
              onClick={() => handleTogglePlan("free")}
              className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 transition-colors"
            >
              {loading && <RefreshCw size={10} className="animate-spin text-zinc-400" />}
              <span>Testar Conta Gratuita</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            disabled={loading}
            onClick={() => handleTogglePlan("pro")}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 py-2.5 px-4 text-xs font-bold text-white shadow-sm shadow-teal-700/20 hover:bg-teal-800 active:scale-98 transition-all dark:bg-teal-600 dark:hover:bg-teal-500 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw size={13} className="animate-spin" />
                <span>Ativando PRO...</span>
              </>
            ) : (
              <>
                <Crown size={14} className="fill-white" />
                <span>Virar Assinante PRO Agora</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
