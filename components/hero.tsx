"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useEffect, Suspense } from "react";
import gsap from "gsap";
import dynamic from "next/dynamic";

const Hero3D = dynamic(
  () => import("./hero-3d").then((mod) => ({ default: mod.Hero3D })),
  {
    ssr: false,
  },
);

export function Hero() {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".hero-title span",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power3.out" },
      )
        .fromTo(
          ".hero-subtitle",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6",
        )
        .fromTo(
          ".hero-cta",
          { scale: 0.88, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" },
          "-=0.5",
        )
        .fromTo(
          ".hero-scroll-hint",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.2",
        );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative min-h-screen flex items-center justify-start overflow-hidden bg-[#f6f8fb] pl-8 md:pl-16 lg:pl-24"
    >
      {/* 3D Canvas Background */}
      <Suspense fallback={null}>
        <Hero3D />
      </Suspense>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/4 h-[600px] w-[600px] rounded-full opacity-[0.14]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(16, 185, 129, 0.14) 0%, rgba(15, 23, 42, 0.04) 42%, transparent 72%)",
          filter: "blur(100px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full opacity-[0.1]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(15, 23, 42, 0.08) 0%, transparent 72%)",
          filter: "blur(72px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl">
        <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sans font-bold mb-6 leading-[1.05] tracking-tighter text-foreground">
          <span className="inline-block overflow-hidden">
            <span className="inline-block">Desarrollamos&nbsp;</span>
          </span>
          <span className="inline-block overflow-hidden">
            <span className="inline-block text-emerald-300">
              soluciones web
            </span>
          </span>
          <br />
          <span className="inline-block overflow-hidden">
            <span className="inline-block">a medida para</span>
          </span>
          <br />
          <span className="inline-block overflow-hidden">
            <span className="inline-block text-muted-foreground">
              tu negocio
            </span>
          </span>
        </h1>

        <p className="hero-subtitle mb-10 max-w-2xl text-xl leading-relaxed text-muted-foreground md:text-lg lg:text-xl">
          Desde landing pages hasta e-commerce y sistemas complejos. Tecnología
          moderna, diseño impecable y resultados medibles.
        </p>

        <div className="hero-cta flex flex-wrap items-center gap-4">
          <a href="#contacto">
            <Button
              size="lg"
              className="gradient-button text-base md:text-lg px-8 md:px-10 py-6 md:py-7 font-semibold rounded-lg transition-all hover:scale-105"
            >
              Comenzar Proyecto
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
          <a href="#servicios">
            <Button
              size="lg"
              variant="ghost"
              className="border border-black/8 bg-white/50 px-8 py-6 text-base font-semibold rounded-lg text-foreground hover:border-emerald-500/30 hover:bg-white/80 hover:text-foreground transition-all duration-300 md:px-10 md:py-7 md:text-lg"
            >
              Ver Servicios
            </Button>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-hint absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-xs tracking-widest uppercase text-foreground/55">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 text-foreground/65" />
        </motion.div>
      </div>
    </section>
  );
}
