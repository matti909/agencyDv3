"use client"

import { motion, useInView } from "framer-motion"
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
      "Profesionales especializados en desarrollo, diseno y estrategia digital.",
  },
  {
    icon: Rocket,
    title: "Tecnologia de Vanguardia",
    description:
      "Utilizamos las ultimas tecnologias y mejores practicas de la industria.",
  },
  {
    icon: Award,
    title: "Calidad Garantizada",
    description:
      "Compromiso con la excelencia en cada linea de codigo y cada pixel de diseno.",
  },
]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="nosotros" className="py-24 md:py-36 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden border border-border/60 aspect-[4/3]">
              <Image
                src="/images/about-team.jpg"
                alt="Equipo de desarrollo trabajando en proyectos digitales"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/40 via-transparent to-transparent" />
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -bottom-4 -right-4 md:bottom-4 md:right-4 bg-card border border-border rounded-lg px-5 py-3 shadow-lg"
            >
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                5+
              </div>
              <div className="text-[11px] text-muted-foreground">
                Anos de Experiencia
              </div>
            </motion.div>

            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/[0.04] to-teal-500/[0.03] rounded-2xl blur-2xl -z-10" />
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-card/50 text-xs text-muted-foreground mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              Nosotros
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground text-balance">
              Transformamos ideas en{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                productos digitales
              </span>
            </h2>

            <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
              Somos una agencia digital especializada en crear productos a medida que
              impulsan el crecimiento y la innovacion de negocios y empresas.
            </p>
            <p className="text-base text-muted-foreground mb-10 leading-relaxed">
              Nuestro enfoque combina diseno excepcional, desarrollo robusto y
              estrategia digital para entregar soluciones que generan resultados
              reales.
            </p>

            {/* Compact values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                    <v.icon className="w-4.5 h-4.5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground mb-0.5">{v.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
