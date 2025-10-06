"use client"

import { ShoppingCart, Calendar, Globe, Sparkles, Database, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const services = [
  {
    icon: Globe,
    title: "Landing Pages",
    description: "Páginas de aterrizaje optimizadas para conversión, con diseño moderno y carga ultrarrápida.",
    features: ["SEO Optimizado", "Responsive Design", "Analytics Integrado"],
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Tiendas online completas con pasarelas de pago, gestión de inventario y panel administrativo.",
    features: ["Pagos Seguros", "Gestión de Stock", "Multi-moneda"],
  },
  {
    icon: Calendar,
    title: "Sistema de Turnos",
    description: "Plataformas de reservas para clínicas, estudios legales, peluquerías y más profesionales.",
    features: ["Calendario Inteligente", "Notificaciones", "Gestión de Clientes"],
  },
  {
    icon: Database,
    title: "Base de Datos",
    description: "Arquitectura de datos escalable y segura para gestionar toda la información de tu negocio.",
    features: ["Alta Disponibilidad", "Backups Automáticos", "Seguridad Avanzada"],
  },
  {
    icon: Mail,
    title: "Email Corporativo",
    description: "Correos profesionales con tu dominio personalizado y almacenamiento ilimitado.",
    features: ["Dominio Propio", "Anti-spam", "Soporte 24/7"],
  },
  {
    icon: Sparkles,
    title: "CMS Personalizado",
    description: "Sistema de gestión de contenido intuitivo para actualizar tu sitio sin conocimientos técnicos.",
    features: ["Fácil de Usar", "Multi-idioma", "Editor Visual"],
  },
]

function ServiceCard({ service, index, isInView }: { service: typeof services[0]; index: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group h-full"
    >
      <div className="relative h-full bg-card border border-border rounded-lg p-8 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 flex items-center justify-center mb-6">
          <service.icon className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-2xl font-serif font-bold mb-3 text-foreground">{service.title}</h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
        <ul className="space-y-3">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center text-sm text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mr-3" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
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
            Nuestros Servicios
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Soluciones digitales completas y personalizadas para llevar tu negocio al siguiente nivel
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
