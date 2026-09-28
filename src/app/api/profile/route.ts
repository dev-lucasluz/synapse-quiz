import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      referralCode: true,
      plan: true,
      avatarUrl: true,
      college: true,
      period: true,
      targetSpecialty: true,
      streakCount: true,
      createdAt: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
  }

  // Agrega estatísticas clínicas para o crachá do perfil
  const [totalAnswered, correctCount] = await Promise.all([
    prisma.answerLog.count({
      where: { userId: session.userId },
    }),
    prisma.answerLog.count({
      where: { userId: session.userId, isCorrect: true },
    }),
  ]);

  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  return NextResponse.json({
    user,
    stats: {
      streak: user.streakCount,
      totalAnswered,
      accuracy,
    },
  });
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    // NOTE: `plan` is intentionally excluded — plan changes require a payment flow,
    // not a direct API call from the client.
    const { name, college, period, targetSpecialty, avatarUrl } = body;

    // Validação de nome
    if (name !== undefined) {
      if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 100) {
        return NextResponse.json(
          { error: "O nome deve ter entre 2 e 100 caracteres." },
          { status: 400 }
        );
      }
    }

    // Validação de faculdade
    if (college !== undefined && college !== null) {
      if (typeof college !== "string" || college.trim().length > 120) {
        return NextResponse.json(
          { error: "O nome da faculdade pode ter no máximo 120 caracteres." },
          { status: 400 }
        );
      }
    }

    // Validação de especialidade
    if (targetSpecialty !== undefined && targetSpecialty !== null) {
      if (typeof targetSpecialty !== "string" || targetSpecialty.trim().length > 100) {
        return NextResponse.json(
          { error: "A especialidade pode ter no máximo 100 caracteres." },
          { status: 400 }
        );
      }
    }

    // Validação de formato e tamanho de imagem/avatarUrl (máx ~150KB em base64)
    if (avatarUrl !== undefined && avatarUrl !== null && avatarUrl.trim() !== "") {
      const trimmedAvatar = avatarUrl.trim();
      const isValidScheme =
        trimmedAvatar.startsWith("avatar:") ||
        trimmedAvatar.startsWith("data:image/") ||
        trimmedAvatar.startsWith("https://") ||
        trimmedAvatar.startsWith("http://");

      if (!isValidScheme || trimmedAvatar.length > 200000) {
        return NextResponse.json(
          { error: "Formato ou tamanho de imagem de perfil inválido." },
          { status: 400 }
        );
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.userId },
      data: {
        ...(name !== undefined && { name: name.trim() }),
        ...(college !== undefined && { college: college ? college.trim() : null }),
        ...(period !== undefined && { period: period ? period.trim() : null }),
        ...(targetSpecialty !== undefined && { targetSpecialty: targetSpecialty ? targetSpecialty.trim() : null }),
        ...(avatarUrl !== undefined && { avatarUrl: avatarUrl ? avatarUrl.trim() : null }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        referralCode: true,
        plan: true,
        avatarUrl: true,
        college: true,
        period: true,
        targetSpecialty: true,
        streakCount: true,
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    return NextResponse.json(
      { error: "Ocorreu um erro ao salvar as alterações." },
      { status: 500 }
    );
  }
}
