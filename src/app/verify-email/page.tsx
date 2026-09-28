"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { AuthShell, authButtonClass } from "@/components/auth-shell";

function VerifyContent() {
  const token = useSearchParams().get("token") || "";
  const [state, setState] = useState<"loading" | "ok" | "error">(token ? "loading" : "error");
  const [message, setMessage] = useState(token ? "" : "Este link de verificação está incompleto.");
  // Evita consumir o token duas vezes (React Strict Mode roda o efeito duas vezes em dev).
  const started = useRef(false);

  useEffect(() => {
    if (!token || started.current) return;
    started.current = true;

    fetch("/api/auth/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (res.ok) {
          setState("ok");
        } else {
          setMessage(data.error || "Link inválido ou expirado.");
          setState("error");
        }
      })
      .catch(() => {
        setMessage("Erro ao conectar com o servidor");
        setState("error");
      });
  }, [token]);

  if (state === "loading") {
    return (
      <AuthShell title="Confirmando e-mail">
        <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300">
          <Loader2 size={18} className="animate-spin text-amber-500" />
          Só um instante...
        </div>
      </AuthShell>
    );
  }

  if (state === "ok") {
    return (
      <AuthShell title="E-mail confirmado">
        <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-300">
          <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
            <p>Tudo certo! Seu e-mail foi verificado e o bônus de indicações já vale na sua conta.</p>
          </div>
          <Link href="/dashboard" className={authButtonClass}>
            Ir para o painel
          </Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell title="Não foi possível confirmar">
      <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-300">
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50/80 p-4 text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
          <XCircle size={18} className="mt-0.5 shrink-0" />
          <p>{message}</p>
        </div>
        <p>
          Entre na sua conta e peça um novo e-mail de verificação pelo aviso no painel.
        </p>
        <Link href="/login" className={authButtonClass}>
          Ir para o login
        </Link>
      </div>
    </AuthShell>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyContent />
    </Suspense>
  );
}
