"use server"

import { db, prospects, clients, weeklyKpis } from "@/lib/db"
import { eq, and } from "drizzle-orm"
import { getWeekStart } from "@/lib/utils"
import { KPI_TARGETS } from "@/lib/crm/types"

export type Insight = {
  type: "warning" | "tip" | "success" | "info"
  message: string
  action?: string
  actionHref?: string
}

export async function getInsights(): Promise<Insight[]> {
  const insights: Insight[] = []
  const today = new Date().toISOString().split("T")[0]
  const thisWeek = getWeekStart()

  const [allProspects, allClients, allKPIs] = await Promise.all([
    db.select().from(prospects),
    db.select().from(clients),
    db.select().from(weeklyKpis),
  ])

  // ── Propuestas abiertas > 14 días ─────────────────────────
  const stalePropuestas = allProspects.filter((p) => {
    if (p.stage !== "propuesta") return false
    const days = Math.floor((Date.now() - new Date(p.updatedAt).getTime()) / 86400000)
    return days > 14
  })
  if (stalePropuestas.length > 0) {
    insights.push({
      type: "warning",
      message: `${stalePropuestas.length} propuesta${stalePropuestas.length > 1 ? "s" : ""} lleva${stalePropuestas.length === 1 ? "" : "n"} más de 14 días sin respuesta. Hacé seguimiento hoy.`,
      action: "Ver prospectos",
      actionHref: "/dashboard/prospectos",
    })
  }

  // ── Win rate bajo ──────────────────────────────────────────
  const closed = allProspects.filter((p) => p.stage === "cliente").length
  const lost = allProspects.filter((p) => p.stage === "perdido").length
  const total = closed + lost
  if (total >= 5) {
    const winRate = Math.round((closed / total) * 100)
    if (winRate < 20) {
      insights.push({
        type: "tip",
        message: `Tu win rate es ${winRate}%. Revisá los motivos de pérdida y ajustá el proceso de calificación antes de enviar más propuestas.`,
      })
    } else if (winRate >= 40) {
      insights.push({
        type: "success",
        message: `Win rate del ${winRate}% — muy por encima del promedio. Tu proceso de calificación está funcionando bien.`,
      })
    }
  }

  // ── Canal con mejor tasa de cierre ────────────────────────
  const channelStats: Record<string, { closed: number; total: number }> = {}
  allProspects.forEach((p) => {
    if (!channelStats[p.channel]) channelStats[p.channel] = { closed: 0, total: 0 }
    channelStats[p.channel].total++
    if (p.stage === "cliente") channelStats[p.channel].closed++
  })
  let bestChannel = ""
  let bestRate = 0
  Object.entries(channelStats).forEach(([channel, stats]) => {
    if (stats.total >= 3) {
      const rate = stats.closed / stats.total
      if (rate > bestRate) {
        bestRate = rate
        bestChannel = channel
      }
    }
  })
  if (bestChannel && bestRate > 0) {
    const channelLabel: Record<string, string> = {
      instagram: "Instagram",
      linkedin: "LinkedIn",
      referido: "Referidos",
      whatsapp: "WhatsApp",
      google: "Google",
      evento: "Eventos",
      otro: "Otros canales",
    }
    insights.push({
      type: "success",
      message: `${channelLabel[bestChannel] ?? bestChannel} es tu canal más efectivo (${Math.round(bestRate * 100)}% de cierre). Concentrate más los outreach por ahí.`,
    })
  }

  // ── KPIs esta semana ───────────────────────────────────────
  const thisWeekKPI = allKPIs.find((k) => k.weekStart === thisWeek)
  if (thisWeekKPI) {
    const target = KPI_TARGETS.early
    const lowFields: string[] = []
    if (thisWeekKPI.newProspects < target.newProspects * 0.6) lowFields.push("prospectos nuevos")
    if (thisWeekKPI.firstContacts < target.firstContacts * 0.6) lowFields.push("primeros contactos")
    if (thisWeekKPI.proposalsSent < target.proposalsSent * 0.6) lowFields.push("propuestas")
    if (lowFields.length > 0) {
      insights.push({
        type: "warning",
        message: `Esta semana estás por debajo del 60% en: ${lowFields.join(", ")}. Quedan días para recuperar.`,
        action: "Ver KPIs",
        actionHref: "/dashboard/kpis",
      })
    }
  } else {
    insights.push({
      type: "info",
      message: "No ingresaste los KPIs de esta semana todavía.",
      action: "Ingresar ahora",
      actionHref: "/dashboard/kpis",
    })
  }

  // ── Clientes en riesgo ─────────────────────────────────────
  const atRisk = allClients.filter((c) => c.status === "at-risk")
  if (atRisk.length > 0) {
    insights.push({
      type: "warning",
      message: `${atRisk.length} cliente${atRisk.length > 1 ? "s" : ""} marcado${atRisk.length > 1 ? "s" : ""} como "en riesgo". Agendá una llamada de check-in esta semana.`,
      action: "Ver clientes",
      actionHref: "/dashboard/clientes",
    })
  }

  // ── MRR positivo ───────────────────────────────────────────
  const activeMRR = allClients.filter((c) => c.status === "active").reduce((s, c) => s + c.mrr, 0)
  if (activeMRR > 0) {
    insights.push({
      type: "success",
      message: `MRR actual: $${activeMRR.toLocaleString()} USD. Con ${allClients.filter((c) => c.status === "active").length} cliente${allClients.filter((c) => c.status === "active").length !== 1 ? "s" : ""} activo${allClients.filter((c) => c.status === "active").length !== 1 ? "s" : ""}.`,
    })
  }

  // ── Sin actividad en pipeline ──────────────────────────────
  const activeStages = ["lead", "contactado", "calificado", "propuesta"]
  const activeProspects = allProspects.filter((p) => activeStages.includes(p.stage))
  if (activeProspects.length === 0) {
    insights.push({
      type: "tip",
      message: "No tenés prospectos activos en el pipeline. Es momento de hacer outreach.",
      action: "Agregar prospecto",
      actionHref: "/dashboard/prospectos",
    })
  }

  return insights
}
