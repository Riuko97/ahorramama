import Link from "next/link";
import { getProducts, getCategories, getDealOfDay, productSchemaItem, discount, eur, productPath } from "../lib/products";
import HeroCarousel from "./components/HeroCarousel";
import Marquee from "./components/Marquee";
import Trust from "./components/Trust";
import DealOfDay from "./components/DealOfDay";
import Shop from "./components/Shop";
import Newsletter from "./components/Newsletter";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [products, categories, dealOfDay] = await Promise.all([
    getProducts(),
    getCategories(),
    getDealOfDay(),
  ]);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: productSchemaItem(p),
    })),
  };

  // 6 chollos con foto y descuento para las tarjetas del hero (2 por slide).
  const featured = products
    .filter((p) => p.img && discount(p) > 0)
    .sort((a, b) => discount(b) - discount(a))
    .slice(0, 6)
    .map((p) => ({
      img: p.img,
      price: eur(p.price),
      off: `-${discount(p)}%`,
      href: productPath(p),
      title: p.title,
    }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <HeroCarousel featured={featured} />
      <Marquee />
      <Trust />
      <div className="wrap">
        <nav className="crumbs" aria-label="Ruta"><Link href="/">Inicio</Link><span>›</span>Chollos de bebé</nav>
        <DealOfDay product={dealOfDay} />
        <Shop products={products} categories={categories} />
        <section className="seo-intro" aria-label="Sobre AhorraMamá">
          <h2>Chollos de bebé seleccionados a mano, cada día</h2>
          <p>
            En AhorraMamá rastreamos a diario las ofertas de Amazon y de las principales tiendas
            españolas de puericultura para traerte solo los chollos que merecen la pena: cochecitos,
            sillas de coche i-Size, vigilabebés, tronas, sacaleches, pañales y mucho más. Solo
            publicamos productos con valoraciones reales de 4 estrellas o más, con su precio actual
            y el descuento verificado en el momento de publicarlo.
          </p>
          <p>
            Usa el comparador para ver hasta 4 productos lado a lado antes de decidir, filtra por
            categoría o busca directamente lo que necesitas. Y si estás empezando, en nuestras{" "}
            <Link href="/blog/">guías de compra</Link> te contamos qué silla de coche, cochecito o
            vigilabebés elegir según tu caso. Para recibir los mejores chollos antes que nadie,
            apúntate gratis a la newsletter.
          </p>
        </section>
        <Newsletter />
      </div>
    </>
  );
}
