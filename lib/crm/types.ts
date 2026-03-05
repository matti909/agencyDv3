export type ProspectStage =
  | "lead"
  | "contactado"
  | "calificado"
  | "propuesta"
  | "cliente"
  | "perdido"

export type Sector =
  | "gastronomia"
  | "belleza"
  | "servicios-profesionales"
  | "moda"
  | "fitness"
  | "inmobiliaria"
  | "educacion"
  | "otro"

export type Channel =
  | "instagram"
  | "linkedin"
  | "referido"
  | "whatsapp"
  | "google"
  | "evento"
  | "otro"

export interface Prospect {
  id: string
  name: string
  business: string
  sector: Sector
  channel: Channel
  stage: ProspectStage
  firstContactDate: string
  nextAction: string
  nextActionDate: string
  estimatedMRR: number
  notes: string
  createdAt: string
  updatedAt: string
}

export interface Client {
  id: string
  name: string
  business: string
  sector: string
  services: string[]
  mrr: number
  setupFee: number
  startDate: string
  status: "active" | "at-risk" | "paused" | "churned"
  notes: string
  createdAt: string
}

export interface Payment {
  id: string
  clientId: string
  clientName: string
  amount: number
  currency: "USD" | "ARS"
  dueDate: string
  paidDate?: string
  status: "pending" | "paid" | "overdue"
  type: "setup" | "monthly" | "one-time"
  notes: string
}

export interface WeeklyKPI {
  id: string
  weekStart: string
  newProspects: number
  firstContacts: number
  responses: number
  auditsScheduled: number
  proposalsSent: number
  clientsClosed: number
  notes: string
}

export const STAGE_LABELS: Record<ProspectStage, string> = {
  lead: "Lead",
  contactado: "Contactado",
  calificado: "Calificado",
  propuesta: "Propuesta",
  cliente: "Cliente",
  perdido: "Perdido",
}

export const SECTOR_LABELS: Record<Sector, string> = {
  gastronomia: "Gastronomía",
  belleza: "Belleza & Estética",
  "servicios-profesionales": "Servicios Prof.",
  moda: "Moda",
  fitness: "Fitness",
  inmobiliaria: "Inmobiliaria",
  educacion: "Educación",
  otro: "Otro",
}

export const CHANNEL_LABELS: Record<Channel, string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  referido: "Referido",
  whatsapp: "WhatsApp",
  google: "Google",
  evento: "Evento",
  otro: "Otro",
}

export const KPI_TARGETS = {
  early: {
    label: "Semanas 1–4",
    newProspects: 50,
    firstContacts: 30,
    responses: 8,
    auditsScheduled: 3,
    proposalsSent: 2,
    clientsClosed: 1,
  },
  growth: {
    label: "Semanas 5–8",
    newProspects: 50,
    firstContacts: 30,
    responses: 10,
    auditsScheduled: 4,
    proposalsSent: 3,
    clientsClosed: 2,
  },
  scale: {
    label: "Semanas 9–12",
    newProspects: 30,
    firstContacts: 20,
    responses: 8,
    auditsScheduled: 4,
    proposalsSent: 3,
    clientsClosed: 2,
  },
}

export const KPI_FIELD_LABELS: Record<keyof Omit<WeeklyKPI, "id" | "weekStart" | "notes">, string> = {
  newProspects: "Prospectos nuevos",
  firstContacts: "Primeros contactos",
  responses: "Respuestas recibidas",
  auditsScheduled: "Auditorías agendadas",
  proposalsSent: "Propuestas enviadas",
  clientsClosed: "Clientes cerrados",
}
