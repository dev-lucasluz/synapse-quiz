/**
 * Data de início do ranking. O ranking semanal e o mensal só contam respostas a partir dela,
 * então mudar esta data "reinicia" o histórico sem apagar nenhuma resposta (as estatísticas
 * e o caderno de erros de cada aluno continuam intactos).
 *
 * Para reiniciar de novo no futuro, troque a data abaixo (ou defina RANKING_RESET_AT, em ISO,
 * como variável de ambiente) e faça um novo deploy.
 */
const DEFAULT_RANKING_RESET_AT = "2026-09-28T00:00:00-03:00"; // início de 28/09/2026, horário de Brasília

export function getRankingEpoch(): Date {
  const raw = process.env.RANKING_RESET_AT || DEFAULT_RANKING_RESET_AT;
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? new Date(DEFAULT_RANKING_RESET_AT) : parsed;
}

/** Quantos dias de sequência podem contar no bônus: só os dias a partir do reinício. */
export function streakDaysSinceEpoch(streakCount: number, now: Date = new Date()): number {
  const epoch = getRankingEpoch();
  const daysSince = Math.max(0, Math.floor((now.getTime() - epoch.getTime()) / 86_400_000) + 1);
  return Math.min(Math.max(0, streakCount), daysSince);
}
