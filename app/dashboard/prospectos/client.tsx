"use client"

import { useState, useMemo, useTransition } from "react"
import { useRouter } from "next/navigation"
import {
  addProspect,
  updateProspect,
  deleteProspect,
  convertToClient,
} from "@/lib/actions/prospects"
import {
  STAGE_LABELS,
  SECTOR_LABELS,
  CHANNEL_LABELS,
  type ProspectStage,
  type Sector,
  type Channel,
} from "@/lib/crm/types"
import type { Prospect } from "@/lib/db"
import {
  Plus,
  Search,
  ChevronDown,
  X,
  Trash2,
  Edit2,
  Check,
  ArrowRightCircle,
} from "lucide-react"

// ── Constants ─────────────────────────────────────────────────────

const STAGE_COLORS: Record<ProspectStage, string> = {
  lead: "#6b7280",
  contactado: "#3b82f6",
  calificado: "#8b5cf6",
  propuesta: "#f59e0b",
  cliente: "#10b981",
  perdido: "#ef4444",
}

const STAGES = Object.keys(STAGE_LABELS) as ProspectStage[]
const SECTORS = Object.keys(SECTOR_LABELS) as Sector[]
const CHANNELS = Object.keys(CHANNEL_LABELS) as Channel[]

function todayStr(): string {
  return new Date().toISOString().split("T")[0]
}

// ── Shared style helpers ──────────────────────────────────────────

const labelCls = "text-[10px] font-mono uppercase tracking-widest block mb-1.5"
const inputCls =
  "w-full bg-transparent border rounded px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-emerald-500 transition-colors"
const inputStyle = { borderColor: "#1e2328" }

// ── Types ─────────────────────────────────────────────────────────

type ProspectFormData = {
  name: string
  business: string
  sector: Sector
  channel: Channel
  stage: ProspectStage
  firstContactDate: string
  nextAction: string
  nextActionDate: string
  estimatedMrr: number
  notes: string
}

const EMPTY_FORM: ProspectFormData = {
  name: "",
  business: "",
  sector: "otro",
  channel: "instagram",
  stage: "lead",
  firstContactDate: todayStr(),
  nextAction: "",
  nextActionDate: "",
  estimatedMrr: 0,
  notes: "",
}

// ── Add/Edit Modal ────────────────────────────────────────────────

function ProspectModal({
  initial,
  onSave,
  onClose,
  isPending,
}: {
  initial?: Prospect
  onSave: (data: ProspectFormData) => void
  onClose: () => void
  isPending: boolean
}) {
  const [form, setForm] = useState<ProspectFormData>(
    initial
      ? {
          name: initial.name,
          business: initial.business,
          sector: initial.sector as Sector,
          channel: initial.channel as Channel,
          stage: initial.stage as ProspectStage,
          firstContactDate: initial.firstContactDate,
          nextAction: initial.nextAction,
          nextActionDate: initial.nextActionDate,
          estimatedMrr: initial.estimatedMrr,
          notes: initial.notes,
        }
      : EMPTY_FORM
  )

  const set = (key: keyof ProspectFormData, val: string | number) =>
    setForm((f) => ({ ...f, [key]: val }))

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="w-full max-w-2xl rounded-xl overflow-hidden"
        style={{ background: "#0d0f11", border: "1px solid #1a1e22" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: "#141618" }}
        >
          <h2 className="text-sm font-bold text-white">
            {initial ? "Editar prospecto" : "Nuevo prospecto"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 grid grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">
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
              Negocio / empresa *
            </label>
            <input
              className={inputCls}
              style={inputStyle}
              value={form.business}
              onChange={(e) => set("business", e.target.value)}
              placeholder="Restaurante La Esquina"
            />
          </div>

          <div>
            <label className={labelCls} style={{ color: "#6b7280" }}>
              Sector
            </label>
            <select
              className={inputCls}
              style={{ ...inputStyle, background: "#0d0f11" }}
              value={form.sector}
              onChange={(e) => set("sector", e.target.value as Sector)}
            >
              {SECTORS.map((s) => (
                <option key={s} value={s}>
                  {SECTOR_LABELS[s]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls} style={{ color: "#6b7280" }}>
              Canal de origen
            </label>
            <select
              className={inputCls}
              style={{ ...inputStyle, background: "#0d0f11" }}
              value={form.channel}
              onChange={(e) => set("channel", e.target.value as Channel)}
            >
              {CHANNELS.map((c) => (
                <option key={c} value={c}>
                  {CHANNEL_LABELS[c]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls} style={{ color: "#6b7280" }}>
              Etapa
            </label>
            <select
              className={inputCls}
              style={{ ...inputStyle, background: "#0d0f11" }}
              value={form.stage}
              onChange={(e) => set("stage", e.target.value as ProspectStage)}
            >
              {STAGES.map((s) => (
                <option key={s} value={s}>
                  {STAGE_LABELS[s]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls} style={{ color: "#6b7280" }}>
              MRR estimado (USD)
            </label>
            <input
              type="number"
              className={inputCls}
              style={inputStyle}
              value={form.estimatedMrr || ""}
              onChange={(e) => set("estimatedMrr", Number(e.target.value))}
              placeholder="300"
            />
          </div>

          <div>
            <label className={labelCls} style={{ color: "#6b7280" }}>
              Fecha primer contacto
            </label>
            <input
              type="date"
              className={inputCls}
              style={{ ...inputStyle, colorScheme: "dark" }}
              value={form.firstContactDate}
              onChange={(e) => set("firstContactDate", e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls} style={{ color: "#6b7280" }}>
              Fecha próxima acción
            </label>
            <input
              type="date"
              className={inputCls}
              style={{ ...inputStyle, colorScheme: "dark" }}
              value={form.nextActionDate}
              onChange={(e) => set("nextActionDate", e.target.value)}
            />
          </div>

          <div className="col-span-2">
            <label className={labelCls} style={{ color: "#6b7280" }}>
              Próxima acción
            </label>
            <input
              className={inputCls}
              style={inputStyle}
              value={form.nextAction}
              onChange={(e) => set("nextAction", e.target.value)}
              placeholder="Enviar propuesta / Agendar auditoría..."
            />
          </div>

          <div className="col-span-2">
            <label className={labelCls} style={{ color: "#6b7280" }}>
              Notas
            </label>
            <textarea
              className={inputCls}
              style={{ ...inputStyle, resize: "none" }}
              rows={3}
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Contexto del negocio, objeciones, intereses..."
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
            className="text-sm font-mono px-4 py-2 rounded transition-colors"
            style={{ color: "#6b7280" }}
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              if (!form.name || !form.business) return
              onSave(form)
            }}
            disabled={isPending}
            className="flex items-center gap-2 text-sm font-mono px-5 py-2 rounded transition-all disabled:opacity-50"
            style={{ background: "#10b981", color: "#000" }}
          >
            <Check className="w-3.5 h-3.5" />
            {isPending
              ? "Guardando..."
              : initial
              ? "Guardar cambios"
              : "Agregar prospecto"}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Stage quick-change dropdown ───────────────────────────────────

function StageDropdown({
  prospect,
  onUpdate,
}: {
  prospect: Prospect
  onUpdate: (id: string, stage: ProspectStage) => void
}) {
  const [open, setOpen] = useState(false)
  const stage = prospect.stage as ProspectStage
  const color = STAGE_COLORS[stage]

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-[9px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wide transition-all"
        style={{
          color,
          background: `${color}18`,
          border: `1px solid ${color}30`,
        }}
      >
        {STAGE_LABELS[stage]}
        <ChevronDown className="w-2.5 h-2.5" />
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div
            className="absolute left-0 top-full mt-1 rounded-md shadow-xl z-20 overflow-hidden min-w-[140px]"
            style={{ background: "#0d0f11", border: "1px solid #1a1e22" }}
          >
            {STAGES.map((s) => (
              <button
                key={s}
                onClick={() => {
                  onUpdate(prospect.id, s)
                  setOpen(false)
                }}
                className="w-full text-left px-3 py-2 text-[10px] font-mono flex items-center gap-2 hover:bg-white/5 transition-colors"
                style={{ color: STAGE_COLORS[s] }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: STAGE_COLORS[s] }}
                />
                {STAGE_LABELS[s]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// ── Main Client Component ─────────────────────────────────────────

export function ProspectosClient({ prospects }: { prospects: Prospect[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [search, setSearch] = useState("")
  const [filterStage, setFilterStage] = useState<ProspectStage | "all">("all")
  const [filterSector, setFilterSector] = useState<Sector | "all">("all")
  const [modal, setModal] = useState<"new" | Prospect | null>(null)
  const [convertingId, setConvertingId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return prospects
      .filter((p) => {
        const q = search.toLowerCase()
        const matchSearch =
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.business.toLowerCase().includes(q)
        const matchStage =
          filterStage === "all" || p.stage === filterStage
        const matchSector =
          filterSector === "all" || p.sector === filterSector
        return matchSearch && matchStage && matchSector
      })
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
  }, [prospects, search, filterStage, filterSector])

  function handleAdd(data: ProspectFormData) {
    startTransition(async () => {
      await addProspect(data)
      setModal(null)
      router.refresh()
    })
  }

  function handleEdit(id: string, data: ProspectFormData) {
    startTransition(async () => {
      await updateProspect(id, data)
      setModal(null)
      router.refresh()
    })
  }

  function handleStageChange(id: string, stage: ProspectStage) {
    startTransition(async () => {
      await updateProspect(id, { stage })
      router.refresh()
    })
  }

  function handleDelete(id: string) {
    if (!confirm("¿Eliminar este prospecto? Esta acción no se puede deshacer."))
      return
    startTransition(async () => {
      await deleteProspect(id)
      router.refresh()
    })
  }

  function handleConvert(id: string, business: string) {
    if (
      !confirm(
        `¿Convertir "${business}" a cliente? Se creará un registro en Clientes con los datos actuales.`
      )
    )
      return
    setConvertingId(id)
    startTransition(async () => {
      await convertToClient(id)
      setConvertingId(null)
      router.refresh()
    })
  }

  const selectCls =
    "text-xs font-mono px-3 py-2 rounded border focus:outline-none focus:border-emerald-500 transition-colors"
  const selectStyle = {
    background: "#0c0e10",
    borderColor: "#1e2328",
    color: "#9ca3af",
  }

  const propuestaCount = prospects.filter((p) => p.stage === "propuesta").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Prospectos
          </h1>
          <p
            className="text-xs font-mono mt-1"
            style={{ color: "#4b5563" }}
          >
            {prospects.length} en total
            {propuestaCount > 0 && (
              <span style={{ color: "#f59e0b" }}>
                {" "}
                · {propuestaCount} en propuesta
              </span>
            )}
          </p>
        </div>
        <button
          onClick={() => setModal("new")}
          disabled={isPending}
          className="flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-md transition-all disabled:opacity-50"
          style={{ background: "#10b981", color: "#000" }}
        >
          <Plus className="w-3.5 h-3.5" />
          Nuevo prospecto
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
            style={{ color: "#4b5563" }}
          />
          <input
            className="w-full text-xs font-mono pl-9 pr-4 py-2 rounded border focus:outline-none focus:border-emerald-500 transition-colors"
            style={{
              background: "#0c0e10",
              borderColor: "#1e2328",
              color: "#e5e7eb",
            }}
            placeholder="Buscar por nombre o negocio..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className={selectCls}
          style={selectStyle}
          value={filterStage}
          onChange={(e) =>
            setFilterStage(e.target.value as ProspectStage | "all")
          }
        >
          <option value="all">Todas las etapas</option>
          {STAGES.map((s) => (
            <option key={s} value={s}>
              {STAGE_LABELS[s]}
            </option>
          ))}
        </select>
        <select
          className={selectCls}
          style={selectStyle}
          value={filterSector}
          onChange={(e) =>
            setFilterSector(e.target.value as Sector | "all")
          }
        >
          <option value="all">Todos los sectores</option>
          {SECTORS.map((s) => (
            <option key={s} value={s}>
              {SECTOR_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
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
              {[
                "Negocio",
                "Sector",
                "Canal",
                "Etapa",
                "MRR est.",
                "Próxima acción",
                "",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3 text-[9px] font-mono uppercase tracking-widest"
                  style={{ color: "#374151" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody
            className="divide-y"
            style={{ borderColor: "#0f1113" }}
          >
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-12 text-xs font-mono"
                  style={{ color: "#374151" }}
                >
                  {prospects.length === 0
                    ? "Sin prospectos todavía. ¡Agregá el primero!"
                    : "Sin resultados para los filtros aplicados."}
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-white/[0.015] transition-colors"
                  style={{ background: "#0c0e10" }}
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-white text-sm">
                      {p.business}
                    </p>
                    <p
                      className="text-[10px] font-mono"
                      style={{ color: "#6b7280" }}
                    >
                      {p.name}
                    </p>
                  </td>
                  <td
                    className="px-4 py-3 text-[10px] font-mono"
                    style={{ color: "#9ca3af" }}
                  >
                    {SECTOR_LABELS[p.sector as Sector] ?? p.sector}
                  </td>
                  <td
                    className="px-4 py-3 text-[10px] font-mono"
                    style={{ color: "#9ca3af" }}
                  >
                    {CHANNEL_LABELS[p.channel as Channel] ?? p.channel}
                  </td>
                  <td className="px-4 py-3">
                    <StageDropdown
                      prospect={p}
                      onUpdate={handleStageChange}
                    />
                  </td>
                  <td
                    className="px-4 py-3 font-mono text-xs font-bold"
                    style={{ color: "#f59e0b" }}
                  >
                    {p.estimatedMrr > 0 ? `$${p.estimatedMrr}` : "—"}
                  </td>
                  <td className="px-4 py-3">
                    {p.nextAction ? (
                      <div>
                        <p className="text-xs text-white">{p.nextAction}</p>
                        {p.nextActionDate && (
                          <p
                            className="text-[9px] font-mono mt-0.5"
                            style={{ color: "#6b7280" }}
                          >
                            {new Date(
                              p.nextActionDate + "T12:00:00"
                            ).toLocaleDateString("es-AR", {
                              day: "2-digit",
                              month: "short",
                            })}
                          </p>
                        )}
                      </div>
                    ) : (
                      <span
                        className="text-[10px] font-mono"
                        style={{ color: "#374151" }}
                      >
                        —
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 justify-end">
                      {/* Convert to client — visible when stage is "propuesta" */}
                      {p.stage === "propuesta" && (
                        <button
                          onClick={() => handleConvert(p.id, p.business)}
                          disabled={convertingId === p.id || isPending}
                          className="flex items-center gap-1 text-[9px] font-mono px-2 py-1 rounded transition-all disabled:opacity-40 hover:opacity-80"
                          style={{
                            background: "#10b98120",
                            color: "#10b981",
                            border: "1px solid #10b98140",
                          }}
                          title="Convertir a cliente"
                        >
                          <ArrowRightCircle className="w-3 h-3" />
                          {convertingId === p.id ? "..." : "Convertir"}
                        </button>
                      )}
                      <button
                        onClick={() => setModal(p)}
                        className="p-1.5 rounded hover:bg-white/10 transition-colors"
                        style={{ color: "#6b7280" }}
                        title="Editar"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        disabled={isPending}
                        className="p-1.5 rounded hover:bg-red-500/10 transition-colors disabled:opacity-40"
                        style={{ color: "#ef4444" }}
                        title="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal && (
        <ProspectModal
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
