import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Términos y Condiciones | Disrupt Lab",
  description: "Condiciones generales de contratación de los servicios de Disrupt Lab.",
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

export default function TerminosPage() {
  return (
    <article className="pb-24">
      {/* Header */}
      <div className="mb-12">
        <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 block mb-3">
          Legal
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight tracking-tight">
          Términos y Condiciones
        </h1>
        <p className="text-sm text-muted-foreground">
          Última actualización: febrero de 2026
        </p>
      </div>

      <Section title="1. Aceptación de los términos">
        <p>
          Al contratar cualquier servicio de <strong className="text-foreground">Disrupt Lab</strong> (en adelante, "la Agencia"), el cliente declara haber leído, comprendido y aceptado los presentes Términos y Condiciones, los cuales constituyen el acuerdo completo entre las partes junto con la propuesta o presupuesto específico aprobado.
        </p>
        <p>
          El uso del sitio web de la Agencia también implica la aceptación de estos términos en lo que resulte aplicable.
        </p>
      </Section>

      <Section title="2. Descripción de los servicios">
        <p>Disrupt Lab ofrece servicios de digitalización empresarial que incluyen, entre otros:</p>
        <ul className="list-none space-y-2 mt-2">
          {[
            "Diseño y desarrollo de sitios web, landing pages y e-commerce.",
            "Automatización con inteligencia artificial (chatbots, flujos automatizados).",
            "Gestión de campañas de publicidad digital (Meta Ads, Google Ads).",
            "Gestión de redes sociales y producción de contenido.",
            "Integración de pasarelas de pago y sistemas de gestión.",
            "Soporte técnico y mantenimiento.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-3">
          El alcance específico de cada servicio queda definido en la propuesta o presupuesto aceptado por el cliente.
        </p>
      </Section>

      <Section title="3. Presupuestos y contratación">
        <p>
          Los presupuestos emitidos por la Agencia tienen una validez de <strong className="text-foreground">15 días corridos</strong> desde su fecha de emisión. Pasado ese plazo, la Agencia se reserva el derecho de revisarlos.
        </p>
        <p>
          El contrato se perfecciona con la aceptación del presupuesto por parte del cliente, ya sea mediante firma, correo electrónico de confirmación o el pago del primer desembolso.
        </p>
      </Section>

      <Section title="4. Condiciones de pago">
        <p>
          Salvo acuerdo en contrario explícito en el presupuesto, las condiciones generales de pago son:
        </p>
        <ul className="list-none space-y-2 mt-2">
          {[
            "50% del valor total al inicio del proyecto.",
            "50% restante a la entrega del producto o servicio finalizado.",
            "Para servicios mensuales (gestión de redes, mantenimiento, ads): pago adelantado al inicio de cada período.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-3">
          El atraso en los pagos faculta a la Agencia a suspender el trabajo hasta regularizar la situación, sin que ello genere responsabilidad de su parte por demoras en la entrega.
        </p>
        <p>
          Los presupuestos de publicidad en plataformas de terceros (Meta, Google, TikTok) son adicionales al fee de gestión de la Agencia y son abonados directamente por el cliente a las respectivas plataformas.
        </p>
      </Section>

      <Section title="5. Plazos de entrega">
        <p>
          Los plazos de entrega estimados se informan en cada propuesta y comienzan a computarse una vez recibido el pago inicial y toda la información y materiales necesarios por parte del cliente.
        </p>
        <p>
          La demora en la provisión de información, contenidos, accesos o aprobaciones por parte del cliente suspende automáticamente los plazos acordados sin responsabilidad para la Agencia.
        </p>
      </Section>

      <Section title="6. Obligaciones del cliente">
        <p>El cliente se compromete a:</p>
        <ul className="list-none space-y-2 mt-2">
          {[
            "Proveer en tiempo y forma toda la información, materiales, accesos y aprobaciones requeridas.",
            "Designar un interlocutor válido con capacidad de tomar decisiones sobre el proyecto.",
            "Revisar y aprobar las entregas parciales en los plazos acordados.",
            "Abonar los servicios en los términos pactados.",
            "No utilizar los servicios de la Agencia para actividades ilegales o contrarias a la buena fe.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="7. Revisiones y cambios de alcance">
        <p>
          Cada proyecto incluye un número de revisiones acordado en la propuesta. Las solicitudes de cambios que excedan ese alcance o que modifiquen sustancialmente los requisitos originales serán cotizadas y presupuestadas por separado.
        </p>
      </Section>

      <Section title="8. Propiedad intelectual">
        <p>
          Una vez abonada la totalidad del servicio, el cliente adquiere los derechos de uso sobre los entregables finales específicamente desarrollados para su proyecto (diseños, código, contenido).
        </p>
        <p>
          La Agencia conserva el derecho de mencionar el trabajo realizado y exhibirlo en su portafolio y materiales de marketing, salvo solicitud expresa en contrario por parte del cliente.
        </p>
        <p>
          Las herramientas, frameworks, librerías y soluciones de terceros utilizadas en el desarrollo están sujetas a sus propias licencias y no forman parte de la cesión de derechos.
        </p>
      </Section>

      <Section title="9. Confidencialidad">
        <p>
          Ambas partes se comprometen a mantener la confidencialidad de la información sensible y estratégica intercambiada durante la relación comercial, tanto durante su vigencia como con posterioridad a su finalización.
        </p>
      </Section>

      <Section title="10. Limitación de responsabilidad">
        <p>
          La Agencia no será responsable por daños indirectos, lucro cesante, pérdida de datos o cualquier perjuicio derivado del uso o imposibilidad de uso de los servicios contratados, salvo dolo o culpa grave imputable a la Agencia.
        </p>
        <p>
          La Agencia no garantiza resultados específicos en campañas de publicidad, posicionamiento SEO o redes sociales, ya que estos dependen de factores externos fuera de su control (algoritmos de plataformas, comportamiento de mercado, inversión publicitaria, entre otros).
        </p>
        <p>
          La responsabilidad total de la Agencia ante el cliente quedará limitada al monto efectivamente abonado por el servicio en cuestión.
        </p>
      </Section>

      <Section title="11. Cancelación y rescisión">
        <p>
          Cualquiera de las partes puede dar por finalizado un contrato de servicios recurrentes con un preaviso mínimo de <strong className="text-foreground">30 días corridos</strong> por escrito.
        </p>
        <p>
          En caso de cancelación por parte del cliente de un proyecto en curso, los pagos ya efectuados no son reembolsables y se facturarán los trabajos realizados hasta la fecha de cancelación.
        </p>
        <p>
          La Agencia puede rescindir el contrato de forma inmediata ante incumplimiento grave de las obligaciones del cliente, sin necesidad de aviso previo.
        </p>
      </Section>

      <Section title="12. Modificaciones a los términos">
        <p>
          Disrupt Lab puede modificar estos Términos y Condiciones en cualquier momento. Los cambios se comunicarán mediante la actualización de esta página. Los contratos en curso se rigen por los términos vigentes al momento de su celebración.
        </p>
      </Section>

      <Section title="13. Ley aplicable y jurisdicción">
        <p>
          Los presentes Términos y Condiciones se rigen por las leyes de la <strong className="text-foreground">República Argentina</strong>. Ante cualquier controversia, las partes se someten a la jurisdicción de los tribunales ordinarios competentes de la Ciudad Autónoma de Buenos Aires, con renuncia a cualquier otro fuero que pudiera corresponder.
        </p>
      </Section>

      <Section title="14. Contacto">
        <p>
          Para consultas sobre estos Términos y Condiciones:{" "}
          <a href="mailto:contacto@disruptlab.com" className="text-emerald-400 hover:underline">
            contacto@disruptlab.com
          </a>
        </p>
      </Section>
    </article>
  )
}
