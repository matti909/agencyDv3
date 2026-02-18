"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Target, Users, Rocket, Award } from "lucide-react"
import Image from "next/image"

const values = [
  {
    icon: Target,
    title: "Enfoque en Resultados",
    description:
      "Cada proyecto esta disenado para alcanzar tus objetivos de negocio y maximizar el ROI.",
  },
  {
    icon: Users,
    title: "Equipo Experto",
    description:
      "Profesionales especializados en desarrollo, diseno y estrategia digital trabajando para ti.",
  },
  {
    icon: Rocket,
    title: "Tecnologia de Vanguardia",
    description:
      "Utilizamos las ultimas tecnologias y mejores practicas para garantizar productos de calidad.",
  },
  {
    icon: Award,
    title: "Calidad Garantizada",
    description:
      "Compromiso con la excelencia en cada linea de codigo y cada pixel de diseno.",
  },
]

function ValueCard({
  value,
  index,
  isInView,
}: {
  value: (typeof values)[0]
  index: number
  isInView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
    >
      <div className="bg-card border border-border rounded-lg p-6 hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 group">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
          <value.icon className="w-6 h-6 text-emerald-400" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-foreground">{value.title}</h3>
        <p className="text-muted-foreground leading-relaxed text-sm">
          {value.description}
        </p>
      </div>
    </motion.div>
  )
}

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="nosotros" className="py-20 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 text-sm text-muted-foreground mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            Quienes Somos
          </div>
        </motion.div>

        {/* Main content with image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden border border-border aspect-[4/3]">
              <Image
                src="/images/about-team.jpg"
                alt="Equipo de Disrupt Lab trabajando en proyectos digitales"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/50 via-transparent to-transparent" />
            </div>
            {/* Floating glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-2xl blur-2xl -z-10" />

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-6 -right-6 md:bottom-6 md:right-6 bg-card border border-border rounded-lg p-4 backdrop-blur-sm shadow-xl"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                5+
              </div>
              <div className="text-xs text-muted-foreground">
                Anos de Experiencia
              </div>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance text-foreground">
              Sobre{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Nosotros
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
              Somos una agencia digital especializada en transformar negocios y
              empresas en la era digital. Creamos productos a medida que impulsan
              el crecimiento y la innovacion.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Nuestro enfoque combina diseno excepcional, desarrollo robusto y
              estrategia digital para entregar soluciones que no solo se ven
              bien, sino que generan resultados reales para tu negocio.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-foreground font-medium">
                  Productos a Medida
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-teal-400" />
                <span className="text-foreground font-medium">
                  Soporte 24/7
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-cyan-400" />
                <span className="text-foreground font-medium">
                  Tecnologia Avanzada
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {values.map((value, index) => (
            <ValueCard
              key={value.title}
              value={value}
              index={index}
              isInView={isInView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
