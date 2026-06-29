import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminFromCookies } from "../../../../lib/auth";
import ProductForm from "../ProductForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Nuevo producto · Admin",
  robots: { index: false },
};

export default async function NuevoProductoPage() {
  const admin = await getAdminFromCookies(cookies());
  if (!admin) redirect("/admin/login");

  return (
    <div className="page" style={{ maxWidth: 720, margin: "60px auto", padding: "0 20px" }}>
      <Link href="/admin/productos" style={{ fontSize: 14, color: "var(--muted)" }}>← Volver a productos</Link>
      <h1 style={{ margin: "6px 0 28px" }}>Nuevo producto</h1>
      <ProductForm />
    </div>
  );
}
