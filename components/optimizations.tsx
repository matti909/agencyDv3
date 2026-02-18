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
    description: "Soporte completo para múltiples idiomas con gestión centralizada y SEO optimizado para cada región.",
    metrics: ["i18n", "Detección Automática", "URLs Localizadas", "RTL Support"],
  },
  {
    icon: BarChart,
    title: "Análisis de Datos",
    description: "Dashboards personalizados con métricas clave para tomar decisiones basadas en datos reales.",
    metrics: ["Google Analytics", "Eventos Personalizados", "Conversiones", "Reportes"],
  },
  {
    icon: Shield,
    title: "Seguridad",
    description: "Protección avanzada con certificados SSL, encriptación de datos y monitoreo continuo de amenazas.",
    metrics: ["SSL/TLS", "Firewall", "Backups", "DDoS Protection"],
  },
]

function OptimizationCard({
  optimization,
  index,
  isInView,
}: {
  optimization: typeof optimizations[0]
  index: number
  isInView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group h-full"
    >
      <div className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 h-full">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 flex items-center justify-center mb-6">
          <optimization.icon className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-2xl font-serif font-bold mb-3 text-foreground">{optimization.title}</h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">{optimization.description}</p>
        <div className="flex flex-wrap gap-2">
          {optimization.metrics.map((metric) => (
            <span key={metric} className="text-xs px-3 py-1.5 rounded-full bg-secondary/50 text-secondary-foreground border border-border">
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Optimizaciones <span className="text-primary">Incluidas</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Cada proyecto incluye optimizaciones avanzadas para garantizar el mejor rendimiento, accesibilidad y
            experiencia de usuario
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
