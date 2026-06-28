import { IconTruck, IconLock, IconTag, IconReturn } from "./Icons";

export default function Trust() {
  const items = [
    { Icon: IconTruck, b: "Envío rápido", s: "En tus tiendas de confianza" },
    { Icon: IconLock, b: "Compra segura", s: "Pago en tiendas oficiales" },
    { Icon: IconTag, b: "Chollos reales", s: "Ofertas verificadas a mano" },
    { Icon: IconReturn, b: "Devolución fácil", s: "Según la tienda" },
  ];
  return (
    <section className="trust">
      <div className="wrap">
        <div className="row">
          {items.map(({ Icon, b, s }) => (
            <div className="item" key={b}>
              <span className="ic"><Icon /></span>
              <div><b>{b}</b><small>{s}</small></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
