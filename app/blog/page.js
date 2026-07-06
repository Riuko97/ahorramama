import Link from "next/link";
import { ARTICLES } from "../../lib/articles";
import { SITE_URL } from "../../lib/products";

export const metadata = {
  title: "Blog · Guías de compra para bebé",
  description:
    "Guías de compra honestas para padres: sillas de coche i-Size, cochecitos, vigilabebés y más, con chollos verificados y comparador.",
  alternates: { canonical: `${SITE_URL}/blog/` },
};

export default function BlogPage() {
  return (
    <div className="wrap">
      <nav className="crumbs" aria-label="Ruta"><Link href="/">Inicio</Link><span>›</span>Blog</nav>
      <h1 className="blog-h1">Guías de compra para bebé</h1>
      <p className="blog-sub">Escribimos las guías que nos habría gustado leer antes de comprar: sin humo, con normativa al día y enlaces a chollos verificados.</p>
      <div className="blog-grid">
        {ARTICLES.map((a) => (
          <article key={a.slug} className="blog-card">
            <span className="card__cat">{a.cat}</span>
            <h2><Link href={`/blog/${a.slug}/`}>{a.title}</Link></h2>
            <p>{a.description}</p>
            <Link className="blog-more" href={`/blog/${a.slug}/`}>Leer la guía →</Link>
          </article>
        ))}
      </div>
    </div>
  );
}
