import Link from "next/link";

export default function LegalLayout({ title, children }) {
  return (
    <div className="page">
      <nav className="crumbs" aria-label="Ruta"><Link href="/">Inicio</Link><span>›</span>{title}</nav>
      <h1>{title}</h1>
      <p className="updated">Última actualización: junio de 2026</p>
      {children}
      <p style={{ marginTop: "30px" }}><Link href="/">← Volver al inicio</Link></p>
    </div>
  );
}
