import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// ─── "Dia de estudo" ─────────────────────────────────────────────────────────
// O dia de estudo vira às 05:00 no horário de Brasília (e não à meia-noite UTC).
// Usado para cota diária, streak e gráfico semanal — tudo precisa usar as
// mesmas funções abaixo para que servidor e navegador concordem.
export const STUDY_TIMEZONE = "America/Sao_Paulo";
export const STUDY_DAY_RESET_HOUR = 5;

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

const studyDayFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: STUDY_TIMEZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Data (YYYY-MM-DD) do dia de estudo que contém o instante `at`. */
export function getStudyDayString(at: Date = new Date()): string {
  return studyDayFormatter.format(new Date(at.getTime() - STUDY_DAY_RESET_HOUR * HOUR_MS));
}

/** Dia de estudo atual (vira às 05:00 de Brasília). */
export function getTodayString(): string {
  return getStudyDayString(new Date());
}

/** Dia de estudo anterior ao atual. */
export function getYesterdayString(): string {
  return getStudyDayString(new Date(Date.now() - DAY_MS));
}

/** Dia de estudo de `daysAgo` dias atrás (0 = hoje). */
export function getStudyDayStringDaysAgo(daysAgo: number): string {
  return getStudyDayString(new Date(Date.now() - daysAgo * DAY_MS));
}

/** Dia da semana (0 = domingo) de uma data YYYY-MM-DD. */
export function getWeekdayOfDateString(dateStr: string): number {
  return new Date(`${dateStr}T12:00:00Z`).getUTCDay();
}

export function generateReferralCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "SYN-";
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export function getMaxDailyQuota(referralCount: number): number {
  // Base: 10, +5 per referral, max 2 referrals counted, cap at 20
  const bonus = Math.min(referralCount, 2) * 5;
  return Math.min(10 + bonus, 20);
}
