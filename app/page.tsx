import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Optimizations } from "@/components/optimizations"
import { TechMarquee } from "@/components/tech-marquee"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <div className="border-t border-border" />
      <Services />
      <div className="border-t border-border" />
      <About />
      <div className="border-t border-border" />
      <Optimizations />
      <div className="border-t border-border" />
      <TechMarquee />
      <div className="border-t border-border" />
      <Contact />
      <Footer />
    </main>
  )
}
