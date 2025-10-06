"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useRef, useEffect, Suspense } from "react"
import gsap from "gsap"
import dynamic from "next/dynamic"

const Hero3D = dynamic(() => import("./hero-3d").then((mod) => ({ default: mod.Hero3D })), {
  ssr: false,
})

export function Hero() {
  const container = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.fromTo(
        ".hero-title span",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power3.out" }
      )
        .fromTo(
          ".hero-subtitle",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          ".hero-button",
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" },
          "-=0.5"
        )
    }, container)

    return () => ctx.revert()
  }, [])

  const title = ["Innovar.", "Crear.", "Inspirar."]

  return (
    <section
      ref={container}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-32"
    >
      {/* 3D Canvas Background */}
      <Suspense fallback={null}>
        <Hero3D />
      </Suspense>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-bold mb-6 sm:mb-8 text-balance leading-[1.1] tracking-tight px-2 sm:px-0">
            {title.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden">
                <span className="inline-block">{word}&nbsp;</span>
              </span>
            ))}
          </h1>

          <p className="hero-subtitle text-lg sm:text-xl md:text-2xl text-muted-foreground mb-12 sm:mb-16 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
            Desarrollamos soluciones web personalizadas con las tecnologías más avanzadas.
            Desde landing pages hasta sistemas complejos, te ayudamos a crecer digitalmente.
          </p>

          <div className="hero-button flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-20 sm:mb-24">
            <Button
              size="lg"
              className="gradient-button text-white border-0 text-base sm:text-lg px-8 py-6 group font-medium w-full sm:w-auto rounded-full hover:-translate-y-0.5 transition-transform"
            >
              Comenzar Proyecto
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base sm:text-lg px-8 py-6 border-border hover:bg-card bg-transparent w-full sm:w-auto rounded-full font-medium hover:-translate-y-0.5 transition-all"
            >
              Ver Servicios
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto border-t border-border pt-12"
          >
            {[
              { value: "100+", label: "Proyectos" },
              { value: "50+", label: "Clientes" },
              { value: "24/7", label: "Soporte" },
              { value: "99%", label: "Satisfacción" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
