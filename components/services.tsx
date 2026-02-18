"use client"

import { Globe, Bot, TrendingUp, CreditCard, Shield } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"

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
    description:
      "Landing Pages profesionales, E-commerce completo y CMS personalizado para gestionar tu contenido sin conocimientos tecnicos.",
    features: ["Diseno UX/UI Premium", "SEO Optimizado", "Responsive Design"],
    price: "Desde $499",
    featured: true,
    image: "/images/service-web.jpg",
  },
  {
    slug: "automatizacion-ia",
    icon: "Bot",
    title: "Automatizacion con IA",
    description:
      "Bots inteligentes que atienden clientes 24/7 en WhatsApp, Instagram, Facebook y Telegram. Con IA que aprende de cada interaccion.",
    features: ["Chatbots GPT-4", "Multi-plataforma", "Respuestas Inteligentes"],
    price: "Desde $150/bot",
    featured: true,
    image: "/images/service-ai.jpg",
  },
  {
    slug: "ventas-marketing",
    icon: "TrendingUp",
    title: "Ventas y Marketing",
    description:
      "Campanas de Facebook Ads y Google Ads optimizadas, email marketing automatizado y funnels de conversion medibles.",
    features: ["ROI Medible", "Optimizacion Continua", "A/B Testing"],
    price: "Desde $200/mes",
    featured: true,
    image: "/images/service-marketing.jpg",
  },
  {
    slug: "gestion-pagos",
    icon: "CreditCard",
    title: "Gestion y Pagos",
    description:
      "Pasarelas de pago integradas, dashboard con metricas en tiempo real, facturacion automatica y gestion de inventario.",
    features: ["Mercado Pago", "Stripe", "Dashboard Analytics"],
    price: "Incluido",
    featured: false,
    image: "/images/service-payments.jpg",
  },
  {
    slug: "seguridad-soporte",
    icon: "Shield",
    title: "Seguridad y Soporte",
    description:
      "Certificados SSL, backups automaticos, cumplimiento GDPR y soporte tecnico continuo para mantener tu negocio seguro.",
    features: ["SSL Incluido", "Backups Diarios", "Soporte 24/7"],
    price: "Incluido",
    featured: false,
    image: "/images/service-security.jpg",
  },
]

type Service = (typeof services)[0]

function ServiceCard({
  service,
  index,
  isInView,
}: {
  service: Service
  index: number
  isInView: boolean
}) {
  const Icon = iconMap[service.icon as keyof typeof iconMap]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group h-full"
    >
      <Link href={`/servicios/${service.slug}`}>
        <div className="relative h-full bg-card border border-border rounded-xl overflow-hidden hover:border-emerald-500/40 transition-all duration-500 cursor-pointer">
          {/* Image section */}
          <div className="relative h-48 md:h-52 overflow-hidden">
            <Image
              src={service.image}
              alt={`Servicio de ${service.title} - Disrupt Lab`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

            {service.featured && (
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold backdrop-blur-sm">
                Destacado
              </div>
            )}

            <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center">
              <Icon className="w-6 h-6 text-emerald-400" />
            </div>
          </div>

          {/* Content section */}
          <div className="p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground group-hover:text-emerald-400 transition-colors">
              {service.title}
            </h3>

            <p className="text-muted-foreground mb-6 leading-relaxed text-sm md:text-base">
              {service.description}
            </p>

            <ul className="flex flex-wrap gap-2 mb-6">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className="text-xs px-3 py-1.5 rounded-full bg-secondary/50 text-secondary-foreground border border-border"
                >
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <span className="text-sm font-semibold text-foreground">
                {service.price}
              </span>
              <span className="text-emerald-400 font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                {"Ver mas ->"}
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 text-sm text-muted-foreground mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Nuestros Servicios
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-6 text-balance text-foreground">
            {"Digitalizacion Empresarial 360"}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Todo lo que necesitas para vender online: desde tu sitio web hasta
            bots con IA que atienden clientes mientras duermes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.slug}
              service={service}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold text-lg transition-colors group"
          >
            Ver todos los servicios en detalle
            <span className="text-xl group-hover:translate-x-1 transition-transform">
              {" ->"}
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
