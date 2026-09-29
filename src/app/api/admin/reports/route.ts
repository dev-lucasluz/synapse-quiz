import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

// Para quem não é administrador a rota responde 404, sem revelar que ela existe.
const notFound = () => NextResponse.json({ error: "Não encontrado" }, { status: 404 });

/** GET /api/admin/reports?status=pending|resolved|all — lista os reports (mais recentes primeiro). */
export async function GET(request: Request) {
  if (!(await requireAdmin())) return notFound();

  const status = new URL(request.url).searchParams.get("status") ?? "pending";
  const where = status === "resolved" ? { status: "resolved" } : status === "all" ? {} : { status: "pending" };

  const reports = await prisma.questionReport.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      user: { select: { name: true, email: true } },
      question: { include: { subject: { select: { name: true } } } },
    },
  });

  const [pending, resolved] = await Promise.all([
    prisma.questionReport.count({ where: { status: "pending" } }),
    prisma.questionReport.count({ where: { status: "resolved" } }),
  ]);

  return NextResponse.json({
    counts: { pending, resolved },
    reports: reports.map((r) => {
      let options: string[] = [];
      try {
        options = JSON.parse(r.question.options);
      } catch {
        options = [];
      }
      return {
        id: r.id,
        reason: r.reason,
        comment: r.comment,
        status: r.status,
        createdAt: r.createdAt,
        reporter: { name: r.user.name, email: r.user.email },
        question: {
          id: r.question.id,
          text: r.question.text,
          imageUrl: r.question.imageUrl,
          options,
          correctOption: r.question.correctOption,
          explanation: r.question.explanation,
          subject: r.question.subject.name,
          source: r.question.source,
        },
      };
    }),
  });
}

/** PATCH /api/admin/reports  { id, status: "pending" | "resolved" } — atualiza o status. */
export async function PATCH(request: Request) {
  if (!(await requireAdmin())) return notFound();

  let body: { id?: unknown; status?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida" }, { status: 400 });
  }
  if (
    typeof body?.id !== "string" ||
    body.id.length > 100 ||
    (body.status !== "pending" && body.status !== "resolved")
  ) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const result = await prisma.questionReport.updateMany({
    where: { id: body.id },
    data: { status: body.status },
  });
  if (result.count === 0) return notFound();
  return NextResponse.json({ ok: true });
}
