import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { rateLimit } from "@/lib/rate-limit";
import { sendReportNotification } from "@/lib/email";

const ALLOWED_REASONS = ["gabarito_errado", "desatualizado", "erro_digitacao", "outro"];

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

  try {
    let body: { questionId?: unknown; reason?: unknown; comment?: unknown };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Corpo da requisição inválido" }, { status: 400 });
    }
    const { questionId, reason, comment } = body ?? {};

    if (
      !questionId ||
      typeof questionId !== "string" ||
      questionId.length > 100 ||
      !reason ||
      typeof reason !== "string" ||
      !ALLOWED_REASONS.includes(reason.trim())
    ) {
      return NextResponse.json({ error: "Dados incompletos ou inválidos" }, { status: 400 });
    }

    if (comment !== undefined && comment !== null && (typeof comment !== "string" || comment.length > 1000)) {
      return NextResponse.json({ error: "Comentário muito longo (máximo 1.000 caracteres)" }, { status: 400 });
    }

    const question = await prisma.question.findUnique({
      where: { id: questionId },
      select: { id: true, text: true, subject: { select: { name: true } } },
    });
    if (!question) {
      return NextResponse.json({ error: "Questão não encontrada" }, { status: 404 });
    }

    const report = await prisma.questionReport.create({
      data: {
        userId: session.userId,
        questionId,
        reason: reason.trim(),
        comment: typeof comment === "string" && comment.trim() ? comment.trim() : null,
        status: "pending",
      },
    });

    // Avisa a equipe por e-mail. É "melhor esforço": falha no envio não afeta o report, e só
    // os primeiros 5 reports por hora de cada aluno geram e-mail (evita spam na caixa de entrada).
    try {
      const recent = await prisma.questionReport.count({
        where: { userId: session.userId, createdAt: { gte: new Date(Date.now() - 60 * 60 * 1000) } },
      });
      if (recent <= 5) {
        await sendReportNotification({
          questionText: question.text,
          subject: question.subject.name,
          reason: report.reason,
          comment: report.comment,
          reporterName: session.name,
          reporterEmail: session.email,
        });
      }
    } catch (notifyError) {
      console.error("Report notification error:", notifyError);
    }

    return NextResponse.json({ success: true, id: report.id });
  } catch (error) {
    console.error("Report error:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
