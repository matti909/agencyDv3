"use client"

import { LogOut } from "lucide-react"

export function LogoutButton() {
  async function handleLogout() {
    await fetch("/api/dashboard/auth", { method: "DELETE" })
    window.location.href = "/dashboard/login"
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-1.5 text-[10px] font-mono transition-colors hover:text-white w-full text-left"
      style={{ color: "#374151" }}
    >
      <LogOut className="w-3 h-3" />
      Cerrar sesión
    </button>
  )
}
