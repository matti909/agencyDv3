"use client"

import {
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Mail,
  Phone,
} from "lucide-react"
import Image from "next/image"

const footerLinks = {
  servicios: [
    { label: "Landing Pages", href: "#servicios" },
    { label: "E-commerce", href: "#servicios" },
    { label: "Sistema de Turnos", href: "#servicios" },
    { label: "Base de Datos", href: "#servicios" },
  ],
  empresa: [
    { label: "Sobre Nosotros", href: "#nosotros" },
    { label: "Optimizaciones", href: "#optimizaciones" },
    { label: "Contacto", href: "#contacto" },
    { label: "Blog", href: "#" },
  ],
  legal: [
    { label: "Terminos y Condiciones", href: "#" },
    { label: "Politica de Privacidad", href: "#" },
    { label: "Cookies", href: "#" },
  ],
}

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
]

export function Footer() {
  return (
    <footer className="relative bg-card border-t border-border">
      {/* Subtle top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="text-2xl font-extrabold italic mb-4">
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Disrupt
              </span>
              <span className="text-foreground"> Lab</span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-md">
              Transformamos negocios en la era digital con soluciones
              innovadoras y tecnologia de vanguardia.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:contacto@disruptlab.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-emerald-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">contacto@disruptlab.com</span>
              </a>
              <a
                href="tel:+541112345678"
                className="flex items-center gap-3 text-muted-foreground hover:text-emerald-400 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">+54 11 1234-5678</span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-foreground font-bold mb-4">Servicios</h3>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-emerald-400 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-foreground font-bold mb-4">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-emerald-400 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-foreground font-bold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-emerald-400 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} Disrupt Lab. Todos los derechos
            reservados.
          </p>
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-emerald-500/10 hover:text-emerald-400 transition-all duration-300 text-muted-foreground"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
