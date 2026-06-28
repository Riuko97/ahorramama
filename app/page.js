import Link from "next/link";
import { PRODUCTS, affLink } from "../lib/products";
import HeroCarousel from "./components/HeroCarousel";
import Marquee from "./components/Marquee";
import Trust from "./components/Trust";
import DealOfDay from "./components/DealOfDay";
import Shop from "./components/Shop";
import Newsletter from "./components/Newsletter";

// Datos estructurados de productos (rich snippets en Google)
const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: PRODUCTS.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      name: p.title,
      brand: { "@type": "Brand", name: p.brand },
      category: p.cat,
      aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviews },
      offers: { "@type": "Offer", price: p.price, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: affLink(p.url) },
    },
  })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <HeroCarousel />
      <Marquee />
      <Trust />
      <div className="wrap">
        <nav className="crumbs" aria-label="Ruta"><Link href="/">Inicio</Link><span>›</span>Chollos de bebé</nav>
        <DealOfDay />
        <Shop />
        <Newsletter />
      </div>
    </>
  );
}
