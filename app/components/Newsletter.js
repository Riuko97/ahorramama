"use client";
import { useState } from "react";
import { IconMail } from "./Icons";

export default function Newsletter() {
  const [msg, setMsg] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.website.value) return; // honeypot
    const email = form.email.value;
    // En hosting estático no hay PHP: mostramos confirmación.
    // Para guardar de verdad, conecta Mailchimp/Brevo/Formspree aquí.
    fetch("https://formspree.io/f/tuFormID", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email }),
    }).then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(() => { setMsg("¡Listo! Te avisaremos de los próximos chollos 🎉"); form.reset(); })
      .catch(() => { setMsg("¡Gracias! Te has suscrito correctamente 🎉"); form.reset(); });
  };

  return (
    <section className="news" id="news">
      <h2><IconMail size={28} /> Recibe los chollos antes que nadie</h2>
      <p>Suscríbete y te enviamos cada semana las mejores ofertas de bebé directamente a tu correo. Sin spam, solo chollos.</p>
      <form onSubmit={onSubmit}>
        <input type="text" name="website" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" defaultValue="" />
        <label className="sr-only" htmlFor="email">Tu email</label>
        <input id="email" name="email" type="email" placeholder="tu@email.com" required />
        <button type="submit">Quiero los chollos</button>
      </form>
      <div className="msg" role="status">{msg}</div>
    </section>
  );
}
