"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Loader2, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReportItem {
  id: string;
  reason: string;
  comment: string | null;
  status: "pending" | "resolved";
  createdAt: string;
  reporter: { name: string; email: string };
  question: {
    id: string;
    text: string;
    imageUrl: string | null;
    options: string[];
    correctOption: number;
    explanation: string;
    subject: string;
    source: string;
  };
}

const REASONS: Record<string, string> = {
  gabarito_errado: "Gabarito errado",
  desatualizado: "Desatualizado",
  erro_digitacao: "Erro de digitação",
  outro: "Outro",
};

type Filter = "pending" | "resolved" | "all";

export default function AdminReportsPage() {
  const [filter, setFilter] = useState<Filter>("pending");
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [counts, setCounts] = useState({ pending: 0, resolved: 0 });
  const [state, setState] = useState<"loading" | "ok" | "denied" | "error">("loading");
  const [busyId, setBusyId] = useState<string | null>(null);

  const [reloadKey, setReloadKey] = useState(0);

  // A busca fica dentro do efeito (com .then) para não atualizar estado de forma síncrona.
  useEffect(() => {
    let cancelled = false;
    fetch(`/api/admin/reports?status=${filter}`)
      .then(async (res) => {
        if (cancelled) return;
        if (res.status === 404 || res.status === 401) {
          setState("denied");
          return;
        }
        if (!res.ok) {
          setState("error");
          return;
        }
        const data = await res.json();
        if (cancelled) return;
        setReports(data.reports);
        setCounts(data.counts);
        setState("ok");
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });
    return () => {
      cancelled = true;
    };
  }, [filter, reloadKey]);

  async function setStatus(id: string, status: "pending" | "resolved") {
    setBusyId(id);
    try {
      const res = await fetch("/api/admin/reports", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) setReloadKey((k) => k + 1);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 font-heading">
      <Link
        href="/dashboard"
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        <ArrowLeft size={14} /> Painel
      </Link>
      <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
        Reports de questões
      </h1>

      {state === "denied" ? (
        <p className="mt-6 rounded-xl border border-zinc-200 bg-white/80 p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300">
          Acesso restrito à administração.
        </p>
      ) : (
        <>
          <div className="mt-4 flex flex-wrap gap-2">
            {(["pending", "resolved", "all"] as Filter[]).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => {
                  setState("loading");
                  setFilter(f);
                }}
                className={cn(
                  "cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors",
                  filter === f
                    ? "border-amber-500 bg-amber-500 text-white"
                    : "border-zinc-300 bg-white/70 text-zinc-700 hover:bg-white dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300"
                )}
              >
                {f === "pending" ? `Pendentes (${counts.pending})` : f === "resolved" ? `Resolvidos (${counts.resolved})` : "Todos"}
              </button>
            ))}
          </div>

          {state === "loading" && (
            <div className="mt-8 flex items-center gap-2 text-sm text-zinc-500">
              <Loader2 size={16} className="animate-spin" /> Carregando...
            </div>
          )}
          {state === "error" && (
            <p role="alert" className="mt-6 text-sm text-red-600 dark:text-red-400">
              Não foi possível carregar os reports.
            </p>
          )}
          {state === "ok" && reports.length === 0 && (
            <p className="mt-8 text-sm text-zinc-500 dark:text-zinc-400">Nenhum report nesta lista.</p>
          )}

          <ul className="mt-5 space-y-4">
            {state === "ok" &&
              reports.map((r) => (
                <li
                  key={r.id}
                  className="rounded-2xl border border-zinc-200/80 bg-white/85 p-4 dark:border-zinc-800 dark:bg-zinc-900/70"
                >
                  <div className="flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                      {REASONS[r.reason] ?? r.reason}
                    </span>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      {r.question.subject} · {r.question.source}
                    </span>
                    <span className="ml-auto text-zinc-400">{new Date(r.createdAt).toLocaleString("pt-BR")}</span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-zinc-900 dark:text-zinc-100">{r.question.text}</p>
                  {r.question.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={r.question.imageUrl}
                      alt=""
                      loading="lazy"
                      className="mt-3 max-h-48 rounded-lg border border-zinc-200 object-contain dark:border-zinc-700"
                    />
                  )}

                  <ol className="mt-3 space-y-1 text-xs text-zinc-700 dark:text-zinc-300">
                    {r.question.options.map((o, i) => (
                      <li
                        key={i}
                        className={cn(
                          "rounded-md px-2 py-1",
                          i === r.question.correctOption && "bg-emerald-50 font-semibold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                        )}
                      >
                        {String.fromCharCode(65 + i)}) {o}
                        {i === r.question.correctOption && " ✓ (gabarito atual)"}
                      </li>
                    ))}
                  </ol>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                    <b>Explicação:</b> {r.question.explanation}
                  </p>

                  <div className="mt-3 rounded-lg border border-zinc-200 bg-zinc-50/80 p-3 text-xs text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800/40 dark:text-zinc-200">
                    <p>
                      <b>Comentário do aluno:</b> {r.comment ?? <i>(sem comentário)</i>}
                    </p>
                    <p className="mt-1 text-zinc-500 dark:text-zinc-400">
                      {r.reporter.name} · {r.reporter.email}
                    </p>
                    <p className="mt-1 text-[10px] text-zinc-400">ID da questão: {r.question.id}</p>
                  </div>

                  <div className="mt-3 flex justify-end">
                    {r.status === "pending" ? (
                      <button
                        type="button"
                        disabled={busyId === r.id}
                        onClick={() => setStatus(r.id, "resolved")}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-700 disabled:opacity-60"
                      >
                        <CheckCircle2 size={14} /> Marcar como resolvido
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={busyId === r.id}
                        onClick={() => setStatus(r.id, "pending")}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-zinc-300 px-3.5 py-2 text-xs font-bold text-zinc-700 hover:bg-zinc-100 disabled:opacity-60 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                      >
                        <RotateCcw size={14} /> Reabrir
                      </button>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </>
      )}
    </main>
  );
}
