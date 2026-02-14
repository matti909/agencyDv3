"use client"

import { Globe, Bot, TrendingUp, CreditCard, Shield } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"

// Map icon names to components
const iconMap = {
  Globe,
  Bot,
  TrendingUp,
  CreditCard,
  Shield,
}

const services = [
  {
    slug: "presencia-digital",
    icon: "Globe",
    title: "Presencia Digital",
    description: "Landing Pages profesionales, E-commerce completo y CMS personalizado para gestionar tu contenido sin conocimientos técnicos.",
    features: ["Diseño UX/UI Premium", "SEO Optimizado", "Responsive Design"],
    price: "Desde $499",
    featured: true,
  },
  {
    slug: "automatizacion-ia",
    icon: "Bot",
    title: "Automatización con IA",
    description: "Bots inteligentes que atienden clientes 24/7 en WhatsApp, Instagram, Facebook y Telegram. Con IA que aprende de cada interacción.",
    features: ["Chatbots GPT-4", "Multi-plataforma", "Respuestas Inteligentes"],
    price: "Desde $150/bot",
    featured: true,
  },
  {
    slug: "ventas-marketing",
    icon: "TrendingUp",
    title: "Ventas y Marketing",
    description: "Campañas de Facebook Ads y Google Ads optimizadas, email marketing automatizado y funnels de conversión medibles.",
    features: ["ROI Medible", "Optimización Continua", "A/B Testing"],
    price: "Desde $200/mes",
    featured: true,
  },
  {
    slug: "gestion-pagos",
    icon: "CreditCard",
    title: "Gestión y Pagos",
    description: "Pasarelas de pago integradas, dashboard con métricas en tiempo real, facturación automática y gestión de inventario.",
    features: ["Mercado Pago", "Stripe", "Dashboard Analytics"],
    price: "Incluido",
    featured: false,
  },
  {
    slug: "seguridad-soporte",
    icon: "Shield",
    title: "Seguridad y Soporte",
    description: "Certificados SSL, backups automáticos, cumplimiento GDPR y soporte técnico continuo para mantener tu negocio seguro.",
    features: ["SSL Incluido", "Backups Diarios", "Soporte 24/7"],
    price: "Incluido",
    featured: false,
  },
]

type Service = typeof services[0]

function ServiceCard({ service, index, isInView }: { service: Service; index: number; isInView: boolean }) {
  const Icon = iconMap[service.icon as keyof typeof iconMap]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group h-full"
    >
      <Link href={`/servicios/${service.slug}`}>
        <div className="relative h-full bg-card border border-border rounded-xl p-8 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
          {service.featured && (
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
              Destacado
            </div>
          )}

          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Icon className="w-7 h-7 text-primary" />
          </div>

          <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
            {service.title}
          </h3>

          <p className="text-muted-foreground mb-6 leading-relaxed">
            {service.description}
          </p>

          <ul className="space-y-3 mb-6">
            {service.features.map((feature, idx) => (
              <li key={feature} className="flex items-center text-sm text-muted-foreground">
                <div
                  className={`w-1.5 h-1.5 rounded-full mr-3 ${
                    idx % 2 === 0 ? "bg-blue-400" : "bg-purple-400"
                  }`}
                />
                {feature}
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
            <span className="text-sm font-semibold text-foreground">{service.price}</span>
            <span className="text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Ver más →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="servicios" className="py-24 md:py-32 lg:py-40 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 text-balance">
            Digitalización Empresarial 360°
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Todo lo que necesitas para vender online: desde tu sitio web hasta bots con IA que atienden clientes mientras duermes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} isInView={isInView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-lg transition-colors"
          >
            Ver todos los servicios en detalle
            <span className="text-2xl">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
