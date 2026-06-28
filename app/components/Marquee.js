const ITEMS = ["GRANDES CHOLLOS", "HASTA -40%", "ENVÍO RÁPIDO", "OFERTAS CADA DÍA", "MARCAS TOP AL MEJOR PRECIO"];

export default function Marquee() {
  // Duplicamos la lista para que el bucle sea continuo.
  const line = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {line.map((t, idx) => (
          <span className="marquee-item" key={idx}>{t}<span className="marquee-dot">·</span></span>
        ))}
      </div>
    </div>
  );
}
