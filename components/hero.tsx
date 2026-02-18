"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { useRef, useEffect } from "react"
import gsap from "gsap"
import Image from "next/image"

const stats = [
  { value: "150+", label: "Proyectos" },
  { value: "98%", label: "Satisfaccion" },
  { value: "3x", label: "ROI Promedio" },
]

export function Hero() {
  const container = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.fromTo(
        ".hero-badge",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      )
        .fromTo(
          ".hero-title-line",
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          ".hero-subtitle",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          ".hero-cta",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          ".hero-stat-item",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          ".hero-image-block",
          { x: 60, opacity: 0, scale: 0.95 },
          { x: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
          "-=1.2"
        )
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={container}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-background opacity-30" />

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-emerald-500/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div>
            {/* Badge */}
            <div className="hero-badge mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/60 backdrop-blur-sm text-sm text-muted-foreground">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Agencia Digital de Alto Impacto
              </div>
            </div>

            {/* Heading */}
            <h1 className="mb-6 leading-[1.05] tracking-tight">
              <span className="hero-title-line block text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-foreground">
                Soluciones web
              </span>
              <span className="hero-title-line block text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                a medida
              </span>
              <span className="hero-title-line block text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-foreground">
                para tu negocio
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed mb-10">
              Desde landing pages hasta e-commerce y sistemas complejos.
              Tecnologia moderna, diseno impecable y resultados medibles.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-12">
              <a href="#contacto" className="hero-cta">
                <Button
                  size="lg"
                  className="gradient-button text-white border-0 text-base px-8 py-6 font-semibold rounded-lg transition-all hover:scale-[1.03] active:scale-[0.98]"
                >
                  Comenzar Proyecto
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
              <a href="#servicios" className="hero-cta">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 py-6 font-semibold rounded-lg border-border hover:border-emerald-400/50 transition-all"
                >
                  Ver Servicios
                </Button>
              </a>
            </div>

            {/* Inline stats */}
            <div className="flex items-center gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="hero-stat-item">
                  <div className="text-2xl md:text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Dashboard image */}
          <div className="hero-image-block relative">
            <div className="relative rounded-xl overflow-hidden border border-border/60 shadow-2xl shadow-emerald-900/10">
              <Image
                src="/images/hero-dashboard.jpg"
                alt="Dashboard de analisis mostrando metricas de rendimiento y resultados de proyectos digitales"
                width={720}
                height={480}
                className="w-full h-auto object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Bottom fade */}
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background/40 to-transparent" />
            </div>

            {/* Floating card: project count */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="absolute -bottom-5 -left-5 md:-bottom-6 md:-left-6 bg-card border border-border rounded-lg px-5 py-3.5 shadow-lg backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <div className="text-sm font-bold text-foreground">24/7</div>
                  <div className="text-xs text-muted-foreground">Soporte activo</div>
                </div>
              </div>
            </motion.div>

            {/* Glow behind */}
            <div className="absolute -inset-6 bg-gradient-to-br from-emerald-500/[0.06] via-teal-500/[0.04] to-transparent rounded-2xl blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
