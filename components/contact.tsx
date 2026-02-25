"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Mail,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  CheckCircle,
  Loader2,
  Send,
} from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const schema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  subject: z.string().min(3, "El asunto debe tener al menos 3 caracteres"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
})

type FormData = z.infer<typeof schema>

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "contacto@disruptlab.com",
    href: "mailto:contacto@disruptlab.com",
  },
]

// Social links with individual brand accent colors for hover
const socialLinks = [
  {
    icon: Instagram,
    href: "https://instagram.com",
    label: "Instagram",
    hoverClass: "hover:border-pink-400/40 hover:text-pink-400 hover:bg-pink-400/5",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com",
    label: "LinkedIn",
    hoverClass: "hover:border-blue-400/40 hover:text-blue-400 hover:bg-blue-400/5",
  },
  {
    icon: Twitter,
    href: "https://twitter.com",
    label: "Twitter / X",
    hoverClass: "hover:border-sky-400/40 hover:text-sky-400 hover:bg-sky-400/5",
  },
  {
    icon: Facebook,
    href: "https://facebook.com",
    label: "Facebook",
    hoverClass: "hover:border-indigo-400/40 hover:text-indigo-400 hover:bg-indigo-400/5",
  },
]

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
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
      setServerError("No se pudo conectar. Revisá tu conexión e intentá de nuevo.")
    }
  }

  return (
    <section id="contacto" className="py-20 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center">
            <span className="section-label">Contacto</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 text-balance leading-[1.05] tracking-tight">
            Hablemos de tu{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Proyecto
            </span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Estamos listos para transformar tu visión en realidad. Contáctanos y comencemos a
            trabajar juntos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form — wider col */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-3"
          >
            <Card className="bg-card border-border">
              <CardContent className="p-7 md:p-8">
                {sent ? (
                  <div className="flex flex-col items-center justify-center gap-5 py-14 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">¡Mensaje enviado!</h3>
                    <p className="text-muted-foreground">Te responderemos a la brevedad.</p>
                    <Button
                      variant="outline"
                      onClick={() => setSent(false)}
                      className="border-border hover:border-emerald-400/40 hover:text-emerald-400"
                    >
                      Enviar otro mensaje
                    </Button>
                  </div>
                ) : (
                  <form className="space-y-5" noValidate onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium mb-1.5 text-foreground"
                        >
                          Nombre
                        </label>
                        <Input
                          id="name"
                          placeholder="Tu nombre"
                          className="bg-background border-border focus:border-emerald-400/50 focus:ring-emerald-400/20 transition-colors"
                          {...register("name")}
                        />
                        {errors.name && (
                          <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium mb-1.5 text-foreground"
                        >
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="tu@email.com"
                          className="bg-background border-border focus:border-emerald-400/50 focus:ring-emerald-400/20 transition-colors"
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium mb-1.5 text-foreground"
                      >
                        Asunto
                      </label>
                      <Input
                        id="subject"
                        placeholder="¿En qué podemos ayudarte?"
                        className="bg-background border-border focus:border-emerald-400/50 focus:ring-emerald-400/20 transition-colors"
                        {...register("subject")}
                      />
                      {errors.subject && (
                        <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-1.5 text-foreground"
                      >
                        Mensaje
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Cuéntanos sobre tu proyecto..."
                        rows={6}
                        className="bg-background border-border focus:border-emerald-400/50 focus:ring-emerald-400/20 transition-colors resize-none"
                        {...register("message")}
                      />
                      {errors.message && (
                        <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    {serverError && (
                      <p className="text-red-400 text-sm bg-red-400/5 border border-red-400/20 rounded-lg px-4 py-3">
                        {serverError}
                      </p>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full gradient-button text-white border-0 font-semibold hover:shadow-[0_0_20px_oklch(0.765_0.177_162_/_0.3)] transition-shadow"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar Mensaje
                          <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar — contact info + socials */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-lg font-bold mb-5 text-foreground">Información de Contacto</h3>
              <div className="space-y-3">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.title}
                    href={info.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl hover:border-emerald-400/40 hover:bg-emerald-400/5 transition-all duration-300 group"
                  >
                    {/* Accent left border line */}
                    <div className="absolute left-0 top-1/4 bottom-1/4 w-0.5 bg-emerald-400/0 group-hover:bg-emerald-400/60 rounded-full transition-all duration-300" />

                    <div className="w-10 h-10 rounded-lg bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center flex-shrink-0 group-hover:border-emerald-400/40 group-hover:shadow-[0_0_10px_oklch(0.765_0.177_162_/_0.2)] transition-all duration-300">
                      <info.icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5 uppercase tracking-wide">
                        {info.title}
                      </div>
                      <div className="text-foreground font-medium text-sm group-hover:text-emerald-400 transition-colors">
                        {info.value}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-5 text-foreground">Síguenos</h3>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.35, delay: 0.4 + index * 0.07, ease: "easeOut" }}
                    className={`w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center transition-all duration-300 ${social.hoverClass}`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Response time callout */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="p-5 rounded-xl border border-emerald-400/20 bg-emerald-400/5"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-emerald-400">Respuesta Rápida</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Respondemos todos los mensajes dentro de las{" "}
                <span className="text-foreground font-medium">24 horas</span> hábiles.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
