"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubscribersTable({ subscribers }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(null);

  const onDelete = async (s) => {
    if (!confirm(`¿Eliminar a ${s.email}?`)) return;
    setDeleting(s.id);
    try {
      const res = await fetch("/api/admin/subscribers", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: s.id }),
      });
      if (res.ok) router.refresh();
      else alert("No se pudo eliminar.");
    } finally {
      setDeleting(null);
    }
  };

  if (subscribers.length === 0) {
    return <p style={{ color: "var(--muted)" }}>Aún no hay suscriptores.</p>;
  }

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
      <thead>
        <tr style={{ textAlign: "left", borderBottom: "2px solid var(--line)" }}>
          <th style={cell}>Email</th>
          <th style={cell}>Fecha de alta</th>
          <th style={cell}></th>
        </tr>
      </thead>
      <tbody>
        {subscribers.map((s) => (
          <tr key={s.id} style={{ borderBottom: "1px solid var(--line)" }}>
            <td style={cell}>{s.email}</td>
            <td style={cell}>{new Date(s.createdAt).toLocaleDateString("es-ES")}</td>
            <td style={{ ...cell, textAlign: "right" }}>
              <button onClick={() => onDelete(s)} disabled={deleting === s.id}
                style={{ color: "#c00", background: "none", border: "none", cursor: "pointer" }}>
                {deleting === s.id ? "..." : "Eliminar"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const cell = { padding: "10px 12px" };
