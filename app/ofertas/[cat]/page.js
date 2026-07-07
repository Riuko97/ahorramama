import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getProducts,
  getCategories,
  slugify,
  SITE_URL,
  productSchemaItem,
} from "../../../lib/products";
import ProductCard from "../../components/ProductCard";

export const dynamic = "force-dynamic";

async function resolveCat(param) {
  const cats = await getCategories();
  return cats.find((c) => c !== "Todas" && slugify(c) === param) || null;
}

export async function generateMetadata({ params }) {
  const cat = await resolveCat(params.cat);
  if (!cat) return {};
  const low = cat.toLowerCase();
  const title = `Ofertas y chollos de ${low} para bebé 2026`;
  const description = `Las mejores ofertas en ${low} de bebé, seleccionadas a mano y actualizadas cada día. Compara precios, descuentos y valoraciones y compra al mejor precio.`;
  const url = `${SITE_URL}/ofertas/${slugify(cat)}/`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} · AhorraMamá`, description, url, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CategoryPage({ params }) {
  const cat = await resolveCat(params.cat);
  if (!cat) notFound();

  const all = await getProducts();
  const products = all.filter((p) => p.cat === cat);
  const low = cat.toLowerCase();
  const url = `${SITE_URL}/ofertas/${slugify(cat)}/`;

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Ofertas de ${cat} para bebé`,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: productSchemaItem(p),
    })),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL + "/" },
      { "@type": "ListItem", position: 2, name: "Ofertas", item: SITE_URL + "/#ofertas" },
      { "@type": "ListItem", position: 3, name: cat, item: url },
    ],
  };

  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <nav className="crumbs" aria-label="Ruta">
        <Link href="/">Inicio</Link><span>›</span>
        <Link href="/#ofertas">Ofertas</Link><span>›</span>{cat}
      </nav>

      <section className="section">
        <div className="section-head">
          <h1>Ofertas de {low} para bebé</h1>
          <span className="sub">{products.length} ofertas</span>
        </div>
        <p style={{ maxWidth: "72ch", margin: "0 0 1.2rem", opacity: 0.85 }}>
          Estas son nuestras mejores ofertas en {low} de bebé, verificadas a mano y
          actualizadas cada día. Compara precios, descuentos y valoraciones y llévate el mejor chollo.
        </p>
        <div className="grid">
          {products.length === 0 ? (
            <p className="empty-msg">Pronto añadiremos ofertas en esta categoría.</p>
          ) : (
            products.map((p) => <ProductCard key={p.id} p={p} />)
          )}
        </div>
        <p style={{ marginTop: "1.4rem" }}>
          <Link href="/#ofertas">← Ver todas las categorías y ofertas</Link>
        </p>
      </section>
    </div>
  );
}
