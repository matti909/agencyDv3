"use client"

import { Instagram, Linkedin, Twitter, Facebook, Mail, ArrowUpRight } from "lucide-react"
import Link from "next/link"

const footerLinks = {
  servicios: [
    { label: "Presencia Digital", href: "/servicios/presencia-digital" },
    { label: "Automatización con IA", href: "/servicios/automatizacion-ia" },
    { label: "Ventas y Marketing", href: "/servicios/ventas-marketing" },
    { label: "Redes Sociales & Contenido", href: "/servicios/redes-contenido" },
    { label: "Gestión y Pagos", href: "/servicios/gestion-pagos" },
    { label: "Seguridad y Soporte", href: "/servicios/seguridad-soporte" },
  ],
  empresa: [
    { label: "Sobre Nosotros", href: "#nosotros" },
    { label: "Optimizaciones", href: "#optimizaciones" },
    { label: "Contacto", href: "#contacto" },
    { label: "Blog", href: "#" },
  ],
  legal: [
    { label: "Términos y Condiciones", href: "/legal/terminos" },
    { label: "Política de Privacidad", href: "/legal/privacidad" },
    { label: "Cookies", href: "/legal/cookies" },
  ],
}

// Individual brand accent colors per social platform
const socialLinks = [
  {
    icon: Instagram,
    href: "https://instagram.com",
    label: "Instagram",
    hoverClass: "hover:border-pink-400/40 hover:text-pink-400 hover:bg-pink-400/5",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com",
    label: "LinkedIn",
    hoverClass: "hover:border-blue-400/40 hover:text-blue-400 hover:bg-blue-400/5",
  },
  {
    icon: Twitter,
    href: "https://twitter.com",
    label: "Twitter / X",
    hoverClass: "hover:border-sky-400/40 hover:text-sky-400 hover:bg-sky-400/5",
  },
  {
    icon: Facebook,
    href: "https://facebook.com",
    label: "Facebook",
    hoverClass: "hover:border-indigo-400/40 hover:text-indigo-400 hover:bg-indigo-400/5",
  },
]

export function Footer() {
  return (
    <footer className="relative bg-card border-t-0">
      {/* Gradient top border — replaces the flat border-t */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, oklch(0.765 0.177 162 / 0.5) 20%, oklch(0.75 0.155 185 / 0.6) 50%, oklch(0.789 0.145 195 / 0.5) 80%, transparent 100%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-18">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="text-2xl font-extrabold italic mb-3">
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Disrupt
              </span>
              <span className="text-foreground"> Lab</span>
            </div>

            {/* One-line tagline */}
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
              Digitalizamos tu negocio
            </p>

            <p className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-xs">
              Transformamos negocios en la era digital con soluciones innovadoras y tecnología de
              vanguardia.
            </p>

            <a
              href="mailto:contacto@disruptlab.com"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-emerald-400 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-400/8 border border-emerald-400/15 flex items-center justify-center group-hover:border-emerald-400/40 group-hover:bg-emerald-400/10 transition-all duration-300">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <span className="text-sm">contacto@disruptlab.com</span>
            </a>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
              Servicios
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors duration-200 flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
              Empresa
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}{" "}
            <span className="text-foreground font-medium">Disrupt Lab</span>. Todos los derechos
            reservados.
          </p>

          <div className="flex gap-2.5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 rounded-lg bg-secondary/60 border border-border flex items-center justify-center transition-all duration-300 ${social.hoverClass}`}
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      {/* Large typographic wordmark in the background for visual depth */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 overflow-hidden pointer-events-none select-none flex items-end justify-center"
      >
        <span
          className="text-[13vw] font-extrabold leading-none tracking-tight text-white opacity-[0.028] whitespace-nowrap pb-4"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic" }}
        >
          DISRUPT LAB
        </span>
      </div>
    </footer>
  )
}
