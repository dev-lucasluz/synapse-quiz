import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession, setSessionCookie } from "@/lib/auth";
import { generateReferralCode } from "@/lib/utils";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { issueEmailToken } from "@/lib/email-tokens";
import { sendVerificationEmail } from "@/lib/email";
import { canonicalEmail, normalizeEmail } from "@/lib/email-address";

export async function POST(request: Request) {
  // Rate limit: 5 registrations per hour per IP
  const ip = getClientIp(request);
  const limit = rateLimit(`register:${ip}`, 5, 60 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        error: `Muitas tentativas de cadastro. Tente novamente em ${limit.retryAfterSeconds} segundos.`,
      },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSeconds) },
      }
    );
  }

  try {
    const { name, email, password, referralCode } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nome, email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    const trimmedName = typeof name === "string" ? name.trim() : "";
    if (trimmedName.length < 2 || trimmedName.length > 100) {
      return NextResponse.json(
        { error: "O nome deve ter entre 2 e 100 caracteres." },
        { status: 400 }
      );
    }

    const trimmedEmail = typeof email === "string" ? normalizeEmail(email) : "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (trimmedEmail.length > 254 || !emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { error: "Formato de e-mail inválido." },
        { status: 400 }
      );
    }

    if (typeof password !== "string" || password.length < 8 || password.length > 72) {
      return NextResponse.json(
        { error: "A senha deve ter entre 8 e 72 caracteres." },
        { status: 400 }
      );
    }

    // Check if user already exists. Para Gmail, "no.me+x@gmail.com" e "nome@gmail.com" são a
    // mesma caixa de entrada, então comparamos também pela forma canônica.
    const emailCanonicalValue = canonicalEmail(trimmedEmail);
    const existing = await prisma.user.findFirst({
      where: { OR: [{ email: trimmedEmail }, { emailCanonical: emailCanonicalValue }] },
      select: { id: true },
    });
    if (existing) {
      return NextResponse.json(
        { error: "E-mail já cadastrado" },
        { status: 409 }
      );
    }

    // Resolve referrer
    // O limite de bônus (2 indicações) é aplicado no cálculo da cota, e só indicações
    // com e-mail verificado contam — veja lib/referrals.ts.
    let referredById: string | null = null;
    if (typeof referralCode === "string" && referralCode.length > 0 && referralCode.length <= 50) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode },
        select: { id: true },
      });
      if (referrer) referredById = referrer.id;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    let newReferralCode = generateReferralCode();

    // Ensure unique referral code
    let codeExists = await prisma.user.findUnique({
      where: { referralCode: newReferralCode },
    });
    while (codeExists) {
      newReferralCode = generateReferralCode();
      codeExists = await prisma.user.findUnique({
        where: { referralCode: newReferralCode },
      });
    }

    const user = await prisma.user.create({
      data: {
        name: trimmedName,
        email: trimmedEmail,
        emailCanonical: emailCanonicalValue,
        passwordHash,
        referralCode: newReferralCode,
        referredById,
      },
    });

    const token = await createSession({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    await setSessionCookie(token);

    // Envia o link de verificação; falha no envio não impede o cadastro
    // (o usuário pode reenviar pelo painel).
    let verificationSent = false;
    const verifyToken = await issueEmailToken(user.id, "verify_email");
    if (verifyToken) {
      verificationSent = await sendVerificationEmail(user.email, user.name, verifyToken);
    }

    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email },
      verificationSent,
    });
  } catch (error) {
    // Corrida entre dois cadastros simultâneos: o índice único barra o segundo.
    if ((error as { code?: string })?.code === "P2002") {
      return NextResponse.json({ error: "E-mail já cadastrado" }, { status: 409 });
    }
    console.error("Register error:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
