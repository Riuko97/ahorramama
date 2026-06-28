"use client";
import { PRODUCTS, affLink, discount, stars, eur } from "../../lib/products";
import { useStore } from "./StoreProvider";
import { IconScale } from "./Icons";

export default function Comparator() {
  const { compareIds, toggleCompare, compareOpen, setCompareOpen } = useStore();
  const items = compareIds.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);

  const prices = items.map((p) => p.price).filter((v) => v != null);
  const minP = prices.length ? Math.min(...prices) : 0;
  const ratings = items.map((p) => p.rating).filter((v) => v != null);
  const maxR = ratings.length ? Math.max(...ratings) : 0;
  const maxD = items.length ? Math.max(...items.map((p) => discount(p))) : 0;

  return (
    <>
      <button type="button" className="cmpFloat" onClick={() => setCompareOpen(true)} aria-label="Abrir comparador">
        <IconScale size={20} /> Comparar <span className="count">{compareIds.length}</span>
      </button>

      {compareOpen ? (
        <div className="overlay" onClick={(e) => { if (e.target === e.currentTarget) setCompareOpen(false); }}>
          <div className="modal">
            <div className="top">
              <h2><IconScale size={24} /> Comparador de productos</h2>
              <button type="button" className="x" onClick={() => setCompareOpen(false)} aria-label="Cerrar">✕</button>
            </div>
            <p style={{ color: "var(--muted)", fontSize: "14px" }}>Compara hasta 4 productos lado a lado y elige el que mejor se adapta a ti.</p>
            {items.length === 0 ? (
              <div className="empty">Aún no has añadido productos.<br />Pulsa el botón <IconScale size={16} className="inline-ic" /> de cualquier oferta para compararla.</div>
            ) : (
              <table className="ctable">
                <tbody>
                  <tr><th></th>{items.map((p) => <td key={p.id} className="ph" style={{ background: p.color }}>{p.icon}</td>)}</tr>
                  <tr><th>Producto</th>{items.map((p) => <td key={p.id} className="pn">{p.title}</td>)}</tr>
                  <tr><th>Marca</th>{items.map((p) => <td key={p.id}>{p.brand}</td>)}</tr>
                  <tr><th>Categoría</th>{items.map((p) => <td key={p.id}>{p.cat}</td>)}</tr>
                  <tr><th>Precio</th>{items.map((p) => (
                    <td key={p.id}>{p.price != null ? <><span className={p.price === minP ? "best" : ""}>{eur(p.price)}</span>{p.was ? <span className="pw">{eur(p.was)}</span> : null}</> : <span className="pw">Ver en Amazon</span>}</td>
                  ))}</tr>
                  <tr><th>Descuento</th>{items.map((p) => <td key={p.id} className={discount(p) === maxD && discount(p) > 0 ? "best" : ""}>{discount(p) > 0 ? "-" + discount(p) + "%" : "—"}</td>)}</tr>
                  <tr><th>Valoración</th>{items.map((p) => <td key={p.id} className={p.rating && p.rating === maxR ? "best" : ""}>{p.rating ? stars(p.rating) + " " + p.rating : "—"}</td>)}</tr>
                  <tr><th>Opiniones</th>{items.map((p) => <td key={p.id}>{p.reviews ? p.reviews.toLocaleString("es-ES") : "—"}</td>)}</tr>
                  <tr><th></th>{items.map((p) => (
                    <td key={p.id}>
                      <a className="cbuy" href={affLink(p.url)} target="_blank" rel="nofollow sponsored noopener">Comprar →</a>
                      <br /><button type="button" className="rm" onClick={() => toggleCompare(p.id)}>Quitar</button>
                    </td>
                  ))}</tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
