"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useRef } from "react"

const portfolioItems = [
  {
    title: "Comarcapp",
    image: "/porfolio/comarcapp.jpg",
    href: "https://comarcapp.com",
    description: "Web moderna con secciones",
  },
  {
    title: "Sancor Seguros",
    image: "/porfolio/sancorSeguros.jpg",
    href: "https://mauromonica.com",
    description: "Landing profesional con formularios de contacto",
  },
  {
    title: "Cabañas Peñi Huen",
    image: "/porfolio/cabañasPeñiHuen.jpg",
    href: "https://cabañaspeñihuen.com",
    description: "Landing page",
  },
  {
    title: "Herrajes Distribuidora",
    image: "/porfolio/herrajesDistribuidora.jpg",
    href: "https://herrajesdistribuidora.com",
    description: "E-commerce de catalogo y ventas online",
  },
  {
    title: "Best Hungry Gator",
    image: "/porfolio/bestHungryGator.jpg",
    href: "https://besthungrygator.eduhzclick.com/",
    description: "Pagina web con secciones",
  },
]

function PortfolioCard({
  item,
  index,
  isInView,
}: {
  item: (typeof portfolioItems)[0]
  index: number
  isInView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="group"
    >
      <Link href={item.href} target="_blank" rel="noreferrer" className="block h-full">
        <article className="glow-card overflow-hidden rounded-2xl border border-border/60 bg-card/40 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-[0_20px_60px_rgba(16,185,129,0.12)]">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={item.image}
              alt={`Captura del sitio ${item.title}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
            <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/30 backdrop-blur-sm">
              <ArrowUpRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 p-5">
            <div>
              <p className="text-lg font-semibold text-foreground">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
            <span className="text-xs uppercase tracking-[0.24em] text-emerald-400/80">
              Ver web
            </span>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}

export function Portfolio() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="portfolio" className="relative py-20 md:py-32" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-16"
        >
          <span className="section-label">Paginas Web Realizadas</span>
          <h2 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-balance md:text-5xl lg:text-6xl">
            Algunos proyectos que ya{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              estan online
            </span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Empresas que confiaron en nosotros
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {portfolioItems.map((item, index) => (
            <PortfolioCard
              key={item.title}
              item={item}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
