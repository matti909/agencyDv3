"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Zap, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await fetch("/api/dashboard/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push("/dashboard")
    } else {
      setError("Contraseña incorrecta")
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#07080a" }}
    >
      <div
        className="w-full max-w-sm rounded-xl overflow-hidden"
        style={{ background: "#0c0e10", border: "1px solid #161a1d" }}
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-6 text-center border-b" style={{ borderColor: "#141618" }}>
          <div className="flex items-center justify-center gap-2.5 mb-4">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #10b981, #0d9488)" }}
            >
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold tracking-widest uppercase text-white">DisruptLab</p>
              <p className="text-[9px] tracking-widest uppercase" style={{ color: "#10b981" }}>CRM</p>
            </div>
          </div>
          <p className="text-xs font-mono" style={{ color: "#4b5563" }}>
            Área privada
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase tracking-widest" style={{ color: "#6b7280" }}>
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border rounded px-3 py-2.5 pr-10 text-sm font-mono text-white focus:outline-none focus:border-emerald-500 transition-colors"
                style={{ borderColor: error ? "#ef4444" : "#1e2328", colorScheme: "dark" }}
                placeholder="••••••••"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: "#4b5563" }}
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <p className="text-[10px] font-mono" style={{ color: "#ef4444" }}>
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!password || loading}
            className="w-full py-2.5 text-sm font-mono font-bold rounded transition-all disabled:opacity-50"
            style={{ background: "#10b981", color: "#000" }}
          >
            {loading ? "Verificando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  )
}
