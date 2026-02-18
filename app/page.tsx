import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Optimizations } from "@/components/optimizations"
import { TechMarquee } from "@/components/tech-marquee"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"

function SectionDivider() {
  return (
    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
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
      <About />
      <SectionDivider />
      <Optimizations />
      <TechMarquee />
      <SectionDivider />
      <Contact />
      <Footer />
    </main>
  )
}
