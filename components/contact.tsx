"use client"

import { Instagram, Facebook, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const socialLinks = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/disruptslab/",
    label: "Instagram",
    hoverClass: "hover:border-pink-400/40 hover:text-pink-400 hover:bg-pink-400/5",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/profile.php?id=61587906194290",
    label: "Facebook",
    hoverClass: "hover:border-indigo-400/40 hover:text-indigo-400 hover:bg-indigo-400/5",
  },
]

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="contacto" className="py-20 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center">
            <span className="section-label">Contacto</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 text-balance leading-[1.05] tracking-tight">
            Hablemos de tu{" "}
            <span className="text-muted-foreground">Proyecto</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto text-pretty leading-relaxed">
            Contanos en qué estás trabajando y te respondemos en menos de 24 horas hábiles.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col items-center gap-10"
        >
          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/543513835368"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (typeof window !== "undefined" && (window as any).fbq) {
                (window as any).fbq("track", "Lead", { content_name: "WhatsApp CTA" });
              }
            }}
          >
            <Button
              size="lg"
              className="gradient-button text-base md:text-lg px-10 py-7 font-semibold rounded-lg transition-all hover:scale-105 gap-3"
            >
              <MessageCircle className="w-5 h-5" />
              Escribinos por WhatsApp
            </Button>
          </a>

          {/* Response time */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
            <span>
              Respondemos en menos de{" "}
              <span className="text-foreground font-medium">24 horas hábiles</span>
            </span>
          </div>

          {/* Social links */}
          <div className="flex flex-col items-center gap-4">
            <span className="text-xs uppercase tracking-widest text-muted-foreground/60">
              También en redes
            </span>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-11 h-11 rounded-xl bg-card border border-border/40 flex items-center justify-center transition-all duration-300 ${social.hoverClass}`}
                >
                  <social.icon className="w-4 h-4 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
