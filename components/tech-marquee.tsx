"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const technologies = [
  { name: "Vercel", logo: "/vercel-logo.png" },
  { name: "AWS", logo: "/aws-logo.png" },
  { name: "Hostinger", logo: "/hostinger-logo.png" },
  { name: "OpenAI", logo: "/openai-logo-inspired-abstract.png" },
  { name: "Anthropic", logo: "/anthropic-logo-abstract.png" },
  { name: "Supabase", logo: null },
  { name: "Neon", logo: null },
  { name: "Azure", logo: null },
  { name: "Next.js", logo: null },
]

export function TechMarquee() {
  const duplicatedTechnologies = [
    ...technologies,
    ...technologies,
    ...technologies,
    ...technologies,
  ]

  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 text-sm text-muted-foreground mb-6 mx-auto flex justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Stack Tecnologico
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-foreground">
          Tecnologias que{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Utilizamos
          </span>
        </h2>
        <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
          Trabajamos con las mejores plataformas y herramientas del mercado
        </p>
      </div>

      <div className="relative">
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-6 md:gap-8 items-center"
            animate={{
              x: [0, -(technologies.length * (220 + 32))],
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {duplicatedTechnologies.map((tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                className="flex items-center justify-center gap-3 min-w-[180px] md:min-w-[220px] h-16 md:h-20 px-6 md:px-8 bg-card border border-border rounded-lg flex-shrink-0 hover:border-emerald-500/30 transition-colors"
              >
                {tech.logo && (
                  <div className="relative w-8 h-8 flex-shrink-0">
                    <Image
                      src={tech.logo}
                      alt={`Logo de ${tech.name}`}
                      fill
                      className="object-contain brightness-0 invert opacity-70"
                      sizes="32px"
                    />
                  </div>
                )}
                <span className="text-base md:text-lg font-bold text-foreground whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>
    </section>
  )
}
