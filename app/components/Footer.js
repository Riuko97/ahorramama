import Link from "next/link";
import { CATEGORIES } from "../../lib/products";

export default function Footer() {
  const cats = CATEGORIES.filter((c) => c !== "Todas").slice(0, 6);
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="cols">
          <div className="brand">
            <Link href="/" className="logo" aria-label="AhorraMamá"><img src="/assets/logo-horizontal.svg" alt="AhorraMamá" className="logo-img" /></Link>
            <p>Tu web de referencia para ahorrar en productos de bebé. Comparamos precios y seleccionamos las mejores ofertas para que tú no tengas que buscar.</p>
          </div>
          <div>
            <h4>Categorías</h4>
            {cats.map((c) => <Link key={c} href="/#ofertas">{c}</Link>)}
          </div>
          <div>
            <h4>AhorraMamá</h4>
            <Link href="/#ofertas">Ofertas</Link>
            <Link href="/#news">Newsletter</Link>
            <Link href="/aviso-afiliados/">Cómo ganamos dinero</Link>
          </div>
          <div>
            <h4>Legal</h4>
            <Link href="/aviso-legal/">Aviso legal</Link>
            <Link href="/politica-privacidad/">Privacidad</Link>
            <Link href="/politica-cookies/">Cookies</Link>
            <Link href="/aviso-afiliados/">Aviso de afiliación</Link>
          </div>
        </div>
        <div className="disclosure">
          <strong>Aviso de afiliación:</strong> AhorraMamá participa en el Programa de Afiliados de Amazon y otros programas de afiliación.
          Podemos recibir una comisión por las compras cualificadas realizadas a través de los enlaces de esta web, <strong>sin coste adicional para ti</strong>.
          Los precios y la disponibilidad son orientativos y pueden variar; el precio final es siempre el que aparece en la tienda en el momento de la compra.
        </div>
        <p className="copy">© 2026 AhorraMamá · Como Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables.</p>
      </div>
    </footer>
  );
}
