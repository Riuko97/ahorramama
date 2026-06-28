import LegalLayout from "../components/LegalLayout";
export const metadata = { title: "Política de privacidad", description: "Cómo trata AhorraMamá tus datos personales conforme al RGPD.", alternates: { canonical: "/politica-privacidad/" } };
export default function Page() {
  return (
    <LegalLayout title="Política de privacidad">
      <p className="note"><strong>⚠️ Plantilla:</strong> sustituye los campos entre [corchetes] por tus datos reales antes de publicar. Para un texto legal definitivo, consulta con un asesor.</p>
      <h2>1. Responsable del tratamiento</h2>
      <p><strong>[Nombre / Razón social]</strong> — email <strong>[correo de contacto]</strong>.</p>
      <h2>2. Qué datos recogemos</h2>
      <p>Únicamente el <strong>correo electrónico</strong> que facilitas voluntariamente al suscribirte a la newsletter, y datos de navegación anónimos (cookies analíticas, si las aceptas).</p>
      <h2>3. Finalidad y base legal</h2>
      <p>Usamos tu email para enviarte ofertas y novedades (base legal: tu consentimiento). Puedes retirar el consentimiento en cualquier momento.</p>
      <h2>4. Conservación</h2>
      <p>Conservamos tus datos mientras sigas suscrito. Al darte de baja, se eliminan.</p>
      <h2>5. Tus derechos</h2>
      <ul><li>Acceso, rectificación y supresión.</li><li>Oposición y limitación del tratamiento.</li><li>Portabilidad de los datos.</li><li>Reclamar ante la Agencia Española de Protección de Datos (AEPD).</li></ul>
      <p>Para ejercerlos, escribe a <strong>[correo de contacto]</strong>.</p>
      <h2>6. Terceros</h2>
      <p>No vendemos tus datos. Podemos usar proveedores de email marketing y analítica que cumplen el RGPD.</p>
    </LegalLayout>
  );
}
