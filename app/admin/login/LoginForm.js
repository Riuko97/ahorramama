"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = e.target;
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email.value, password: form.password.value }),
      });
      if (res.ok) {
        const from = search.get("from") || "/admin";
        router.push(from);
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Credenciales incorrectas");
      }
    } catch {
      setError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 14, textAlign: "left" }}>
      <label style={{ display: "grid", gap: 6 }}>
        <span style={{ fontSize: 14, fontWeight: 600 }}>Email</span>
        <input name="email" type="email" required autoComplete="username"
          style={{ padding: "12px 14px", borderRadius: 11, border: "1px solid var(--line)" }} />
      </label>
      <label style={{ display: "grid", gap: 6 }}>
        <span style={{ fontSize: 14, fontWeight: 600 }}>Contraseña</span>
        <input name="password" type="password" required autoComplete="current-password"
          style={{ padding: "12px 14px", borderRadius: 11, border: "1px solid var(--line)" }} />
      </label>
      {error && <p style={{ color: "#d00", fontSize: 14, margin: 0 }}>{error}</p>}
      <button type="submit" disabled={loading} className="btn btn--buy"
        style={{ marginTop: 6, padding: "14px 28px", borderRadius: 30, fontSize: 15 }}>
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
