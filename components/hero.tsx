"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown } from "lucide-react"
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
          ".hero-cta",
          { scale: 0.88, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" },
          "-=0.5"
        )
        .fromTo(
          ".hero-scroll-hint",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.2"
        )
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={container}
      className="relative min-h-screen flex items-center justify-start overflow-hidden pl-8 md:pl-16 lg:pl-24"
    >
      {/* 3D Canvas Background */}
      <Suspense fallback={null}>
        <Hero3D />
      </Suspense>

      {/* Ambient gradient blobs for depth — positioned away from the left-aligned text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/4 w-[600px] h-[600px] rounded-full opacity-[0.07]"
        style={{
          background:
            "radial-gradient(circle at center, oklch(0.765 0.177 162) 0%, oklch(0.75 0.155 185) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/3 bottom-0 w-[400px] h-[400px] rounded-full opacity-[0.05]"
        style={{
          background:
            "radial-gradient(circle at center, oklch(0.789 0.145 195) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl">
      
        <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sans font-bold mb-6 leading-[1.05] tracking-tighter">
          <span className="inline-block overflow-hidden">
            <span className="inline-block">Desarrollamos&nbsp;</span>
          </span>
          <span className="inline-block overflow-hidden">
            <span className="inline-block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              soluciones web
            </span>
          </span>
          <br />
          <span className="inline-block overflow-hidden">
            <span className="inline-block">a medida para</span>
          </span>
          <br />
          <span className="inline-block overflow-hidden">
            <span className="inline-block bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
              tu negocio
            </span>
          </span>
        </h1>

        <p className="hero-subtitle text-base md:text-lg lg:text-xl text-neutral-400 mb-10 max-w-2xl leading-relaxed">
          Desde landing pages hasta e-commerce y sistemas complejos. Tecnología
          moderna, diseño impecable y resultados medibles.
        </p>

        <div className="hero-cta flex flex-wrap items-center gap-4">
          <a href="#contacto">
            <Button
              size="lg"
              className="gradient-button text-white border-0 text-base md:text-lg px-8 md:px-10 py-6 md:py-7 font-semibold rounded-lg transition-all hover:scale-105 hover:shadow-[0_0_24px_oklch(0.765_0.177_162_/_0.35)]"
            >
              Comenzar Proyecto
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
          <a href="#servicios">
            <Button
              size="lg"
              variant="ghost"
              className="text-base md:text-lg px-8 md:px-10 py-6 md:py-7 font-semibold rounded-lg border border-border hover:border-emerald-400/40 hover:text-emerald-400 hover:bg-emerald-400/5 transition-all duration-300"
            >
              Ver Servicios
            </Button>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-hint absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-emerald-400/70" />
        </motion.div>
      </div>
    </section>
  )
}
