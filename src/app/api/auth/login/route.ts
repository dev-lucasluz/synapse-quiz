import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession, setSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
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

    const errorMsg = isDbError
      ? `Banco de dados: ${err?.message?.split("\n").pop() || "Erro de conexão. Verifique TURSO_DATABASE_URL na Vercel."}`
      : "Erro interno do servidor";

    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
