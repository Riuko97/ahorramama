import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import prisma from "../../lib/prisma";
import { getAdminFromCookies } from "../../lib/auth";
import LogoutButton from "./LogoutButton";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Panel Admin · AhorraMamá",
  robots: { index: false },
};

export default async function AdminPage() {
  const admin = await getAdminFromCookies(cookies());
  if (!admin) redirect("/admin/login");

  const [totalProducts, activeProducts, flashProducts, subscribers] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { active: true } }),
    prisma.product.count({ where: { flash: true } }),
    prisma.newsletter.count(),
  ]);

  const stats = [
    { label: "Productos totales", value: totalProducts },
    { label: "Activos", value: activeProducts },
    { label: "Ofertas flash", value: flashProducts },
    { label: "Suscriptores", value: subscribers },
  ];

  return (
    <div className="page" style={{ maxWidth: 900, margin: "60px auto", padding: "0 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <h1 style={{ margin: 0 }}>Panel de administración</h1>
        <LogoutButton />
      </div>
      <p style={{ color: "var(--muted)", marginBottom: 32 }}>
        Conectado como <strong>{admin.email}</strong>
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 32 }}>
        {stats.map((s) => (
          <div key={s.label} style={{ border: "1px solid var(--line)", borderRadius: 14, padding: 20 }}>
            <div style={{ fontSize: 30, fontWeight: 800 }}>{s.value}</div>
            <div style={{ color: "var(--muted)", fontSize: 14 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        <Link href="/admin/productos" className="btn btn--buy"
          style={{ padding: "14px 24px", borderRadius: 14, textAlign: "center" }}>
          Gestionar productos
        </Link>
        <Link href="/admin/suscriptores" className="btn"
          style={{ padding: "14px 24px", borderRadius: 14, textAlign: "center", background: "var(--line)", color: "var(--ink)" }}>
          Ver suscriptores
        </Link>
      </div>
    </div>
  );
}
