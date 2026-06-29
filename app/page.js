import Link from "next/link";
import { getProducts, getCategories, getDealOfDay, productSchemaItem } from "../lib/products";
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <HeroCarousel />
      <Marquee />
      <Trust />
      <div className="wrap">
        <nav className="crumbs" aria-label="Ruta"><Link href="/">Inicio</Link><span>›</span>Chollos de bebé</nav>
        <DealOfDay product={dealOfDay} />
        <Shop products={products} categories={categories} />
        <Newsletter />
      </div>
    </>
  );
}
