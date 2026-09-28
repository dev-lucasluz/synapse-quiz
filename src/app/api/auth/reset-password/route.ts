import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { consumeEmailToken } from "@/lib/email-tokens";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

/** POST /api/auth/reset-password  { token, password } — define uma nova senha. */
export async function POST(request: Request) {
  const limit = rateLimit(`reset:${getClientIp(request)}`, 10, 15 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Muitas tentativas. Tente novamente mais tarde." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  let body: { token?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida" }, { status: 400 });
  }

  const token = typeof body?.token === "string" ? body.token : "";
  const password = typeof body?.password === "string" ? body.password : "";
  if (password.length < 8 || password.length > 72) {
    return NextResponse.json(
      { error: "A senha deve ter entre 8 e 72 caracteres." },
      { status: 400 }
    );
  }

  const userId = await consumeEmailToken(token, "reset_password");
  if (!userId) {
    return NextResponse.json(
      { error: "Link inválido ou expirado. Peça uma nova redefinição." },
      { status: 400 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.update({
    where: { id: userId },
    data: {
      passwordHash,
      // Quem recebeu o e-mail comprovou acesso à caixa de entrada.
      emailVerifiedAt: new Date(),
    },
  });
  // Invalida qualquer outro link de redefinição ainda aberto.
  await prisma.emailToken.deleteMany({ where: { userId, type: "reset_password", usedAt: null } });

  return NextResponse.json({ ok: true });
}
