"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  Search,
  Accessibility,
  FileText,
  BarChart,
  Globe2,
  Shield,
} from "lucide-react"
import Image from "next/image"

const optimizations = [
  {
    icon: Search,
    title: "SEO Tecnico",
    description: "Posicionamiento en buscadores con las mejores practicas de SEO tecnico.",
    tags: ["Meta Tags", "Schema Markup", "Core Web Vitals"],
  },
  {
    icon: Accessibility,
    title: "Accesibilidad",
    description: "Sitios accesibles para todos, cumpliendo con estandares WCAG 2.1.",
    tags: ["ARIA Labels", "Contraste", "Screen Readers"],
  },
  {
    icon: FileText,
    title: "CMS Propio",
    description: "Sistema de gestion de contenido intuitivo para actualizar tu sitio facilmente.",
    tags: ["Editor Visual", "Roles", "API REST"],
  },
  {
    icon: Globe2,
    title: "Multi-idioma",
    description: "Soporte para multiples idiomas con SEO optimizado para cada region.",
    tags: ["i18n", "URLs Localizadas", "RTL"],
  },
  {
    icon: BarChart,
    title: "Analytics",
    description: "Dashboards con metricas clave para tomar decisiones basadas en datos.",
    tags: ["Google Analytics", "Conversiones", "Reportes"],
  },
  {
    icon: Shield,
    title: "Seguridad",
    description: "Proteccion con certificados SSL, encriptacion y monitoreo de amenazas.",
    tags: ["SSL/TLS", "Firewall", "DDoS Protection"],
  },
]

export function Optimizations() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="optimizaciones" className="py-24 md:py-36 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with background image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden mb-14 p-8 md:p-12"
        >
          <div className="absolute inset-0">
            <Image
              src="/images/stats-bg.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
          </div>

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur-sm text-xs text-muted-foreground mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Incluido en cada proyecto
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground text-balance">
              Optimizaciones{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                incluidas
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Cada proyecto viene con optimizaciones avanzadas de rendimiento,
              accesibilidad y experiencia de usuario sin costo adicional.
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {optimizations.map((opt, index) => (
            <motion.div
              key={opt.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              className="group"
            >
              <div className="h-full bg-card border border-border rounded-xl p-6 hover:border-emerald-500/30 hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-11 h-11 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-5 group-hover:bg-emerald-500/20 transition-colors">
                  <opt.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">
                  {opt.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  {opt.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {opt.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2.5 py-1 rounded-md bg-secondary/50 text-muted-foreground border border-border/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
