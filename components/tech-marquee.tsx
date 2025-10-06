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

export function TechMarquee() {
  // Duplicate the array multiple times for seamless loop
  const duplicatedTechnologies = [...technologies, ...technologies, ...technologies, ...technologies]

  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
          Tecnologías que <span className="text-primary">Utilizamos</span>
        </h2>
        <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
          Trabajamos con las mejores plataformas y herramientas del mercado
        </p>
      </div>

      <div className="relative">
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-8 md:gap-12 items-center"
            animate={{
              x: [0, -(technologies.length * (200 + 48))],
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
                className="flex items-center justify-center min-w-[150px] md:min-w-[200px] h-16 md:h-20 px-6 md:px-8 bg-card border border-border rounded-lg flex-shrink-0"
              >
                <span className="text-lg md:text-2xl font-bold text-foreground whitespace-nowrap">{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  )
}
