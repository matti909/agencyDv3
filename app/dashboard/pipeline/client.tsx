"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { updateProspect } from "@/lib/actions/prospects"
import type { Prospect } from "@/lib/db/schema"

type Stage = "lead" | "contactado" | "calificado" | "propuesta"

const COLUMNS: { id: Stage; label: string; color: string; bg: string }[] = [
  { id: "lead", label: "Lead", color: "text-slate-400", bg: "bg-slate-400" },
  { id: "contactado", label: "Contactado", color: "text-blue-400", bg: "bg-blue-400" },
  { id: "calificado", label: "Calificado", color: "text-amber-400", bg: "bg-amber-400" },
  { id: "propuesta", label: "Propuesta", color: "text-emerald-400", bg: "bg-emerald-400" },
]

const CHANNEL_LABELS: Record<string, string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  referido: "Referido",
  whatsapp: "WhatsApp",
  google: "Google",
  evento: "Evento",
  otro: "Otro",
}

const CHANNEL_ICONS: Record<string, string> = {
  instagram: "IG",
  linkedin: "LI",
  referido: "REF",
  whatsapp: "WA",
  google: "G",
  evento: "EVT",
  otro: "—",
}

function isOverdue(date: string): boolean {
  if (!date) return false
  return date < new Date().toISOString().split("T")[0]
}

function formatDate(date: string): string {
  if (!date) return "—"
  const [y, m, d] = date.split("-")
  return `${d}/${m}/${y}`
}

interface CardProps {
  prospect: Prospect
  onDragStart: (e: React.DragEvent, id: string) => void
}

function ProspectCard({ prospect, onDragStart }: CardProps) {
  const overdue = isOverdue(prospect.nextActionDate)

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, prospect.id)}
      className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3 cursor-grab active:cursor-grabbing hover:border-[#3a3a3a] transition-colors group"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="min-w-0">
          <p className="font-medium text-white text-sm truncate">{prospect.business}</p>
          <p className="text-xs text-[#888] truncate">{prospect.name}</p>
        </div>
        <span className="shrink-0 text-[10px] font-bold bg-[#252525] text-[#888] px-1.5 py-0.5 rounded">
          {CHANNEL_ICONS[prospect.channel] ?? "—"}
        </span>
      </div>

      <div className="flex items-center justify-between mt-3">
        <span className="text-xs font-semibold text-emerald-400">
          ${prospect.estimatedMrr.toLocaleString()}/mo
        </span>
        {prospect.nextActionDate && (
          <span className={`text-[10px] ${overdue ? "text-red-400 font-semibold" : "text-[#666]"}`}>
            {overdue ? "⚠ " : ""}
            {formatDate(prospect.nextActionDate)}
          </span>
        )}
      </div>

      {prospect.nextAction && (
        <p className="text-[11px] text-[#555] mt-1.5 truncate">{prospect.nextAction}</p>
      )}
    </div>
  )
}

interface ColumnProps {
  column: (typeof COLUMNS)[number]
  prospects: Prospect[]
  onDragStart: (e: React.DragEvent, id: string) => void
  onDrop: (e: React.DragEvent, stage: Stage) => void
  onDragOver: (e: React.DragEvent) => void
  isDragOver: boolean
}

function KanbanColumn({ column, prospects, onDragStart, onDrop, onDragOver, isDragOver }: ColumnProps) {
  const totalMrr = prospects.reduce((s, p) => s + p.estimatedMrr, 0)

  return (
    <div
      className={`flex flex-col rounded-xl border transition-colors ${
        isDragOver ? "border-[#3a3a3a] bg-[#161616]" : "border-[#222] bg-[#111]"
      }`}
      onDrop={(e) => onDrop(e, column.id)}
      onDragOver={onDragOver}
      onDragEnter={(e) => e.preventDefault()}
    >
      {/* Column header */}
      <div className="flex items-center justify-between p-3 border-b border-[#1e1e1e]">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${column.bg}`} />
          <span className={`text-sm font-semibold ${column.color}`}>{column.label}</span>
          <span className="text-xs text-[#555] bg-[#1a1a1a] px-1.5 py-0.5 rounded-full">
            {prospects.length}
          </span>
        </div>
        {totalMrr > 0 && (
          <span className="text-[11px] text-[#555]">${totalMrr.toLocaleString()}</span>
        )}
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-2 p-2 min-h-[200px]">
        {prospects.map((p) => (
          <ProspectCard key={p.id} prospect={p} onDragStart={onDragStart} />
        ))}
        {prospects.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-[#333] text-xs">Arrastrá aquí</p>
          </div>
        )}
      </div>
    </div>
  )
}

interface Props {
  prospects: Prospect[]
}

export function PipelineClient({ prospects: initialProspects }: Props) {
  const router = useRouter()
  const [prospects, setProspects] = useState(initialProspects)
  const [dragOverColumn, setDragOverColumn] = useState<Stage | null>(null)
  const draggingId = useRef<string | null>(null)

  const activeProspects = prospects.filter(
    (p) => p.stage !== "cliente" && p.stage !== "perdido"
  ) as (Prospect & { stage: Stage })[]

  const byStage = (stage: Stage) => activeProspects.filter((p) => p.stage === stage)

  const totalPipeline = activeProspects.reduce((s, p) => s + p.estimatedMrr, 0)
  const propuestaCount = byStage("propuesta").length

  function handleDragStart(e: React.DragEvent, id: string) {
    draggingId.current = id
    e.dataTransfer.effectAllowed = "move"
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  async function handleDrop(e: React.DragEvent, stage: Stage) {
    e.preventDefault()
    setDragOverColumn(null)
    const id = draggingId.current
    if (!id) return

    const prospect = prospects.find((p) => p.id === id)
    if (!prospect || prospect.stage === stage) return

    // Optimistic update
    setProspects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stage } : p))
    )

    try {
      await updateProspect(id, { stage })
      router.refresh()
    } catch {
      // Revert on error
      setProspects(initialProspects)
    }

    draggingId.current = null
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Pipeline</h1>
          <p className="text-sm text-[#555] mt-0.5">Gestioná el estado de tus prospectos</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="text-right">
            <p className="text-[#555] text-xs">Pipeline total</p>
            <p className="text-white font-semibold">${totalPipeline.toLocaleString()}/mo</p>
          </div>
          <div className="text-right">
            <p className="text-[#555] text-xs">En propuesta</p>
            <p className="text-emerald-400 font-semibold">{propuestaCount}</p>
          </div>
        </div>
      </div>

      {/* Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {COLUMNS.map((col) => (
          <KanbanColumn
            key={col.id}
            column={col}
            prospects={byStage(col.id)}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            isDragOver={dragOverColumn === col.id}
          />
        ))}
      </div>

      {/* Closed/lost prospects note */}
      {prospects.some((p) => p.stage === "cliente" || p.stage === "perdido") && (
        <p className="text-[#444] text-xs text-center">
          Los prospectos convertidos o perdidos no se muestran en el pipeline.
        </p>
      )}
    </div>
  )
}
