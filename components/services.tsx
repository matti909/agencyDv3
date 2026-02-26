"use client"

import { ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"

const services = [
  {
    number: "01",
    slug: "presencia-digital",
    title: "Presencia Digital",
    benefit: "Tu sitio web generando clientes mientras vos hacés otra cosa",
    price: "Desde $499",
    badge: null,
    platforms: null,
  },
  {
    number: "02",
    slug: "automatizacion-ia",
    title: "Automatización con IA",
    benefit: "Un asistente que responde por vos en WhatsApp e Instagram las 24hs",
    price: "Desde $150/bot",
    badge: null,
    platforms: null,
  },
  {
    number: "03",
    slug: "ventas-marketing",
    title: "Ventas y Marketing",
    benefit: "Publicidad en Google y Meta que trae clientes reales, no solo visitas",
    price: "Desde $200/mes",
    badge: null,
    platforms: null,
  },
  {
    number: "04",
    slug: "redes-contenido",
    title: "Redes Sociales & Contenido",
    benefit: "Diseñamos, publicamos y gestionamos tus redes para que vos te enfoques en vender",
    price: "Desde $300/mes",
    badge: "Nuevo",
    platforms: ["Instagram", "TikTok", "Facebook"],
  },
  {
    number: "05",
    slug: "gestion-pagos",
    title: "Gestión y Pagos",
    benefit: "Cobros integrados y métricas en tiempo real desde un solo panel",
    price: "Incluido",
    badge: null,
    platforms: null,
  },
  {
    number: "06",
    slug: "seguridad-soporte",
    title: "Seguridad y Soporte",
    benefit: "Tu sitio protegido y con soporte cuando lo necesitás, sin sorpresas",
    price: "Incluido",
    badge: null,
    platforms: null,
  },
]

function ServiceRow({
  service,
  index,
  isInView,
}: {
  service: (typeof services)[0]
  index: number
  isInView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
    >
      <Link href={`/servicios/${service.slug}`} className="block group">
        <div className="relative flex items-start gap-6 py-7 border-b border-border/50 transition-all duration-300 hover:border-emerald-400/30">

          {/* Left accent bar */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 group-hover:h-8 bg-emerald-400 rounded-full transition-all duration-300 ease-out" />

          {/* Number */}
          <span className="text-xs font-mono text-muted-foreground/50 pt-1 w-6 flex-shrink-0 select-none pl-3">
            {service.number}
          </span>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-1.5">
              <h3 className="text-lg md:text-xl font-semibold text-foreground group-hover:text-emerald-400 transition-colors duration-300 leading-snug">
                {service.title}
              </h3>
              {service.badge && (
                <span className="px-2 py-0.5 rounded-full bg-violet-400/10 border border-violet-400/25 text-violet-400 text-[10px] font-semibold tracking-wide uppercase flex-shrink-0">
                  {service.badge}
                </span>
              )}
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {service.benefit}
            </p>

            {service.platforms && (
              <div className="flex items-center gap-2 mt-2.5">
                {service.platforms.map((p) => (
                  <span
                    key={p}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-border/70 text-muted-foreground/70"
                  >
                    {p}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right — price + arrow */}
          <div className="flex items-center gap-4 flex-shrink-0 pt-0.5">
            <span className="text-sm font-semibold text-foreground/70 group-hover:text-foreground transition-colors duration-300 whitespace-nowrap">
              {service.price}
            </span>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0" />
          </div>

        </div>
      </Link>
    </motion.div>
  )
}

export function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="servicios" className="py-24 md:py-32 lg:py-40 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <div className="flex">
                <span className="section-label">Servicios</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-[1.05] tracking-tight">
                Todo lo que tu negocio<br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  necesita para crecer online
                </span>
              </h2>
            </div>
            <p className="text-base text-muted-foreground max-w-xs leading-relaxed hidden lg:block">
              Un solo equipo para web, automatización, marketing y redes — sin coordinar freelancers sueltos.
            </p>
          </div>
        </motion.div>

        {/* Service list */}
        <div>
          {/* Top border */}
          <div className="border-t border-border/50" />
          {services.map((service, index) => (
            <ServiceRow
              key={service.slug}
              service={service}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Footer link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12"
        >
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-400 transition-colors duration-200 group"
          >
            Ver descripción completa de cada servicio
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
