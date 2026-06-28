import LegalLayout from "../components/LegalLayout";
export const metadata = { title: "Política de cookies", description: "Información sobre el uso de cookies en AhorraMamá.", alternates: { canonical: "/politica-cookies/" } };
export default function Page() {
  return (
    <LegalLayout title="Política de cookies">
      <p className="note"><strong>⚠️ Plantilla:</strong> sustituye los campos entre [corchetes] por tus datos reales antes de publicar. Para un texto legal definitivo, consulta con un asesor.</p>
      <h2>1. Qué son las cookies</h2>
      <p>Pequeños archivos que se guardan en tu dispositivo al navegar, para recordar preferencias y medir el uso de la web.</p>
      <h2>2. Cookies que usamos</h2>
      <ul>
        <li><strong>Técnicas</strong> (necesarias para el funcionamiento).</li>
        <li><strong>Analíticas</strong> (p. ej. Google Analytics) para entender qué ofertas interesan, solo si las aceptas.</li>
        <li><strong>De afiliación</strong>: al pulsar un enlace, la tienda de destino (Amazon, etc.) instala una cookie que permite atribuirnos la venta. Las gestiona la tienda, no nosotros.</li>
      </ul>
      <h2>3. Cómo gestionarlas</h2>
      <p>Puedes aceptarlas, rechazarlas o borrarlas desde la configuración de tu navegador.</p>
    </LegalLayout>
  );
}
