# 🍼 AhorraMamá — Next.js (SSG)

Web de **chollos y ofertas de productos de bebé** con marketing de afiliados.
Hecha con **Next.js 14 (App Router)** y desplegada en **Vercel** (gratis) → buen SEO y despliegue automático.
Diseño rosa bebé + azul, comparador, newsletter y datos estructurados.

## 🚀 Puesta en marcha

```bash
npm install        # instala dependencias
npm run dev        # desarrollo en http://localhost:3000
npm run build      # genera la web estática en /out
```

`output: "export"` crea la carpeta **/out** con todo el HTML estático listo para subir.

## 📂 Estructura

```
app/
  layout.js              # layout raíz, SEO (metadata), JSON-LD WebSite
  page.js                # home: Hero, Trust, Oferta del día, Shop, Newsletter, JSON-LD Product
  globals.css            # estilos (rosa bebé + azul)
  components/            # TopBar, Header, Nav, Hero, Trust, DealOfDay,
                         # ProductCard, Shop, Comparator, Newsletter, Footer, StoreProvider
  aviso-legal/ · politica-privacidad/ · politica-cookies/ · aviso-afiliados/   (páginas legales)
lib/products.js          # ⭐ FUENTE ÚNICA: productos, tag de afiliado, helpers
public/                  # robots.txt, sitemap.xml, site.webmanifest, .nojekyll
```

## ✏️ Editar ofertas y afiliados

1. Abre `lib/products.js`.
2. Edita la lista `PRODUCTS` y pon tu ID de Amazon en `AFFILIATE_TAG` (ej. `"chollosbebe-21"`).
3. Cambia `SITE_URL` por tu dominio real.

## 🌐 Desplegar en Vercel (recomendado)

1. Sube este proyecto a un repositorio de GitHub.
2. Entra en [vercel.com](https://vercel.com), regístrate con tu cuenta de GitHub.
3. "Add New Project" → elige el repositorio → Vercel detecta Next.js solo → "Deploy".
4. Cada cambio que subas a GitHub se publica automáticamente.
5. Dominio propio: en el panel de Vercel, **Settings → Domains → Add** `ahorramama.com`
   y sigue las instrucciones de DNS que te indique (apuntar el dominio a Vercel).
6. Cambia el dominio en `lib/products.js` (`SITE_URL`), `public/robots.txt` y `public/sitemap.xml` si usas otro.

> El plan gratuito de Vercel incluye HTTPS, CDN y despliegue automático.

## 📩 Newsletter

Como es estático, el formulario está preparado para un servicio externo
(**Formspree / Mailchimp / Brevo**). Cambia el endpoint en `app/components/Newsletter.js`
(`https://formspree.io/f/tuFormID`). Si falla, muestra confirmación igualmente.

## ✅ SEO incluido

Metadata (title/description/keywords), Open Graph y Twitter, `canonical`,
datos estructurados JSON-LD (`WebSite` + `Product` con precio y valoración),
HTML pre-renderizado (SSG, rastreable), `robots.txt` y `sitemap.xml`.
