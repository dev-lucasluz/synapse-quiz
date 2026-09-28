import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { consumeEmailToken } from "@/lib/email-tokens";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

/** POST /api/auth/verify-email  { token } — confirma o e-mail. */
export async function POST(request: Request) {
  const limit = rateLimit(`verify-email:${getClientIp(request)}`, 20, 15 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Muitas tentativas. Tente novamente mais tarde." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  let body: { token?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida" }, { status: 400 });
  }

  const token = typeof body?.token === "string" ? body.token : "";
  const userId = await consumeEmailToken(token, "verify_email");
  if (!userId) {
    return NextResponse.json(
      { error: "Link inválido ou expirado. Peça um novo e-mail de verificação." },
      { status: 400 }
    );
  }

  await prisma.user.updateMany({
    where: { id: userId, emailVerifiedAt: null },
    data: { emailVerifiedAt: new Date() },
  });
  return NextResponse.json({ ok: true });
}
