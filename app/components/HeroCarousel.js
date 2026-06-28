"use client";
import { useState, useEffect, useCallback } from "react";
import { useStore } from "./StoreProvider";

// Cada slide: texto, degradado, CTA que filtra (filter) y foto opcional.
const SLIDES = [
  { script: "Súper", rest: "CHOLLOS", sub: "Las mejores ofertas de bebé, cada día", cta: "Ver ofertas", filter: "Todas", grad: "linear-gradient(120deg,#ff9ec4,#ff7fb0 45%,#7fb0ff)", photo: "" },
  { script: "Hasta", rest: "-25%", sub: "Cochecitos, sillas de paseo y mucho más", cta: "Descubrir chollos", filter: "Cochecitos", grad: "linear-gradient(120deg,#7fb0ff,#9ec5ff 45%,#ffb3d1)", photo: "" },
  { script: "Ofertas", rest: "FLASH", sub: "Chollos que vuelan. ¡No te quedes sin el tuyo!", cta: "Ver ofertas flash", filter: "flash", grad: "linear-gradient(120deg,#ffcaa8,#ff9ec4 50%,#b59cff)", photo: "" },
];

export default function HeroCarousel() {
  const [i, setI] = useState(0);
  const n = SLIDES.length;
  const { setCategory } = useStore();
  const go = useCallback((idx) => setI((idx + n) % n), [n]);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % n), 5500);
    return () => clearInterval(t);
  }, [n]);

  const goFilter = (filter) => {
    setCategory(filter);
    if (typeof document !== "undefined") {
      const el = document.getElementById("ofertas");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hc" aria-label="Ofertas destacadas" aria-roledescription="carrusel">
      <div className="hc-track">
        {SLIDES.map((s, idx) => (
          <div
            key={idx}
            className={"hc-slide" + (idx === i ? " is-active" : "")}
            style={{ backgroundImage: s.grad }}
            aria-hidden={idx === i ? "false" : "true"}
          >
            {s.photo ? <img className="hc-photo" src={s.photo} alt="" aria-hidden="true" /> : null}
            <div className="hc-content">
              <h2 className="hc-title"><span className="hc-script">{s.script}</span><span className="hc-rest">{s.rest}</span></h2>
              <p className="hc-sub">{s.sub}</p>
              <button type="button" className="hc-cta" onClick={() => goFilter(s.filter)}>{s.cta}</button>
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
