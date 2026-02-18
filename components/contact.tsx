"use client"

import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  CheckCircle,
  Loader2,
  Send,
  MessageSquare,
  Clock,
  Zap,
} from "lucide-react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

const schema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email invalido"),
  subject: z.string().min(3, "El asunto debe tener al menos 3 caracteres"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
})

type FormData = z.infer<typeof schema>

const benefits = [
  {
    icon: MessageSquare,
    title: "Respuesta rapida",
    description: "Te respondemos en menos de 24 horas habiles.",
  },
  {
    icon: Clock,
    title: "Auditoria gratuita",
    description: "Analizamos tu presencia digital sin costo.",
  },
  {
    icon: Zap,
    title: "Sin compromiso",
    description: "Presupuesto detallado sin obligacion de compra.",
  },
]

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [sent, setSent] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setServerError(null)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const json = await res.json()

      if (!res.ok) {
        setServerError(json.error ?? "Error al enviar el mensaje")
        return
      }

      setSent(true)
      reset()
    } catch {
      setServerError("No se pudo conectar. Revisa tu conexion e intenta de nuevo.")
    }
  }

  return (
    <section id="contacto" className="py-24 md:py-36 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Info + image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-card/50 text-xs text-muted-foreground mb-5 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Contacto
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground text-balance">
              Hablemos de tu{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                proyecto
              </span>
            </h2>

            <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-lg">
              Contanos sobre tu idea y te ayudamos a llevarla al siguiente nivel.
              Sin compromiso, sin letra chica.
            </p>

            {/* Benefits */}
            <div className="flex flex-col gap-5 mb-10">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <b.icon className="w-4.5 h-4.5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{b.title}</h3>
                    <p className="text-xs text-muted-foreground">{b.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Office image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative rounded-xl overflow-hidden border border-border/60 aspect-[16/9] mt-auto hidden lg:block"
            >
              <Image
                src="/images/contact-office.jpg"
                alt="Espacio de trabajo moderno"
                fill
                className="object-cover"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              {sent ? (
                <div className="flex flex-col items-center justify-center gap-4 py-20 px-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-2">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Mensaje enviado
                  </h3>
                  <p className="text-muted-foreground max-w-sm">
                    Recibimos tu consulta. Te vamos a responder a la brevedad.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSent(false)}
                    className="mt-4"
                  >
                    Enviar otro mensaje
                  </Button>
                </div>
              ) : (
                <form
                  className="p-6 md:p-8 flex flex-col gap-5"
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="mb-2">
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      Envianos tu consulta
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Completá el formulario y nos ponemos en contacto.
                    </p>
                  </div>

                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-medium mb-1.5 text-foreground"
                      >
                        Nombre
                      </label>
                      <Input
                        id="name"
                        placeholder="Tu nombre"
                        className="bg-background border-border focus:border-emerald-500/50 focus:ring-emerald-500/20 h-11"
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="text-destructive text-[11px] mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-medium mb-1.5 text-foreground"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        className="bg-background border-border focus:border-emerald-500/50 focus:ring-emerald-500/20 h-11"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-destructive text-[11px] mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-medium mb-1.5 text-foreground"
                    >
                      Asunto
                    </label>
                    <Input
                      id="subject"
                      placeholder="En que podemos ayudarte?"
                      className="bg-background border-border focus:border-emerald-500/50 focus:ring-emerald-500/20 h-11"
                      {...register("subject")}
                    />
                    {errors.subject && (
                      <p className="text-destructive text-[11px] mt-1">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-medium mb-1.5 text-foreground"
                    >
                      Mensaje
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Cuentanos sobre tu proyecto, tus objetivos y cualquier detalle relevante..."
                      rows={5}
                      className="bg-background border-border focus:border-emerald-500/50 focus:ring-emerald-500/20 resize-none"
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="text-destructive text-[11px] mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {serverError && (
                    <div className="text-destructive text-sm bg-destructive/10 rounded-lg p-3 border border-destructive/20">
                      {serverError}
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gradient-button text-white border-0 font-semibold h-12"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Enviar Mensaje
                      </>
                    )}
                  </Button>

                  <p className="text-[11px] text-muted-foreground text-center">
                    Al enviar este formulario, aceptas que nos pongamos en contacto
                    contigo respecto a tu consulta.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
