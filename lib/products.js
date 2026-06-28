// ============================================================
// AhorraMamá · Datos y utilidades (FUENTE ÚNICA)
// Edita aquí tus ofertas y pon tu ID de Amazon Afiliados.
// ============================================================
export const AFFILIATE_TAG = "tuafiliado-21"; // <-- tu ID, ej. "chollosbebe-21"
export const SITE_URL = "https://ahorramama.com"; // <-- tu dominio real

export const PRODUCTS = [
  { id: 3, title: "Maxi-Cosi Zelia S Trio · cochecito 3 piezas + silla i-Size (0-4 años)", cat: "Cochecitos", icon: "🛒", color: "#eef1f5", price: 350.99, was: 359.99, rating: 4.4, reviews: 1834, brand: "Maxi-Cosi", store: "Amazon", flash: false, url: "https://amzn.to/4oSDr0h" },
  { id: 1, title: "Dodot Sensitive Talla 2 · 240 pañales + 40 toallitas (pack mensual)", cat: "Pañales", icon: "🧷", color: "#e9f1ff", price: 80.99, was: null, rating: 4.7, reviews: 16575, brand: "Dodot", store: "Amazon", flash: false, url: "https://amzn.to/4oTYmjp" },
  { id: 2, title: "Toallitas para bebé sin perfume · 1008 uds (18 packs)", cat: "Higiene", icon: "🧴", color: "#e7f8f0", price: 13.10, was: 14.31, rating: 4.3, reviews: 6030, brand: "by Amazon", store: "Amazon", flash: false, url: "https://amzn.to/4eOQXgK" },
];

export const CATEGORIES = ["Todas", ...Array.from(new Set(PRODUCTS.map((p) => p.cat)))];
export const DEAL_OF_DAY = [...PRODUCTS].sort((a, b) => discount(b) - discount(a))[0];

export function affLink(url) {
  // Enlaces acortados (amzn.to) o que ya llevan tag se usan tal cual.
  if (/amzn\.to/.test(url) || /[?&]tag=/.test(url)) return url;
  return url + (url.includes("?") ? "&" : "?") + "tag=" + AFFILIATE_TAG;
}
export function discount(p) {
  if (!p.was || p.was <= p.price) return 0;
  return Math.round((1 - p.price / p.was) * 100);
}
export function stars(r) { const f = Math.round(r); return "★".repeat(f) + "☆".repeat(5 - f); }
export function eur(n) {
  const opts = Number.isInteger(n) ? {} : { minimumFractionDigits: 2, maximumFractionDigits: 2 };
  return n.toLocaleString("es-ES", opts) + " €";
}
