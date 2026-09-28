import { createHash, randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";

export type EmailTokenType = "verify_email" | "reset_password";

const TTL_MS: Record<EmailTokenType, number> = {
  verify_email: 24 * 60 * 60 * 1000,
  reset_password: 30 * 60 * 1000,
};

// Máximo de e-mails do mesmo tipo por usuário dentro de 1 hora (contado no banco,
// então vale entre instâncias serverless, ao contrário do rate limit em memória).
const MAX_PER_HOUR = 3;

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/**
 * Cria um token novo (invalidando os anteriores do mesmo tipo).
 * Retorna null se o usuário já pediu e-mails demais na última hora.
 */
export async function issueEmailToken(userId: string, type: EmailTokenType): Promise<string | null> {
  const since = new Date(Date.now() - 60 * 60 * 1000);
  const recent = await prisma.emailToken.count({
    where: { userId, type, createdAt: { gte: since } },
  });
  if (recent >= MAX_PER_HOUR) return null;

  await prisma.emailToken.deleteMany({ where: { userId, type, usedAt: null } });

  const token = randomBytes(32).toString("base64url");
  await prisma.emailToken.create({
    data: {
      userId,
      type,
      tokenHash: hashToken(token),
      expiresAt: new Date(Date.now() + TTL_MS[type]),
    },
  });
  return token;
}

/**
 * Consome o token (uso único). Retorna o userId se válido, ou null se inválido,
 * expirado ou já usado. A marcação de uso é atômica para evitar reutilização.
 */
export async function consumeEmailToken(token: string, type: EmailTokenType): Promise<string | null> {
  if (typeof token !== "string" || token.length < 20 || token.length > 200) return null;

  const record = await prisma.emailToken.findUnique({ where: { tokenHash: hashToken(token) } });
  if (!record || record.type !== type || record.usedAt || record.expiresAt < new Date()) return null;

  const claimed = await prisma.emailToken.updateMany({
    where: { id: record.id, usedAt: null },
    data: { usedAt: new Date() },
  });
  return claimed.count === 1 ? record.userId : null;
}
