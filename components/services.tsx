"use client"

import { Globe, Bot, TrendingUp, CreditCard, Shield, ArrowUpRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"

const iconMap = { Globe, Bot, TrendingUp, CreditCard, Shield }

const services = [
  {
    slug: "presencia-digital",
    icon: "Globe" as const,
    title: "Presencia Digital",
    description:
      "Landing Pages profesionales, E-commerce completo y CMS personalizado para gestionar tu contenido sin conocimientos tecnicos.",
    features: ["Diseno UX/UI Premium", "SEO Optimizado", "Responsive Design"],
    price: "Desde $499",
    featured: true,
    image: "/images/service-web.jpg",
  },
  {
    slug: "automatizacion-ia",
    icon: "Bot" as const,
    title: "Automatizacion con IA",
    description:
      "Bots inteligentes que atienden clientes 24/7 en WhatsApp, Instagram, Facebook y Telegram.",
    features: ["Chatbots GPT-4", "Multi-plataforma", "Respuestas Inteligentes"],
    price: "Desde $150/bot",
    featured: true,
    image: "/images/service-ai.jpg",
  },
  {
    slug: "ventas-marketing",
    icon: "TrendingUp" as const,
    title: "Ventas y Marketing",
    description:
      "Campanas de Facebook Ads y Google Ads optimizadas, email marketing automatizado y funnels de conversion.",
    features: ["ROI Medible", "Optimizacion Continua", "A/B Testing"],
    price: "Desde $200/mes",
    featured: true,
    image: "/images/service-marketing.jpg",
  },
  {
    slug: "gestion-pagos",
    icon: "CreditCard" as const,
    title: "Gestion y Pagos",
    description:
      "Pasarelas de pago integradas, dashboard con metricas en tiempo real y facturacion automatica.",
    features: ["Mercado Pago", "Stripe", "Dashboard Analytics"],
    price: "Incluido",
    featured: false,
    image: "/images/service-payments.jpg",
  },
  {
    slug: "seguridad-soporte",
    icon: "Shield" as const,
    title: "Seguridad y Soporte",
    description:
      "Certificados SSL, backups automaticos, cumplimiento GDPR y soporte tecnico continuo.",
    features: ["SSL Incluido", "Backups Diarios", "Soporte 24/7"],
    price: "Incluido",
    featured: false,
    image: "/images/service-security.jpg",
  },
]

function ServiceCard({
  service,
  index,
  isInView,
}: {
  service: (typeof services)[0]
  index: number
  isInView: boolean
}) {
  const Icon = iconMap[service.icon]
  const isBig = index < 2

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`group ${isBig ? "md:col-span-1 lg:col-span-1" : ""}`}
    >
      <Link href={`/servicios/${service.slug}`} className="block h-full">
        <div className="relative h-full bg-card border border-border rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-500">
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={service.image}
              alt={`Servicio de ${service.title}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

            {service.featured && (
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold backdrop-blur-sm">
                Popular
              </span>
            )}

            <div className="absolute bottom-3 left-3 w-10 h-10 rounded-lg bg-card/80 backdrop-blur-sm border border-border/60 flex items-center justify-center">
              <Icon className="w-5 h-5 text-emerald-400" />
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-lg font-bold text-foreground group-hover:text-emerald-400 transition-colors">
                {service.title}
              </h3>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-emerald-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0 mt-1" />
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed mb-5">
              {service.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {service.features.map((f) => (
                <span
                  key={f}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-secondary/60 text-muted-foreground border border-border/50"
                >
                  {f}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-border/50">
              <span className="text-sm font-bold text-emerald-400">
                {service.price}
              </span>
            </div>
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
    <section id="servicios" className="py-24 md:py-36 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-card/50 text-xs text-muted-foreground mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Servicios
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground text-balance">
            Todo lo que necesitas para{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              vender online
            </span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Desde tu sitio web hasta bots con IA que atienden clientes mientras duermes.
          </p>
        </motion.div>

        {/* Grid: 2 big + 3 regular */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.slug}
              service={service}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* CTA link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-14 text-center"
        >
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors group"
          >
            Ver todos los servicios en detalle
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
