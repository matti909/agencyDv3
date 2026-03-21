"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#servicios", label: "Servicios" },
    { href: "#nosotros", label: "Nosotros" },
    { href: "#optimizaciones", label: "Optimizaciones" },
    { href: "#contacto", label: "Contacto" },
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/35 backdrop-blur-2xl border-b border-emerald-500/12 shadow-[0_10px_40px_-24px_rgba(16,185,129,0.35)]"
          : "bg-background/[0.03] backdrop-blur-md"
      }`}
    >
      <div
        className={`absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500 ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{ background: "linear-gradient(90deg, transparent 0%, oklch(0.72 0.17 158 / 0.22) 18%, oklch(0.72 0.17 158 / 0.08) 50%, oklch(0.72 0.17 158 / 0.22) 82%, transparent 100%)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 text-2xl font-extrabold italic select-none"
          >
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-emerald-500/20 bg-white/55 shadow-[0_0_0_1px_rgba(16,185,129,0.06),0_10px_30px_-18px_rgba(16,185,129,0.55)] backdrop-blur-sm">
              <span className="absolute inset-[3px] rounded-full bg-emerald-500/8" />
              <Image
                src="/logo_solo_cohete.png"
                alt="Disrupt Lab"
                width={26}
                height={26}
                className="relative h-6 w-6 object-contain"
                priority
              />
            </span>
            <span className="text-foreground">
              Disrupt Lab
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * index + 0.2, ease: "easeOut" }}
                className="nav-link transition-colors duration-200 font-medium text-sm tracking-wide text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52, ease: "easeOut" }}
            >
              <a href="#contacto">
                <Button
                  size="sm"
                  className="gradient-button font-semibold px-5 py-2 rounded-lg text-sm"
                >
                  Comenzar Proyecto
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-1 rounded-md hover:bg-emerald-500/8 transition-colors text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileMenuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-background/70 backdrop-blur-2xl border-t border-emerald-500/12"
          >
            <div className="container mx-auto px-4 py-5 flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="text-muted-foreground hover:text-foreground transition-colors py-3 px-2 font-medium text-base border-b border-emerald-500/10 last:border-0"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="pt-4">
                <a href="#contacto" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    size="lg"
                    className="gradient-button font-semibold w-full"
                  >
                    Comenzar Proyecto
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
