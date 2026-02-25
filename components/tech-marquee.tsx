"use client"

import { motion } from "framer-motion"

const technologies = [
  { name: "Vercel", logo: "/vercel-logo.png" },
  { name: "AWS", logo: "/aws-logo.png" },
  { name: "Hostinger", logo: "/hostinger-logo.png" },
  { name: "OpenAI", logo: "/openai-logo-inspired-abstract.png" },
  { name: "Anthropic", logo: "/anthropic-logo-abstract.png" },
  { name: "Supabase", logo: "/supabase-logo.png" },
  { name: "Neon", logo: "/neon-logo.png" },
  { name: "Azure", logo: "/azure-logo.png" },
  { name: "Next.js", logo: "/nextjs-logo.png" },
]

// A second, slightly different set for the reverse row to add visual variety
const technologiesRow2 = [
  { name: "Next.js", logo: "/nextjs-logo.png" },
  { name: "Supabase", logo: "/supabase-logo.png" },
  { name: "AWS", logo: "/aws-logo.png" },
  { name: "OpenAI", logo: "/openai-logo-inspired-abstract.png" },
  { name: "Vercel", logo: "/vercel-logo.png" },
  { name: "Neon", logo: "/neon-logo.png" },
  { name: "Anthropic", logo: "/anthropic-logo-abstract.png" },
  { name: "Azure", logo: "/azure-logo.png" },
  { name: "Hostinger", logo: "/hostinger-logo.png" },
]

// Pill width + gap used to compute exact scroll distance for seamless loop
const PILL_W = 168 // min-w in px (approximate)
const GAP = 40 // gap-10 = 40px

function MarqueeRow({
  items,
  direction = "left",
  duration = 30,
}: {
  items: typeof technologies
  direction?: "left" | "right"
  duration?: number
}) {
  const duplicated = [...items, ...items, ...items, ...items]
  const scrollDistance = items.length * (PILL_W + GAP)

  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex gap-10 items-center"
        animate={{
          x: direction === "left" ? [0, -scrollDistance] : [-scrollDistance, 0],
        }}
        transition={{
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration,
            ease: "linear",
          },
        }}
      >
        {duplicated.map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="flex items-center justify-center min-w-[150px] md:min-w-[168px] h-14 md:h-16 px-6 bg-card border border-border rounded-lg flex-shrink-0 hover:border-emerald-400/30 hover:bg-emerald-400/5 transition-all duration-300 group cursor-default"
          >
            <span className="text-base md:text-lg font-semibold text-muted-foreground group-hover:text-foreground whitespace-nowrap transition-colors duration-200">
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export function TechMarquee() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-card/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="flex justify-center mb-3">
          <span className="section-label">Nuestro Stack</span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 tracking-tight">
          Tecnologías que{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Utilizamos
          </span>
        </h2>
        <p className="text-base text-muted-foreground text-center max-w-xl mx-auto leading-relaxed">
          Trabajamos con las mejores plataformas y herramientas del mercado
        </p>
      </div>

      <div className="relative flex flex-col gap-4">
        {/* Row 1 — left-to-right */}
        <div className="relative">
          <MarqueeRow items={technologies} direction="left" duration={28} />
          {/* Gradient fade edges */}
          <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
        </div>

        {/* Row 2 — right-to-left (reverse), slightly slower */}
        <div className="relative">
          <MarqueeRow items={technologiesRow2} direction="right" duration={36} />
          <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  )
}
