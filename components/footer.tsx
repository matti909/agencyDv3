"use client"

import { Instagram, Linkedin } from "lucide-react"

const footerLinks = {
  servicios: [
    { label: "Presencia Digital", href: "/servicios/presencia-digital" },
    { label: "Automatizacion IA", href: "/servicios/automatizacion-ia" },
    { label: "Ventas y Marketing", href: "/servicios/ventas-marketing" },
    { label: "Gestion y Pagos", href: "/servicios/gestion-pagos" },
  ],
  empresa: [
    { label: "Sobre Nosotros", href: "#nosotros" },
    { label: "Optimizaciones", href: "#optimizaciones" },
    { label: "Contacto", href: "#contacto" },
  ],
  legal: [
    { label: "Terminos y Condiciones", href: "#" },
    { label: "Politica de Privacidad", href: "#" },
  ],
}

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer className="relative border-t border-border/50">
      <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-xl font-extrabold italic mb-3">
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Disrupt
              </span>
              <span className="text-foreground"> Lab</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Transformamos negocios en la era digital con soluciones innovadoras.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-3">Servicios</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-3">Empresa</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-3">Legal</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            {new Date().getFullYear()} Disrupt Lab. Todos los derechos reservados.
          </p>
          <div className="flex gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-secondary/60 flex items-center justify-center hover:bg-emerald-500/10 hover:text-emerald-400 transition-all duration-300 text-muted-foreground"
                aria-label={social.label}
              >
                <social.icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
