"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const principles = [
  {
    number: "01",
    title: "Un solo equipo para todo",
    description: "No coordinás un diseñador, un dev y un community manager por separado. Hablás con nosotros y nosotros resolvemos.",
  },
  {
    number: "02",
    title: "Resultados medibles desde el día uno",
    description: "Sin promesas vagas. Cada proyecto arranca con métricas claras y termina con números reales.",
  },
  {
    number: "03",
    title: "Velocidad sin sacrificar calidad",
    description: "Primeras entregas en días, no meses. Iteramos rápido y ajustamos sobre la marcha.",
  },
  {
    number: "04",
    title: "Soporte real, no un ticket",
    description: "Cuando algo pasa, respondemos. Sin bots, sin esperas de 72hs, sin excusas.",
  },
]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="nosotros" className="py-20 md:py-32 relative bg-card/20 overflow-hidden" ref={ref}>

      {/* Background watermark */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span
          className="text-[22vw] font-extrabold leading-none text-white opacity-[0.022] whitespace-nowrap tracking-tight"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic" }}
        >
          Disrupt
        </span>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — positioning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="section-label">Sobre Nosotros</span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-balance leading-[1.05] tracking-tight">
              Tu equipo digital,{" "}
              <span className="font-playfair bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                sin el costo de armar uno
              </span>
            </h2>

            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p className="text-base md:text-lg">
                La mayoría de los negocios pierden tiempo coordinando freelancers sueltos que no se hablan entre sí: uno para la web, otro para redes, otro para los ads.
              </p>
              <p className="text-base">
                Nosotros hacemos todo eso desde un solo lugar. Vos te enfocás en tu negocio — nosotros nos encargamos del resto.
              </p>
            </div>
          </motion.div>

          {/* Right — principles list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-6">
              Cómo trabajamos
            </p>

            <div className="border-t border-border/50">
              {principles.map((item, index) => (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.08, ease: "easeOut" }}
                  className="flex gap-5 py-6 border-b border-border/50"
                >
                  <span className="text-xs font-mono text-muted-foreground/40 pt-0.5 flex-shrink-0 w-5">
                    {item.number}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1.5 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
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
