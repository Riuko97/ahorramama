"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductsTable({ products }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(null);

  const onDelete = async (p) => {
    if (!confirm(`¿Eliminar "${p.title}"?`)) return;
    setDeleting(p.id);
    try {
      const res = await fetch(`/api/admin/products/${p.id}`, { method: "DELETE" });
      if (res.ok) router.refresh();
      else alert("No se pudo eliminar el producto.");
    } finally {
      setDeleting(null);
    }
  };

  if (products.length === 0) {
    return <p style={{ color: "var(--muted)" }}>No hay productos. Crea el primero.</p>;
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "2px solid var(--line)" }}>
            <th style={th}>ID</th>
            <th style={th}>Título</th>
            <th style={th}>Categoría</th>
            <th style={th}>Precio</th>
            <th style={th}>Estado</th>
            <th style={th}></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} style={{ borderBottom: "1px solid var(--line)" }}>
              <td style={td}>{p.id}</td>
              <td style={{ ...td, maxWidth: 320 }}>{p.title}</td>
              <td style={td}>{p.cat}</td>
              <td style={td}>{p.price != null ? `${p.price} €` : "—"}</td>
              <td style={td}>
                {p.flash && <span title="Flash">⚡ </span>}
                <span style={{ color: p.active ? "#0a7" : "#999" }}>{p.active ? "Activo" : "Oculto"}</span>
              </td>
              <td style={{ ...td, whiteSpace: "nowrap" }}>
                <Link href={`/admin/productos/${p.id}`} style={{ marginRight: 12 }}>Editar</Link>
                <button onClick={() => onDelete(p)} disabled={deleting === p.id}
                  style={{ color: "#c00", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  {deleting === p.id ? "..." : "Eliminar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = { padding: "10px 12px", fontWeight: 700 };
const td = { padding: "10px 12px" };
