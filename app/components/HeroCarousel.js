"use client";
import { useState, useEffect, useCallback } from "react";

// Cada slide: titulo (palabra con estilo script), resto, subtitulo, CTA y un fondo.
// Para usar FOTOS reales, pon la ruta en "img" (ej. "/assets/slide1.jpg"); si no, usa el degradado.
const SLIDES = [
  { script: "Súper", rest: "CHOLLOS", sub: "Las mejores ofertas de bebé, cada día", cta: "Ver ofertas", href: "#ofertas", grad: "linear-gradient(120deg,#ff9ec4,#ff7fb0 45%,#7fb0ff)", emoji: "🍼", img: "" },
  { script: "Hasta", rest: "-40%", sub: "Cochecitos, sillas de coche y mucho más", cta: "Descubrir chollos", href: "#ofertas", grad: "linear-gradient(120deg,#7fb0ff,#9ec5ff 45%,#ffb3d1)", emoji: "🛒", img: "" },
  { script: "Ofertas", rest: "FLASH", sub: "Chollos que vuelan. ¡No te quedes sin el tuyo!", cta: "Ver ofertas flash", href: "#ofertas", grad: "linear-gradient(120deg,#ffcaa8,#ff9ec4 50%,#b59cff)", emoji: "⚡", img: "" },
];

export default function HeroCarousel() {
  const [i, setI] = useState(0);
  const n = SLIDES.length;
  const go = useCallback((idx) => setI((idx + n) % n), [n]);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % n), 5500);
    return () => clearInterval(t);
  }, [n]);

  return (
    <section className="hc" aria-label="Ofertas destacadas" aria-roledescription="carrusel">
      <div className="hc-track">
        {SLIDES.map((s, idx) => (
          <div
            key={idx}
            className={"hc-slide" + (idx === i ? " is-active" : "")}
            style={s.img ? { backgroundImage: `url(${s.img})` } : { backgroundImage: s.grad }}
            aria-hidden={idx === i ? "false" : "true"}
          >
            <span className="hc-bubble" aria-hidden="true">{s.emoji}</span>
            <div className="hc-content">
              <h2 className="hc-title"><span className="hc-script">{s.script}</span><span className="hc-rest">{s.rest}</span></h2>
              <p className="hc-sub">{s.sub}</p>
              <a className="hc-cta" href={s.href}>{s.cta} →</a>
            </div>
          </div>
        ))}
      </div>

      <button type="button" className="hc-arrow hc-arrow--left" onClick={() => go(i - 1)} aria-label="Anterior">‹</button>
      <button type="button" className="hc-arrow hc-arrow--right" onClick={() => go(i + 1)} aria-label="Siguiente">›</button>

      <div className="hc-dots" role="tablist">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={"hc-dot" + (idx === i ? " is-active" : "")}
            onClick={() => go(idx)}
            aria-label={`Ir a la oferta ${idx + 1}`}
            aria-selected={idx === i}
          />
        ))}
      </div>
    </section>
  );
}
