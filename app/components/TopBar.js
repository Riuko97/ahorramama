import Link from "next/link";
import { IconTruck, IconMail } from "./Icons";

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="wrap">
        <span className="promo"><IconTruck size={16} /> Envío gratis en tus tiendas favoritas · Chollos verificados cada día</span>
        <span className="contact">
          <Link href="/#news"><IconMail size={16} /> Newsletter</Link>
          <Link href="/aviso-afiliados/">Cómo ganamos</Link>
        </span>
      </div>
    </div>
  );
}
