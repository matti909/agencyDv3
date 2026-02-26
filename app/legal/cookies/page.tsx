import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Cookies | Disrupt Lab",
  description: "Información sobre el uso de cookies en el sitio web de Disrupt Lab.",
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

function CookieRow({
  name,
  provider,
  purpose,
  duration,
}: {
  name: string
  provider: string
  purpose: string
  duration: string
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_2fr_1fr] gap-2 sm:gap-4 py-4 border-b border-border/40 text-sm">
      <div>
        <span className="text-xs text-muted-foreground/60 block mb-0.5 sm:hidden">Nombre</span>
        <span className="text-foreground font-mono text-xs">{name}</span>
      </div>
      <div>
        <span className="text-xs text-muted-foreground/60 block mb-0.5 sm:hidden">Proveedor</span>
        <span>{provider}</span>
      </div>
      <div>
        <span className="text-xs text-muted-foreground/60 block mb-0.5 sm:hidden">Finalidad</span>
        <span>{purpose}</span>
      </div>
      <div>
        <span className="text-xs text-muted-foreground/60 block mb-0.5 sm:hidden">Duración</span>
        <span>{duration}</span>
      </div>
    </div>
  )
}

export default function CookiesPage() {
  return (
    <article className="pb-24">
      {/* Header */}
      <div className="mb-12">
        <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 block mb-3">
          Legal
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight tracking-tight">
          Política de Cookies
        </h1>
        <p className="text-sm text-muted-foreground">
          Última actualización: febrero de 2026
        </p>
      </div>

      <Section title="1. ¿Qué son las cookies?">
        <p>
          Las cookies son pequeños archivos de texto que los sitios web almacenan en el dispositivo del usuario al navegar. Sirven para recordar preferencias, analizar el comportamiento de los visitantes y mejorar la experiencia de uso.
        </p>
      </Section>

      <Section title="2. ¿Qué cookies utiliza este sitio?">
        <p>
          El sitio web de <strong className="text-foreground">Disrupt Lab</strong> hace un uso muy limitado de cookies. A continuación se detalla cada una:
        </p>

        {/* Table header */}
        <div className="hidden sm:grid grid-cols-[1fr_1fr_2fr_1fr] gap-4 pt-4 pb-2 border-b border-border text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
          <span>Nombre</span>
          <span>Proveedor</span>
          <span>Finalidad</span>
          <span>Duración</span>
        </div>

        <CookieRow
          name="__vercel_live_token"
          provider="Vercel"
          purpose="Soporte de preview deployments en entornos de desarrollo. No se establece en producción."
          duration="Sesión"
        />
        <CookieRow
          name="Analytics (sin cookie)"
          provider="Vercel Analytics"
          purpose="Medición de tráfico y comportamiento de visitantes de forma anonimizada. No utiliza cookies de rastreo identificables."
          duration="No aplica"
        />

        <p className="mt-4">
          <strong className="text-foreground">Nota importante:</strong> Vercel Analytics, la herramienta de analítica que utilizamos, está diseñada con privacidad por defecto. No rastrea usuarios individuales, no utiliza fingerprinting y no comparte datos con terceros. Por este motivo, no requiere consentimiento de cookies bajo la normativa vigente.
        </p>
      </Section>

      <Section title="3. Cookies de terceros">
        <p>
          Este sitio puede enlazar a redes sociales (Instagram, Facebook, LinkedIn, X/Twitter). Si el usuario accede a esas plataformas a través de nuestros links, dichas plataformas pueden establecer sus propias cookies bajo sus respectivas políticas de privacidad, sobre las cuales Disrupt Lab no tiene control ni responsabilidad.
        </p>
      </Section>

      <Section title="4. ¿Cómo gestionar o deshabilitar las cookies?">
        <p>
          La mayoría de los navegadores permiten controlar el uso de cookies a través de su configuración. A continuación encontrás instrucciones para los navegadores más utilizados:
        </p>
        <ul className="list-none space-y-2 mt-2">
          {[
            {
              name: "Google Chrome",
              url: "https://support.google.com/chrome/answer/95647",
            },
            {
              name: "Mozilla Firefox",
              url: "https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias",
            },
            {
              name: "Safari",
              url: "https://support.apple.com/es-es/guide/safari/sfri11471/mac",
            },
            {
              name: "Microsoft Edge",
              url: "https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09",
            },
          ].map((browser) => (
            <li key={browser.name} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5" />
              <span>
                {browser.name}:{" "}
                <a
                  href={browser.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  Ver instrucciones
                </a>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3">
          Deshabilitar cookies puede afectar el correcto funcionamiento de algunos sitios web. En el caso de nuestro sitio, dado el uso mínimo que hacemos de ellas, el impacto es prácticamente nulo.
        </p>
      </Section>

      <Section title="5. Actualizaciones de esta política">
        <p>
          Esta Política de Cookies puede actualizarse para reflejar cambios en las tecnologías utilizadas o en la normativa aplicable. Se publicará la nueva versión en esta página con la fecha de última actualización.
        </p>
      </Section>

      <Section title="6. Más información">
        <p>
          Para consultas sobre el uso de cookies en este sitio, podés contactarnos en:{" "}
          <a href="mailto:contacto@disruptlab.com" className="text-emerald-400 hover:underline">
            contacto@disruptlab.com
          </a>
        </p>
        <p>
          También podés consultar nuestra{" "}
          <a href="/legal/privacidad" className="text-emerald-400 hover:underline">
            Política de Privacidad
          </a>{" "}
          para información completa sobre el tratamiento de datos personales.
        </p>
      </Section>
    </article>
  )
}
