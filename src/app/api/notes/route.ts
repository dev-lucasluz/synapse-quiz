import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const questionId = searchParams.get("questionId");
  if (!questionId) return NextResponse.json({ error: "questionId ausente" }, { status: 400 });

  const note = await prisma.questionNote.findUnique({
    where: {
      userId_questionId: {
        userId: session.userId,
        questionId,
      },
    },
    select: { content: true, updatedAt: true },
  });

  return NextResponse.json({ content: note?.content ?? "" });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const body = await request.json();
  const { questionId, content } = body;

  if (!questionId || typeof content !== "string") {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const trimmed = content.trim();

  if (trimmed === "") {
    // If empty note, delete it to keep database clean
    await prisma.questionNote.deleteMany({
      where: {
        userId: session.userId,
        questionId,
      },
    });
    return NextResponse.json({ success: true, content: "" });
  }

  const savedNote = await prisma.questionNote.upsert({
    where: {
      userId_questionId: {
        userId: session.userId,
        questionId,
      },
    },
    create: {
      userId: session.userId,
      questionId,
      content: trimmed,
    },
    update: {
      content: trimmed,
    },
  });

  return NextResponse.json({ success: true, content: savedNote.content });
}
