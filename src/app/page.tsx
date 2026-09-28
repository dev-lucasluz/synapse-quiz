import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import {
  Brain,
  Sparkles,
  BookOpen,
  Target,
  ArrowRight,
  ShieldCheck,
  Activity,
  Layers,
  Award,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function HomePage() {
  const session = await getSession();
  if (session) {
    redirect("/dashboard");
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Synapse Quiz",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "description":
      "Plataforma inteligente de preparação para Residência Médica e ENARE com algoritmo de repetição espaçada SM-2, banco de mais de 600 questões comentadas e simulados cronometrados.",
    "url": "https://synapsequiz.vercel.app",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL",
    },
    "author": {
      "@type": "Organization",
      "name": "Synapse Quiz",
    },
  };

  return (
    <div className="landing-page min-h-screen text-zinc-900 dark:text-zinc-100 selection:bg-orange-500/30 selection:text-amber-800 dark:selection:text-amber-200 relative overflow-hidden transition-colors duration-300">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Navbar */}
      <header className="border-b border-zinc-200/80 bg-white/80 dark:border-zinc-800/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-black border border-zinc-800 flex items-center justify-center text-amber-400 shadow-xs">
              <Brain className="h-5 w-5 text-amber-400" />
            </div>
            <span
              style={{ fontFamily: "'Tourney', cursive" }}
              className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500"
            >
              SYNAPSE QUIZ
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Seletor de Tema Claro/Escuro ao lado do botão Entrar */}
            <ThemeToggle />
            <Link
              href="/login"
              className="px-3.5 py-2 text-sm font-semibold text-zinc-700 hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-white transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-[#f59e0b] via-[#ea580c] to-[#c2410c] hover:from-[#d97706] hover:via-[#c2410c] hover:to-[#9a3412] text-white transition-colors shadow-sm"
            >
              Criar Conta
            </Link>
          </div>
        </div>
      </header>

      {/* Hero & Semantic Content */}
      <main className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300 dark:border-amber-500/40 text-xs font-bold uppercase tracking-wider mb-6 shadow-xs dark:shadow-[0_0_15px_rgba(245,158,11,0.15)]">
          <Sparkles className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
          Preparação Médica Baseada em Evidências
        </div>

        {/* H1 - Main Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6 leading-tight drop-shadow-xs dark:drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
          Synapse Quiz — Plataforma Inteligente de Questões Médicas e Residência
        </h1>

        {/* Primary intro */}
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-200 leading-relaxed max-w-3xl mb-8 font-normal">
          O Synapse Quiz combina resolução ativa de questões com o algoritmo de repetição espaçada
          SuperMemo-2 (SM-2) para maximizar sua taxa de retenção a longo prazo nos exames de
          Residência Médica e no Exame Nacional de Residência ENARE.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-16">
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#f59e0b] via-[#ea580c] to-[#c2410c] hover:from-[#d97706] hover:via-[#c2410c] hover:to-[#9a3412] text-white font-bold text-base transition-all shadow-lg shadow-orange-950/20 dark:shadow-orange-950/40"
          >
            Começar Gratuitamente
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900/90 dark:hover:bg-zinc-800 dark:text-white font-semibold text-base transition-colors shadow-xs"
          >
            Acessar Conta Existente
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-zinc-300/80 bg-white/80 hover:bg-zinc-100 text-zinc-700 dark:border-zinc-700/80 dark:bg-zinc-900/60 dark:hover:bg-zinc-800/80 dark:text-zinc-200 text-sm font-medium transition-colors shadow-2xs"
          >
            Ver Demonstração do Painel
          </Link>
        </div>

        {/* Section 1: SM-2 Methodology */}
        <section className="mb-16 border border-zinc-200/90 bg-white/85 dark:border-zinc-800/90 dark:bg-zinc-900/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-lg dark:shadow-xl transition-colors duration-300">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="h-6 w-6 text-orange-600 dark:text-amber-400" />
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Metodologia de Aprendizado Ativo e Algoritmo SM-2
            </h2>
          </div>
          <p className="text-zinc-700 dark:text-zinc-200 leading-relaxed mb-4">
            A retenção de conteúdo médico complexo exige revisão sistemática antes que a curva do esquecimento
            de Ebbinghaus atue. Nosso motor algorítmico calcula o momento exato em que cada conceito deve ser
            retestado com base na dificuldade relatada pelo estudante (Fácil, Médio, Difícil ou Errei),
            otimizando o tempo diário de estudo e fixando o conhecimento na memória de longo prazo.
          </p>
          <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
            Ao invés de releituras passivas de apostilas, o estudante é colocado diante do desafio clínico real,
            exercitando o raciocínio diagnóstico e terapêutico exigido pelas principais bancas examinadoras.
          </p>
        </section>

        {/* Section 2: Platform Features */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Layers className="h-6 w-6 text-orange-600 dark:text-amber-400" />
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Recursos Essenciais para Estudantes de Medicina
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Feature 1 */}
            <article className="border border-zinc-200/90 bg-white/85 dark:border-zinc-800/90 dark:bg-zinc-900/70 backdrop-blur-md p-6 rounded-xl shadow-md dark:shadow-lg hover:border-amber-500/40 transition-all duration-300">
              <BookOpen className="h-8 w-8 text-orange-600 dark:text-amber-400 mb-3" />
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                Banco de Questões Comentadas por Especialistas
              </h3>
              <p className="text-zinc-600 dark:text-zinc-200 text-sm leading-relaxed">
                Mais de 600 questões criteriosamente selecionadas em 12 disciplinas do 1º ao 6º período,
                do ciclo básico (Anatomia, Fisiologia, Bioquímica, Patologia...) ao clínico inicial
                (Semiologia, Farmacologia Clínica, Saúde Coletiva, Diagnóstico por Imagem), com gabarito
                fundamentado item a item.
              </p>
            </article>

            {/* Feature 2 */}
            <article className="border border-zinc-200/90 bg-white/85 dark:border-zinc-800/90 dark:bg-zinc-900/70 backdrop-blur-md p-6 rounded-xl shadow-md dark:shadow-lg hover:border-amber-500/40 transition-all duration-300">
              <Target className="h-8 w-8 text-orange-600 dark:text-amber-400 mb-3" />
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                Simulados Realistas para ENARE e Residências
              </h3>
              <p className="text-zinc-600 dark:text-zinc-200 text-sm leading-relaxed">
                Treine com cronômetro regressivo, bloqueio de consultas e ponderação oficial por especialidade.
                Avalie sua gestão de tempo e compare sua pontuação com a média de candidatos de todo o país.
              </p>
            </article>

            {/* Feature 3 */}
            <article className="border border-zinc-200/90 bg-white/85 dark:border-zinc-800/90 dark:bg-zinc-900/70 backdrop-blur-md p-6 rounded-xl shadow-md dark:shadow-lg hover:border-amber-500/40 transition-all duration-300">
              <ShieldCheck className="h-8 w-8 text-orange-600 dark:text-amber-400 mb-3" />
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                Caderno de Erros Inteligente e Métricas Clínicas
              </h3>
              <p className="text-zinc-600 dark:text-zinc-200 text-sm leading-relaxed">
                Cada erro cometido é arquivado com anotações personalizadas para reciclagem imediata.
                Acompanhe gráficos semanais de taxa de acerto, sequências de estudo (streaks) e progresso
                curricular por semestre ou faculdade.
              </p>
            </article>
          </div>
        </section>

        {/* Section 3: Final CTA */}
        <section className="border border-amber-500/30 rounded-2xl bg-gradient-to-br from-amber-50/90 via-white to-orange-50/70 dark:from-orange-950/40 dark:via-zinc-900/80 dark:to-zinc-950 p-8 sm:p-12 text-center shadow-xl dark:shadow-2xl transition-colors duration-300">
          <Award className="h-10 w-10 text-orange-600 dark:text-amber-400 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-4">
            Comece Sua Preparação Hoje
          </h2>
          <p className="text-zinc-600 dark:text-zinc-200 max-w-xl mx-auto mb-8 text-base">
            Junte-se a milhares de estudantes de medicina que utilizam repetição espaçada e estudo
            ativo para conquistar as melhores vagas de residência médica no Brasil.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/register"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#f59e0b] via-[#ea580c] to-[#c2410c] hover:from-[#d97706] hover:via-[#c2410c] hover:to-[#9a3412] text-white font-bold text-base transition-colors shadow-md"
            >
              Criar Conta Gratuita
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800/90 dark:hover:bg-zinc-700 dark:text-zinc-100 font-semibold text-base transition-colors shadow-xs"
            >
              Fazer Login
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200/80 bg-white/70 dark:border-zinc-800/80 dark:bg-zinc-950/80 py-8 text-xs text-zinc-500 dark:text-zinc-400 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Synapse Quiz. Todos os direitos reservados.</p>
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
            Plataforma Médica & Preparação para Residência (ENARE / R1 / R3)
          </p>
        </div>
      </footer>
    </div>
  );
}
