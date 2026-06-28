import { notFound } from "next/navigation";
import Link from "next/link";
import { PRODUCTS, affLink, discount, stars, eur, productSchemaItem } from "../../../lib/products";
import CompareButton from "../../components/CompareButton";
import Gallery from "../../components/Gallery";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: String(p.id) }));
}

export function generateMetadata({ params }) {
  const p = PRODUCTS.find((x) => String(x.id) === params.id);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description || `Oferta en ${p.title} al mejor precio.`,
    alternates: { canonical: `/producto/${p.id}/` },
  };
}

export default function ProductPage({ params }) {
  const p = PRODUCTS.find((x) => String(x.id) === params.id);
  if (!p) notFound();
  const d = discount(p);
  const opinions = p.opinions || [];

  const schema = { "@context": "https://schema.org", ...productSchemaItem(p) };

  return (
    <div className="wrap pd">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <nav className="crumbs" aria-label="Ruta">
        <Link href="/">Inicio</Link><span>›</span>
        <Link href="/#ofertas">{p.cat}</Link><span>›</span>{p.title}
      </nav>

      <div className="pd-top">
        <Gallery images={p.images || (p.img ? [p.img] : [])} alt={p.title} icon={p.icon} color={p.color} />
        <div className="pd-info">
          <span className="pd-cat">{p.cat}</span>
          <h1>{p.title}</h1>
          <div className="pd-brand">Marca: <strong>{p.brand}</strong></div>
          {p.rating ? <div className="pd-stars">{stars(p.rating)} <small>{p.rating} · {(p.reviews || 0).toLocaleString("es-ES")} valoraciones</small></div> : null}
          <div className="pd-price">
            {p.price != null ? (
              <>
                <span className="now">{eur(p.price)}</span>
                {d > 0 ? <span className="was">{eur(p.was)}</span> : null}
                {d > 0 ? <span className="disc">-{d}%</span> : null}
              </>
            ) : (
              <span className="now">Ver precio en Amazon</span>
            )}
          </div>
          <div className="pd-store">Disponible en <strong>{p.store}</strong></div>
          <div className="pd-actions">
            <a className="pd-cta" href={affLink(p.url)} target="_blank" rel="nofollow sponsored noopener">Ir a la oferta</a>
            <CompareButton id={p.id} />
          </div>
          <ul className="pd-trust">
            <li>Compra en la tienda oficial</li>
            <li>El precio final es el que aparece en la tienda</li>
          </ul>
        </div>
      </div>

      {p.description ? (
        <section className="pd-section">
          <h2>Descripción</h2>
          <p>{p.description}</p>
        </section>
      ) : null}

      <section className="pd-section">
        <h2>Opiniones {opinions.length ? `(${opinions.length})` : ""}</h2>
        {p.rating ? (
          <div className="pd-rsum">
            <span className="big">{p.rating.toLocaleString("es-ES")}</span>
            <span className="pd-rsum-meta">{stars(p.rating)}<br /><small>{(p.reviews || 0).toLocaleString("es-ES")} valoraciones en {p.store}</small></span>
          </div>
        ) : null}
        {opinions.length ? (
          <div className="pd-reviews">
            {opinions.map((o, i) => (
              <div className="review" key={i}>
                <div className="review-top"><strong>{o.name}</strong><span className="rstars">{stars(o.rating)}</span></div>
                <div className="review-date">{o.date}</div>
                <p>{o.text}</p>
              </div>
            ))}
          </div>
        ) : <p className="pd-noop">Aún no hay opiniones destacadas para este producto.</p>}
      </section>

      <p style={{ marginTop: "26px" }}><Link href="/#ofertas">← Volver a las ofertas</Link></p>
    </div>
  );
}
