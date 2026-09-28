"use client";

import { AvatarRenderer } from "@/components/profile/avatar-renderer";
import { Camera, Flame, Target, Award, Building2, GraduationCap, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";

interface IdentityBadgeProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string | null;
    college?: string | null;
    period?: string | null;
    targetSpecialty?: string | null;
    plan: string;
  };
  stats: {
    streak: number;
    totalAnswered: number;
    accuracy: number;
  };
  onEditAvatar: () => void;
  className?: string;
}

export function IdentityBadge({ user, stats, onEditAvatar, className }: IdentityBadgeProps) {
  const isPro = user.plan === "pro";

  return (
    <div className={cn("rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 flex flex-col justify-between", className)}>
      {/* ── Top Row: Avatar & Basic Info ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        {/* Avatar com botão flutuante de câmera */}
        <div className="relative group shrink-0">
          <AvatarRenderer
            avatarUrl={user.avatarUrl}
            name={user.name}
            size="xl"
            className={cn(
              "ring-4 transition-all duration-200 shadow-sm",
              isPro ? "ring-amber-500/30 dark:ring-amber-400/30" : "ring-zinc-100 dark:ring-zinc-800"
            )}
          />
          <button
            type="button"
            onClick={onEditAvatar}
            className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-sm transition-transform hover:scale-110 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
            title="Alterar foto ou avatar"
            aria-label="Alterar foto ou avatar"
          >
            <Camera size={13} />
          </button>
        </div>

        {/* Informações textuais */}
        <div className="flex-1 text-center sm:text-left min-w-0">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 truncate">
              {user.name}
            </h2>
            {isPro ? (
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                Assinante PRO
              </span>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                  Plano Gratuito
                </span>
                <a
                  href="#plano-pro"
                  className="inline-flex items-center gap-1 rounded-full border border-amber-200/80 bg-amber-50/80 px-2 py-0.5 text-[10px] font-semibold text-orange-600 hover:bg-amber-100 dark:border-amber-900/60 dark:bg-amber-950/50 dark:text-amber-300 transition-colors"
                >
                  <span>Virar PRO</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            )}
          </div>

          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
            {user.email}
          </p>

          {/* Tag de Faculdade e Período */}
          <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
            {user.college ? (
              <div className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200/80 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-300">
                <Building2 size={13} className="text-orange-600 dark:text-amber-400" />
                <span>{user.college}</span>
              </div>
            ) : null}

            {user.period ? (
              <div className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200/80 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-300">
                <GraduationCap size={13} className="text-orange-600 dark:text-amber-400" />
                <span>{user.period}</span>
              </div>
            ) : null}

            {user.targetSpecialty ? (
              <div className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200/60 bg-amber-50/60 px-2.5 py-1 text-xs font-medium text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300">
                <Stethoscope size={13} />
                <span>Foco: {user.targetSpecialty}</span>
              </div>
            ) : null}

            {!user.college && !user.period && (
              <p className="text-xs text-amber-600 dark:text-amber-400 italic">
                Preencha sua faculdade e período abaixo para o Ranking
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom Row: Three Study Metrics Cards ────────────────────────── */}
      <div className="mt-6 grid grid-cols-3 gap-3 border-t border-zinc-100 pt-5 dark:border-zinc-800/80">
        {/* Streak */}
        <div className="flex flex-col items-center sm:items-start rounded-xl bg-zinc-50/80 p-3 dark:bg-zinc-800/40">
          <div className="flex items-center gap-1.5 text-amber-500">
            <Flame size={15} />
            <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">Sequência</span>
          </div>
          <p className="mt-1 text-lg font-bold text-zinc-900 dark:text-zinc-50">
            {stats.streak} <span className="text-xs font-normal text-zinc-500">dias</span>
          </p>
        </div>

        {/* Questões Feitas */}
        <div className="flex flex-col items-center sm:items-start rounded-xl bg-zinc-50/80 p-3 dark:bg-zinc-800/40">
          <div className="flex items-center gap-1.5 text-orange-600 dark:text-amber-400">
            <Target size={15} />
            <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">Resolvidas</span>
          </div>
          <p className="mt-1 text-lg font-bold text-zinc-900 dark:text-zinc-50">
            {stats.totalAnswered} <span className="text-xs font-normal text-zinc-500">questões</span>
          </p>
        </div>

        {/* Acurácia */}
        <div className="flex flex-col items-center sm:items-start rounded-xl bg-zinc-50/80 p-3 dark:bg-zinc-800/40">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
            <Award size={15} />
            <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">Acurácia</span>
          </div>
          <p className="mt-1 text-lg font-bold text-zinc-900 dark:text-zinc-50">
            {stats.accuracy}% <span className="text-xs font-normal text-zinc-500">acertos</span>
          </p>
        </div>
      </div>
    </div>
  );
}
