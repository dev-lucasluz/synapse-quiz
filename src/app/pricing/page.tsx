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
                : "border-teal-700 dark:border-teal-600"
            )}
          >
            <span className="absolute -top-3 left-5 rounded-full bg-teal-700 px-3 py-0.5 text-[11px] font-semibold text-white dark:bg-teal-600">
              {currentPlan === "pro" ? "Assinatura Ativa" : "Recomendado para Residência"}
            </span>

            <div className="mb-6">
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                {PLANS.pro.name}
              </h2>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                {PLANS.pro.description}
              </p>
              <div className="mt-4 flex items-baseline">
                <span className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">
                  R$ {PLANS.pro.priceMonthly?.toFixed(2).replace(".", ",")}
                </span>
                <span className="ml-1 text-xs text-zinc-400">/mês</span>
              </div>
              <p className="mt-0.5 text-[11px] text-zinc-400">
                Cobrança recorrente • Cancele a qualquer momento
              </p>
            </div>

            <ul className="mb-8 flex-1 space-y-3 border-t border-zinc-100 pt-5 dark:border-zinc-800">
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
              <button
                onClick={handleUpgrade}
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-lg bg-teal-700 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700 disabled:opacity-70"
              >
                <Zap size={14} />
                {loading ? "Processando..." : "Assinar Synapse Pro — R$ 29,90/mês"}
              </button>
            )}
          </div>
        </div>

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
