import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  const { password } = await request.json()
  const correct = process.env.DASHBOARD_PASSWORD

  if (!correct || password !== correct) {
    return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set("dashboard_auth", password, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  })
  return response
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.delete("dashboard_auth")
  return response
}
