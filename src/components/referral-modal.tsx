"use client";

import { useState } from "react";
import { Copy, Check, X, Share2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ReferralModalProps {
  referralCode: string;
  used: number;
  max: number;
  onClose: () => void;
}

export function ReferralModal({ referralCode, used, max, onClose }: ReferralModalProps) {
  const [copied, setCopied] = useState(false);

  const referralUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/register?ref=${referralCode}`
      : `https://synapse.med/register?ref=${referralCode}`;

  const canEarnMore = used >= 10 && max < 20;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(referralUrl);
    } catch {
      const input = document.getElementById("referral-input") as HTMLInputElement;
      input?.select();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs sm:items-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
        >
          <X size={15} />
        </button>

        {/* Header */}
        <div className="mb-5">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/60">
            <Share2 size={18} className="text-orange-600 dark:text-amber-400" />
          </div>
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
            Meta diária concluída!
          </h2>
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm">
            {canEarnMore
              ? "Deseja desbloquear mais 5 perguntas para continuar hoje?"
              : "Você atingiu a cota máxima de 20 questões diárias."}
          </p>
        </div>

        {/* Stats Row */}
        <div className="mb-4 flex gap-3">
          <div className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 p-2.5 text-center dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-lg font-bold tabular-nums text-zinc-900 dark:text-zinc-50">{used}</p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">respondidas</p>
          </div>
          <div className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 p-2.5 text-center dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-lg font-bold tabular-nums text-zinc-900 dark:text-zinc-50">{max}</p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">limite atual</p>
          </div>
          {canEarnMore && (
            <div className="flex-1 rounded-lg border border-amber-200 bg-amber-50 p-2.5 text-center dark:border-amber-900/60 dark:bg-amber-950/60">
              <p className="text-lg font-bold tabular-nums text-orange-600 dark:text-amber-400">+5</p>
              <p className="text-[11px] text-orange-700 dark:text-amber-400">por colega</p>
            </div>
          )}
        </div>

        {/* Explanatory text */}
        {canEarnMore && (
          <p className="mb-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
            Convide um colega de turma com o seu link exclusivo. Cada novo cadastro confirmado
            libera <strong className="text-zinc-900 dark:text-zinc-100">+5 perguntas</strong> (limite de até{" "}
            <strong className="text-zinc-900 dark:text-zinc-100">20/dia</strong> com 2 indicações).
          </p>
        )}

        {/* Link Input */}
        <div className="mb-4 flex items-center gap-2">
          <input
            id="referral-input"
            type="text"
            readOnly
            value={referralUrl}
            className="flex-1 truncate rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 font-mono text-xs text-zinc-800 outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200"
          />
          <button
            onClick={handleCopy}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-all",
              copied
                ? "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300"
                : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
            )}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Copiado!" : "Copiar"}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <Link
            href="/notebook"
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 py-2.5 text-xs font-semibold text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
          >
            Treinar no Caderno de Erros
            <ArrowRight size={13} />
          </Link>
          <Link
            href="/dashboard"
            onClick={onClose}
            className="text-center text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 py-1"
          >
            Voltar ao painel
          </Link>
        </div>
      </div>
    </div>
  );
}
