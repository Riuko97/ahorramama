"use client";
import { useState } from "react";
import { IconMail } from "./Icons";

export default function Newsletter() {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.website.value) return; // honeypot
    const email = form.email.value;
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setMsg("¡Listo! Te avisaremos de los próximos chollos 🎉");
        form.reset();
      } else {
        setMsg("Ya estás suscrito o ha habido un error. Inténtalo de nuevo.");
      }
    } catch {
      setMsg("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="news" id="news">
      <h2><IconMail size={28} /> Recibe los chollos antes que nadie</h2>
      <p>Suscríbete y te enviamos cada semana las mejores ofertas de bebé directamente a tu correo. Sin spam, solo chollos.</p>
      <form onSubmit={onSubmit}>
        <input type="text" name="website" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" defaultValue="" />
        <label className="sr-only" htmlFor="email">Tu email</label>
        <input id="email" name="email" type="email" placeholder="tu@email.com" required />
        <button type="submit" disabled={loading}>{loading ? "Enviando..." : "Quiero los chollos"}</button>
      </form>
      <div className="msg" role="status">{msg}</div>
    </section>
  );
}
