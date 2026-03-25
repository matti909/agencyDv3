import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Optimizations } from "@/components/optimizations"
import { Portfolio } from "@/components/portfolio"
import { TechMarquee } from "@/components/tech-marquee"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Pricing } from "@/components/pricing"

function SectionDivider() {
  return (
    <div
      className="h-px w-full"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, oklch(0.28 0 0) 15%, oklch(0.28 0 0) 85%, transparent 100%)",
      }}
    />
  )
}

function MidPageCTA() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-3">¿Te convenciste?</p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
          Agendá una consulta gratis y arrancamos
        </h2>
        <a
          href="#contacto"
          className="inline-flex items-center gap-2 gradient-button px-8 py-4 rounded-lg text-base font-semibold transition-all hover:scale-105"
        >
          Hablar con el equipo
        </a>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <SectionDivider />
      <Services />
      <SectionDivider />
      <Portfolio />
      <MidPageCTA />
      <SectionDivider />
      <Pricing />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Optimizations />
      <SectionDivider />
      <TechMarquee />
      <SectionDivider />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
