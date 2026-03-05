export const dynamic = "force-dynamic"

import Link from "next/link"
import { getProspects, getOverdueActions } from "@/lib/actions/prospects"
import { getClients } from "@/lib/actions/clients"
import { getPayments } from "@/lib/actions/payments"
import { getKPIs } from "@/lib/actions/kpis"
import { getWeekStart } from "@/lib/utils"
import { getInsights } from "@/lib/actions/insights"
import { STAGE_LABELS, KPI_TARGETS, KPI_FIELD_LABELS } from "@/lib/crm/types"
import { ArrowUpRight, TrendingUp, Users, FileText, DollarSign, AlertTriangle, Plus, Download, Lightbulb, Clock, CheckCircle2, Info } from "lucide-react"

type ProspectStage = "lead" | "contactado" | "calificado" | "propuesta" | "cliente" | "perdido"

const STAGE_COLORS: Record<ProspectStage, string> = {
  lead: "#6b7280",
  contactado: "#3b82f6",
  calificado: "#8b5cf6",
  propuesta: "#f59e0b",
  cliente: "#10b981",
  perdido: "#ef4444",
}

const STAGE_ORDER: ProspectStage[] = ["lead", "contactado", "calificado", "propuesta", "cliente", "perdido"]

function StatCard({ label, value, sub, accent = "#10b981", icon: Icon, href }: {
  label: string; value: string | number; sub?: string; accent?: string; icon: React.ElementType; href?: string
}) {
  const inner = (
    <div className="rounded-lg p-5 flex flex-col gap-3 h-full transition-all duration-200 hover:scale-[1.01]"
      style={{ background: "#0c0e10", border: "1px solid #161a1d" }}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest font-mono" style={{ color: "#4b5563" }}>{label}</span>
        <div className="w-7 h-7 rounded flex items-center justify-center"
          style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}>
          <Icon className="w-3.5 h-3.5" style={{ color: accent }} />
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold font-mono tracking-tight text-white">{value}</p>
        {sub && <p className="text-xs mt-1 font-mono" style={{ color: "#6b7280" }}>{sub}</p>}
      </div>
    </div>
  )
  return href ? <Link href={href} className="block">{inner}</Link> : inner
}

const INSIGHT_CONFIG = {
  warning: { color: "#f59e0b", icon: AlertTriangle, bg: "#f59e0b08" },
  tip: { color: "#3b82f6", icon: Lightbulb, bg: "#3b82f608" },
  success: { color: "#10b981", icon: CheckCircle2, bg: "#10b98108" },
  info: { color: "#6b7280", icon: Info, bg: "#6b728008" },
}

export default async function DashboardPage() {
  const [allProspects, clients, payments, kpis, overdueActions, insights] = await Promise.all([
    getProspects(),
    getClients(),
    getPayments(),
    getKPIs(),
    getOverdueActions(),
    getInsights(),
  ])

  const today = new Date().toISOString().split("T")[0]
  const activeClients = clients.filter((c) => c.status === "active")
  const mrr = activeClients.reduce((s, c) => s + c.mrr, 0)
  const openProposals = allProspects.filter((p) => p.stage === "propuesta")
  const pipelineValue = openProposals.reduce((s, p) => s + p.estimatedMrr, 0)
  const activeProspects = allProspects.filter((p) => !["cliente", "perdido"].includes(p.stage))
  const totalClosed = allProspects.filter((p) => p.stage === "cliente").length
  const totalLost = allProspects.filter((p) => p.stage === "perdido").length
  const winRate = totalClosed + totalLost > 0 ? Math.round((totalClosed / (totalClosed + totalLost)) * 100) : 0

  const stageCounts = STAGE_ORDER.reduce((acc, s) => {
    acc[s] = allProspects.filter((p) => p.stage === s).length
    return acc
  }, {} as Record<string, number>)

  const overduePayments = payments.filter((p) => p.status === "overdue" || (p.status !== "paid" && p.dueDate < today))
  const upcomingPayments = payments
    .filter((p) => p.status === "pending" && p.dueDate >= today)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 4)

  const thisWeekStart = getWeekStart()
  const thisWeekKPI = kpis.find((k) => k.weekStart === thisWeekStart)
  const target = KPI_TARGETS.early

  const recentProspects = [...allProspects]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Overview</h1>
          <p className="text-xs font-mono mt-1" style={{ color: "#4b5563" }}>
            {new Date().toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/api/dashboard/export"
            download
            className="flex items-center gap-2 text-xs font-mono px-3 py-2 rounded-md transition-all"
            style={{ background: "#0c0e10", border: "1px solid #161a1d", color: "#6b7280" }}
          >
            <Download className="w-3.5 h-3.5" /> Exportar
          </a>
          <Link
            href="/dashboard/prospectos"
            className="flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-md"
            style={{ background: "#10b981", color: "#000" }}
          >
            <Plus className="w-3.5 h-3.5" /> Nuevo prospecto
          </Link>
        </div>
      </div>

      {/* Alerts: overdue payments */}
      {overduePayments.length > 0 && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm"
          style={{ background: "#ef444410", border: "1px solid #ef444330", color: "#ef4444" }}>
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span className="font-mono text-xs">
            {overduePayments.length} pago{overduePayments.length > 1 ? "s" : ""} vencido{overduePayments.length > 1 ? "s" : ""} —{" "}
            <Link href="/dashboard/pagos" className="underline underline-offset-2">ver ahora</Link>
          </span>
        </div>
      )}

      {/* Alert: overdue next actions (Feature 2) */}
      {overdueActions.length > 0 && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm"
          style={{ background: "#f59e0b08", border: "1px solid #f59e0b25", color: "#f59e0b" }}>
          <Clock className="w-4 h-4 flex-shrink-0" />
          <span className="font-mono text-xs">
            {overdueActions.length} prospecto{overdueActions.length > 1 ? "s" : ""} con próxima acción vencida —{" "}
            <Link href="/dashboard/prospectos" className="underline underline-offset-2">revisar</Link>
            {": "}
            {overdueActions.slice(0, 2).map((p) => p.business).join(", ")}
            {overdueActions.length > 2 && ` y ${overdueActions.length - 2} más`}
          </span>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="MRR" value={`$${mrr.toLocaleString()}`} sub={`${activeClients.length} clientes activos`} icon={DollarSign} href="/dashboard/clientes" />
        <StatCard label="Prospectos activos" value={activeProspects.length} sub={`${openProposals.length} en propuesta`} accent="#f59e0b" icon={Users} href="/dashboard/prospectos" />
        <StatCard label="Pipeline estimado" value={`$${pipelineValue.toLocaleString()}`} sub={`${openProposals.length} propuestas abiertas`} accent="#8b5cf6" icon={FileText} href="/dashboard/pipeline" />
        <StatCard label="Win rate" value={`${winRate}%`} sub={`${totalClosed} cerrados / ${totalLost} perdidos`} accent="#3b82f6" icon={TrendingUp} />
      </div>

      {/* Pipeline + KPIs */}
      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-lg p-6 space-y-4" style={{ background: "#0c0e10", border: "1px solid #161a1d" }}>
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-widest" style={{ color: "#4b5563" }}>Pipeline</h2>
            <Link href="/dashboard/pipeline" className="text-[10px] font-mono flex items-center gap-1 hover:opacity-80" style={{ color: "#10b981" }}>
              Ver kanban <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3 pt-1">
            {STAGE_ORDER.map((s) => {
              const count = stageCounts[s] ?? 0
              const pct = allProspects.length > 0 ? (count / allProspects.length) * 100 : 0
              const color = STAGE_COLORS[s]
              return (
                <div key={s} className="flex items-center gap-3">
                  <span className="text-[10px] font-mono w-24 text-right flex-shrink-0" style={{ color: "#6b7280" }}>
                    {STAGE_LABELS[s]}
                  </span>
                  <div className="flex-1 h-1.5 rounded-full" style={{ background: "#141618" }}>
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: color }} />
                  </div>
                  <span className="text-xs font-bold font-mono w-6 flex-shrink-0" style={{ color }}>{count}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-lg p-6 space-y-4" style={{ background: "#0c0e10", border: "1px solid #161a1d" }}>
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-widest" style={{ color: "#4b5563" }}>KPIs — Esta semana</h2>
            <Link href="/dashboard/kpis" className="text-[10px] font-mono flex items-center gap-1 hover:opacity-80" style={{ color: "#10b981" }}>
              Ingresar <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          {thisWeekKPI ? (
            <div className="space-y-3 pt-1">
              {(Object.keys(KPI_FIELD_LABELS) as Array<keyof typeof KPI_FIELD_LABELS>).map((key) => {
                const value = thisWeekKPI[key] as number
                const t = target[key as keyof typeof target] as number
                const pct = Math.min((value / Math.max(t, 1)) * 100, 100)
                const color = pct >= 100 ? "#10b981" : pct >= 60 ? "#f59e0b" : "#ef4444"
                return (
                  <div key={key} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono" style={{ color: "#6b7280" }}>{KPI_FIELD_LABELS[key]}</span>
                      <span className="text-[10px] font-mono font-bold" style={{ color }}>{value}/{t}</span>
                    </div>
                    <div className="h-1 rounded-full" style={{ background: "#141618" }}>
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 gap-3">
              <p className="text-xs font-mono" style={{ color: "#374151" }}>Sin datos esta semana</p>
              <Link href="/dashboard/kpis" className="text-xs font-mono px-3 py-1.5 rounded transition-all"
                style={{ background: "#10b98120", color: "#10b981", border: "1px solid #10b98140" }}>
                Ingresar KPIs
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Insights panel (Feature 3) */}
      {insights.length > 0 && (
        <div className="rounded-lg" style={{ background: "#0c0e10", border: "1px solid #161a1d" }}>
          <div className="px-5 py-4 border-b" style={{ borderColor: "#141618" }}>
            <h2 className="text-xs font-mono uppercase tracking-widest" style={{ color: "#4b5563" }}>
              Sugerencias
            </h2>
          </div>
          <div className="divide-y" style={{ borderColor: "#0f1113" }}>
            {insights.map((insight, i) => {
              const cfg = INSIGHT_CONFIG[insight.type]
              const Icon = cfg.icon
              return (
                <div key={i} className="flex items-start gap-3 px-5 py-3.5 hover:bg-white/[0.015] transition-colors">
                  <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: cfg.bg }}>
                    <Icon className="w-3 h-3" style={{ color: cfg.color }} />
                  </div>
                  <p className="text-xs font-mono flex-1" style={{ color: "#9ca3af" }}>
                    {insight.message}
                  </p>
                  {insight.actionHref && (
                    <Link href={insight.actionHref}
                      className="text-[9px] font-mono px-2 py-1 rounded flex-shrink-0 transition-all hover:opacity-80"
                      style={{ background: `${cfg.color}15`, color: cfg.color, border: `1px solid ${cfg.color}30` }}>
                      {insight.action}
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Recent prospects + Upcoming payments */}
      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-lg" style={{ background: "#0c0e10", border: "1px solid #161a1d" }}>
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "#141618" }}>
            <h2 className="text-xs font-mono uppercase tracking-widest" style={{ color: "#4b5563" }}>Últimos prospectos</h2>
            <Link href="/dashboard/prospectos" className="text-[10px] font-mono flex items-center gap-1 hover:opacity-80" style={{ color: "#10b981" }}>
              Ver todos <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y" style={{ borderColor: "#0f1113" }}>
            {recentProspects.length === 0 ? (
              <p className="text-xs font-mono text-center py-8" style={{ color: "#374151" }}>Sin prospectos aún</p>
            ) : (
              recentProspects.map((p) => (
                <div key={p.id} className="flex items-center justify-between px-5 py-3 hover:bg-white/[0.02] transition-colors">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{p.business}</p>
                    <p className="text-[10px] font-mono truncate" style={{ color: "#6b7280" }}>{p.name}</p>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wide ml-3 flex-shrink-0"
                    style={{ color: STAGE_COLORS[p.stage as ProspectStage], background: `${STAGE_COLORS[p.stage as ProspectStage]}18`, border: `1px solid ${STAGE_COLORS[p.stage as ProspectStage]}30` }}>
                    {STAGE_LABELS[p.stage as ProspectStage]}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-lg" style={{ background: "#0c0e10", border: "1px solid #161a1d" }}>
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "#141618" }}>
            <h2 className="text-xs font-mono uppercase tracking-widest" style={{ color: "#4b5563" }}>Próximos pagos</h2>
            <Link href="/dashboard/pagos" className="text-[10px] font-mono flex items-center gap-1 hover:opacity-80" style={{ color: "#10b981" }}>
              Ver todos <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y" style={{ borderColor: "#0f1113" }}>
            {upcomingPayments.length === 0 ? (
              <p className="text-xs font-mono text-center py-8" style={{ color: "#374151" }}>Sin pagos pendientes</p>
            ) : (
              upcomingPayments.map((p) => {
                const days = Math.ceil((new Date(p.dueDate).getTime() - Date.now()) / 86400000)
                const urgency = days <= 3 ? "#ef4444" : days <= 7 ? "#f59e0b" : "#6b7280"
                return (
                  <div key={p.id} className="flex items-center justify-between px-5 py-3 hover:bg-white/[0.02] transition-colors">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{p.clientName}</p>
                      <p className="text-[10px] font-mono" style={{ color: urgency }}>
                        {days === 0 ? "Hoy" : `En ${days}d`} · {new Date(p.dueDate).toLocaleDateString("es-AR", { day: "2-digit", month: "short" })}
                      </p>
                    </div>
                    <span className="text-sm font-bold font-mono ml-3 flex-shrink-0" style={{ color: "#f59e0b" }}>
                      {p.currency} {p.amount.toLocaleString()}
                    </span>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
