import { getProducts, SITE_URL } from "../lib/products";

export default async function sitemap() {
  const products = await getProducts();
  const productUrls = products.map((p) => ({
    url: `${SITE_URL}/producto/${p.id}/`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));
  return [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/aviso-afiliados/`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/aviso-legal/`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/politica-privacidad/`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/politica-cookies/`, changeFrequency: "yearly", priority: 0.3 },
    ...productUrls,
  ];
}
