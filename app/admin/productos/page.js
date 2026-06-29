import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import prisma from "../../../lib/prisma";
import { getAdminFromCookies } from "../../../lib/auth";
import ProductsTable from "./ProductsTable";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Productos · Admin",
  robots: { index: false },
};

export default async function ProductosPage() {
  const admin = await getAdminFromCookies(cookies());
  if (!admin) redirect("/admin/login");

  const products = await prisma.product.findMany({ orderBy: { id: "asc" } });

  return (
    <div className="page" style={{ maxWidth: 1000, margin: "60px auto", padding: "0 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <Link href="/admin" style={{ fontSize: 14, color: "var(--muted)" }}>← Volver al panel</Link>
          <h1 style={{ margin: "6px 0 0" }}>Productos ({products.length})</h1>
        </div>
        <Link href="/admin/productos/nuevo" className="btn btn--buy" style={{ padding: "12px 24px", borderRadius: 14 }}>
          + Nuevo producto
        </Link>
      </div>
      <ProductsTable products={products} />
    </div>
  );
}
