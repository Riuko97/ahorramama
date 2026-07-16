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

  const url = `${SITE_URL}/blog/${a.slug}/`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    dateModified: a.updated || a.date,
    inLanguage: "es-ES",
    image: a.image ? `${SITE_URL}${a.image}` : `${SITE_URL}/assets/og-image.jpg`,
    author: { "@type": "Organization", name: "AhorraMamá", url: SITE_URL + "/" },
    publisher: {
      "@type": "Organization",
      name: "AhorraMamá",
      logo: { "@type": "ImageObject", url: SITE_URL + "/assets/logo-symbol.svg" },
    },
    mainEntityOfPage: url,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL + "/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: SITE_URL + "/blog/" },
      { "@type": "ListItem", position: 3, name: a.title, item: url },
    ],
  };

  // Reúne todas las preguntas frecuentes de la guía para el FAQPage schema.
  const faqItems = a.blocks.flatMap((b) => (b.faq ? b.faq : []));
  const faqSchema = faqItems.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a.replace(/<[^>]+>/g, "") },
        })),
      }
    : null;

  return (
    <div className="wrap article">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {faqSchema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /> : null}
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
          if (b.h3) return <h3 key={i}>{b.h3}</h3>;
          if (b.ul) return <ul key={i}>{b.ul.map((li, j) => <li key={j} dangerouslySetInnerHTML={{ __html: li }} />)}</ul>;
          if (b.faq) return (
            <div className="faq" key={i}>
              {b.faq.map((f, j) => (
                <details className="faq-item" key={j}>
                  <summary>{f.q}</summary>
                  <div className="faq-a" dangerouslySetInnerHTML={{ __html: f.a }} />
                </details>
              ))}
            </div>
          );
          return <p key={i} dangerouslySetInnerHTML={{ __html: b.p }} />;
        })}
        <p className="article-aff">AhorraMamá participa en programas de afiliación: si compras a través de nuestros enlaces podemos recibir una comisión, sin coste extra para ti. <Link href="/aviso-afiliados/">Más información</Link>.</p>
      </article>
    </div>
  );
}
