import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { serializeProduct } from "../../../../../lib/products";
import { validateProduct } from "../../../../../lib/validation";

function parseId(params) {
  const id = Number(params.id);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function GET(_req, { params }) {
  const id = parseId(params);
  if (!id) return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(request, { params }) {
  const id = parseId(params);
  if (!id) return NextResponse.json({ error: "ID inválido" }, { status: 400 });

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { data, errors } = validateProduct(body, { partial: true });
  if (errors) return NextResponse.json({ errors }, { status: 422 });

  try {
    const product = await prisma.product.update({ where: { id }, data: serializeProduct(data) });
    return NextResponse.json(product);
  } catch (e) {
    if (e.code === "P2025") return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    return NextResponse.json({ error: "No se pudo actualizar", detail: e.message }, { status: 400 });
  }
}

export async function DELETE(_req, { params }) {
  const id = parseId(params);
  if (!id) return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e.code === "P2025") return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    return NextResponse.json({ error: "No se pudo eliminar", detail: e.message }, { status: 400 });
  }
}
