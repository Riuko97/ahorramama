"use client";
import { useState } from "react";

export default function Gallery({ images = [], alt, icon, color }) {
  const [i, setI] = useState(0);

  if (!images.length) {
    return (
      <div className="pd-gallery">
        <div className="pd-main"><span className="pd-emoji" style={{ background: color }}>{icon}</span></div>
      </div>
    );
  }

  return (
    <div className="pd-gallery">
      <div className="pd-main"><img src={images[i]} alt={alt} /></div>
      {images.length > 1 ? (
        <div className="pd-thumbs">
          {images.map((src, idx) => (
            <button
              key={idx}
              type="button"
              className={"pd-thumb" + (idx === i ? " is-active" : "")}
              onClick={() => setI(idx)}
              aria-label={`Imagen ${idx + 1}`}
            >
              <img src={src} alt={`${alt} — miniatura ${idx + 1}`} loading="lazy" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
