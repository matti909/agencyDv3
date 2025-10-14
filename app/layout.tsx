import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
})

export const metadata: Metadata = {
  title: "Digital Agency - Transformamos tu Negocio en la Era Digital",
  description:
    "Agencia digital especializada en landing pages, ecommerce, sistemas de turnos y soluciones web a medida. SEO optimizado, multi-idioma, soporte 24/7.",
  keywords: "agencia digital, desarrollo web, landing page, ecommerce, sistema de turnos, SEO, CMS",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${jetbrainsMono.variable} font-sans`}>
        <Suspense fallback={null}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
