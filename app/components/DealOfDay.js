import { affLink, discount, eur } from "../../lib/products";

export default function DealOfDay({ product }) {
  const p = product;
  if (!p) return null;
  return (
    <section className="dod" aria-label="Oferta del día">
      <div className="thumb" style={{ background: p.img ? "#fff" : p.color }}>
        {p.img ? <img src={p.img} alt={p.title} className="dod-photo" /> : p.icon}
      </div>
      <div className="info">
        <div className="kicker">🔥 Oferta del día</div>
        <h3>{p.title}</h3>
        <div className="prices">
          <span className="now">{eur(p.price)}</span>
          <span className="was">{eur(p.was)}</span>
          <span className="pill">-{discount(p)}%</span>
        </div>
      </div>
      <a className="cta" href={affLink(p.url)} target="_blank" rel="nofollow sponsored noopener">Ver oferta</a>
    </section>
  );
}
