"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };
  return (
    <button onClick={logout} className="btn"
      style={{ background: "var(--line)", color: "var(--ink)", padding: "10px 20px", borderRadius: 11 }}>
      Cerrar sesión
    </button>
  );
}
