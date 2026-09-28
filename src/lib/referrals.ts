/**
 * Só indicações com e-mail verificado rendem bônus de cota, e o próprio
 * indicador também precisa ter o e-mail verificado para recebê-lo.
 * Use `verifiedReferralsCount` no `_count` do Prisma e passe o resultado
 * para `effectiveReferralCount`.
 */
export const verifiedReferralsCount = {
  select: { referrals: { where: { emailVerifiedAt: { not: null } } } },
} as const;

export function effectiveReferralCount(user: {
  emailVerifiedAt: Date | null;
  _count: { referrals: number };
}): number {
  return user.emailVerifiedAt ? user._count.referrals : 0;
}
