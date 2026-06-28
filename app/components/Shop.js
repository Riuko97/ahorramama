"use client";
import { useMemo } from "react";
import { PRODUCTS, CATEGORIES } from "../../lib/products";
import { useStore } from "./StoreProvider";
import ProductCard from "./ProductCard";

export default function Shop() {
  const { category, setCategory, query } = useStore();

  const filtered = useMemo(() => {
    const norm = (str) => str.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const q = norm(query.trim());
    return PRODUCTS.filter((p) => {
      const okCat =
        category === "Todas" ? true : category === "flash" ? !!p.flash : p.cat === category;
      const haystack = norm(p.title + " " + p.cat + " " + (p.brand || ""));
      const okText = !q || q.split(/\s+/).every((w) => haystack.includes(w));
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
        <button type="button" className={"chip" + (category === "Todas" ? " active" : "")} onClick={() => setCategory("Todas")}>Todas</button>
        <button type="button" className={"chip chip--flash" + (category === "flash" ? " active" : "")} onClick={() => setCategory("flash")}>⚡ Flash</button>
        {CATEGORIES.filter((c) => c !== "Todas").map((c) => (
          <button type="button" key={c} className={"chip" + (c === category ? " active" : "")} onClick={() => setCategory(c)}>{c}</button>
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
