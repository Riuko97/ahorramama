import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format");

  const subscribers = await prisma.newsletter.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Exportar como CSV para importar en herramientas de email marketing
  if (format === "csv") {
    const rows = ["email,fecha", ...subscribers.map((s) => `${s.email},${s.createdAt.toISOString()}`)];
    return new NextResponse(rows.join("\n"), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="suscriptores.csv"',
      },
    });
  }

  return NextResponse.json(subscribers);
}

export async function DELETE(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  const id = Number(body.id);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }
  try {
    await prisma.newsletter.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e.code === "P2025") return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    return NextResponse.json({ error: "No se pudo eliminar", detail: e.message }, { status: 400 });
  }
}
