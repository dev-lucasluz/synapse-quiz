import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { issueEmailToken } from "@/lib/email-tokens";
import { sendPasswordResetEmail } from "@/lib/email";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const GENERIC_OK = {
  ok: true,
  message: "Se esse e-mail estiver cadastrado, enviamos um link para redefinir a senha.",
};

/**
 * POST /api/auth/forgot-password  { email }
 * Sempre responde igual, exista a conta ou não, para não revelar quem tem cadastro.
 */
export async function POST(request: Request) {
  const limit = rateLimit(`forgot:${getClientIp(request)}`, 5, 15 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Muitas tentativas. Tente novamente mais tarde." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  let body: { email?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida" }, { status: 400 });
  }

  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Informe um e-mail válido." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, name: true, email: true },
  });

  if (user) {
    const token = await issueEmailToken(user.id, "reset_password");
    if (token) await sendPasswordResetEmail(user.email, user.name, token);
  }

  return NextResponse.json(GENERIC_OK);
}
