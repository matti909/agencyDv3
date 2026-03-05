"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { addPayment, markPaid } from "@/lib/actions/payments"
import type { Payment, Client } from "@/lib/db"
import {
  Plus,
  X,
  Check,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react"

// ── Constants ─────────────────────────────────────────────────────

const STATUS_CONFIG = {
  pending: { label: "Pendiente", color: "#f59e0b", Icon: Clock },
  overdue: { label: "Vencido", color: "#ef4444", Icon: AlertCircle },
  paid: { label: "Cobrado", color: "#10b981", Icon: CheckCircle2 },
} as const

const TYPE_LABELS: Record<Payment["type"], string> = {
  setup: "Setup fee",
  monthly: "Mensualidad",
  "one-time": "Único",
}

// ── Helpers ───────────────────────────────────────────────────────

function todayStr(): string {
  return new Date().toISOString().split("T")[0]
}

function daysDiff(dateStr: string): number {
  return Math.ceil(
    (new Date(dateStr + "T12:00:00").getTime() - Date.now()) / 86400000
  )
}

function formatDate(dateStr: string): string {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

/** Convert ARS to USD approximation (rough 1:1000 fallback) */
function toUSD(amount: number, currency: Payment["currency"]): number {
  return currency === "USD" ? amount : amount / 1000
}

// ── Shared style helpers ──────────────────────────────────────────

const labelCls =
  "text-[10px] font-mono uppercase tracking-widest block mb-1.5"
const inputCls =
  "w-full bg-transparent border rounded px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-emerald-500 transition-colors"
const inputStyle = { borderColor: "#1e2328" }

// ── Types ─────────────────────────────────────────────────────────

type PaymentFormData = {
  clientId: string | null
  clientName: string
  amount: number
  currency: Payment["currency"]
  dueDate: string
  status: Payment["status"]
  paidDate: string | null
  type: Payment["type"]
  notes: string
}

function buildEmptyForm(): PaymentFormData {
  return {
    clientId: null,
    clientName: "",
    amount: 0,
    currency: "USD",
    dueDate: todayStr(),
    status: "pending",
    paidDate: null,
    type: "monthly",
    notes: "",
  }
}

// ── Add Payment Modal ─────────────────────────────────────────────

function PaymentModal({
  onSave,
  onClose,
  clientOptions,
  isPending,
}: {
  onSave: (data: PaymentFormData) => void
  onClose: () => void
  clientOptions: { id: string; business: string; mrr: number }[]
  isPending: boolean
}) {
  const [form, setForm] = useState<PaymentFormData>(buildEmptyForm())
  const [manualClient, setManualClient] = useState(false)

  const set = <K extends keyof PaymentFormData>(
    key: K,
    val: PaymentFormData[K]
  ) => setForm((f) => ({ ...f, [key]: val }))

  const handleClientSelect = (clientId: string) => {
    if (clientId === "__manual") {
      setManualClient(true)
      setForm((f) => ({ ...f, clientId: null, clientName: "" }))
      return
    }
    setManualClient(false)
    const client = clientOptions.find((c) => c.id === clientId)
    if (client) {
      setForm((f) => ({
        ...f,
        clientId: client.id,
        clientName: client.business,
        amount: client.mrr,
      }))
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="w-full max-w-lg rounded-xl overflow-hidden"
        style={{ background: "#0d0f11", border: "1px solid #1a1e22" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: "#141618" }}
        >
          <h2 className="text-sm font-bold text-white">Registrar pago</h2>
          <button onClick={onClose} style={{ color: "#6b7280" }}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 grid grid-cols-2 gap-4">
          {/* Client selector */}
          <div className="col-span-2">
            <label className={labelCls} style={{ color: "#6b7280" }}>
              Cliente
            </label>
            {clientOptions.length > 0 && !manualClient ? (
              <select
                className={inputCls}
                style={{ ...inputStyle, background: "#0d0f11" }}
                value={form.clientId ?? ""}
                onChange={(e) => handleClientSelect(e.target.value)}
              >
                <option value="">Seleccionar cliente...</option>
                {clientOptions.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.business}
                  </option>
                ))}
                <option value="__manual">Ingresar manualmente</option>
              </select>
            ) : (
              <div className="flex gap-2">
                <input
                  className={inputCls}
                  style={inputStyle}
                  placeholder="Nombre del cliente"
                  value={form.clientName}
                  onChange={(e) => set("clientName", e.target.value)}
                />
                {clientOptions.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setManualClient(false)
                      setForm(buildEmptyForm())
                    }}
                    className="text-[10px] font-mono px-2 rounded"
                    style={{ color: "#6b7280", border: "1px solid #1e2328" }}
                  >
                    Lista
                  </button>
                )}
              </div>
            )}
          </div>

          <div>
            <label className={labelCls} style={{ color: "#6b7280" }}>
              Monto
            </label>
            <input
              type="number"
              className={inputCls}
              style={inputStyle}
              value={form.amount || ""}
              onChange={(e) => set("amount", Number(e.target.value))}
              placeholder="300"
            />
          </div>

          <div>
            <label className={labelCls} style={{ color: "#6b7280" }}>
              Moneda
            </label>
            <select
              className={inputCls}
              style={{ ...inputStyle, background: "#0d0f11" }}
              value={form.currency}
              onChange={(e) =>
                set("currency", e.target.value as Payment["currency"])
              }
            >
              <option value="USD">USD</option>
              <option value="ARS">ARS</option>
            </select>
          </div>

          <div>
            <label className={labelCls} style={{ color: "#6b7280" }}>
              Tipo
            </label>
            <select
              className={inputCls}
              style={{ ...inputStyle, background: "#0d0f11" }}
              value={form.type}
              onChange={(e) =>
                set("type", e.target.value as Payment["type"])
              }
            >
              {Object.entries(TYPE_LABELS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls} style={{ color: "#6b7280" }}>
              Vencimiento
            </label>
            <input
              type="date"
              className={inputCls}
              style={{ ...inputStyle, colorScheme: "dark" }}
              value={form.dueDate}
              onChange={(e) => set("dueDate", e.target.value)}
            />
          </div>

          <div className="col-span-2">
            <label className={labelCls} style={{ color: "#6b7280" }}>
              Notas
            </label>
            <input
              className={inputCls}
              style={inputStyle}
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Mes de referencia, detalles..."
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
              if (!form.clientName || !form.amount) return
              onSave(form)
            }}
            disabled={isPending}
            className="flex items-center gap-2 text-sm font-mono px-5 py-2 rounded disabled:opacity-50"
            style={{ background: "#10b981", color: "#000" }}
          >
            <Check className="w-3.5 h-3.5" />
            {isPending ? "Guardando..." : "Registrar"}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main Client Component ─────────────────────────────────────────

export function PagosClient({
  payments,
  clients,
}: {
  payments: Payment[]
  clients: Client[]
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [modal, setModal] = useState(false)
  const [filter, setFilter] = useState<"all" | "pending" | "overdue" | "paid">(
    "all"
  )

  const clientOptions = clients.map((c) => ({
    id: c.id,
    business: c.business,
    mrr: c.mrr,
  }))

  const now = todayStr()

  // Auto-flag overdue (client-side display only; DB status may differ)
  const enriched = payments.map((p) => ({
    ...p,
    status:
      p.status !== "paid" && p.dueDate < now
        ? ("overdue" as const)
        : p.status,
  }))

  const filtered = enriched
    .filter((p) => filter === "all" || p.status === filter)
    .sort(
      (a, b) =>
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    )

  const totalPending = enriched
    .filter((p) => p.status === "pending")
    .reduce((s, p) => s + toUSD(p.amount, p.currency), 0)

  const totalOverdue = enriched
    .filter((p) => p.status === "overdue")
    .reduce((s, p) => s + toUSD(p.amount, p.currency), 0)

  const totalPaidThisMonth = enriched
    .filter((p) => {
      if (p.status !== "paid" || !p.paidDate) return false
      const d = new Date(p.paidDate + "T12:00:00")
      const n = new Date()
      return (
        d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear()
      )
    })
    .reduce((s, p) => s + toUSD(p.amount, p.currency), 0)

  function handleAdd(data: PaymentFormData) {
    startTransition(async () => {
      await addPayment(data)
      setModal(false)
      router.refresh()
    })
  }

  function handleMarkPaid(id: string) {
    if (!confirm("¿Marcar como cobrado?")) return
    startTransition(async () => {
      await markPaid(id)
      router.refresh()
    })
  }

  const filterTabLabels: Record<typeof filter, string> = {
    all: "Todos",
    pending: "Pendientes",
    overdue: "Vencidos",
    paid: "Cobrados",
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Pagos
          </h1>
          <p className="text-xs font-mono mt-1" style={{ color: "#4b5563" }}>
            {payments.length} registros
          </p>
        </div>
        <button
          onClick={() => setModal(true)}
          disabled={isPending}
          className="flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-md disabled:opacity-50 transition-all"
          style={{ background: "#10b981", color: "#000" }}
        >
          <Plus className="w-3.5 h-3.5" />
          Registrar pago
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <div
          className="rounded-lg p-4"
          style={{ background: "#0c0e10", border: "1px solid #161a1d" }}
        >
          <p
            className="text-[9px] font-mono uppercase tracking-widest mb-2"
            style={{ color: "#f59e0b" }}
          >
            Por cobrar
          </p>
          <p
            className="text-2xl font-bold font-mono"
            style={{ color: "#f59e0b" }}
          >
            ${Math.round(totalPending).toLocaleString()}
          </p>
          <p className="text-[10px] font-mono mt-1" style={{ color: "#4b5563" }}>
            USD aprox.
          </p>
        </div>
        <div
          className="rounded-lg p-4"
          style={{ background: "#0c0e10", border: "1px solid #161a1d" }}
        >
          <p
            className="text-[9px] font-mono uppercase tracking-widest mb-2"
            style={{ color: "#ef4444" }}
          >
            Vencidos
          </p>
          <p
            className="text-2xl font-bold font-mono"
            style={{
              color: totalOverdue > 0 ? "#ef4444" : "#374151",
            }}
          >
            ${Math.round(totalOverdue).toLocaleString()}
          </p>
          <p className="text-[10px] font-mono mt-1" style={{ color: "#4b5563" }}>
            USD aprox.
          </p>
        </div>
        <div
          className="rounded-lg p-4"
          style={{ background: "#0c0e10", border: "1px solid #161a1d" }}
        >
          <p
            className="text-[9px] font-mono uppercase tracking-widest mb-2"
            style={{ color: "#10b981" }}
          >
            Cobrado este mes
          </p>
          <p
            className="text-2xl font-bold font-mono"
            style={{ color: "#10b981" }}
          >
            ${Math.round(totalPaidThisMonth).toLocaleString()}
          </p>
          <p className="text-[10px] font-mono mt-1" style={{ color: "#4b5563" }}>
            USD aprox.
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(["all", "pending", "overdue", "paid"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="text-[10px] font-mono px-3 py-1.5 rounded transition-all"
            style={{
              background: filter === f ? "#10b98120" : "#0c0e10",
              border: `1px solid ${filter === f ? "#10b98150" : "#161a1d"}`,
              color: filter === f ? "#10b981" : "#6b7280",
            }}
          >
            {filterTabLabels[f]}
            {f !== "all" && (
              <span className="ml-1.5 font-bold">
                ({enriched.filter((p) => p.status === f).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Payments table */}
      <div
        className="rounded-lg overflow-hidden"
        style={{ border: "1px solid #161a1d" }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr
              style={{
                background: "#0a0c0e",
                borderBottom: "1px solid #141618",
              }}
            >
              {["Cliente", "Tipo", "Monto", "Vencimiento", "Estado", ""].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-[9px] font-mono uppercase tracking-widest"
                    style={{ color: "#374151" }}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: "#0f1113" }}>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-12 text-xs font-mono"
                  style={{ color: "#374151" }}
                >
                  Sin pagos para mostrar
                </td>
              </tr>
            ) : (
              filtered.map((p) => {
                const cfg = STATUS_CONFIG[p.status]
                const StatusIcon = cfg.Icon
                const days = daysDiff(p.dueDate)
                const daysLabel =
                  p.status === "paid"
                    ? p.paidDate
                      ? `Cobrado el ${formatDate(p.paidDate)}`
                      : "Cobrado"
                    : days === 0
                    ? "Vence hoy"
                    : days < 0
                    ? `Venció hace ${Math.abs(days)}d`
                    : `Vence en ${days}d`

                return (
                  <tr
                    key={p.id}
                    className="hover:bg-white/[0.015] transition-colors"
                    style={{ background: "#0c0e10" }}
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-white">{p.clientName}</p>
                      {p.notes && (
                        <p
                          className="text-[10px] font-mono mt-0.5"
                          style={{ color: "#6b7280" }}
                        >
                          {p.notes}
                        </p>
                      )}
                    </td>
                    <td
                      className="px-4 py-3 text-[10px] font-mono"
                      style={{ color: "#9ca3af" }}
                    >
                      {TYPE_LABELS[p.type]}
                    </td>
                    <td
                      className="px-4 py-3 font-mono font-bold text-sm"
                      style={{ color: "#f59e0b" }}
                    >
                      {p.currency}{" "}
                      {p.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs font-mono text-white">
                        {formatDate(p.dueDate)}
                      </p>
                      <p
                        className="text-[9px] font-mono mt-0.5"
                        style={{ color: cfg.color }}
                      >
                        {daysLabel}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <div
                        className="flex items-center gap-1.5 text-[9px] font-mono"
                        style={{ color: cfg.color }}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {cfg.label}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {p.status !== "paid" && (
                        <button
                          onClick={() => handleMarkPaid(p.id)}
                          disabled={isPending}
                          className="text-[9px] font-mono px-3 py-1 rounded transition-all hover:opacity-80 disabled:opacity-40"
                          style={{
                            background: "#10b98120",
                            color: "#10b981",
                            border: "1px solid #10b98140",
                          }}
                        >
                          Marcar cobrado
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal && (
        <PaymentModal
          clientOptions={clientOptions}
          isPending={isPending}
          onSave={handleAdd}
          onClose={() => setModal(false)}
        />
      )}
    </div>
  )
}
