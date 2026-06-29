"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const inputStyle = { padding: "10px 12px", borderRadius: 10, border: "1px solid var(--line)", width: "100%" };
const labelStyle = { display: "grid", gap: 6, fontSize: 14, fontWeight: 600 };

export default function ProductForm({ product }) {
  const router = useRouter();
  const editing = Boolean(product);
  const [errors, setErrors] = useState([]);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: product?.title || "",
    cat: product?.cat || "",
    brand: product?.brand || "",
    store: product?.store || "Amazon",
    url: product?.url || "",
    img: product?.img || "",
    icon: product?.icon || "",
    color: product?.color || "",
    price: product?.price ?? "",
    was: product?.was ?? "",
    rating: product?.rating ?? "",
    reviews: product?.reviews ?? "",
    description: product?.description || "",
    images: product?.images ? safeJoin(product.images) : "",
    flash: product?.flash ?? false,
    active: product?.active ?? true,
  });

  const set = (k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSaving(true);

    const payload = {
      ...form,
      price: form.price === "" ? null : Number(form.price),
      was: form.was === "" ? null : Number(form.was),
      rating: form.rating === "" ? null : Number(form.rating),
      reviews: form.reviews === "" ? null : Number(form.reviews),
      images: form.images.trim()
        ? form.images.split(/\n|,/).map((s) => s.trim()).filter(Boolean)
        : null,
    };

    try {
      const url = editing ? `/api/admin/products/${product.id}` : "/api/admin/products";
      const res = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        router.push("/admin/productos");
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setErrors(data.errors || [data.error || "No se pudo guardar"]);
      }
    } catch {
      setErrors(["Error de conexión"]);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 16, maxWidth: 640 }}>
      {errors.length > 0 && (
        <div style={{ background: "#fee", border: "1px solid #f99", borderRadius: 10, padding: 12 }}>
          {errors.map((er, i) => <div key={i} style={{ color: "#c00", fontSize: 14 }}>{er}</div>)}
        </div>
      )}

      <label style={labelStyle}>Título *
        <input style={inputStyle} value={form.title} onChange={set("title")} required />
      </label>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <label style={labelStyle}>Categoría *
          <input style={inputStyle} value={form.cat} onChange={set("cat")} required />
        </label>
        <label style={labelStyle}>Marca
          <input style={inputStyle} value={form.brand} onChange={set("brand")} />
        </label>
      </div>

      <label style={labelStyle}>URL de afiliado *
        <input style={inputStyle} value={form.url} onChange={set("url")} required placeholder="https://amzn.to/..." />
      </label>

      <label style={labelStyle}>Imagen principal (ruta)
        <input style={inputStyle} value={form.img} onChange={set("img")} placeholder="/products/ejemplo.jpg" />
      </label>

      <label style={labelStyle}>Galería (una ruta por línea o separadas por coma)
        <textarea style={{ ...inputStyle, minHeight: 70 }} value={form.images} onChange={set("images")} />
      </label>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <label style={labelStyle}>Precio (€)
          <input style={inputStyle} type="number" step="0.01" value={form.price} onChange={set("price")} />
        </label>
        <label style={labelStyle}>Precio anterior (€)
          <input style={inputStyle} type="number" step="0.01" value={form.was} onChange={set("was")} />
        </label>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <label style={labelStyle}>Valoración (0-5)
          <input style={inputStyle} type="number" step="0.1" min="0" max="5" value={form.rating} onChange={set("rating")} />
        </label>
        <label style={labelStyle}>Nº reseñas
          <input style={inputStyle} type="number" value={form.reviews} onChange={set("reviews")} />
        </label>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <label style={labelStyle}>Emoji/icono
          <input style={inputStyle} value={form.icon} onChange={set("icon")} placeholder="🛒" />
        </label>
        <label style={labelStyle}>Color de fondo
          <input style={inputStyle} value={form.color} onChange={set("color")} placeholder="#eef1f5" />
        </label>
      </div>

      <label style={labelStyle}>Descripción
        <textarea style={{ ...inputStyle, minHeight: 100 }} value={form.description} onChange={set("description")} />
      </label>

      <div style={{ display: "flex", gap: 24 }}>
        <label style={{ display: "flex", gap: 8, alignItems: "center", fontWeight: 600, fontSize: 14 }}>
          <input type="checkbox" checked={form.flash} onChange={set("flash")} /> Oferta flash ⚡
        </label>
        <label style={{ display: "flex", gap: 8, alignItems: "center", fontWeight: 600, fontSize: 14 }}>
          <input type="checkbox" checked={form.active} onChange={set("active")} /> Activo (visible)
        </label>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <button type="submit" disabled={saving} className="btn btn--buy"
          style={{ padding: "12px 28px", borderRadius: 14 }}>
          {saving ? "Guardando..." : editing ? "Guardar cambios" : "Crear producto"}
        </button>
        <button type="button" onClick={() => router.push("/admin/productos")} className="btn"
          style={{ padding: "12px 28px", borderRadius: 14, background: "var(--line)", color: "var(--ink)" }}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

function safeJoin(images) {
  try {
    const arr = Array.isArray(images) ? images : JSON.parse(images);
    return Array.isArray(arr) ? arr.join("\n") : "";
  } catch {
    return "";
  }
}
