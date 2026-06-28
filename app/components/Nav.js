"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { CATEGORIES } from "../../lib/products";
import { useStore } from "./StoreProvider";

export default function Nav() {
  const { setCategory } = useStore();
  const router = useRouter();
  const pathname = usePathname();
  const scroller = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const el = scroller.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollBy = (dir) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * Math.max(220, el.clientWidth * 0.6), behavior: "smooth" });
  };

  const go = (cat) => {
    setCategory(cat);
    if (pathname === "/") {
      const el = document.getElementById("ofertas");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/#ofertas"); // desde otra página, volvemos a la home con el filtro puesto
    }
  };

  return (
    <nav className="nav" aria-label="Categorías">
      <div className="wrap nav-bar">
        <button
          type="button"
          className={"nav-arrow nav-arrow--left" + (canLeft ? "" : " is-hidden")}
          onClick={() => scrollBy(-1)}
          aria-label="Ver categorías anteriores"
        >‹</button>

        <div className="nav-scroll" ref={scroller}>
          <button type="button" className="featured" onClick={() => go("Todas")}>🔥 Ofertas</button>
          {CATEGORIES.filter((c) => c !== "Todas").map((c) => (
            <button type="button" key={c} onClick={() => go(c)}>{c}</button>
          ))}
        </div>

        <button
          type="button"
          className={"nav-arrow nav-arrow--right" + (canRight ? "" : " is-hidden")}
          onClick={() => scrollBy(1)}
          aria-label="Ver más categorías"
        >›</button>
      </div>
    </nav>
  );
}
