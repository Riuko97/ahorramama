"use client";
import { affLink, discount, stars, eur } from "../../lib/products";
import Link from "next/link";
import { useStore } from "./StoreProvider";
import { IconScale } from "./Icons";

export default function ProductCard({ p }) {
  const { compareIds, toggleCompare } = useStore();
  const on = compareIds.includes(p.id);
  const d = discount(p);
  return (
    <article className="card" data-cat={p.cat}>
      <Link href={`/producto/${p.id}`} className="card__imglink">
      <div className="card__img" style={{ background: p.img ? "#fff" : p.color }}>
        {p.img ? <img src={p.img} alt={p.title} className="card__photo" loading="lazy" decoding="async" /> : p.icon}
        {d > 0 ? <span className="badge badge--off">-{d}%</span> : null}
        {p.flash ? <span className="badge badge--flash">⚡ Flash</span> : null}
        <span className="badge badge--store">{p.store}</span>
      </div>
      </Link>
      <div className="card__body">
        <span className="card__cat">{p.cat}</span>
        <h3 className="card__title"><Link href={`/producto/${p.id}`}>{p.title}</Link></h3>
        {p.rating ? (
          <div className="card__stars" aria-label={`${p.rating} de 5`}>
            {stars(p.rating)} <small>({(p.reviews || 0).toLocaleString("es-ES")})</small>
          </div>
        ) : null}
        <div className="card__prices">
          {p.price != null ? (
            <>
              <span className="now">{eur(p.price)}</span>
              {d > 0 ? <span className="was">{eur(p.was)}</span> : null}
            </>
          ) : (
            <span className="card__noprice">Ver precio en Amazon</span>
          )}
        </div>
        <div className="card__actions">
          <a className="btn btn--buy" href={affLink(p.url)} target="_blank" rel="nofollow sponsored noopener">Ver oferta</a>
          <button
            type="button"
            className={"btn btn--cmp" + (on ? " on" : "")}
            aria-label="Añadir al comparador"
            title="Comparar"
            onClick={() => toggleCompare(p)}
          ><IconScale size={18} /></button>
        </div>
      </div>
    </article>
  );
}
