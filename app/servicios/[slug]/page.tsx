import { getServiceBySlug, getAllServices } from '@/lib/get-services'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export async function generateStaticParams() {
  const services = await getAllServices()
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    return {
      title: 'Servicio no encontrado',
    }
  }

  return {
    title: `${service.metadata.title} | MVP Business`,
    description: service.metadata.description,
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const { Content, metadata } = service

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/#servicios" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a servicios</span>
          </Link>
        </div>
      </header>

      {/* Hero section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-card/50 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
              {metadata.category}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground tracking-tight">
              {metadata.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              {metadata.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-button text-white border-0 font-semibold rounded-lg">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Solicitar cotización
              </Button>
              <Button size="lg" variant="outline" className="font-semibold rounded-lg border-2">
                Agendar consulta gratis
              </Button>
            </div>
            {metadata.price && (
              <p className="mt-6 text-lg text-muted-foreground">
                <span className="font-semibold text-foreground">{metadata.price}</span>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-strong:text-foreground
            prose-ul:text-muted-foreground
            prose-li:marker:text-primary
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-table:border-collapse prose-th:border prose-th:border-border prose-th:bg-muted prose-th:p-3
            prose-td:border prose-td:border-border prose-td:p-3
          ">
            <Content />
          </div>
        </div>
      </article>

      {/* CTA Footer */}
      <section className="py-16 md:py-24 bg-gradient-to-t from-card/50 to-background border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              ¿Listo para comenzar?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Agenda una consultoría gratuita y descubre cómo podemos ayudarte a crecer
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-button text-white border-0 font-semibold rounded-lg">
                Hablar con un especialista
              </Button>
              <Link href="/#servicios">
                <Button size="lg" variant="outline" className="font-semibold rounded-lg border-2 w-full">
                  Ver otros servicios
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
