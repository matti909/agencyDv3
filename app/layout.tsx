import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://disrupts.art"),
  title: "Disrupt Lab - Transformamos tu Negocio en la Era Digital",
  description:
    "Agencia digital especializada en landing pages, ecommerce, automatización con IA y soluciones web a medida. SEO optimizado, mobile-first, soporte 24/7.",
  keywords: "disrupt lab, agencia digital, desarrollo web, landing page, ecommerce, automatización IA, SEO, mobile design",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Disrupt Lab",
  url: "https://disrupts.art",
  logo: "https://disrupts.art/logo.png",
  description: "Agencia digital especializada en desarrollo web, automatización con IA y marketing digital para PyMEs en LATAM.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+54-351-383-5368",
    contactType: "customer service",
    availableLanguage: "Spanish",
  },
  sameAs: [
    "https://www.instagram.com/disruptslab/",
    "https://www.facebook.com/profile.php?id=61587906194290",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${jetbrainsMono.variable} ${playfairDisplay.variable} font-sans`}>
        <Suspense fallback={null}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
