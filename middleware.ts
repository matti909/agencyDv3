import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith("/dashboard")) return NextResponse.next()
  if (pathname === "/dashboard/login") return NextResponse.next()
  if (pathname.startsWith("/api/dashboard/auth")) return NextResponse.next()

  const token = request.cookies.get("dashboard_auth")?.value
  const password = process.env.DASHBOARD_PASSWORD

  if (!password || token !== password) {
    return NextResponse.redirect(new URL("/dashboard/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/dashboard/:path*"],
}
