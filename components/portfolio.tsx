"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useRef } from "react"

interface PortfolioItem {
  title: string
  image: string
  href: string
  description: string
  tag: "Web App" | "Landing" | "E-commerce"
}

const portfolioItems: PortfolioItem[] = [
  {
    title: "Comarcapp",
    image: "/porfolio/comarcapp.jpg",
    href: "https://comarcapp.com",
    description: "Web moderna con secciones",
    tag: "Web App",
  },
  {
    title: "Sancor Seguros",
    image: "/porfolio/sancorSeguros.jpg",
    href: "https://mauromonica.com",
    description: "Landing profesional con formularios de contacto",
    tag: "Landing",
  },
  {
    title: "Cabañas Peñi Huen",
    image: "/porfolio/cabañasPeñiHuen.jpg",
    href: "https://cabañaspeñihuen.com",
    description: "Landing page turismo",
    tag: "Landing",
  },
  {
    title: "Herrajes Distribuidora",
    image: "/porfolio/herrajesDistribuidora.jpg",
    href: "https://herrajesdistribuidora.com",
    description: "E-commerce de catálogo y ventas online",
    tag: "E-commerce",
  },
  {
    title: "Best Hungry Gator",
    image: "/porfolio/bestHungryGator.jpg",
    href: "https://besthungrygator.eduhzclick.com/",
    description: "Página web con secciones",
    tag: "Web App",
  },
]

const tagColors: Record<PortfolioItem["tag"], string> = {
  "Web App": "bg-brand-green/15 text-[oklch(0.42_0.14_158)] border-brand-green/30",
  Landing: "bg-blue-50 text-blue-700 border-blue-200/60",
  "E-commerce": "bg-amber-50 text-amber-700 border-amber-200/60",
}

function EditorialNumber({ number }: { number: string }) {
  return (
    <span
      className="select-none font-bold leading-none tracking-tighter text-foreground/[0.07]"
      style={{ fontSize: "clamp(5rem, 12vw, 9rem)" }}
      aria-hidden="true"
    >
      {number}
    </span>
  )
}

function TagChip({ tag }: { tag: PortfolioItem["tag"] }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider ${tagColors[tag]}`}
    >
      {tag}
    </span>
  )
}

function PortfolioCard({
  item,
  index,
  isInView,
  priority,
  sizes,
}: {
  item: PortfolioItem
  index: number
  isInView: boolean
  priority?: boolean
  sizes: string
}) {
  const num = String(index + 1).padStart(2, "0")

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative h-full"
    >
      <Link href={item.href} target="_blank" rel="noreferrer" className="block h-full">
        <article className="relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-shadow duration-300 group-hover:shadow-md">
          {/* Imagen de fondo */}
          <div className="absolute inset-0">
            <Image
              src={item.image}
              alt={`Captura del proyecto ${item.title}`}
              fill
              priority={priority}
              sizes={sizes}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Overlay base — siempre visible, gradiente bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            {/* Overlay hover — aparece en hover */}
            <motion.div
              className="absolute inset-0 bg-black/30"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Numero editorial — arriba izquierda */}
          <div className="relative z-10 p-4 md:p-5">
            <EditorialNumber number={num} />
          </div>

          {/* Contenido — abajo */}
          <div className="relative z-10 mt-auto p-4 md:p-5">
            <motion.div
              className="flex flex-col gap-2"
              initial={{ y: 8, opacity: 0.85 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1.5">
                  <TagChip tag={item.tag} />
                  <h3 className="text-xl font-bold leading-tight text-white drop-shadow-sm md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-snug text-white/75">{item.description}</p>
                </div>
                <div className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white group-hover:border-white">
                  <ArrowUpRight className="h-4 w-4 text-white transition-all duration-300 group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </motion.div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}

export function Portfolio() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const [featured, ...rest] = portfolioItems
  const middlePair = rest.slice(0, 2)
  const lastPair = rest.slice(2)

  return (
    <section id="portfolio" className="relative bg-background py-20 md:py-32" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header editorial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-brand-green" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
                Nuestro trabajo
              </span>
            </div>
            <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-balance text-foreground md:text-5xl lg:text-6xl">
              Proyectos que ya{" "}
              <span className="text-muted-foreground">están online</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground md:text-right">
            Empresas que confiaron en Disrupt Lab para construir su presencia digital.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="flex flex-col gap-4 md:gap-5">

          {/* Fila 1: item grande (col-span-2) + item mediano */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {/* Featured — ocupa 2/3 del ancho en desktop */}
            <div className="md:col-span-2 md:min-h-[440px]">
              <PortfolioCard
                item={featured}
                index={0}
                isInView={isInView}
                priority
                sizes="(min-width: 768px) 66vw, 100vw"
              />
            </div>
            {/* Segundo item — 1/3 del ancho */}
            <div className="md:col-span-1 md:min-h-[440px]">
              <PortfolioCard
                item={middlePair[0]}
                index={1}
                isInView={isInView}
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
          </div>

          {/* Fila 2: dos items iguales (1/3 + 2/3 para variar la asimetría) */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            <div className="md:col-span-1 md:min-h-[360px]">
              <PortfolioCard
                item={middlePair[1]}
                index={2}
                isInView={isInView}
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
            <div className="md:col-span-2 md:min-h-[360px]">
              <PortfolioCard
                item={lastPair[0]}
                index={3}
                isInView={isInView}
                sizes="(min-width: 768px) 66vw, 100vw"
              />
            </div>
          </div>

          {/* Fila 3: último item si existe (ancho completo) */}
          {lastPair[1] && (
            <div className="md:min-h-[300px]">
              <PortfolioCard
                item={lastPair[1]}
                index={4}
                isInView={isInView}
                sizes="100vw"
              />
            </div>
          )}
        </div>

        {/* CTA inferior */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="#contacto"
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-6 py-3 text-sm font-medium text-foreground shadow-sm transition-all duration-200 hover:border-brand-green/50 hover:shadow-md"
          >
            Quiero un proyecto así
            <ArrowUpRight className="h-4 w-4 text-brand-green" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
