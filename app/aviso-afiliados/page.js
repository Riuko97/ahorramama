import LegalLayout from "../components/LegalLayout";
export const metadata = { title: "Aviso de afiliación", description: "Cómo gana dinero AhorraMamá: transparencia sobre los enlaces de afiliado.", alternates: { canonical: "/aviso-afiliados/" } };
export default function Page() {
  return (
    <LegalLayout title="Aviso de afiliación">
      <h2>Transparencia total</h2>
      <p>AhorraMamá es <strong>gratis para ti</strong>. Nos financiamos con <strong>marketing de afiliados</strong>: cuando pulsas en una oferta y compras en la tienda de destino (como Amazon), recibimos una pequeña comisión.</p>
      <h2>¿Te cuesta algo a ti?</h2>
      <p><strong>No.</strong> El precio que pagas es exactamente el mismo, lo compres a través de nuestro enlace o no. La comisión la paga la tienda, no tú.</p>
      <h2>¿Influye en lo que recomendamos?</h2>
      <p>Seleccionamos las ofertas por su relación calidad-precio. Los precios y descuentos que mostramos son orientativos; el precio final válido es el de la tienda en el momento de la compra.</p>
      <h2>Programa de Afiliados de Amazon</h2>
      <p>AhorraMamá es participante en el Programa de Afiliados de Amazon EU, un programa de publicidad para afiliados diseñado para ofrecer a sitios web un modo de obtener comisiones por publicidad, publicitando e incluyendo enlaces a Amazon.es.</p>
    </LegalLayout>
  );
}
