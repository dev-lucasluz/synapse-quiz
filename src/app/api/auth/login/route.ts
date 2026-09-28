import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession, setSessionCookie } from "@/lib/auth";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { normalizeEmail } from "@/lib/email-address";

export async function POST(request: Request) {
  // Rate limit: 5 attempts per 15 minutes per IP
  const ip = getClientIp(request);
  const limit = rateLimit(`login:${ip}`, 5, 15 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        error: `Muitas tentativas de login. Tente novamente em ${limit.retryAfterSeconds} segundos.`,
      },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSeconds) },
      }
    );
  }

  try {
    const { email, password } = await request.json();

    if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    // O cadastro grava o e-mail em minúsculas; o login precisa procurar do mesmo jeito
    // (teclados de celular costumam capitalizar a primeira letra).
    const user = await prisma.user.findUnique({ where: { email: normalizeEmail(email) } });
    if (!user) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    const token = await createSession({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    await setSessionCookie(token);

    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error: unknown) {
    console.error("Login error:", error);
    const err = error as { message?: string; code?: string; name?: string };
    const isDbError =
      err?.message?.includes("database") ||
      err?.message?.includes("connect") ||
      err?.message?.includes("no such") ||
      err?.code === "P1001" ||
      err?.code === "P2021" ||
      err?.name === "PrismaClientInitializationError" ||
      err?.name === "PrismaClientKnownRequestError";

    const errorMsg =
      process.env.NODE_ENV === "production"
        ? "Erro ao conectar com o serviço de autenticação. Tente novamente mais tarde."
        : isDbError
        ? `Banco de dados: ${err?.message?.split("\n").pop() || "Erro de conexão. Verifique TURSO_DATABASE_URL."}`
        : "Erro interno do servidor";

    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
