import Link from "next/link";
import { Brain, ArrowLeft, Home, LayoutDashboard } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#030712] text-zinc-100 flex flex-col justify-between p-6">
      <header className="max-w-4xl mx-auto w-full pt-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-black border border-zinc-800 flex items-center justify-center text-amber-400 shadow-xs">
            <Brain className="h-5 w-5 text-amber-400" />
          </div>
          <span
            style={{ fontFamily: "'Tourney', cursive" }}
            className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500"
          >
            SYNAPSE QUIZ
          </span>
        </Link>
      </header>

      <main className="max-w-md mx-auto text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-2xl font-bold mb-6">
          404
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-3">
          Página Não Encontrada
        </h1>
        <p className="text-zinc-400 text-sm leading-relaxed mb-8">
          O endereço acessado não existe ou foi movido. Navegue pelas opções abaixo para continuar
          seus estudos médicos.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f59e0b] via-[#ea580c] to-[#c2410c] hover:from-[#d97706] hover:via-[#c2410c] hover:to-[#9a3412] text-white font-semibold text-sm transition-colors"
          >
            <Home className="h-4 w-4" />
            Página Inicial
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 font-semibold text-sm transition-colors"
          >
            <LayoutDashboard className="h-4 w-4" />
            Painel do Aluno
          </Link>
        </div>
      </main>

      <footer className="max-w-4xl mx-auto w-full text-center pb-8 text-xs text-zinc-600">
        <p>Synapse Quiz — Plataforma Inteligente de Questões Médicas & Residência</p>
      </footer>
    </div>
  );
}
