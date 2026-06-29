import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import prisma from "../../../lib/prisma";
import { getAdminFromCookies } from "../../../lib/auth";
import SubscribersTable from "./SubscribersTable";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Suscriptores · Admin",
  robots: { index: false },
};

export default async function SuscriptoresPage() {
  const admin = await getAdminFromCookies(cookies());
  if (!admin) redirect("/admin/login");

  const subscribers = await prisma.newsletter.findMany({ orderBy: { createdAt: "desc" } });
  const data = subscribers.map((s) => ({ id: s.id, email: s.email, createdAt: s.createdAt.toISOString() }));

  return (
    <div className="page" style={{ maxWidth: 800, margin: "60px auto", padding: "0 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <Link href="/admin" style={{ fontSize: 14, color: "var(--muted)" }}>← Volver al panel</Link>
          <h1 style={{ margin: "6px 0 0" }}>Suscriptores ({data.length})</h1>
        </div>
        <a href="/api/admin/subscribers?format=csv" className="btn"
          style={{ padding: "12px 24px", borderRadius: 14, background: "var(--line)", color: "var(--ink)" }}>
          Exportar CSV
        </a>
      </div>
      <SubscribersTable subscribers={data} />
    </div>
  );
}
