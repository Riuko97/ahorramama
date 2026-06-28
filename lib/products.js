// ============================================================
// AhorraMamá · Datos y utilidades (FUENTE ÚNICA)
// Edita aquí tus ofertas y pon tu ID de Amazon Afiliados.
// ============================================================
export const AFFILIATE_TAG = "tuafiliado-21"; // <-- tu ID, ej. "chollosbebe-21"
export const SITE_URL = "https://ahorramama.com"; // <-- tu dominio real

export const PRODUCTS = [
  { id: 1,  title: "Cochecito trío convertible 3 en 1", cat: "Cochecitos", icon: "🛒", color: "#e9f1ff", price: 549, was: 699, rating: 4.6, reviews: 842,  brand: "Chicco",        store: "Amazon", flash: false, url: "https://www.amazon.es/dp/B0XXXXXX01" },
  { id: 2,  title: "Silla de coche i-Size grupo 0+/1",  cat: "Sillas de coche", icon: "🚗", color: "#ffe6f1", price: 289, was: 399, rating: 4.8, reviews: 1230, brand: "Britax",        store: "Amazon", flash: true,  url: "https://www.amazon.es/dp/B0XXXXXX02" },
  { id: 3,  title: "Trona evolutiva de madera regulable", cat: "Tronas", icon: "🪑", color: "#fff4e0", price: 79,  was: 109, rating: 4.5, reviews: 560,  brand: "Hauck",         store: "Amazon", flash: false, url: "https://www.amazon.es/dp/B0XXXXXX03" },
  { id: 4,  title: "Vigilabebés con cámara HD y app",    cat: "Vigilabebés", icon: "📹", color: "#e7f8f0", price: 119, was: 159, rating: 4.4, reviews: 430,  brand: "Motorola",      store: "Amazon", flash: false, url: "https://www.amazon.es/dp/B0XXXXXX04" },
  { id: 5,  title: "Sacaleches eléctrico doble silencioso", cat: "Lactancia", icon: "🍼", color: "#f0ecff", price: 99,  was: 139, rating: 4.7, reviews: 910,  brand: "Medela",        store: "Amazon", flash: true,  url: "https://www.amazon.es/dp/B0XXXXXX05" },
  { id: 6,  title: "Cuna de colecho 6 alturas plegable", cat: "Dormir", icon: "🛏️", color: "#e9f1ff", price: 159, was: 199, rating: 4.6, reviews: 380,  brand: "Maxi-Cosi",     store: "Amazon", flash: false, url: "https://www.amazon.es/dp/B0XXXXXX06" },
  { id: 7,  title: "Mochila portabebés ergonómica 4 posiciones", cat: "Paseo", icon: "🎒", color: "#ffe6f1", price: 89,  was: 129, rating: 4.5, reviews: 670,  brand: "Ergobaby",      store: "Amazon", flash: false, url: "https://www.amazon.es/dp/B0XXXXXX07" },
  { id: 8,  title: "Esterilizador y secador de biberones", cat: "Lactancia", icon: "🫧", color: "#f0ecff", price: 49,  was: 69,  rating: 4.6, reviews: 1120, brand: "Philips Avent", store: "Amazon", flash: false, url: "https://www.amazon.es/dp/B0XXXXXX08" },
  { id: 9,  title: "Bañera plegable antideslizante con termómetro", cat: "Higiene", icon: "🛁", color: "#e7f8f0", price: 29,  was: 45,  rating: 4.4, reviews: 520,  brand: "Stokke",        store: "Amazon", flash: false, url: "https://www.amazon.es/dp/B0XXXXXX09" },
  { id: 10, title: "Robot de cocina para papillas 4 en 1", cat: "Alimentación", icon: "🍲", color: "#fff4e0", price: 129, was: 179, rating: 4.7, reviews: 740,  brand: "Béaba",         store: "Amazon", flash: false, url: "https://www.amazon.es/dp/B0XXXXXX10" },
  { id: 11, title: "Pañales Dodot Sensitive Talla 1 (pack 116 uds)", cat: "Pañales", icon: "🧷", color: "#e9f1ff", price: 28, was: 45, rating: 5.0, reviews: 1761, brand: "Dodot", store: "Maspañales", flash: true, url: "https://www.maspanales.com/p/panales-dodot-sensitive-talla-1-120-uds" },
  { id: 12, title: "Manta de juegos gimnasio de actividades", cat: "Juguetes", icon: "🧸", color: "#ffe6f1", price: 35,  was: 55,  rating: 4.6, reviews: 980,  brand: "Fisher-Price",  store: "Amazon", flash: false, url: "https://www.amazon.es/dp/B0XXXXXX12" },
  { id: 13, title: "Termómetro frontal infrarrojo sin contacto", cat: "Salud", icon: "🌡️", color: "#e7f8f0", price: 19,  was: 29,  rating: 4.3, reviews: 1500, brand: "Braun",         store: "Amazon", flash: false, url: "https://www.amazon.es/dp/B0XXXXXX13" },
  { id: 14, title: "Saco de dormir bebé 2.5 TOG algodón", cat: "Dormir", icon: "💤", color: "#e9f1ff", price: 24,  was: 38,  rating: 4.7, reviews: 610,  brand: "Tuc Tuc",       store: "Amazon", flash: false, url: "https://www.amazon.es/dp/B0XXXXXX14" },
  { id: 15, title: "Pack 5 bodies algodón orgánico", cat: "Ropa", icon: "👕", color: "#ffe6f1", price: 22,  was: 32,  rating: 4.5, reviews: 430,  brand: "Petit Bateau",  store: "Amazon", flash: false, url: "https://www.amazon.es/dp/B0XXXXXX15" },
];

export const CATEGORIES = ["Todas", ...Array.from(new Set(PRODUCTS.map((p) => p.cat)))];
export const DEAL_OF_DAY = [...PRODUCTS].sort((a, b) => discount(b) - discount(a))[0];

export function affLink(url) {
  return url + (url.includes("?") ? "&" : "?") + "tag=" + AFFILIATE_TAG;
}
export function discount(p) { return Math.round((1 - p.price / p.was) * 100); }
export function stars(r) { const f = Math.round(r); return "★".repeat(f) + "☆".repeat(5 - f); }
export function eur(n) { return n.toLocaleString("es-ES") + " €"; }
