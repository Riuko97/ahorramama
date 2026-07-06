// ============================================================
// AhorraMamá · Utilidades y acceso a datos (fuente: SQLite/Prisma)
// ============================================================
export const AFFILIATE_TAG = "ahorramama-21";
export const SITE_URL = "https://ahorramama.com";

// ---------- helpers de serialización ----------

export function deserializeProduct(p) {
  return {
    ...p,
    images: p.images ? JSON.parse(p.images) : null,
    opinions: p.opinions ? JSON.parse(p.opinions) : [],
  };
}

export function serializeProduct(p) {
  const out = { ...p };
  // Solo serializa los campos presentes para soportar updates parciales
  // (de lo contrario un PUT sin "images" borraría las imágenes existentes).
  if ("images" in p) {
    out.images = Array.isArray(p.images) ? JSON.stringify(p.images) : p.images ?? null;
  }
  if ("opinions" in p) {
    out.opinions = Array.isArray(p.opinions) ? JSON.stringify(p.opinions) : p.opinions ?? null;
  }
  return out;
}

// ---------- consultas de BD (solo en Server Components / API Routes) ----------

export async function getProducts() {
  const { default: prisma } = await import("./prisma");
  const rows = await prisma.product.findMany({ where: { active: true }, orderBy: { id: "asc" } });
  return rows.map(deserializeProduct);
}

export async function getProduct(id) {
  const { default: prisma } = await import("./prisma");
  const row = await prisma.product.findUnique({ where: { id: Number(id) } });
  return row ? deserializeProduct(row) : null;
}

export async function getCategories() {
  const products = await getProducts();
  return ["Todas", ...Array.from(new Set(products.map((p) => p.cat)))];
}

export async function getDealOfDay() {
  const products = await getProducts();
  return [...products].filter((p) => p.price != null).sort((a, b) => discount(b) - discount(a))[0] ?? null;
}

// ---------- utilidades puras (seguras en cliente) ----------

export function affLink(url) {
  // Solo añade el tag de Amazon a URLs de Amazon; las de Awin (awin1.com)
  // u otras redes ya llevan su propio tracking y no deben tocarse.
  const isAmazon = /(^|\.)amazon\.[a-z.]+\//.test(url);
  if (!isAmazon || /amzn\.to/.test(url) || /[?&]tag=/.test(url)) return url;
  return url + (url.includes("?") ? "&" : "?") + "tag=" + AFFILIATE_TAG;
}

export function discount(p) {
  if (p.price == null || !p.was || p.was <= p.price) return 0;
  return Math.round((1 - p.price / p.was) * 100);
}

export function stars(r) {
  if (!r) return "";
  const f = Math.round(r);
  return "★".repeat(f) + "☆".repeat(5 - f);
}

export function eur(n) {
  if (n == null) return "";
  const opts = Number.isInteger(n) ? {} : { minimumFractionDigits: 2, maximumFractionDigits: 2 };
  return n.toLocaleString("es-ES", opts) + " €";
}

export function productSchemaItem(p) {
  const item = {
    "@type": "Product",
    name: p.title,
    brand: { "@type": "Brand", name: p.brand || undefined },
    category: p.cat,
  };
  if (p.img) item.image = p.img;
  if (p.rating) item.aggregateRating = { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviews || 0 };
  const offer = { "@type": "Offer", availability: "https://schema.org/InStock", url: affLink(p.url) };
  if (p.price != null) { offer.price = p.price; offer.priceCurrency = "EUR"; }
  item.offers = offer;
  return item;
}
