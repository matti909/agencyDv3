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
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  CheckCircle,
  Loader2,
} from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const schema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email invalido"),
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
  {
    icon: Phone,
    title: "Telefono",
    value: "+54 11 1234-5678",
    href: "tel:+541112345678",
  },
  {
    icon: MapPin,
    title: "Ubicacion",
    value: "Buenos Aires, Argentina",
    href: "#",
  },
]

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
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
      setServerError(
        "No se pudo conectar. Revisa tu conexion e intenta de nuevo."
      )
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 text-sm text-muted-foreground mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Contacto
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance text-foreground">
            Hablemos de tu{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Proyecto
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Estamos listos para transformar tu vision en realidad. Contactanos y
            comencemos a trabajar juntos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-card border-border overflow-hidden">
              <CardContent className="p-0">
                {sent ? (
                  <div className="flex flex-col items-center justify-center gap-4 py-16 px-8 text-center">
                    <CheckCircle className="w-14 h-14 text-emerald-400" />
                    <h3 className="text-2xl font-bold text-foreground">
                      Mensaje enviado!
                    </h3>
                    <p className="text-muted-foreground">
                      Te responderemos a la brevedad.
                    </p>
                    <Button variant="outline" onClick={() => setSent(false)}>
                      Enviar otro mensaje
                    </Button>
                  </div>
                ) : (
                  <form
                    className="p-8 space-y-6"
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium mb-2 text-foreground"
                        >
                          Nombre
                        </label>
                        <Input
                          id="name"
                          placeholder="Tu nombre"
                          className="bg-background border-border focus:border-emerald-500/50 focus:ring-emerald-500/20"
                          {...register("name")}
                        />
                        {errors.name && (
                          <p className="text-destructive text-xs mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium mb-2 text-foreground"
                        >
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="tu@email.com"
                          className="bg-background border-border focus:border-emerald-500/50 focus:ring-emerald-500/20"
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="text-destructive text-xs mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium mb-2 text-foreground"
                      >
                        Asunto
                      </label>
                      <Input
                        id="subject"
                        placeholder="En que podemos ayudarte?"
                        className="bg-background border-border focus:border-emerald-500/50 focus:ring-emerald-500/20"
                        {...register("subject")}
                      />
                      {errors.subject && (
                        <p className="text-destructive text-xs mt-1">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2 text-foreground"
                      >
                        Mensaje
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Cuentanos sobre tu proyecto..."
                        rows={6}
                        className="bg-background border-border focus:border-emerald-500/50 focus:ring-emerald-500/20"
                        {...register("message")}
                      />
                      {errors.message && (
                        <p className="text-destructive text-xs mt-1">
                          {errors.message.message}
                        </p>
                      )}
                    </div>
                    {serverError && (
                      <p className="text-destructive text-sm">{serverError}</p>
                    )}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full gradient-button text-white border-0 font-semibold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        "Enviar Mensaje"
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Right side with image + info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            {/* Office image */}
            <div className="relative rounded-xl overflow-hidden border border-border aspect-video">
              <Image
                src="/images/contact-office.jpg"
                alt="Oficina moderna de Disrupt Lab"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-foreground font-semibold text-lg">
                  Nuestro espacio de trabajo
                </p>
                <p className="text-muted-foreground text-sm">
                  Buenos Aires, Argentina
                </p>
              </div>
            </div>

            {/* Contact info */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">
                Informacion de Contacto
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.title}
                    href={info.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isInView
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 20 }
                    }
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + index * 0.1,
                    }}
                    className="flex items-start gap-4 p-4 bg-card border border-border rounded-lg hover:border-emerald-500/40 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        {info.title}
                      </div>
                      <div className="text-foreground font-medium">
                        {info.value}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">
                Siguenos
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={
                      isInView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0 }
                    }
                    transition={{
                      duration: 0.4,
                      delay: 0.4 + index * 0.1,
                    }}
                    className="w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center hover:border-emerald-400 hover:bg-emerald-500/10 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-foreground" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
