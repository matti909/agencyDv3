import { getAllServices } from '@/lib/get-services'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Servicios de Digitalización Empresarial | Disrupt Lab',
  description: 'Descubre nuestros servicios de transformación digital: Landing pages, E-commerce, Bots con IA, Marketing Digital y más.',
}

export default async function ServiciosPage() {
  const services = await getAllServices()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-card/50 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground tracking-tight">
              Nuestros Servicios
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Soluciones integrales de digitalización para transformar tu negocio tradicional en una empresa digital competitiva
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/servicios/${service.slug}`}
                className="group"
              >
                <div className="h-full bg-card border border-border rounded-xl p-8 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
                  {service.metadata.featured && (
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
                      <CheckCircle2 className="w-3 h-3" />
                      Destacado
                    </div>
                  )}

                  <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {service.metadata.title}
                  </h3>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.metadata.description}
                  </p>

                  {service.metadata.price && (
                    <p className="text-sm font-semibold text-foreground mb-4">
                      {service.metadata.price}
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                    <span>Ver detalles</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-t from-card/50 to-background border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              ¿No estás seguro qué servicio necesitas?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Agenda una auditoría digital gratuita y te ayudamos a identificar las mejores soluciones para tu negocio
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contacto">
                <Button size="lg" className="gradient-button text-white border-0 font-semibold rounded-lg w-full">
                  Auditoría Digital Gratis
                </Button>
              </Link>
              <Link href="/#contacto">
                <Button size="lg" variant="outline" className="font-semibold rounded-lg border-2 w-full">
                  Contactar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
