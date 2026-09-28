"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Loader2, MailCheck } from "lucide-react";
import { AuthShell, authButtonClass, authInputClass } from "@/components/auth-shell";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Não foi possível enviar agora.");
      } else {
        setSent(true);
      }
    } catch {
      setError("Erro ao conectar com o servidor");
    }
    setLoading(false);
  }

  return (
    <AuthShell
      title="Recuperar senha"
      subtitle="Informe o e-mail da sua conta e enviaremos um link para criar uma nova senha."
    >
      {sent ? (
        <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-300">
          <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
            <MailCheck size={18} className="mt-0.5 shrink-0" />
            <p>
              Se esse e-mail estiver cadastrado, enviamos um link para redefinir a senha. Ele vale
              por 30 minutos. Confira também a caixa de spam.
            </p>
          </div>
          <Link href="/login" className="font-bold text-amber-700 underline dark:text-amber-400">
            Voltar para o login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="seu.email@faculdade.br"
              className={authInputClass}
            />
          </div>

          {error && (
            <p role="alert" className="text-xs font-medium text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} className={authButtonClass}>
            {loading && <Loader2 size={16} className="animate-spin" />}
            <span>Enviar link</span>
          </button>

          <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
            Lembrou a senha?{" "}
            <Link href="/login" className="font-bold text-zinc-900 underline dark:text-zinc-100">
              Entrar
            </Link>
          </p>
        </form>
      )}
    </AuthShell>
  );
}
