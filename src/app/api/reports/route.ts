import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const body = await request.json();
  const { questionId, reason, comment } = body;

  if (!questionId || !reason) {
    return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
  }

  const report = await prisma.questionReport.create({
    data: {
      userId: session.userId,
      questionId,
      reason,
      comment: typeof comment === "string" ? comment.trim() : null,
      status: "pending",
    },
  });

  return NextResponse.json({ success: true, id: report.id });
}
