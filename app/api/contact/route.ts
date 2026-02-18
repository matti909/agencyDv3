import { Resend } from "resend"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { name, email, subject, message } = await req.json()

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
    to: process.env.RESEND_TO_EMAIL!,
    subject: `[Contacto] ${subject}`,
    replyTo: email,
    text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
  })

  if (error) {
    return NextResponse.json({ error: "No se pudo enviar el mensaje" }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
