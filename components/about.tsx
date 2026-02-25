"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Target, Users, Rocket, Award } from "lucide-react"

const stats = [
  { value: "50+", label: "Proyectos entregados" },
  { value: "30+", label: "Clientes activos" },
  { value: "3+", label: "Años de experiencia" },
]

const values = [
  {
    icon: Target,
    title: "Enfoque en Resultados",
    description:
      "Cada proyecto está diseñado para alcanzar tus objetivos de negocio y maximizar el ROI.",
  },
  {
    icon: Users,
    title: "Equipo Experto",
    description:
      "Profesionales especializados en desarrollo, diseño y estrategia digital trabajando para ti.",
  },
  {
    icon: Rocket,
    title: "Tecnología de Vanguardia",
    description:
      "Utilizamos las últimas tecnologías y mejores prácticas para garantizar productos de calidad.",
  },
  {
    icon: Award,
    title: "Calidad Garantizada",
    description:
      "Compromiso con la excelencia en cada línea de código y cada pixel de diseño.",
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
      transition={{ duration: 0.55, delay: 0.2 + index * 0.1, ease: "easeOut" }}
      className="group"
    >
      <div className="glow-card bg-card border border-border rounded-xl p-6 h-full overflow-hidden relative">
        {/* Subtle inner top highlight */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.765 0.177 162 / 0.5), transparent)",
          }}
        />

        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/10 flex items-center justify-center mb-4 group-hover:border-emerald-400/30 group-hover:shadow-[0_0_14px_oklch(0.765_0.177_162_/_0.2)] transition-all duration-300">
          <value.icon className="w-5 h-5 text-emerald-400" />
        </div>
        <h3 className="text-base font-bold mb-1.5 text-foreground">{value.title}</h3>
        <p className="text-muted-foreground leading-relaxed text-sm">{value.description}</p>
      </div>
    </motion.div>
  )
}

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="nosotros" className="py-20 md:py-32 relative bg-card/20 overflow-hidden" ref={ref}>
      {/* Large background watermark for atmospheric depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span
          className="text-[22vw] font-extrabold leading-none text-white opacity-[0.025] whitespace-nowrap tracking-tight"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic" }}
        >
          Disrupt
        </span>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left column — text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="section-label">Sobre Nosotros</span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance leading-[1.05] tracking-tight">
              Transformamos tu{" "}
              <span
                className="font-playfair bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent"
              >
                visión digital
              </span>
            </h2>
            <p className="text-lg text-muted-foreground mb-5 leading-relaxed">
              Somos una agencia digital especializada en transformar negocios y empresas en la era
              digital. Creamos productos a medida que impulsan el crecimiento y la innovación.
            </p>
            <p className="text-base text-muted-foreground mb-10 leading-relaxed">
              Nuestro enfoque combina diseño excepcional, desarrollo robusto y estrategia digital
              para entregar soluciones que no solo se ven bien, sino que generan resultados reales.
            </p>

            {/* Keyword pills */}
            <div className="flex flex-wrap gap-3 mb-12">
              {["Productos a Medida", "Soporte 24/7", "Tecnología Avanzada"].map((kw, i) => (
                <div
                  key={kw}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-card/60 text-sm font-medium text-foreground"
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      i === 1 ? "bg-teal-400" : "bg-emerald-400"
                    }`}
                  />
                  {kw}
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 border-t border-border pt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="font-playfair text-3xl md:text-4xl bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent leading-none mb-1.5">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground leading-tight">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right column — value cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
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

