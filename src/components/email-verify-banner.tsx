"use client";

import React, { useState } from "react";
import { Loader2, MailWarning } from "lucide-react";

/** Aviso exibido no painel enquanto o e-mail da conta não foi verificado. */
export function EmailVerifyBanner({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  async function resend() {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/auth/send-verification", { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setIsError(false);
        setMessage(
          data.alreadyVerified
            ? "Seu e-mail já está verificado. Atualize a página."
            : "Enviamos um novo link. Confira sua caixa de entrada e o spam."
        );
      } else {
        setIsError(true);
        setMessage(data.error || "Não foi possível enviar agora.");
      }
    } catch {
      setIsError(true);
      setMessage("Erro ao conectar com o servidor");
    }
    setLoading(false);
  }

  return (
    <div
      role="status"
      className={
        "flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-sm text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200 sm:flex-row sm:items-center sm:justify-between " +
        (className ?? "")
      }
    >
      <div className="flex items-start gap-3">
        <MailWarning size={18} className="mt-0.5 shrink-0" />
        <p>
          Confirme seu e-mail para ativar o bônus de cota por indicação. Enviamos um link para a
          sua caixa de entrada.
          {message && (
            <span className={"mt-1 block font-medium " + (isError ? "text-red-700 dark:text-red-400" : "")}>
              {message}
            </span>
          )}
        </p>
      </div>
      <button
        type="button"
        onClick={resend}
        disabled={loading}
        className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-amber-600 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-amber-700 disabled:opacity-60"
      >
        {loading && <Loader2 size={14} className="animate-spin" />}
        Reenviar e-mail
      </button>
    </div>
  );
}
