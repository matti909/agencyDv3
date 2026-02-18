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
      <Services />
      <About />
      <Optimizations />
      <TechMarquee />
      <Contact />
      <Footer />
    </main>
  )
}
