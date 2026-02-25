"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Search, Accessibility, FileText, BarChart, Globe2, Shield } from "lucide-react"

const optimizations = [
  {
    icon: Search,
    title: "SEO Optimizado",
    description:
      "Posicionamiento en buscadores desde el primer día con las mejores prácticas de SEO técnico y de contenido.",
    metrics: ["Meta Tags", "Schema Markup", "Sitemap XML", "Core Web Vitals"],
  },
  {
    icon: Accessibility,
    title: "Accesibilidad",
    description:
      "Sitios web accesibles para todos, cumpliendo con estándares WCAG 2.1 y mejorando la experiencia de usuario.",
    metrics: ["ARIA Labels", "Navegación por Teclado", "Contraste de Color", "Screen Readers"],
  },
  {
    icon: FileText,
    title: "CMS Propio",
    description:
      "Sistema de gestión de contenido personalizado, intuitivo y potente para actualizar tu sitio sin complicaciones.",
    metrics: ["Editor Visual", "Versionado", "Roles de Usuario", "API REST"],
  },
  {
    icon: Globe2,
    title: "Multi-idioma",
    description:
      "Soporte completo para múltiples idiomas con gestión centralizada y SEO optimizado para cada región.",
    metrics: ["i18n", "Detección Automática", "URLs Localizadas", "RTL Support"],
  },
  {
    icon: BarChart,
    title: "Análisis de Datos",
    description:
      "Dashboards personalizados con métricas clave para tomar decisiones basadas en datos reales.",
    metrics: ["Google Analytics", "Eventos Personalizados", "Conversiones", "Reportes"],
  },
  {
    icon: Shield,
    title: "Seguridad",
    description:
      "Protección avanzada con certificados SSL, encriptación de datos y monitoreo continuo de amenazas.",
    metrics: ["SSL/TLS", "Firewall", "Backups", "DDoS Protection"],
  },
]

function OptimizationCard({
  optimization,
  index,
  isInView,
}: {
  optimization: (typeof optimizations)[0]
  index: number
  isInView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.55, delay: index * 0.09, ease: "easeOut" }}
      className="group h-full"
    >
      <div className="glow-card relative bg-card border border-border rounded-xl p-7 h-full overflow-hidden">
        {/* Large faint index number for visual depth */}
        <span
          aria-hidden="true"
          className="absolute top-3 right-5 text-7xl font-bold text-white/[0.03] select-none leading-none pointer-events-none"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Subtle inner top highlight */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.765 0.177 162 / 0.45), transparent)",
          }}
        />

        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/10 flex items-center justify-center mb-5 group-hover:border-emerald-400/30 group-hover:shadow-[0_0_14px_oklch(0.765_0.177_162_/_0.2)] transition-all duration-300">
          <optimization.icon className="w-6 h-6 text-emerald-400" />
        </div>

        <h3 className="text-lg font-bold mb-2.5 text-foreground">{optimization.title}</h3>
        <p className="text-muted-foreground mb-5 leading-relaxed text-sm">
          {optimization.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {optimization.metrics.map((metric) => (
            <span
              key={metric}
              className="text-xs px-2.5 py-1 rounded-full bg-secondary/60 text-muted-foreground border border-border hover:border-emerald-400/30 hover:text-emerald-400 hover:bg-emerald-400/5 transition-all duration-200 cursor-default"
            >
              {metric}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function Optimizations() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="optimizaciones" className="py-20 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center">
            <span className="section-label">Siempre Incluido</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 text-balance leading-[1.05] tracking-tight">
            Optimizaciones{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Incluidas
            </span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Cada proyecto incluye optimizaciones avanzadas para garantizar el mejor rendimiento,
            accesibilidad y experiencia de usuario
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {optimizations.map((optimization, index) => (
            <OptimizationCard
              key={optimization.title}
              optimization={optimization}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
