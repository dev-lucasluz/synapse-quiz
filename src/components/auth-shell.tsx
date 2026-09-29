import React from "react";
import Link from "next/link";
import { SynapseMark, SynapseWordmark } from "@/components/brand-logo";

/** Casca visual das telas simples de conta (recuperar senha, verificar e-mail). */
export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 font-heading">
      <Link
        href="/"
        className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/70 px-4 py-1.5 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/60"
      >
        <SynapseMark className="h-[18px] w-auto" />
        <SynapseWordmark className="h-[13px] w-auto text-zinc-800 dark:text-zinc-200" />
      </Link>

      <div className="w-full max-w-md rounded-3xl border border-white/60 bg-white/85 p-6 shadow-2xl shadow-orange-950/10 backdrop-blur-xl dark:border-white/10 dark:bg-[#0c0d1a]/85 dark:shadow-black/60 sm:p-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{subtitle}</p>
        )}
        <div className="mt-6">{children}</div>
      </div>
    </main>
  );
}

export const authInputClass =
  "w-full rounded-xl border border-zinc-200/90 bg-zinc-50/70 px-3.5 py-3 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/15 dark:border-zinc-700/70 dark:bg-zinc-800/40 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:bg-zinc-800/90";

export const authButtonClass =
  "flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#f59e0b] via-[#ea580c] to-[#c2410c] py-3 text-sm font-bold text-white shadow-lg shadow-orange-950/20 transition-all hover:from-[#d97706] hover:via-[#c2410c] hover:to-[#9a3412] active:scale-[0.99] disabled:opacity-60";
