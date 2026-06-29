import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { serializeProduct } from "../../../../lib/products";
import { validateProduct } from "../../../../lib/validation";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();
  const cat = searchParams.get("cat")?.trim();

  const where = {};
  if (cat && cat !== "Todas") where.cat = cat;
  if (q) where.title = { contains: q };

  const products = await prisma.product.findMany({ where, orderBy: { id: "asc" } });
  return NextResponse.json(products);
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { data, errors } = validateProduct(body);
  if (errors) return NextResponse.json({ errors }, { status: 422 });

  try {
    const product = await prisma.product.create({ data: serializeProduct(data) });
    return NextResponse.json(product, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "No se pudo crear el producto", detail: e.message }, { status: 400 });
  }
}
