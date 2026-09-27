"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { PLANS } from "@/lib/billing";
import {
  CheckCircle2,
  Zap,
  Brain,
  BookOpen,
  BarChart3,
  Filter,
  ShieldCheck,
  Infinity,
  Clock,
  Lock,
  Target,
  Sparkles,
  Timer,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UserData {
  user: { name: string; plan: string };
}

export default function PricingPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setUserData(d));
  }, []);

  const currentPlan = userData?.user?.plan ?? "free";

  async function handleUpgrade() {
    setLoading(true);
    alert(
      "💳 Módulo de Pagamento em Preparação!\n\nA infraestrutura de Stripe e modelos de dados já estão arquitetados. O checkout será ativado quando a plataforma for disponibilizada online."
    );
    setLoading(false);
  }

  const proFeatures = [
    { icon: Infinity, text: "Questões ilimitadas por dia (sem travas ou cotas)" },
    { icon: Brain, text: "Acesso a questões exclusivas e bancos de Residência Médica (R1/R3)" },
    { icon: BookOpen, text: "Caderno de erros com capacidade ilimitada" },
    { icon: BarChart3, text: "Métricas aprofundadas de curva de esquecimento e retenção" },
    { icon: Filter, text: "Filtros avançados por banca (ENARE, Revalida, USP) e ciclo" },
    { icon: ShieldCheck, text: "Estudo contínuo sem interrupções" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <Navbar userName={userData?.user.name} plan={currentPlan} />

      <main className="mx-auto max-w-4xl px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="mb-2.5 inline-block rounded-full border border-teal-200 bg-teal-50 px-3 py-0.5 text-xs font-semibold text-teal-700 dark:border-teal-900 dark:bg-teal-950/60 dark:text-teal-400">
            Planos Acadêmicos
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            Invista na sua aprovação e retenção clínica
          </h1>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
            Estude com repetição espaçada no plano gratuito ou desbloqueie todo o acervo médico no Pro.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Free Plan */}
          <div
            className={cn(
              "relative flex flex-col rounded-xl border bg-white p-6 shadow-xs dark:bg-zinc-900",
              currentPlan === "free"
                ? "border-zinc-300 dark:border-zinc-700"
                : "border-zinc-200 dark:border-zinc-800"
            )}
          >
            {currentPlan === "free" && (
              <span className="absolute -top-3 left-5 rounded-full border border-zinc-200 bg-zinc-100 px-3 py-0.5 text-[11px] font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                Plano Atual
              </span>
            )}
            <div className="mb-6">
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                {PLANS.free.name}
              </h2>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                {PLANS.free.description}
              </p>
              <div className="mt-4 flex items-baseline">
                <span className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">
                  R$ 0
                </span>
                <span className="ml-1 text-xs text-zinc-400">/mês</span>
              </div>
            </div>

            <ul className="mb-8 flex-1 space-y-3 border-t border-zinc-100 pt-5 dark:border-zinc-800">
              {[
                "10 questões por dia no Modo Diário",
                "Até 20 questões/dia através de indicações (+5 por colega)",
                "Caderno de Erros com cota própria (20 questões/dia)",
                "Algoritmo SM-2 de repetição espaçada",
                "Alternância entre Modo Claro e Escuro",
              ].map((feat) => (
                <li key={feat} className="flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-teal-700 dark:text-teal-400" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            {currentPlan === "free" ? (
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 py-2.5 text-center text-xs font-semibold text-zinc-600 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-400">
                Plano Ativo
              </div>
            ) : (
              <button
                onClick={() => router.push("/dashboard")}
                className="rounded-lg border border-zinc-200 bg-white py-2.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
              >
                Voltar ao Dashboard
              </button>
            )}
          </div>

          {/* Pro Plan */}
          <div
            className={cn(
              "relative flex flex-col rounded-xl border-2 bg-white p-6 shadow-sm dark:bg-zinc-900",
              currentPlan === "pro"
                ? "border-teal-700 dark:border-teal-500"
                : "border-teal-700/60 dark:border-teal-600/50"
            )}
          >
            {currentPlan === "pro" ? (
              <span className="absolute -top-3 left-5 rounded-full bg-teal-700 px-3 py-0.5 text-[11px] font-semibold text-white dark:bg-teal-600">
                Assinatura Ativa
              </span>
            ) : (
              <span className="absolute -top-3 left-5 rounded-full bg-amber-500 px-3 py-0.5 text-[11px] font-semibold text-white shadow-2xs">
                ⏳ Em Breve • Lançamento Oficial
              </span>
            )}

            <div className="mb-6">
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                {PLANS.pro.name}
              </h2>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                {PLANS.pro.description}
              </p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-zinc-900 sm:text-3xl dark:text-zinc-50">
                  A definir
                </span>
                <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-bold text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                  Em Breve
                </span>
              </div>
              <p className="mt-0.5 text-[11px] text-zinc-400">
                Valores e condições especiais serão divulgados no lançamento oficial
              </p>
            </div>

            <ul className="mb-6 flex-1 space-y-3 border-t border-zinc-100 pt-5 dark:border-zinc-800">
              <li className="text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
                Todos os recursos do Gratuito, mais:
              </li>
              {proFeatures.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                  <Icon size={15} className="mt-0.5 shrink-0 text-teal-700 dark:text-teal-400" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            {currentPlan === "pro" ? (
              <div className="rounded-lg border border-teal-200 bg-teal-50 py-2.5 text-center text-xs font-semibold text-teal-800 dark:border-teal-900 dark:bg-teal-950/60 dark:text-teal-300">
                ✓ Assinatura Pro Ativa
              </div>
            ) : (
              <div className="space-y-3">
                <div className="rounded-xl border border-amber-200/90 bg-amber-50/90 p-3.5 text-left dark:border-amber-900/60 dark:bg-amber-950/30">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-200">
                    <Clock size={14} className="shrink-0 text-amber-600 dark:text-amber-400" />
                    Assinaturas Online em Breve!
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-amber-800/90 dark:text-amber-300/80">
                    O módulo de pagamento e checkout digital está em calibração final para a nova turma. No momento, o plano gratuito está liberado para todos os acadêmicos!
                  </p>
                </div>

                <button
                  type="button"
                  disabled
                  className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-zinc-100 py-3 text-xs font-semibold text-zinc-400 shadow-2xs dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-500"
                >
                  <Lock size={14} />
                  Plano Pro — Adesões em Breve
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Pro Plan Feature Deep Dive: O que estará incluído */}
        <section className="mt-14 rounded-2xl border border-teal-200/80 bg-white p-6 shadow-sm dark:border-teal-900/60 dark:bg-zinc-900 sm:p-8">
          <div className="mb-6 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800 dark:bg-teal-950 dark:text-teal-300">
              <Sparkles size={13} className="text-teal-600 dark:text-teal-400" />
              O Que Vem por Aí no Synapse Pro
            </span>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-2xl">
              Projetado sob medida para a sua aprovação na Residência
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-sm">
              Quando a assinatura Pro for liberada para contratação online, você terá acesso imediato a ferramentas avançadas de alto rendimento:
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Destaque 1: Modo Simulado Cronometrado */}
            <div className="rounded-xl border border-zinc-200/90 bg-zinc-50/70 p-5 dark:border-zinc-800 dark:bg-zinc-800/40">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-white shadow-2xs">
                  <Target size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                    Ambiente Real de Prova
                  </span>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Simulado Cronometrado (X Questões por Y Tempo)
                  </h3>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Treine a gestão de tempo sob a pressão exata dos grandes exames. Configure baterias personalizadas de <strong className="text-zinc-800 dark:text-zinc-200">10 a 30 questões</strong> com cronômetro regressivo ajustado para <strong className="text-zinc-800 dark:text-zinc-200">2 a 3 minutos por questão</strong> — exatamente o ritmo oficial cobrado em bancas como <strong className="text-zinc-800 dark:text-zinc-200">ENARE, USP, UNICAMP, SUS-SP e Revalida INEP</strong>.
              </p>
              <ul className="mt-3 space-y-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                <li className="flex items-center gap-1.5">
                  <Timer size={12} className="text-teal-600 dark:text-teal-400" />
                  Alerta sonoro e visual nos últimos 5 minutos de prova
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-teal-600 dark:text-teal-400" />
                  Grade de navegação livre para pular e marcar dúvidas (flagging)
                </li>
                <li className="flex items-center gap-1.5">
                  <BarChart3 size={12} className="text-teal-600 dark:text-teal-400" />
                  Diagnóstico pós-prova: tempo médio gasto por acerto vs. erro
                </li>
              </ul>
            </div>

            {/* Destaque 2: Questões Ilimitadas */}
            <div className="rounded-xl border border-zinc-200/90 bg-zinc-50/70 p-5 dark:border-zinc-800 dark:bg-zinc-800/40">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-white shadow-2xs">
                  <Infinity size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                    Estudo Sem Limites
                  </span>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Resolução Livre de Questões
                  </h3>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Livre-se de travas e cotas diárias de 10 ou 20 perguntas. Resolva quantas questões desejar por dia, seja durante a semana, finais de semana ou maratonas pós-plantão, com todo o acervo de 611+ questões clínicas à sua inteira disposição.
              </p>
              <ul className="mt-3 space-y-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-teal-600 dark:text-teal-400" />
                  Acesso contínuo 24/7 sem interrupções
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-teal-600 dark:text-teal-400" />
                  Repetições inteligentes sem restrição de volume
                </li>
              </ul>
            </div>

            {/* Destaque 3: Caderno de Erros Infinito */}
            <div className="rounded-xl border border-zinc-200/90 bg-zinc-50/70 p-5 dark:border-zinc-800 dark:bg-zinc-800/40">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-white shadow-2xs">
                  <BookOpen size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                    Retenção Direcionada
                  </span>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Caderno de Erros Turbinado
                  </h3>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Armazene infinitas questões no seu Caderno de Erros e Favoritos. O algoritmo de repetição prioriza os pontos em que você mais erra, transformando suas fragilidades clínicas em acertos garantidos no dia da prova.
              </p>
            </div>

            {/* Destaque 4: Filtros Avançados por Banca */}
            <div className="rounded-xl border border-zinc-200/90 bg-zinc-50/70 p-5 dark:border-zinc-800 dark:bg-zinc-800/40">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-white shadow-2xs">
                  <Filter size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                    Treinamento Específico
                  </span>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Filtros Avançados de Bancas e Ciclos
                  </h3>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Filtre questões exatamente pelas bancas que você vai prestar: treine o estilo direto do ENARE, as questões multidisciplinares da USP ou os casos clínicos do SUS-SP e Revalida, otimizando o estudo para o seu objetivo.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <div className="mt-14">
          <h3 className="mb-6 text-center text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Perguntas Frequentes
          </h3>
          <div className="grid gap-3.5 sm:grid-cols-2">
            {[
              {
                q: "Como funciona a cota do plano gratuito?",
                a: "Você recebe 10 questões diárias no Modo Diário e 20 questões separadas no Caderno de Erros. Ao convidar colegas, você pode expandir o Modo Diário para até 20 questões/dia gratuitamente.",
              },
              {
                q: "Meu histórico do SRS é preservado no Pro?",
                a: "Sim, absolutamente. Todas as suas repetições espaçadas, cartões favoritados e anotações permanecem intactos.",
              },
              {
                q: "Existe fidelidade ou carência na assinatura?",
                a: "Não. A assinatura Pro não possui tempo de permanência mínimo e pode ser cancelada a qualquer momento diretamente no painel.",
              },
              {
                q: "Como os pagamentos serão processados?",
                a: "Utilizamos infraestrutura em conformidade com o padrão PCI-DSS internacional com suporte a Pix e cartões de crédito.",
              },
            ].map(({ q, a }) => (
              <div
                key={q}
                className="rounded-xl border border-zinc-200 bg-white p-4 shadow-xs dark:border-zinc-800 dark:bg-zinc-900"
              >
                <p className="mb-1.5 text-xs font-bold text-zinc-900 dark:text-zinc-100">{q}</p>
                <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
