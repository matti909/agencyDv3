"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Target, Users, Rocket, Award } from "lucide-react"

const values = [
  {
    icon: Target,
    title: "Enfoque en Resultados",
    description: "Cada proyecto está diseñado para alcanzar tus objetivos de negocio y maximizar el ROI.",
  },
  {
    icon: Users,
    title: "Equipo Experto",
    description: "Profesionales especializados en desarrollo, diseño y estrategia digital trabajando para ti.",
  },
  {
    icon: Rocket,
    title: "Tecnología de Vanguardia",
    description: "Utilizamos las últimas tecnologías y mejores prácticas para garantizar productos de calidad.",
  },
  {
    icon: Award,
    title: "Calidad Garantizada",
    description: "Compromiso con la excelencia en cada línea de código y cada pixel de diseño.",
  },
]

function ValueCard({ value, index, isInView }: { value: typeof values[0]; index: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
    >
      <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 flex items-center justify-center mb-4">
          <value.icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-serif font-bold mb-2 text-foreground">{value.title}</h3>
        <p className="text-muted-foreground leading-relaxed">{value.description}</p>
      </div>
    </motion.div>
  )
}

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="nosotros" className="py-20 md:py-32 relative bg-card/30" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Sobre <span className="text-primary">Nosotros</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
              Somos una agencia digital especializada en transformar negocios y empresas en la era digital. Creamos
              productos a medida que impulsan el crecimiento y la innovación.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Nuestro enfoque combina diseño excepcional, desarrollo robusto y estrategia digital para entregar
              soluciones que no solo se ven bien, sino que generan resultados reales para tu negocio.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground font-medium">Productos a Medida</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-foreground font-medium">Soporte 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground font-medium">Tecnología Avanzada</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {values.map((value, index) => (
              <ValueCard key={value.title} value={value} index={index} isInView={isInView} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
