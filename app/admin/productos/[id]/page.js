import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import prisma from "../../../../lib/prisma";
import { getAdminFromCookies } from "../../../../lib/auth";
import { deserializeProduct } from "../../../../lib/products";
import ProductForm from "../ProductForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Editar producto · Admin",
  robots: { index: false },
};

export default async function EditarProductoPage({ params }) {
  const admin = await getAdminFromCookies(cookies());
  if (!admin) redirect("/admin/login");

  const id = Number(params.id);
  if (!Number.isInteger(id)) notFound();

  const row = await prisma.product.findUnique({ where: { id } });
  if (!row) notFound();
  const product = deserializeProduct(row);

  return (
    <div className="page" style={{ maxWidth: 720, margin: "60px auto", padding: "0 20px" }}>
      <Link href="/admin/productos" style={{ fontSize: 14, color: "var(--muted)" }}>← Volver a productos</Link>
      <h1 style={{ margin: "6px 0 28px" }}>Editar producto #{product.id}</h1>
      <ProductForm product={product} />
    </div>
  );
}
