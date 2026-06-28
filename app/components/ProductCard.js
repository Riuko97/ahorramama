"use client";
import { affLink, discount, stars, eur } from "../../lib/products";
import { useStore } from "./StoreProvider";
import { IconScale } from "./Icons";

export default function ProductCard({ p }) {
  const { compareIds, toggleCompare } = useStore();
  const on = compareIds.includes(p.id);
  const d = discount(p);
  return (
    <article className="card" data-cat={p.cat}>
      <div className="card__img" style={{ background: p.color }}>
        {p.icon}
        {d > 0 ? <span className="badge badge--off">-{d}%</span> : null}
        {p.flash ? <span className="badge badge--flash">⚡ Flash</span> : null}
        <span className="badge badge--store">{p.store}</span>
      </div>
      <div className="card__body">
        <span className="card__cat">{p.cat}</span>
        <h3 className="card__title">{p.title}</h3>
        <div className="card__stars" aria-label={`${p.rating} de 5`}>
          {stars(p.rating)} <small>({p.reviews.toLocaleString("es-ES")})</small>
        </div>
        <div className="card__prices">
          <span className="now">{eur(p.price)}</span>
          {d > 0 ? <span className="was">{eur(p.was)}</span> : null}
        </div>
        <div className="card__actions">
          <a className="btn btn--buy" href={affLink(p.url)} target="_blank" rel="nofollow sponsored noopener">Ver oferta →</a>
          <button
            type="button"
            className={"btn btn--cmp" + (on ? " on" : "")}
            aria-label="Añadir al comparador"
            title="Comparar"
            onClick={() => toggleCompare(p.id)}
          ><IconScale size={18} /></button>
        </div>
      </div>
    </article>
  );
}
