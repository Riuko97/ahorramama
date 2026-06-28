import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="inner">
          <span className="tag">✨ +120 chollos verificados · actualizado cada día</span>
          <h1>Los mejores <span>chollos de bebé</span><br />al precio más bajo</h1>
          <p>Rastreamos cientos de productos de bebé y puericultura para traerte solo las ofertas que de verdad merecen la pena. Compara y compra en un clic.</p>
          <Link className="cta" href="/#ofertas">Ver chollos del día →</Link>
          <span className="blob">🧸</span>
        </div>
      </div>
    </section>
  );
}
