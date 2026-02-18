"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { motion } from "framer-motion"
import { useRef, useEffect } from "react"
import gsap from "gsap"
import Image from "next/image"

const stats = [
  { value: "150+", label: "Proyectos Entregados" },
  { value: "98%", label: "Clientes Satisfechos" },
  { value: "3x", label: "ROI Promedio" },
  { value: "24/7", label: "Soporte Continuo" },
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
          ".hero-title span",
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power3.out" },
          "-=0.3"
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
        .fromTo(
          ".hero-image-wrapper",
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          ".hero-stat",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" },
          "-=0.5"
        )
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={container}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-12"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 grid-background opacity-40" />

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top badge */}
        <div className="hero-badge flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Agencia Digital de Alto Impacto
          </div>
        </div>

        {/* Main heading */}
        <div className="text-center max-w-5xl mx-auto mb-8">
          <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-sans font-bold mb-8 leading-[1.05] tracking-tighter">
            <span className="inline-block overflow-hidden">
              <span className="inline-block text-foreground">Desarrollamos&nbsp;</span>
            </span>
            <span className="inline-block overflow-hidden">
              <span className="inline-block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                soluciones web
              </span>
            </span>
            <br />
            <span className="inline-block overflow-hidden">
              <span className="inline-block text-foreground">a medida para&nbsp;</span>
            </span>
            <span className="inline-block overflow-hidden">
              <span className="inline-block bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                tu negocio
              </span>
            </span>
          </h1>

          <p className="hero-subtitle text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Desde landing pages hasta e-commerce y sistemas complejos. Tecnologia
            moderna, diseno impecable y resultados medibles.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="hero-button flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a href="#contacto">
            <Button
              size="lg"
              className="gradient-button text-white border-0 text-base md:text-lg px-8 md:px-10 py-6 md:py-7 font-semibold rounded-lg transition-all hover:scale-105"
            >
              Comenzar Proyecto
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
          <a href="#servicios">
            <Button
              size="lg"
              variant="outline"
              className="text-base md:text-lg px-8 md:px-10 py-6 md:py-7 font-semibold rounded-lg border-border hover:border-emerald-400/50 transition-all"
            >
              <Play className="mr-2 w-4 h-4" />
              Ver Servicios
            </Button>
          </a>
        </div>

        {/* Hero Image */}
        <div className="hero-image-wrapper relative max-w-5xl mx-auto mb-16">
          <div className="relative rounded-xl overflow-hidden border border-border shadow-2xl shadow-emerald-500/5">
            <Image
              src="/images/hero-dashboard.jpg"
              alt="Dashboard de analisis y metricas de Disrupt Lab mostrando resultados de clientes"
              width={1200}
              height={675}
              className="w-full h-auto object-cover"
              priority
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>
          {/* Floating glow behind image */}
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-2xl blur-2xl -z-10" />
        </div>

        {/* Stats Bar */}
        <div className="relative max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="hero-stat text-center p-4 rounded-lg border border-border bg-card/50 backdrop-blur-sm"
              >
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
