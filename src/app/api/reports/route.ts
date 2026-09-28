import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  // Rate limit: 10 reports per minute per user
  const limit = rateLimit(`report:${session.userId}`, 10, 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Muitos relatos enviados. Por favor, aguarde um minuto." },
      { status: 429 }
    );
  }

  const body = await request.json();
  const { questionId, reason, comment } = body;

  if (
    !questionId ||
    typeof questionId !== "string" ||
    questionId.length > 100 ||
    !reason ||
    typeof reason !== "string" ||
    reason.length > 200
  ) {
    return NextResponse.json({ error: "Dados incompletos ou inválidos" }, { status: 400 });
  }

  if (comment !== undefined && comment !== null && (typeof comment !== "string" || comment.length > 1000)) {
    return NextResponse.json({ error: "Comentário muito longo (máximo 1.000 caracteres)" }, { status: 400 });
  }

  const report = await prisma.questionReport.create({
    data: {
      userId: session.userId,
      questionId,
      reason: reason.trim(),
      comment: typeof comment === "string" ? comment.trim() : null,
      status: "pending",
    },
  });

  return NextResponse.json({ success: true, id: report.id });
}
