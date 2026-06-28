import "./globals.css";
import { SITE_URL } from "../lib/products";
import StoreProvider from "./components/StoreProvider";
import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Comparator from "./components/Comparator";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AhorraMamá · Las mejores ofertas y chollos en productos de bebé 2026",
    template: "%s · AhorraMamá",
  },
  description:
    "Los mejores chollos en productos de bebé y puericultura actualizados cada día: cochecitos, sillas de coche, tronas, lactancia, pañales y más, al precio más bajo. Comparador incluido.",
  keywords: ["chollos bebé", "ofertas bebé", "cochecitos baratos", "silla de coche bebé oferta", "pañales baratos", "puericultura ofertas", "comparador productos bebé"],
  authors: [{ name: "AhorraMamá" }],
  alternates: { canonical: "/" },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/assets/logo-symbol.svg", type: "image/svg+xml" },
      { url: "/assets/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/assets/apple-touch-icon.png",
  },
  themeColor: "#ff7fb0",
  openGraph: {
    type: "website",
    siteName: "AhorraMamá",
    title: "AhorraMamá · Los mejores chollos en productos de bebé",
    description: "Ofertas de bebé y puericultura seleccionadas cada día, al mejor precio. Compara y compra en un clic.",
    url: "/",
    locale: "es_ES",
    images: ["/assets/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AhorraMamá · Los mejores chollos de bebé",
    description: "Ofertas de bebé y puericultura al mejor precio, actualizadas cada día.",
    images: ["/assets/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AhorraMamá",
  url: SITE_URL + "/",
  description: "Los mejores chollos en productos de bebé y puericultura, actualizados cada día.",
  inLanguage: "es-ES",
  potentialAction: {
    "@type": "SearchAction",
    target: SITE_URL + "/?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body>
        <StoreProvider>
          <TopBar />
          <Header />
          <Nav />
          <main>{children}</main>
          <Footer />
          <Comparator />
        </StoreProvider>
      </body>
    </html>
  );
}
