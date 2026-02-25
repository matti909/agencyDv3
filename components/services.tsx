"use client"

import { Globe, Bot, TrendingUp, CreditCard, Shield, Megaphone, ArrowRight, ImageIcon, Users, BarChart3 } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"

const iconMap = {
  Globe,
  Bot,
  TrendingUp,
  CreditCard,
  Shield,
  Megaphone,
}

const services = [
  {
    slug: "presencia-digital",
    icon: "Globe",
    title: "Presencia Digital",
    description:
      "Landing Pages profesionales, E-commerce completo y CMS personalizado para gestionar tu contenido sin conocimientos técnicos.",
    features: ["Diseño UX/UI Premium", "SEO Optimizado", "Responsive Design"],
    price: "Desde $499",
    featured: true,
    isNew: false,
  },
  {
    slug: "automatizacion-ia",
    icon: "Bot",
    title: "Automatización con IA",
    description:
      "Bots inteligentes que atienden clientes 24/7 en WhatsApp, Instagram, Facebook y Telegram. Con IA que aprende de cada interacción.",
    features: ["Chatbots GPT-4", "Multi-plataforma", "Respuestas Inteligentes"],
    price: "Desde $150/bot",
    featured: true,
    isNew: false,
  },
  {
    slug: "ventas-marketing",
    icon: "TrendingUp",
    title: "Ventas y Marketing",
    description:
      "Campañas de Facebook Ads y Google Ads optimizadas, email marketing automatizado y funnels de conversión medibles.",
    features: ["ROI Medible", "Optimización Continua", "A/B Testing"],
    price: "Desde $200/mes",
    featured: true,
    isNew: false,
  },
  {
    slug: "gestion-pagos",
    icon: "CreditCard",
    title: "Gestión y Pagos",
    description:
      "Pasarelas de pago integradas, dashboard con métricas en tiempo real, facturación automática y gestión de inventario.",
    features: ["Mercado Pago", "Stripe", "Dashboard Analytics"],
    price: "Incluido",
    featured: false,
    isNew: false,
  },
  {
    slug: "seguridad-soporte",
    icon: "Shield",
    title: "Seguridad y Soporte",
    description:
      "Certificados SSL, backups automáticos, cumplimiento GDPR y soporte técnico continuo para mantener tu negocio seguro.",
    features: ["SSL Incluido", "Backups Diarios", "Soporte 24/7"],
    price: "Incluido",
    featured: false,
    isNew: false,
  },
]

// The new spotlight service — rendered separately
const spotlightService = {
  slug: "redes-contenido",
  icon: "Megaphone",
  title: "Redes Sociales & Contenido",
  description:
    "Gestionamos tus redes de punta a punta: producimos el contenido, lo publicamos, respondemos tu comunidad y corremos los ads que convierten seguidores en clientes.",
  pillars: [
    {
      icon: Users,
      label: "Community Management",
      detail: "Instagram · Facebook · TikTok",
    },
    {
      icon: ImageIcon,
      label: "Producción de Contenido",
      detail: "Diseño · Copy · Video · Reels",
    },
    {
      icon: BarChart3,
      label: "Campañas Pagas",
      detail: "Meta Ads · TikTok Ads · ROI medible",
    },
  ],
  price: "Desde $300/mes",
}

// Platform logos as inline SVGs
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

type Service = (typeof services)[0]

// Vertical card — for featured services (top row)
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
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      className="group h-full"
    >
      <Link href={`/servicios/${service.slug}`} className="block h-full">
        <div className="glow-card relative h-full bg-card border border-border rounded-xl p-8 cursor-pointer overflow-hidden">
          {/* Subtle inner highlight that appears on hover */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 0%, oklch(0.765 0.177 162 / 0.07) 0%, transparent 70%)",
            }}
          />

          {service.featured && (
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/25 text-emerald-400 text-xs font-semibold tracking-wide">
              Destacado
            </div>
          )}

          {/* Icon container */}
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/10 flex items-center justify-center mb-6 group-hover:border-emerald-400/30 group-hover:bg-gradient-to-br group-hover:from-emerald-500/20 group-hover:via-teal-500/15 group-hover:to-cyan-500/15 group-hover:shadow-[0_0_18px_oklch(0.765_0.177_162_/_0.2)] transition-all duration-300">
            <Icon className="w-7 h-7 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
          </div>

          <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-emerald-400 transition-colors duration-300">
            {service.title}
          </h3>

          <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
            {service.description}
          </p>

          <ul className="space-y-2.5 mb-6">
            {service.features.map((feature, idx) => (
              <li key={feature} className="flex items-center text-sm text-muted-foreground">
                <div
                  className={`w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0 ${
                    idx % 2 === 0 ? "bg-emerald-400" : "bg-teal-400"
                  }`}
                />
                {feature}
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/70">
            <span className="text-sm font-semibold text-foreground">{service.price}</span>
            <span className="text-emerald-400 font-semibold text-sm group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1.5">
              Ver más
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// Full-width spotlight card for the new Redes Sociales & Contenido service
function SpotlightServiceCard({ isInView }: { isInView: boolean }) {
  const svc = spotlightService
  const Icon = iconMap[svc.icon as keyof typeof iconMap]

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
      className="group"
    >
      <Link href={`/servicios/${svc.slug}`} className="block">
        <div className="glow-card relative bg-card border border-border rounded-xl p-8 md:p-10 cursor-pointer overflow-hidden">

          {/* Ambient glow background */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-xl"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 20% 50%, oklch(0.765 0.177 162 / 0.06) 0%, transparent 65%)",
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-start">

            {/* Left — main content */}
            <div>
              {/* Header row */}
              <div className="flex items-start gap-5 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:border-emerald-400/30 group-hover:shadow-[0_0_18px_oklch(0.765_0.177_162_/_0.2)] transition-all duration-300">
                  <Icon className="w-7 h-7 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-emerald-400 transition-colors duration-300">
                      {svc.title}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-violet-400/10 border border-violet-400/25 text-violet-400 text-xs font-semibold tracking-wide">
                      Nuevo
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
                    {svc.description}
                  </p>
                </div>
              </div>

              {/* Three pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {svc.pillars.map((pillar, idx) => (
                  <motion.div
                    key={pillar.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                    transition={{ duration: 0.4, delay: 0.45 + idx * 0.08 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-background/60 border border-border/60 group-hover:border-border transition-colors duration-300"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-400/8 border border-emerald-400/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <pillar.icon className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground leading-tight mb-0.5">
                        {pillar.label}
                      </div>
                      <div className="text-xs text-muted-foreground">{pillar.detail}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right — platforms + price + CTA */}
            <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-6 lg:gap-6 lg:min-w-[120px]">

              {/* Platform icons — stacked on desktop, row on mobile */}
              <div className="flex lg:flex-col items-center gap-3">
                <div className="flex items-center gap-2 lg:gap-0 lg:flex-col lg:items-end lg:gap-3">
                  <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-card border border-pink-400/20 text-pink-400 group-hover:border-pink-400/40 transition-colors duration-300">
                    <InstagramIcon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="text-xs font-medium hidden lg:inline">Instagram</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-card border border-sky-400/20 text-sky-400 group-hover:border-sky-400/40 transition-colors duration-300">
                    <TikTokIcon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="text-xs font-medium hidden lg:inline">TikTok</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-card border border-blue-400/20 text-blue-400 group-hover:border-blue-400/40 transition-colors duration-300">
                    <FacebookIcon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="text-xs font-medium hidden lg:inline">Facebook</span>
                  </div>
                </div>
              </div>

              {/* Price + CTA */}
              <div className="flex flex-col items-end gap-3">
                <div className="text-right">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Desde</div>
                  <div className="text-2xl font-bold text-foreground">$300<span className="text-sm font-normal text-muted-foreground">/mes</span></div>
                </div>
                <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold text-sm group-hover:translate-x-1 transition-transform duration-200 whitespace-nowrap">
                  Ver detalle
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>

            </div>

          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// Horizontal card — for supporting services (bottom row, wider)
function WideServiceCard({
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
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      className="group"
    >
      <Link href={`/servicios/${service.slug}`} className="block">
        <div className="glow-card relative bg-card border border-border rounded-xl p-7 cursor-pointer overflow-hidden flex gap-7 items-start">
          {/* Subtle inner highlight */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
            style={{
              background:
                "radial-gradient(ellipse 70% 80% at 0% 50%, oklch(0.765 0.177 162 / 0.05) 0%, transparent 60%)",
            }}
          />

          {/* Icon */}
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:border-emerald-400/30 group-hover:shadow-[0_0_18px_oklch(0.765_0.177_162_/_0.2)] transition-all duration-300">
            <Icon className="w-7 h-7 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-lg font-bold text-foreground group-hover:text-emerald-400 transition-colors duration-300">
                {service.title}
              </h3>
              <span className="text-xs font-semibold text-emerald-400/80 bg-emerald-400/8 border border-emerald-400/20 rounded-full px-2.5 py-0.5 flex-shrink-0">
                {service.price}
              </span>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
              {service.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex gap-2 flex-wrap">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="text-xs px-2.5 py-0.5 rounded-full border border-border/70 text-muted-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <span className="text-emerald-400 font-semibold text-sm group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1.5 flex-shrink-0 ml-4">
                Ver más
                <ArrowRight className="w-4 h-4" />
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

  const featuredServices = services.filter((s) => s.featured)
  const supportingServices = services.filter((s) => !s.featured)

  return (
    <section id="servicios" className="py-24 md:py-32 lg:py-40 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          {/* Eyebrow label */}
          <div className="flex justify-center">
            <span className="section-label">Nuestros Servicios</span>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-[1.05] tracking-tight">
            Digitalización Empresarial{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              360°
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Todo lo que necesitas para vender online: desde tu sitio web hasta bots con IA que
            atienden clientes mientras duermes
          </p>
        </motion.div>

        {/* Featured services — 3-column vertical cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-6">
          {featuredServices.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} isInView={isInView} />
          ))}
        </div>

        {/* Spotlight — Redes Sociales & Contenido (full width) */}
        <div className="mb-6">
          <SpotlightServiceCard isInView={isInView} />
        </div>

        {/* Supporting services — 2-column horizontal cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {supportingServices.map((service, index) => (
            <WideServiceCard
              key={service.slug}
              service={service}
              index={index + 4}
              isInView={isInView}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="text-center mt-14"
        >
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold text-base transition-colors group"
          >
            Ver todos los servicios en detalle
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
