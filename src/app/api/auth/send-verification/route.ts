import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { issueEmailToken } from "@/lib/email-tokens";
import { sendVerificationEmail } from "@/lib/email";

/** POST /api/auth/send-verification — reenvia o e-mail de verificação (usuário logado). */
export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, emailVerifiedAt: true },
  });
  if (!user) {
    return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
  }
  if (user.emailVerifiedAt) {
    return NextResponse.json({ ok: true, alreadyVerified: true });
  }

  const token = await issueEmailToken(user.id, "verify_email");
  if (!token) {
    return NextResponse.json(
      { error: "Você já pediu vários e-mails. Aguarde um pouco antes de tentar de novo." },
      { status: 429 }
    );
  }

  const sent = await sendVerificationEmail(user.email, user.name, token);
  if (!sent) {
    return NextResponse.json(
      { error: "Não foi possível enviar o e-mail agora. Tente novamente mais tarde." },
      { status: 502 }
    );
  }
  return NextResponse.json({ ok: true });
}
