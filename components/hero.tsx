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

  return (
    <section
      ref={container}
      className="relative min-h-screen flex items-center justify-start overflow-hidden pl-8 md:pl-16 lg:pl-24"
    >
      {/* 3D Canvas Background */}
      <Suspense fallback={null}>
        <Hero3D />
      </Suspense>

      <div className="relative z-10 max-w-4xl">
        <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-sans font-bold mb-6 leading-[1.1] tracking-tight">
          <span className="inline-block overflow-hidden">
            <span className="inline-block">Desarrollamos&nbsp;</span>
          </span>
          <span className="inline-block overflow-hidden">
            <span className="inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              soluciones web
            </span>
          </span>
          <br />
          <span className="inline-block overflow-hidden">
            <span className="inline-block">a medida para&nbsp;</span>
          </span>
          <span className="inline-block overflow-hidden">
            <span className="inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-blue-400 bg-clip-text text-transparent">
              tu negocio
            </span>
          </span>
        </h1>

        <p className="hero-subtitle text-base md:text-lg lg:text-xl text-neutral-400 mb-8 max-w-2xl leading-relaxed">
          Desde landing pages hasta e-commerce y sistemas complejos. Tecnología
          moderna, diseño impecable y resultados medibles.
        </p>

        <div className="hero-button">
          <Button
            size="lg"
            className="gradient-button text-white border-0 text-base md:text-lg px-8 md:px-10 py-6 md:py-7 font-semibold rounded-lg transition-all hover:scale-105"
          >
            Comenzar Proyecto
          </Button>
        </div>
      </div>
    </section>
  )
}
