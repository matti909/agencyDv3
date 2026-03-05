"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { addClient, updateClient, deleteClient } from "@/lib/actions/clients"
import type { Client } from "@/lib/db"
import { Plus, X, Check, Edit2, Trash2 } from "lucide-react"

// ── Constants ─────────────────────────────────────────────────────

const SERVICES = [
  "Presencia Digital",
  "Automatización con IA",
  "Ventas y Marketing",
  "Redes Sociales & Contenido",
  "Gestión y Pagos",
  "Seguridad y Soporte",
]

const STATUS_CONFIG: Record<
  Client["status"],
  { label: string; color: string }
> = {
  active: { label: "Activo", color: "#10b981" },
  "at-risk": { label: "En riesgo", color: "#f59e0b" },
  paused: { label: "Pausado", color: "#6b7280" },
  churned: { label: "Canceló", color: "#ef4444" },
}

// ── Shared style helpers ──────────────────────────────────────────

const labelCls =
  "text-[10px] font-mono uppercase tracking-widest block mb-1.5"
const inputCls =
  "w-full bg-transparent border rounded px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-emerald-500 transition-colors"
const inputStyle = { borderColor: "#1e2328" }

// ── Types ─────────────────────────────────────────────────────────

type ClientFormData = {
  name: string
  business: string
  sector: string
  services: string[]
  mrr: number
  setupFee: number
  startDate: string
  status: Client["status"]
  notes: string
}

function buildEmptyForm(): ClientFormData {
  return {
    name: "",
    business: "",
    sector: "",
    services: [],
    mrr: 0,
    setupFee: 0,
    startDate: new Date().toISOString().split("T")[0],
    status: "active",
    notes: "",
  }
}

// ── Add/Edit Modal ────────────────────────────────────────────────

function ClientModal({
  initial,
  onSave,
  onClose,
  isPending,
}: {
  initial?: Client
  onSave: (data: ClientFormData) => void
  onClose: () => void
  isPending: boolean
}) {
  const [form, setForm] = useState<ClientFormData>(
    initial
      ? {
          name: initial.name,
          business: initial.business,
          sector: initial.sector,
          services: initial.services ?? [],
          mrr: initial.mrr,
          setupFee: initial.setupFee,
          startDate: initial.startDate,
          status: initial.status,
          notes: initial.notes,
        }
      : buildEmptyForm()
  )

  const set = (
    key: keyof ClientFormData,
    val: string | number | string[]
  ) => setForm((f) => ({ ...f, [key]: val }))

  const toggleService = (s: string) => {
    const has = form.services.includes(s)
    set(
      "services",
      has ? form.services.filter((x) => x !== s) : [...form.services, s]
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="w-full max-w-xl rounded-xl overflow-hidden"
        style={{ background: "#0d0f11", border: "1px solid #1a1e22" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: "#141618" }}
        >
          <h2 className="text-sm font-bold text-white">
            {initial ? "Editar cliente" : "Nuevo cliente"}
          </h2>
          <button onClick={onClose} style={{ color: "#6b7280" }}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls} style={{ color: "#6b7280" }}>
                Nombre contacto *
              </label>
              <input
                className={inputCls}
                style={inputStyle}
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Juan Pérez"
              />
            </div>
            <div>
              <label className={labelCls} style={{ color: "#6b7280" }}>
                Negocio *
              </label>
              <input
                className={inputCls}
                style={inputStyle}
                value={form.business}
                onChange={(e) => set("business", e.target.value)}
                placeholder="Nombre del negocio"
              />
            </div>
            <div>
              <label className={labelCls} style={{ color: "#6b7280" }}>
                Sector
              </label>
              <input
                className={inputCls}
                style={inputStyle}
                value={form.sector}
                onChange={(e) => set("sector", e.target.value)}
                placeholder="Gastronomía, Moda..."
              />
            </div>
            <div>
              <label className={labelCls} style={{ color: "#6b7280" }}>
                Estado
              </label>
              <select
                className={inputCls}
                style={{ ...inputStyle, background: "#0d0f11" }}
                value={form.status}
                onChange={(e) =>
                  set("status", e.target.value as Client["status"])
                }
              >
                {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls} style={{ color: "#6b7280" }}>
                MRR (USD)
              </label>
              <input
                type="number"
                className={inputCls}
                style={inputStyle}
                value={form.mrr || ""}
                onChange={(e) => set("mrr", Number(e.target.value))}
                placeholder="300"
              />
            </div>
            <div>
              <label className={labelCls} style={{ color: "#6b7280" }}>
                Setup fee (USD)
              </label>
              <input
                type="number"
                className={inputCls}
                style={inputStyle}
                value={form.setupFee || ""}
                onChange={(e) => set("setupFee", Number(e.target.value))}
                placeholder="499"
              />
            </div>
            <div className="col-span-2">
              <label className={labelCls} style={{ color: "#6b7280" }}>
                Fecha inicio
              </label>
              <input
                type="date"
                className={inputCls}
                style={{ ...inputStyle, colorScheme: "dark" }}
                value={form.startDate}
                onChange={(e) => set("startDate", e.target.value)}
              />
            </div>
          </div>

          {/* Services multi-select */}
          <div>
            <label className={labelCls} style={{ color: "#6b7280" }}>
              Servicios contratados
            </label>
            <div className="flex flex-wrap gap-2 mt-1">
              {SERVICES.map((s) => {
                const active = form.services.includes(s)
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleService(s)}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-full transition-all"
                    style={{
                      background: active ? "#10b98120" : "#0a0c0e",
                      border: `1px solid ${
                        active ? "#10b98150" : "#1e2328"
                      }`,
                      color: active ? "#10b981" : "#6b7280",
                    }}
                  >
                    {active && "✓ "}
                    {s}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label className={labelCls} style={{ color: "#6b7280" }}>
              Notas
            </label>
            <textarea
              className={inputCls}
              style={{ ...inputStyle, resize: "none" }}
              rows={2}
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-end gap-3 px-6 py-4 border-t"
          style={{ borderColor: "#141618" }}
        >
          <button
            onClick={onClose}
            className="text-sm font-mono px-4 py-2 rounded"
            style={{ color: "#6b7280" }}
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              if (!form.business || !form.name) return
              onSave(form)
            }}
            disabled={isPending}
            className="flex items-center gap-2 text-sm font-mono px-5 py-2 rounded disabled:opacity-50"
            style={{ background: "#10b981", color: "#000" }}
          >
            <Check className="w-3.5 h-3.5" />
            {isPending ? "Guardando..." : initial ? "Guardar" : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main Client Component ─────────────────────────────────────────

export function ClientesClient({ clients }: { clients: Client[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [modal, setModal] = useState<"new" | Client | null>(null)

  const activeClients = clients.filter((c) => c.status === "active")
  const totalMRR = activeClients.reduce((s, c) => s + c.mrr, 0)

  const sorted = [...clients].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  function handleAdd(data: ClientFormData) {
    startTransition(async () => {
      await addClient(data)
      setModal(null)
      router.refresh()
    })
  }

  function handleEdit(id: string, data: ClientFormData) {
    startTransition(async () => {
      await updateClient(id, data)
      setModal(null)
      router.refresh()
    })
  }

  function handleDelete(id: string, business: string) {
    if (!confirm(`¿Eliminar el cliente "${business}"? Esta acción no se puede deshacer.`))
      return
    startTransition(async () => {
      await deleteClient(id)
      router.refresh()
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Clientes
          </h1>
          <p className="text-xs font-mono mt-1" style={{ color: "#4b5563" }}>
            {activeClients.length} activos · MRR total:{" "}
            <span style={{ color: "#10b981" }}>
              ${totalMRR.toLocaleString()} USD
            </span>
          </p>
        </div>
        <button
          onClick={() => setModal("new")}
          disabled={isPending}
          className="flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-md disabled:opacity-50 transition-all"
          style={{ background: "#10b981", color: "#000" }}
        >
          <Plus className="w-3.5 h-3.5" />
          Nuevo cliente
        </button>
      </div>

      {/* Status summary cards */}
      <div className="grid grid-cols-4 gap-4">
        {Object.entries(STATUS_CONFIG).map(([status, cfg]) => {
          const count = clients.filter((c) => c.status === status).length
          const mrr = clients
            .filter((c) => c.status === status)
            .reduce((s, c) => s + c.mrr, 0)
          return (
            <div
              key={status}
              className="rounded-lg p-4"
              style={{ background: "#0c0e10", border: "1px solid #161a1d" }}
            >
              <p
                className="text-[9px] font-mono uppercase tracking-widest mb-2"
                style={{ color: cfg.color }}
              >
                {cfg.label}
              </p>
              <p className="text-xl font-bold font-mono text-white">
                {count}
              </p>
              {mrr > 0 && (
                <p
                  className="text-[10px] font-mono mt-1"
                  style={{ color: "#6b7280" }}
                >
                  ${mrr.toLocaleString()}/mes
                </p>
              )}
            </div>
          )
        })}
      </div>

      {/* Client cards */}
      <div className="space-y-3">
        {sorted.length === 0 ? (
          <div
            className="text-center py-16 text-xs font-mono"
            style={{ color: "#374151" }}
          >
            Sin clientes todavía. ¡Cerrá el primero!
          </div>
        ) : (
          sorted.map((c) => {
            const cfg = STATUS_CONFIG[c.status]
            const services = c.services ?? []
            const startMs = new Date(c.startDate + "T12:00:00").getTime()
            const months = Math.max(
              0,
              Math.floor((Date.now() - startMs) / (30 * 86400000))
            )
            const ltv = c.mrr * months + c.setupFee

            return (
              <div
                key={c.id}
                className="rounded-lg p-5 transition-colors hover:border-white/10"
                style={{
                  background: "#0c0e10",
                  border: "1px solid #161a1d",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-white">{c.business}</h3>
                      <span
                        className="text-[9px] font-mono px-2 py-0.5 rounded-full"
                        style={{
                          color: cfg.color,
                          background: `${cfg.color}18`,
                          border: `1px solid ${cfg.color}30`,
                        }}
                      >
                        {cfg.label}
                      </span>
                    </div>
                    <p
                      className="text-xs font-mono mb-3"
                      style={{ color: "#6b7280" }}
                    >
                      {c.name}
                      {c.sector ? ` · ${c.sector}` : ""}
                    </p>
                    {services.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {services.map((s) => (
                          <span
                            key={s}
                            className="text-[9px] font-mono px-2 py-0.5 rounded"
                            style={{
                              background: "#141618",
                              color: "#9ca3af",
                              border: "1px solid #1e2328",
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p
                      className="text-xl font-bold font-mono"
                      style={{ color: "#10b981" }}
                    >
                      ${c.mrr.toLocaleString()}
                      <span className="text-xs font-normal text-gray-600">
                        /mes
                      </span>
                    </p>
                    <p
                      className="text-[10px] font-mono mt-0.5"
                      style={{ color: "#6b7280" }}
                    >
                      Setup: ${c.setupFee.toLocaleString()}
                    </p>
                    {ltv > 0 && (
                      <p
                        className="text-[10px] font-mono mt-0.5"
                        style={{ color: "#4b5563" }}
                      >
                        LTV est: ${ltv.toLocaleString()}
                      </p>
                    )}
                    <p
                      className="text-[9px] font-mono mt-1"
                      style={{ color: "#374151" }}
                    >
                      Desde{" "}
                      {new Date(c.startDate + "T12:00:00").toLocaleDateString(
                        "es-AR",
                        { day: "2-digit", month: "short", year: "numeric" }
                      )}
                    </p>
                    <div className="flex items-center gap-2 justify-end mt-3">
                      <button
                        onClick={() => setModal(c)}
                        className="p-1.5 rounded hover:bg-white/10 transition-colors"
                        style={{ color: "#6b7280" }}
                        title="Editar"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(c.id, c.business)}
                        disabled={isPending}
                        className="p-1.5 rounded hover:bg-red-500/10 transition-colors disabled:opacity-40"
                        style={{ color: "#ef4444" }}
                        title="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
                {c.notes && (
                  <p
                    className="text-xs font-mono mt-3 pt-3 border-t"
                    style={{ borderColor: "#141618", color: "#6b7280" }}
                  >
                    {c.notes}
                  </p>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Modal */}
      {modal && (
        <ClientModal
          initial={modal === "new" ? undefined : modal}
          isPending={isPending}
          onSave={(data) => {
            if (modal === "new") {
              handleAdd(data)
            } else {
              handleEdit(modal.id, data)
            }
          }}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}
