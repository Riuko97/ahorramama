import LegalLayout from "../components/LegalLayout";
export const metadata = { title: "Aviso legal", description: "Aviso legal e información del titular de AhorraMamá.", alternates: { canonical: "/aviso-legal/" } };
export default function Page() {
  return (
    <LegalLayout title="Aviso legal">
      <p className="note"><strong>⚠️ Plantilla:</strong> sustituye los campos entre [corchetes] por tus datos reales antes de publicar. Para un texto legal definitivo, consulta con un asesor.</p>
      <h2>1. Datos identificativos</h2>
      <p>En cumplimiento de la Ley 34/2002 (LSSI-CE), se informa: titular <strong>[Nombre y apellidos / Razón social]</strong>, NIF <strong>[NIF]</strong>, domicilio <strong>[Dirección]</strong>, email <strong>[correo de contacto]</strong>.</p>
      <h2>2. Objeto</h2>
      <p>AhorraMamá es una web de recopilación de ofertas de productos de bebé. No vende productos directamente: redirige a tiendas de terceros mediante enlaces de afiliado.</p>
      <h2>3. Propiedad intelectual</h2>
      <p>Los contenidos propios (textos, diseño, logotipo) pertenecen al titular. Las marcas e imágenes de producto pertenecen a sus respectivos propietarios.</p>
      <h2>4. Responsabilidad</h2>
      <p>Los precios y la disponibilidad mostrados son orientativos y pueden variar. El precio y las condiciones válidas son siempre los de la tienda de destino en el momento de la compra.</p>
      <h2>5. Legislación aplicable</h2>
      <p>Esta web se rige por la legislación española.</p>
    </LegalLayout>
  );
}
