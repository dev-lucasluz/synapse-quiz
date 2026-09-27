"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Share2, Copy, Check, Users, Gift, Zap, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserData {
  user: { name: string; email: string; referralCode: string; plan: string };
  quota: { referralCount: number; mainMax: number };
}

export default function ReferralPage() {
  const router = useRouter();
  const [data, setData] = useState<UserData | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => {
        if (r.status === 401) { router.push("/login"); return null; }
        return r.json();
      })
      .then((d) => { if (d) setData(d); })
      .finally(() => setLoading(false));
  }, [router]);

  const referralUrl = data
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/register?ref=${data.user.referralCode}`
    : "";

  const copyLink = async () => {
    await navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLink = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Synapse Quiz — Medicina",
        text: "Plataforma de repetição espaçada para o Ciclo Básico e Clínico de Medicina:",
        url: referralUrl,
      });
    } else {
      copyLink();
    }
  };

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-teal-700 border-t-transparent dark:border-teal-400" />
        </div>
      </div>
    );
  }

  const { referralCount, mainMax } = data.quota;
  const bonusEarned = Math.min(referralCount, 2) * 5;
  const slotsLeft = 2 - Math.min(referralCount, 2);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <Navbar userName={data.user.name} plan={data.user.plan} />

      <main className="mx-auto max-w-2xl px-4 py-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-950">
            <Share2 size={20} className="text-teal-700 dark:text-teal-400" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Programa Acadêmico de Indicação
          </h1>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Convide colegas de curso e amplie sua cota diária de questões no Modo Diário
          </p>
        </div>

        {/* Stats Row */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center rounded-xl border border-zinc-200 bg-white p-4 text-center shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <Users size={16} className="mb-1 text-zinc-600 dark:text-zinc-400" />
            <p className="text-base font-bold tabular-nums text-zinc-900 dark:text-zinc-50">
              {referralCount} de 2
            </p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Confirmadas</p>
          </div>

          <div className="flex flex-col items-center rounded-xl border border-zinc-200 bg-white p-4 text-center shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <Gift size={16} className="mb-1 text-teal-700 dark:text-teal-400" />
            <p className="text-base font-bold tabular-nums text-teal-700 dark:text-teal-400">
              +{bonusEarned} questões
            </p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Bônus Diário</p>
          </div>

          <div className="flex flex-col items-center rounded-xl border border-zinc-200 bg-white p-4 text-center shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
            <Zap size={16} className="mb-1 text-zinc-600 dark:text-zinc-400" />
            <p className="text-base font-bold tabular-nums text-zinc-900 dark:text-zinc-50">
              {mainMax} / dia
            </p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Cota Atual</p>
          </div>
        </div>

        {/* Slots Visual Card */}
        <div className="mb-6 rounded-xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Vagas de Bônus por Indicação
          </h3>
          <p className="mb-4 text-xs text-zinc-500 dark:text-zinc-400">
            Cada novo colega cadastrado com seu link concede permanentemente +5 perguntas diárias (teto: 20/dia).
          </p>

          <div className="grid grid-cols-2 gap-3">
            {[0, 1].map((slot) => {
              const isFilled = slot < referralCount;
              return (
                <div
                  key={slot}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-xl border p-4 text-center transition-all",
                    isFilled
                      ? "border-teal-300 bg-teal-50/70 dark:border-teal-900 dark:bg-teal-950/40"
                      : "border-dashed border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
                  )}
                >
                  <Users
                    size={18}
                    className={isFilled ? "text-teal-700 dark:text-teal-400" : "text-zinc-400"}
                  />
                  <p className={cn("text-xs font-bold", isFilled ? "text-teal-800 dark:text-teal-300" : "text-zinc-500")}>
                    {isFilled ? "Indicação Confirmada" : `Vaga ${slot + 1} Aberta`}
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    {isFilled ? "+5 perguntas ativas" : "Libera +5 perguntas"}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-4 border-t border-zinc-100 pt-3 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
            {slotsLeft > 0 ? (
              <span>Restam <strong className="text-zinc-800 dark:text-zinc-200">{slotsLeft}</strong> vaga(s) para atingir a cota máxima de 20 questões diárias.</span>
            ) : (
              <span className="font-semibold text-teal-700 dark:text-teal-400">Teto máximo de 20 questões por dia desbloqueado com sucesso!</span>
            )}
          </div>
        </div>

        {/* Share Link Card */}
        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Seu Link Exclusivo de Indicação
          </h3>
          <p className="mb-3 text-xs text-zinc-500 dark:text-zinc-400">
            Compartilhe com colegas de turma ou grupos acadêmicos:
          </p>

          <div className="mb-3 flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={referralUrl}
              className="flex-1 truncate rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2 font-mono text-xs text-zinc-800 outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
            />
            <button
              onClick={copyLink}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-all",
                copied
                  ? "border-teal-300 bg-teal-50 text-teal-700 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-400"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
              )}
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? "Copiado!" : "Copiar"}
            </button>
          </div>

          <button
            onClick={shareLink}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-700"
          >
            <Share2 size={13} />
            Compartilhar Link com Colegas
          </button>

          {/* Antifraud box */}
          <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-zinc-100 bg-zinc-50 p-3 text-[11px] text-zinc-500 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-400">
            <ShieldCheck size={14} className="mt-0.5 shrink-0 text-zinc-400 dark:text-zinc-500" />
            <p className="leading-relaxed">
              O sistema computa apenas novos cadastros com e-mails reais e autenticados. O bônus máximo de indicação é de +10 perguntas diárias (totalizando 20/dia).
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
