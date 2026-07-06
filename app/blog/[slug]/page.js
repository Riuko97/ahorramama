import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, getArticle } from "../../../lib/articles";
import { SITE_URL } from "../../../lib/products";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }) {
  const a = getArticle(params.slug);
  if (!a) return {};
  const url = `${SITE_URL}/blog/${a.slug}/`;
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: url },
    openGraph: { title: a.title, description: a.description, url, type: "article" },
  };
}

export default function ArticlePage({ params }) {
  const a = getArticle(params.slug);
  if (!a) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    inLanguage: "es-ES",
    author: { "@type": "Organization", name: "AhorraMamá" },
    publisher: { "@type": "Organization", name: "AhorraMamá" },
    mainEntityOfPage: `${SITE_URL}/blog/${a.slug}/`,
  };

  return (
    <div className="wrap article">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav className="crumbs" aria-label="Ruta">
        <Link href="/">Inicio</Link><span>›</span>
        <Link href="/blog/">Blog</Link><span>›</span>{a.cat}
      </nav>
      <article className="article-body">
        <span className="card__cat">{a.cat}</span>
        <h1>{a.title}</h1>
        <p className="article-date">Actualizado el {new Date(a.date + "T00:00:00").toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}</p>
        {a.blocks.map((b, i) => {
          if (b.h2) return <h2 key={i}>{b.h2}</h2>;
          if (b.ul) return <ul key={i}>{b.ul.map((li, j) => <li key={j} dangerouslySetInnerHTML={{ __html: li }} />)}</ul>;
          return <p key={i} dangerouslySetInnerHTML={{ __html: b.p }} />;
        })}
        <p className="article-aff">AhorraMamá participa en programas de afiliación: si compras a través de nuestros enlaces podemos recibir una comisión, sin coste extra para ti. <Link href="/aviso-afiliados/">Más información</Link>.</p>
      </article>
    </div>
  );
}
