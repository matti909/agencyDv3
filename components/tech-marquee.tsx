"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const technologies = [
  { name: "Next.js", logo: "/vercel-logo.png" },
  { name: "AWS", logo: "/aws-logo.png" },
  { name: "Vercel", logo: "/vercel-logo.png" },
  { name: "Hostinger", logo: "/hostinger-logo.png" },
  { name: "OpenAI", logo: "/openai-logo-inspired-abstract.png" },
  { name: "Anthropic", logo: "/anthropic-logo-abstract.png" },
  { name: "Supabase" },
  { name: "Neon" },
  { name: "Azure" },
  { name: "React" },
  { name: "TypeScript" },
  { name: "Tailwind CSS" },
]

export function TechMarquee() {
  const items = [...technologies, ...technologies, ...technologies, ...technologies]

  return (
    <section className="py-16 md:py-24 relative overflow-hidden border-y border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
            Stack{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              tecnologico
            </span>
          </h2>
          <p className="text-sm text-muted-foreground">
            Trabajamos con las mejores plataformas y herramientas del mercado
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-5 items-center"
            animate={{ x: [0, -(technologies.length * 200)] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
          >
            {items.map((tech, i) => (
              <div
                key={`${tech.name}-${i}`}
                className="flex items-center justify-center gap-2.5 min-w-[160px] md:min-w-[180px] h-14 px-5 bg-card/60 border border-border/50 rounded-lg flex-shrink-0 hover:border-emerald-500/20 transition-colors"
              >
                {tech.logo && (
                  <div className="relative w-6 h-6 flex-shrink-0">
                    <Image
                      src={tech.logo}
                      alt={`${tech.name} logo`}
                      fill
                      className="object-contain brightness-0 invert opacity-60"
                      sizes="24px"
                    />
                  </div>
                )}
                <span className="text-sm font-semibold text-foreground/80 whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Edge fades */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>
    </section>
  )
}
