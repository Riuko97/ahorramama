import { getProducts, getCategories, slugify, SITE_URL, productPath } from "../lib/products";
import { ARTICLES } from "../lib/articles";

export default async function sitemap() {
  const products = await getProducts();
  const categories = await getCategories();
  const categoryUrls = categories
    .filter((c) => c !== "Todas")
    .map((c) => ({
      url: `${SITE_URL}/ofertas/${slugify(c)}/`,
      changeFrequency: "daily",
      priority: 0.9,
    }));
  const productUrls = products.map((p) => ({
    url: `${SITE_URL}${productPath(p)}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));
  const articleUrls = ARTICLES.map((a) => ({
    url: `${SITE_URL}/blog/${a.slug}/`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1.0 },
    ...categoryUrls,
    { url: `${SITE_URL}/blog/`, changeFrequency: "weekly", priority: 0.7 },
    ...articleUrls,
    { url: `${SITE_URL}/aviso-afiliados/`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/aviso-legal/`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/politica-privacidad/`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/politica-cookies/`, changeFrequency: "yearly", priority: 0.3 },
    ...productUrls,
  ];
}
