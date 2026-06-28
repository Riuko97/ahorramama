"use client";
import { useMemo } from "react";
import { PRODUCTS, CATEGORIES } from "../../lib/products";
import { useStore } from "./StoreProvider";
import ProductCard from "./ProductCard";

export default function Shop() {
  const { category, setCategory, query } = useStore();

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return PRODUCTS.filter((p) => {
      const okCat = category === "Todas" || p.cat === category;
      const okText = !q || p.title.toLowerCase().includes(q);
      return okCat && okText;
    });
  }, [category, query]);

  return (
    <section className="section" id="ofertas">
      <div className="section-head">
        <h2>Chollos destacados</h2>
        <span className="sub">{filtered.length} ofertas</span>
      </div>
      <div className="filters">
        {CATEGORIES.map((c) => (
          <button
            type="button"
            key={c}
            className={"chip" + (c === category ? " active" : "")}
            onClick={() => setCategory(c)}
          >{c}</button>
        ))}
      </div>
      <div className="grid">
        {filtered.length === 0 ? (
          <p className="empty-msg">No hay ofertas que coincidan con tu búsqueda.</p>
        ) : (
          filtered.map((p) => <ProductCard key={p.id} p={p} />)
        )}
      </div>
    </section>
  );
}
