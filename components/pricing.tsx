"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Check, X, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const webSpecs = [
  "SSL incluido",
  "SEO técnico",
  "Google Analytics",
  "Mobile-first",
  "Core Web Vitals",
  "Schema.org",
]

const features = [
  "Web profesional",
  "Google Business",
  "Meta Business",
  "Bot WhatsApp 24/7",
  "Correo profesional",
  "Agendamiento online",
  "Ads de conversión (Meta/Google)",
  "Informe mensual de métricas",
]

const plans = [
  {
    name: "Beginner",
    description: "Para negocios que quieren arrancar su presencia digital desde cero.",
    setup: "350",
    monthly: "50",
    yearly: "950",
    features: [true, true, true, true, true, true, false, false],
    highlighted: false,
    cta: "Comenzar ahora",
  },
  {
    name: "Pro",
    description: "Para negocios que quieren crecer con publicidad y métricas reales.",
    setup: "600",
    monthly: "180",
    yearly: "2.760",
    features: [true, true, true, true, true, true, true, true],
    highlighted: true,
    cta: "Elegir Pro",
  },
  {
    name: "Personalizado",
    description: "Solución a medida para negocios con necesidades específicas.",
    setup: null,
    monthly: null,
    yearly: null,
    features: [true, true, true, true, true, true, true, true],
    highlighted: false,
    cta: "Hablar con el equipo",
  },
]

export function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="precios" className="relative bg-background py-20 md:py-32" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center md:mb-16"
        >
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-brand-green" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
              Planes
            </span>
            <span className="h-px w-8 bg-brand-green" />
          </div>
          <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Precios claros,{" "}
            <span className="text-muted-foreground">sin sorpresas</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Elegí el plan que mejor se adapta a tu negocio. Todos incluyen soporte real y resultados medibles.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              {/* Badge "Más popular" */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-1.5 text-xs font-semibold text-background">
                    <Sparkles className="h-3 w-3" />
                    Más popular
                  </span>
                </div>
              )}

              <div
                className={`flex h-full flex-col rounded-2xl border p-7 transition-shadow duration-300 hover:shadow-lg ${
                  plan.highlighted
                    ? "border-foreground/30 bg-foreground text-background shadow-xl"
                    : "border-border/60 bg-card"
                }`}
              >
                {/* Plan name & description */}
                <div className="mb-6">
                  <h3
                    className={`mb-2 text-xl font-bold ${
                      plan.highlighted ? "text-background" : "text-foreground"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      plan.highlighted ? "text-background/70" : "text-muted-foreground"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>

                {/* Pricing */}
                <div className="mb-7 border-b pb-7 border-current/10">
                  {plan.setup ? (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-end gap-1.5">
                        <span
                          className={`text-4xl font-extrabold tracking-tight ${
                            plan.highlighted ? "text-background" : "text-foreground"
                          }`}
                        >
                          USD {plan.setup}
                        </span>
                        <span
                          className={`mb-1 text-sm ${
                            plan.highlighted ? "text-background/60" : "text-muted-foreground"
                          }`}
                        >
                          setup
                        </span>
                      </div>
                      <p
                        className={`text-xs ${
                          plan.highlighted ? "text-background/60" : "text-muted-foreground"
                        }`}
                      >
                        + USD {plan.monthly}/mes de mantenimiento
                      </p>
                    </div>
                  ) : (
                    <div>
                      <span
                        className={`text-3xl font-extrabold tracking-tight ${
                          plan.highlighted ? "text-background" : "text-foreground"
                        }`}
                      >
                        A medida
                      </span>
                      <p
                        className={`mt-1 text-xs ${
                          plan.highlighted ? "text-background/60" : "text-muted-foreground"
                        }`}
                      >
                        Hablamos y armamos una propuesta para tu caso
                      </p>
                    </div>
                  )}
                </div>

                {/* Web specs */}
                <div className="mb-6">
                  <p className={`mb-2.5 text-xs font-semibold uppercase tracking-wider ${plan.highlighted ? "text-background/50" : "text-muted-foreground"}`}>
                    La web incluye
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {webSpecs.map((spec) => (
                      <span
                        key={spec}
                        className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                          plan.highlighted
                            ? "border-background/20 bg-background/10 text-background/80"
                            : "border-border bg-background text-muted-foreground"
                        }`}
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <ul className="mb-8 flex flex-col gap-3">
                  {features.map((feature, i) => {
                    const included = plan.features[i]
                    return (
                      <li key={feature} className="flex items-center gap-3">
                        <span
                          className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                            included
                              ? plan.highlighted
                                ? "bg-background/15"
                                : "bg-brand-green/10"
                              : plan.highlighted
                              ? "bg-background/5"
                              : "bg-foreground/5"
                          }`}
                        >
                          {included ? (
                            <Check
                              className={`h-3 w-3 ${
                                plan.highlighted ? "text-background" : "text-brand-green"
                              }`}
                            />
                          ) : (
                            <X
                              className={`h-3 w-3 ${
                                plan.highlighted ? "text-background/30" : "text-muted-foreground/40"
                              }`}
                            />
                          )}
                        </span>
                        <span
                          className={`text-sm ${
                            included
                              ? plan.highlighted
                                ? "text-background/90"
                                : "text-foreground"
                              : plan.highlighted
                              ? "text-background/35"
                              : "text-muted-foreground/50"
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    )
                  })}
                </ul>

                {/* CTA */}
                <div className="mt-auto">
                  <a href="#contacto">
                    <Button
                      size="lg"
                      className={`w-full font-semibold transition-all hover:scale-[1.02] ${
                        plan.highlighted
                          ? "bg-background text-foreground hover:bg-background/90"
                          : "gradient-button"
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 text-center text-xs text-muted-foreground/60"
        >
          Todos los precios en USD. El plan incluye onboarding y soporte real — sin bots, sin tickets.
        </motion.p>
      </div>
    </section>
  )
}
