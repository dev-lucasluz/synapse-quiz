"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Brain, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Credenciais inválidas");
        setLoading(false);
        return;
      }
      // Redireciona com reload completo garantindo leitura do cookie de sessão
      window.location.href = "/dashboard";
    } catch {
      setError("Erro ao conectar com o servidor");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-zinc-950">
      <div className="w-full max-w-sm">
        {/* Logo & Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-700 text-white shadow-xs dark:bg-teal-600">
            <Brain size={22} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Synapse Quiz
          </h1>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Estudo ativo e repetição espaçada para estudantes de medicina
          </p>
        </div>

        {/* Card Form */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <form onSubmit={handleSubmit} method="POST" action="#" className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                E-mail acadêmico ou pessoal
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu.email@universidade.br"
                className="w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-xs text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-teal-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 pr-10 text-xs text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-teal-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                  tabIndex={-1}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-2.5 text-xs text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700",
                loading && "cursor-not-allowed opacity-75"
              )}
            >
              {loading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <>
                  Entrar na Plataforma
                  <ArrowRight size={13} />
                </>
              )}
            </button>
          </form>

          {/* Demo credential box */}
          <div className="mt-5 rounded-lg border border-teal-100 bg-teal-50/70 p-3 text-xs dark:border-teal-900/50 dark:bg-teal-950/30">
            <p className="font-semibold text-teal-800 dark:text-teal-300">Acesso Rápido de Teste:</p>
            <div className="mt-2">
              <button
                type="button"
                onClick={() => {
                  setEmail("demo@synapse.med");
                  setPassword("senha-removida");
                  setError("");
                }}
                className="flex w-full items-center justify-between rounded-md border border-teal-200 bg-white px-2.5 py-1.5 text-left text-xs text-teal-900 transition-colors hover:bg-teal-100/60 dark:border-teal-800 dark:bg-zinc-800 dark:text-teal-200"
              >
                <span className="font-medium">🩺 Estudante Demo (Acesso Rápido)</span>
                <span className="font-mono text-[11px] text-zinc-500">senha-removida</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <p className="mt-5 text-center text-xs text-zinc-500 dark:text-zinc-400">
          Ainda não possui conta?{" "}
          <Link href="/register" className="font-semibold text-teal-700 hover:underline dark:text-teal-400">
            Criar conta gratuita
          </Link>
        </p>
      </div>
    </div>
  );
}
