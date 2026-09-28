"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Brain,
  Mail,
  Lock,
  User,
  Ticket,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Target,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "signin";
  const refCode = searchParams.get("ref") || "";

  const [mode, setMode] = useState<"signin" | "signup">(initialMode);

  // Estado de Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginShowPass, setLoginShowPass] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Estado de Cadastro
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regReferral, setRegReferral] = useState(refCode);
  const [regShowPass, setRegShowPass] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState("");

  useEffect(() => {
    if (searchParams.get("mode") === "signup") {
      setMode("signup");
    }
  }, [searchParams]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();

      if (!res.ok) {
        setLoginError(data.error || "Credenciais inválidas");
        setLoginLoading(false);
        return;
      }
      window.location.href = "/dashboard";
    } catch {
      setLoginError("Erro ao conectar com o servidor");
      setLoginLoading(false);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (regPassword.length < 8) {
      setRegError("A senha deve conter no mínimo 8 caracteres");
      return;
    }
    setRegLoading(true);
    setRegError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          password: regPassword,
          referralCode: regReferral || undefined,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setRegError(data.error || "Erro ao registrar usuário");
        setRegLoading(false);
        return;
      }
      window.location.href = "/dashboard";
    } catch {
      setRegError("Erro ao conectar com o servidor");
      setRegLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-3 sm:p-6 lg:p-8 font-heading">
      {/* Rótulo superior / Balão de branding */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/70 px-4 py-1.5 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/60 select-none">
        <Brain size={14} className="text-amber-500 dark:text-amber-400" />
        <span className="text-xs font-bold tracking-wider text-zinc-800 dark:text-zinc-200">
          SINAPSE QUIZ
        </span>
        <span className="text-[10px] text-zinc-400">•</span>
        <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
          Plataforma Médica
        </span>
      </div>

      {/* Card Principal: Layout deslizante (Vertical no Mobile, Horizontal no Desktop) */}
      <div className="relative w-full max-w-4xl h-[720px] md:h-[580px] overflow-hidden rounded-3xl border border-white/60 bg-white/85 shadow-2xl shadow-orange-950/10 backdrop-blur-xl dark:border-white/10 dark:bg-[#0c0d1a]/85 dark:shadow-black/60">
        
        {/* Container das Duas Metades de Formulário */}
        <div className="flex flex-col md:grid md:grid-cols-2 h-full w-full">
          
          {/* METADE 1: Formulário de Entrada (Sign In) */}
          {/* No mobile: Topo (h-1/2). No desktop: Esquerda (coluna 1). */}
          <div
            className={cn(
              "w-full h-1/2 md:h-full flex flex-col justify-center px-5 py-4 sm:px-10 md:py-12 transition-opacity duration-500",
              mode === "signin"
                ? "opacity-100 z-10 pointer-events-auto"
                : "opacity-0 z-0 pointer-events-none"
            )}
          >
            <div className="w-full max-w-sm mx-auto">
              <div className="mb-4 md:mb-6">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50/80 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/60 dark:text-amber-300">
                  <CheckCircle2 size={11} /> Acesso Acadêmico
                </span>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mt-1 md:mt-2">
                  Entrar
                </h1>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 md:mt-1">
                  Insira suas credenciais para acessar o painel
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-3 md:space-y-4">
                {/* Input Email */}
                <div>
                  <label className="mb-1 block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    E-mail
                  </label>
                  <div className="flex items-center gap-2.5 md:gap-3 rounded-xl md:rounded-2xl border border-zinc-200/90 bg-zinc-50/70 px-3.5 py-2 md:px-4 md:py-3 transition-all focus-within:border-amber-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-amber-500/15 dark:border-zinc-700/70 dark:bg-zinc-800/40 dark:focus-within:bg-zinc-800/90">
                    <Mail size={16} className="text-zinc-400 shrink-0" />
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      placeholder="seu.email@faculdade.br"
                      className="w-full bg-transparent text-xs md:text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                    />
                  </div>
                </div>

                {/* Input Senha */}
                <div>
                  <label className="mb-1 block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Senha
                  </label>
                  <div className="flex items-center gap-2.5 md:gap-3 rounded-xl md:rounded-2xl border border-zinc-200/90 bg-zinc-50/70 px-3.5 py-2 md:px-4 md:py-3 transition-all focus-within:border-amber-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-amber-500/15 dark:border-zinc-700/70 dark:bg-zinc-800/40 dark:focus-within:bg-zinc-800/90">
                    <Lock size={16} className="text-zinc-400 shrink-0" />
                    <input
                      type={loginShowPass ? "text" : "password"}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full bg-transparent text-xs md:text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                    />
                    <button
                      type="button"
                      onClick={() => setLoginShowPass(!loginShowPass)}
                      className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                      tabIndex={-1}
                    >
                      {loginShowPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* Manter conectado */}
                <div className="flex items-center gap-2 pt-0.5">
                  <input
                    type="checkbox"
                    id="keepSignedIn"
                    checked={keepSignedIn}
                    onChange={(e) => setKeepSignedIn(e.target.checked)}
                    className="h-3.5 w-3.5 md:h-4 md:w-4 rounded border-zinc-300 text-amber-600 focus:ring-amber-500 dark:border-zinc-700 dark:bg-zinc-800 accent-amber-500"
                  />
                  <label htmlFor="keepSignedIn" className="text-xs text-zinc-600 dark:text-zinc-400 cursor-pointer select-none">
                    Manter conectado
                  </label>
                </div>

                {loginError && (
                  <p className="rounded-xl border border-red-200 bg-red-50 p-2 md:p-3 text-xs text-red-600 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
                    {loginError}
                  </p>
                )}

                {/* Botão Entrar */}
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full rounded-xl md:rounded-2xl bg-gradient-to-r from-[#f59e0b] via-[#ea580c] to-[#c2410c] py-2.5 md:py-3.5 text-xs md:text-sm font-bold text-white shadow-lg shadow-orange-950/20 transition-all hover:from-[#d97706] hover:via-[#c2410c] hover:to-[#9a3412] active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loginLoading && <Loader2 size={16} className="animate-spin" />}
                  <span>Entrar</span>
                </button>

                {/* Link Criar Conta */}
                <div className="pt-1 text-center">
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    Novo no Sinapse?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("signup")}
                      className="font-bold text-zinc-900 underline hover:text-amber-600 dark:text-zinc-100 dark:hover:text-amber-400 cursor-pointer"
                    >
                      Criar uma conta
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* METADE 2: Formulário de Cadastro (Sign Up) */}
          {/* No mobile: Fundo/Base (h-1/2). No desktop: Direita (coluna 2). */}
          <div
            className={cn(
              "w-full h-1/2 md:h-full flex flex-col justify-center px-5 py-3.5 sm:px-10 md:py-12 transition-opacity duration-500",
              mode === "signup"
                ? "opacity-100 z-10 pointer-events-auto"
                : "opacity-0 z-0 pointer-events-none"
            )}
          >
            <div className="w-full max-w-sm mx-auto">
              <div className="mb-2 md:mb-5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50/80 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/60 dark:text-amber-300">
                  <Sparkles size={11} /> Cadastro Gratuito
                </span>
                <h1 className="text-xl md:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mt-0.5 md:mt-1">
                  Criar Conta
                </h1>
                <p className="text-[11px] md:text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Inicie seu plano diário com repetição espaçada
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-1.5 md:space-y-3">
                {/* Nome */}
                <div className="flex items-center gap-2.5 md:gap-3 rounded-xl md:rounded-2xl border border-zinc-200/90 bg-zinc-50/70 px-3 py-1.5 md:px-4 md:py-2.5 transition-all focus-within:border-amber-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-amber-500/15 dark:border-zinc-700/70 dark:bg-zinc-800/40">
                  <User size={15} className="text-zinc-400 shrink-0" />
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    required
                    placeholder="Nome completo (Dra. / Dr.)"
                    className="w-full bg-transparent text-xs md:text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
                  />
                </div>

                {/* Email */}
                <div className="flex items-center gap-2.5 md:gap-3 rounded-xl md:rounded-2xl border border-zinc-200/90 bg-zinc-50/70 px-3 py-1.5 md:px-4 md:py-2.5 transition-all focus-within:border-amber-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-amber-500/15 dark:border-zinc-700/70 dark:bg-zinc-800/40">
                  <Mail size={15} className="text-zinc-400 shrink-0" />
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                    placeholder="E-mail acadêmico ou pessoal"
                    className="w-full bg-transparent text-xs md:text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
                  />
                </div>

                {/* Senha */}
                <div className="flex items-center gap-2.5 md:gap-3 rounded-xl md:rounded-2xl border border-zinc-200/90 bg-zinc-50/70 px-3 py-1.5 md:px-4 md:py-2.5 transition-all focus-within:border-amber-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-amber-500/15 dark:border-zinc-700/70 dark:bg-zinc-800/40">
                  <Lock size={15} className="text-zinc-400 shrink-0" />
                  <input
                    type={regShowPass ? "text" : "password"}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                    placeholder="Senha (mínimo de 8 caracteres)"
                    className="w-full bg-transparent text-xs md:text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
                  />
                  <button
                    type="button"
                    onClick={() => setRegShowPass(!regShowPass)}
                    className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                    tabIndex={-1}
                  >
                    {regShowPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>

                {/* Código de convite */}
                <div className="flex items-center gap-2.5 md:gap-3 rounded-xl md:rounded-2xl border border-zinc-200/90 bg-zinc-50/70 px-3 py-1.5 md:px-4 md:py-2.5 transition-all focus-within:border-amber-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-amber-500/15 dark:border-zinc-700/70 dark:bg-zinc-800/40">
                  <Ticket size={15} className="text-zinc-400 shrink-0" />
                  <input
                    type="text"
                    value={regReferral}
                    onChange={(e) => setRegReferral(e.target.value)}
                    placeholder="Código de convite (opcional: +5 questões)"
                    className="w-full bg-transparent text-xs md:text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
                  />
                </div>

                {regError && (
                  <p className="rounded-xl border border-red-200 bg-red-50 p-2 text-xs text-red-600 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
                    {regError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={regLoading}
                  className="w-full rounded-xl md:rounded-2xl bg-gradient-to-r from-[#f59e0b] via-[#ea580c] to-[#c2410c] py-2.5 md:py-3.5 text-xs md:text-sm font-bold text-white shadow-lg shadow-orange-950/20 transition-all hover:from-[#d97706] hover:via-[#c2410c] hover:to-[#9a3412] active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer mt-0.5"
                >
                  {regLoading && <Loader2 size={16} className="animate-spin" />}
                  <span>Criar Conta</span>
                </button>

                <div className="pt-1 text-center">
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    Já tem uma conta?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("signin")}
                      className="font-bold text-zinc-900 underline hover:text-amber-600 dark:text-zinc-100 dark:hover:text-amber-400 cursor-pointer"
                    >
                      Entrar
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* ── PAINEL PÔR DO SOL / NASCER DO SOL DESLIZANTE INTERATIVO (Vertical no Mobile, Horizontal no Desktop) ── */}
        <div
          className={cn(
            "absolute z-20 flex flex-col items-center justify-center p-5 md:p-10 text-center transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] select-none",
            "bg-gradient-to-br from-[#fbbf24] via-[#f97316] to-[#c2410c] text-white shadow-2xl",
            // Dimensões: metade vertical no mobile (w-full h-1/2), metade horizontal no desktop (md:w-1/2 md:h-full)
            "w-full h-1/2 left-0 right-0 top-0 md:w-1/2 md:h-full md:bottom-0",
            // Deslize e curvatura de cantos:
            mode === "signin"
              ? // No modo Sign In: No mobile fica embaixo (translate-y-full). No desktop fica à direita (md:translate-x-full md:translate-y-0).
                "translate-y-full translate-x-0 rounded-t-[2.5rem] rounded-b-3xl md:translate-x-full md:translate-y-0 md:rounded-l-[2.5rem] md:rounded-r-3xl"
              : // No modo Sign Up: No mobile fica em cima (translate-y-0). No desktop fica à esquerda (md:translate-x-0 md:translate-y-0).
                "translate-y-0 translate-x-0 rounded-b-[2.5rem] rounded-t-3xl md:translate-x-0 md:translate-y-0 md:rounded-r-[2.5rem] md:rounded-l-3xl"
          )}
        >
          <div className="max-w-xs mx-auto space-y-2 md:space-y-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/20 px-3 py-0.5 md:px-3.5 md:py-1 text-[10px] md:text-[11px] font-semibold text-white backdrop-blur-xs shadow-inner">
              <Brain size={12} className="text-yellow-200" />
              <span>Residência Médica & ENARE</span>
            </div>

            <h2 className="font-elegant text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-white drop-shadow-md">
              {mode === "signin" ? "Bem-vindo de volta!" : "Comece sua Jornada!"}
            </h2>

            <div>
              <h3 className="font-brand text-xl md:text-2xl lg:text-3xl font-extrabold tracking-[0.1em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
                SINAPSE QUIZ
              </h3>
            </div>

            <p className="text-[11px] md:text-xs text-amber-50/95 leading-relaxed px-2 font-normal drop-shadow-xs">
              {mode === "signin"
                ? "Acesse para continuar sua rotina de estudos com repetição espaçada SM-2 e simulados cronometrados!"
                : "Crie sua conta para desbloquear o banco de questões comentadas e acompanhar sua retenção clínica!"}
            </p>

            {/* Mini Balões de Destaque */}
            <div className="hidden sm:flex flex-wrap items-center justify-center gap-1.5 pt-1">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/20 border border-white/25 px-2.5 py-0.5 text-[10px] text-white font-medium backdrop-blur-xs">
                <Sparkles size={10} className="text-yellow-200" /> Repetição SM-2
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/20 border border-white/25 px-2.5 py-0.5 text-[10px] text-white font-medium backdrop-blur-xs">
                <Target size={10} className="text-amber-200" /> Simulados
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/20 border border-white/25 px-2.5 py-0.5 text-[10px] text-white font-medium backdrop-blur-xs">
                <BookOpen size={10} className="text-yellow-100" /> Caderno de Erros
              </span>
            </div>

            {/* Botão de Alternância no Painel Pôr do Sol */}
            <div className="pt-1.5 md:pt-3">
              <button
                type="button"
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                className="inline-flex items-center justify-center gap-2.5 min-w-[170px] md:min-w-[200px] rounded-2xl border border-white/40 bg-white/20 px-7 py-2.5 md:px-8 md:py-3 text-sm md:text-base font-bold tracking-wide text-white backdrop-blur-md transition-all hover:bg-white/30 hover:border-white/60 active:scale-95 cursor-pointer shadow-lg"
              >
                <span>{mode === "signin" ? "Criar Conta" : "Entrar"}</span>
                {/* Ícone contextual: vertical no mobile, horizontal no desktop */}
                {mode === "signin" ? (
                  <>
                    <ArrowUp size={15} className="md:hidden" />
                    <ArrowRight size={16} className="hidden md:inline" />
                  </>
                ) : (
                  <>
                    <ArrowDown size={15} className="md:hidden" />
                    <ArrowLeft size={16} className="hidden md:inline" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 size={24} className="animate-spin text-amber-500" />
        </div>
      }
    >
      <AuthContent />
    </Suspense>
  );
}
