import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidad | Disrupt Lab",
  description: "Cómo recopilamos, usamos y protegemos tu información personal en Disrupt Lab.",
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border/50">
        {title}
      </h2>
      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
        {children}
      </div>
    </section>
  )
}

export default function PrivacidadPage() {
  return (
    <article className="pb-24">
      {/* Header */}
      <div className="mb-12">
        <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 block mb-3">
          Legal
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight tracking-tight">
          Política de Privacidad
        </h1>
        <p className="text-sm text-muted-foreground">
          Última actualización: febrero de 2026
        </p>
      </div>

      <Section title="1. Responsable del tratamiento">
        <p>
          El responsable del tratamiento de los datos personales es <strong className="text-foreground">Disrupt Lab</strong> (en adelante, "la Agencia", "nosotros"), con domicilio en la República Argentina y correo electrónico de contacto:{" "}
          <a href="mailto:contacto@disruptlab.com" className="text-emerald-400 hover:underline">
            contacto@disruptlab.com
          </a>.
        </p>
      </Section>

      <Section title="2. Información que recopilamos">
        <p>Recopilamos únicamente los datos que el usuario proporciona de forma voluntaria a través del formulario de contacto de nuestro sitio web:</p>
        <ul className="list-none space-y-2 mt-2">
          {[
            "Nombre completo",
            "Dirección de correo electrónico",
            "Asunto del mensaje",
            "Contenido del mensaje",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-3">
          No recopilamos datos sensibles, datos de menores de edad, ni información financiera a través de este formulario.
        </p>
      </Section>

      <Section title="3. Finalidad del tratamiento">
        <p>Los datos recopilados se utilizan exclusivamente para:</p>
        <ul className="list-none space-y-2 mt-2">
          {[
            "Responder a las consultas o solicitudes enviadas a través del formulario de contacto.",
            "Evaluar y gestionar potenciales relaciones comerciales.",
            "Enviar información relacionada con los servicios solicitados.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-3">
          No utilizamos los datos para campañas de marketing masivo sin consentimiento previo y expreso del titular.
        </p>
      </Section>

      <Section title="4. Base legal del tratamiento">
        <p>
          El tratamiento de datos se basa en el consentimiento otorgado por el usuario al completar y enviar el formulario de contacto, en cumplimiento de la{" "}
          <strong className="text-foreground">Ley 25.326 de Protección de Datos Personales</strong> de la República Argentina y sus normas reglamentarias.
        </p>
      </Section>

      <Section title="5. Conservación de los datos">
        <p>
          Los datos personales se conservan durante el tiempo necesario para atender la consulta y, en caso de establecerse una relación comercial, durante la vigencia del contrato y los plazos legales aplicables posteriores a su finalización.
        </p>
        <p>
          Una vez finalizado el período de conservación, los datos son eliminados o anonimizados de forma segura.
        </p>
      </Section>

      <Section title="6. Comunicación a terceros">
        <p>
          Disrupt Lab no vende, alquila ni cede datos personales a terceros. Los datos únicamente pueden ser compartidos con proveedores de servicios que actúen en nombre de la Agencia bajo acuerdos de confidencialidad y solo en la medida estrictamente necesaria para prestar el servicio.
        </p>
        <p>
          Utilizamos <strong className="text-foreground">Vercel Analytics</strong> para medir el tráfico del sitio web. Esta herramienta opera sin cookies de rastreo y no recopila datos personales identificables.
        </p>
        <p>
          Para el envío de correos electrónicos de respuesta al formulario utilizamos <strong className="text-foreground">Resend</strong>, cuyos servidores procesan el contenido del mensaje enviado.
        </p>
      </Section>

      <Section title="7. Derechos del titular">
        <p>En virtud de la Ley 25.326, el titular de los datos tiene derecho a:</p>
        <ul className="list-none space-y-2 mt-2">
          {[
            "Acceder a sus datos personales.",
            "Rectificar datos incorrectos o incompletos.",
            "Solicitar la supresión de sus datos cuando ya no sean necesarios.",
            "Oponerse al tratamiento de sus datos.",
            "Revocar el consentimiento otorgado en cualquier momento.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-3">
          Para ejercer cualquiera de estos derechos, el titular puede enviar un correo a{" "}
          <a href="mailto:contacto@disruptlab.com" className="text-emerald-400 hover:underline">
            contacto@disruptlab.com
          </a>{" "}
          indicando su nombre completo y el derecho que desea ejercer. La Agencia responderá en un plazo máximo de 30 días hábiles.
        </p>
        <p>
          La Dirección Nacional de Protección de Datos Personales (DNPDP) es el organismo de control competente ante el cual puede presentar reclamaciones.
        </p>
      </Section>

      <Section title="8. Seguridad de los datos">
        <p>
          Adoptamos medidas técnicas y organizativas razonables para proteger los datos personales contra accesos no autorizados, pérdida accidental, alteración o destrucción. Sin embargo, ningún sistema de transmisión de datos por Internet puede garantizarse como completamente seguro.
        </p>
      </Section>

      <Section title="9. Cookies">
        <p>
          El sitio web utiliza cookies en forma limitada. Para más información, consulte nuestra{" "}
          <a href="/legal/cookies" className="text-emerald-400 hover:underline">
            Política de Cookies
          </a>.
        </p>
      </Section>

      <Section title="10. Modificaciones">
        <p>
          Disrupt Lab se reserva el derecho de modificar esta Política de Privacidad en cualquier momento. Los cambios serán publicados en esta página con indicación de la fecha de actualización. Se recomienda revisar esta política periódicamente.
        </p>
      </Section>

      <Section title="11. Contacto">
        <p>
          Para cualquier consulta relacionada con el tratamiento de datos personales, puede contactarnos en:{" "}
          <a href="mailto:contacto@disruptlab.com" className="text-emerald-400 hover:underline">
            contacto@disruptlab.com
          </a>
        </p>
      </Section>
    </article>
  )
}
