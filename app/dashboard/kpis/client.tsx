"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { upsertKPI } from "@/lib/actions/kpis"
import {
  KPI_TARGETS,
  KPI_FIELD_LABELS,
} from "@/lib/crm/types"
import type { WeeklyKpi } from "@/lib/db"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

// ── Constants ─────────────────────────────────────────────────────

type KpiNumericField = keyof typeof KPI_FIELD_LABELS

const FIELDS = Object.keys(KPI_FIELD_LABELS) as KpiNumericField[]

// ── Helpers ───────────────────────────────────────────────────────

function formatWeekStart(weekStart: string): string {
  return new Date(weekStart + "T12:00:00").toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

function getPhase(weekIndex: number): keyof typeof KPI_TARGETS {
  if (weekIndex < 4) return "early"
  if (weekIndex < 8) return "growth"
  return "scale"
}

// ── Progress Bar ──────────────────────────────────────────────────

function ProgressBar({ value, target }: { value: number; target: number }) {
  const pct = Math.min((value / Math.max(target, 1)) * 100, 100)
  const color =
    pct >= 100 ? "#10b981" : pct >= 60 ? "#f59e0b" : "#ef4444"
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex-1 h-1.5 rounded-full"
        style={{ background: "#141618" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span
        className="text-[9px] font-mono w-20 text-right tabular-nums"
        style={{ color }}
      >
        {value}/{target} ({Math.round(pct)}%)
      </span>
    </div>
  )
}

// ── Week History Card (accordion) ─────────────────────────────────

function WeekCard({
  kpi,
  target,
  defaultOpen = false,
}: {
  kpi: WeeklyKpi
  target: (typeof KPI_TARGETS)[keyof typeof KPI_TARGETS]
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  const total = FIELDS.reduce((s, f) => s + (kpi[f] as number), 0)
  const maxTotal = FIELDS.reduce(
    (s, f) => s + (target[f as keyof typeof target] as number),
    0
  )
  const overallPct = maxTotal > 0 ? Math.round((total / maxTotal) * 100) : 0
  const color =
    overallPct >= 100
      ? "#10b981"
      : overallPct >= 60
      ? "#f59e0b"
      : "#ef4444"

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ background: "#0c0e10", border: "1px solid #161a1d" }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-white">
            Semana del {formatWeekStart(kpi.weekStart)}
          </span>
          <span
            className="text-[9px] font-mono px-2 py-0.5 rounded-full"
            style={{
              color,
              background: `${color}18`,
              border: `1px solid ${color}30`,
            }}
          >
            {overallPct}% completado
          </span>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4" style={{ color: "#6b7280" }} />
        ) : (
          <ChevronDown className="w-4 h-4" style={{ color: "#6b7280" }} />
        )}
      </button>

      {open && (
        <div
          className="px-5 pb-5 border-t"
          style={{ borderColor: "#141618" }}
        >
          <div className="pt-4 grid grid-cols-2 gap-x-8 gap-y-4">
            {FIELDS.map((f) => (
              <div key={f} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span
                    className="text-[10px] font-mono"
                    style={{ color: "#6b7280" }}
                  >
                    {KPI_FIELD_LABELS[f]}
                  </span>
                  <span className="text-xs font-bold font-mono text-white tabular-nums">
                    {kpi[f] as number}
                  </span>
                </div>
                <ProgressBar
                  value={kpi[f] as number}
                  target={target[f as keyof typeof target] as number}
                />
              </div>
            ))}
          </div>
          {kpi.notes && (
            <div
              className="mt-4 text-xs font-mono p-3 rounded"
              style={{ background: "#0a0c0e", color: "#9ca3af" }}
            >
              {kpi.notes}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── KPI Input Form ────────────────────────────────────────────────

type KpiFormState = {
  [K in KpiNumericField]: number
} & { notes: string }

function buildFormFromKpi(kpi: WeeklyKpi | undefined): KpiFormState {
  return {
    newProspects: kpi?.newProspects ?? 0,
    firstContacts: kpi?.firstContacts ?? 0,
    responses: kpi?.responses ?? 0,
    auditsScheduled: kpi?.auditsScheduled ?? 0,
    proposalsSent: kpi?.proposalsSent ?? 0,
    clientsClosed: kpi?.clientsClosed ?? 0,
    notes: kpi?.notes ?? "",
  }
}

// ── Main Client Component ─────────────────────────────────────────

export function KPIsClient({
  kpis,
  thisWeek,
}: {
  kpis: WeeklyKpi[]
  thisWeek: string
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)

  const existingThisWeek = kpis.find((k) => k.weekStart === thisWeek)
  const [form, setForm] = useState<KpiFormState>(
    buildFormFromKpi(existingThisWeek)
  )

  const setField = (key: keyof KpiFormState, val: string | number) =>
    setForm((f) => ({ ...f, [key]: val }))

  const increment = (field: KpiNumericField) =>
    setForm((f) => ({ ...f, [field]: (f[field] as number) + 1 }))

  const decrement = (field: KpiNumericField) =>
    setForm((f) => ({
      ...f,
      [field]: Math.max(0, (f[field] as number) - 1),
    }))

  function handleSave() {
    startTransition(async () => {
      await upsertKPI({ weekStart: thisWeek, ...form })
      setSaved(true)
      router.refresh()
      setTimeout(() => setSaved(false), 2500)
    })
  }

  // Sort descending for history
  const sortedKPIs = [...kpis].sort((a, b) =>
    b.weekStart.localeCompare(a.weekStart)
  )

  const inputCls =
    "w-full font-mono text-lg font-bold text-white text-center bg-transparent border-b focus:outline-none focus:border-emerald-500 transition-colors pb-1"

  // Use "early" phase targets in the input form progress bars
  const formPhaseTarget = KPI_TARGETS.early

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          KPIs Semanales
        </h1>
        <p className="text-xs font-mono mt-1" style={{ color: "#4b5563" }}>
          Semana actual: {formatWeekStart(thisWeek)}
        </p>
      </div>

      {/* Phase target reference cards */}
      <div className="grid grid-cols-3 gap-4">
        {(Object.keys(KPI_TARGETS) as Array<keyof typeof KPI_TARGETS>).map(
          (phase) => {
            const t = KPI_TARGETS[phase]
            return (
              <div
                key={phase}
                className="rounded-lg p-4 space-y-3"
                style={{
                  background: "#0c0e10",
                  border: "1px solid #161a1d",
                }}
              >
                <h3
                  className="text-[10px] font-mono uppercase tracking-widest"
                  style={{ color: "#10b981" }}
                >
                  {t.label}
                </h3>
                <div className="space-y-1.5">
                  {FIELDS.map((f) => (
                    <div
                      key={f}
                      className="flex items-center justify-between"
                    >
                      <span
                        className="text-[9px] font-mono"
                        style={{ color: "#6b7280" }}
                      >
                        {KPI_FIELD_LABELS[f]}
                      </span>
                      <span className="text-[9px] font-mono font-bold text-white tabular-nums">
                        {t[f as keyof typeof t] as number}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          }
        )}
      </div>

      {/* This week input form */}
      <div
        className="rounded-lg p-6"
        style={{ background: "#0c0e10", border: "1px solid #161a1d" }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-bold text-white">
            Ingresar datos de esta semana
          </h2>
          <button
            onClick={handleSave}
            disabled={isPending}
            className="flex items-center gap-2 text-xs font-mono px-4 py-2 rounded transition-all disabled:opacity-60"
            style={{
              background: saved ? "#059669" : "#10b981",
              color: "#000",
            }}
          >
            {saved && <Check className="w-3.5 h-3.5" />}
            {isPending ? "Guardando..." : saved ? "Guardado!" : "Guardar"}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {FIELDS.map((f) => {
            const target = formPhaseTarget[
              f as keyof typeof formPhaseTarget
            ] as number
            const value = form[f] as number
            const pct = Math.min((value / Math.max(target, 1)) * 100, 100)
            const color =
              pct >= 100
                ? "#10b981"
                : pct >= 60
                ? "#f59e0b"
                : "#ef4444"

            return (
              <div key={f} className="space-y-2">
                <label
                  className="text-[10px] font-mono uppercase tracking-widest block"
                  style={{ color: "#6b7280" }}
                >
                  {KPI_FIELD_LABELS[f]}
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => decrement(f)}
                    className="w-7 h-7 rounded flex items-center justify-center text-lg font-bold transition-colors hover:bg-white/10"
                    style={{ color: "#6b7280" }}
                    aria-label={`Disminuir ${KPI_FIELD_LABELS[f]}`}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    className={inputCls}
                    style={{ borderColor: "#1e2328", color }}
                    value={value}
                    min={0}
                    onChange={(e) =>
                      setField(f, Math.max(0, Number(e.target.value)))
                    }
                  />
                  <button
                    type="button"
                    onClick={() => increment(f)}
                    className="w-7 h-7 rounded flex items-center justify-center text-lg font-bold transition-colors hover:bg-white/10"
                    style={{ color: "#10b981" }}
                    aria-label={`Aumentar ${KPI_FIELD_LABELS[f]}`}
                  >
                    +
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="flex-1 h-1 rounded-full"
                    style={{ background: "#141618" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${pct}%`, background: color }}
                    />
                  </div>
                  <span
                    className="text-[9px] font-mono tabular-nums"
                    style={{ color }}
                  >
                    /{target}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Notes */}
        <div className="mt-6">
          <label
            className="text-[10px] font-mono uppercase tracking-widest block mb-2"
            style={{ color: "#6b7280" }}
          >
            Notas de la semana
          </label>
          <textarea
            className="w-full bg-transparent border rounded px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-emerald-500 transition-colors"
            style={{ borderColor: "#1e2328", resize: "none" }}
            rows={2}
            placeholder="Qué funcionó, qué trabó, aprendizajes..."
            value={form.notes}
            onChange={(e) => setField("notes", e.target.value)}
          />
        </div>
      </div>

      {/* Historical accordion */}
      {sortedKPIs.length > 0 && (
        <div className="space-y-3">
          <h2
            className="text-xs font-mono uppercase tracking-widest"
            style={{ color: "#4b5563" }}
          >
            Historial
          </h2>
          {sortedKPIs.map((kpi, i) => {
            // Oldest entry gets "early", ascending by index in reversed array
            const weekIndex = sortedKPIs.length - 1 - i
            const phase = getPhase(weekIndex)
            return (
              <WeekCard
                key={kpi.id}
                kpi={kpi}
                target={KPI_TARGETS[phase]}
                defaultOpen={kpi.weekStart === thisWeek}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
