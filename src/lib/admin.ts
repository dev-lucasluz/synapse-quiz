import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { normalizeEmail } from "@/lib/email-address";

/**
 * Administradores são definidos pela variável ADMIN_EMAILS (e-mails separados por vírgula).
 * O usuário precisa estar logado e ter o e-mail verificado. Sem a variável, ninguém é admin.
 */
export function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => normalizeEmail(e))
    .filter(Boolean);
}

export async function requireAdmin(): Promise<{ userId: string; email: string } | null> {
  const session = await getSession();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, email: true, emailVerifiedAt: true },
  });
  if (!user || !user.emailVerifiedAt) return null;
  if (!getAdminEmails().includes(normalizeEmail(user.email))) return null;
  return { userId: user.id, email: user.email };
}
