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
  title: "Disrupt Lab - Transformamos tu Negocio en la Era Digital",
  description:
    "Agencia digital especializada en landing pages, ecommerce, automatización con IA y soluciones web a medida. SEO optimizado, mobile-first, soporte 24/7.",
  keywords: "disrupt lab, agencia digital, desarrollo web, landing page, ecommerce, automatización IA, SEO, mobile design",
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
