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
    <div
      className="h-px w-full"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, oklch(0.28 0 0) 15%, oklch(0.28 0 0) 85%, transparent 100%)",
      }}
    />
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
      <SectionDivider />
      <TechMarquee />
      <SectionDivider />
      <Contact />
      <Footer />
    </main>
  )
}
