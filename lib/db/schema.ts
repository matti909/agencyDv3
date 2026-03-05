import {
  pgTable,
  pgEnum,
  text,
  integer,
  timestamp,
  varchar,
  uuid,
  unique,
} from "drizzle-orm/pg-core"

// ── Enums ──────────────────────────────────────────────────────
export const prospectStageEnum = pgEnum("prospect_stage", [
  "lead",
  "contactado",
  "calificado",
  "propuesta",
  "cliente",
  "perdido",
])

export const sectorEnum = pgEnum("sector", [
  "gastronomia",
  "belleza",
  "servicios-profesionales",
  "moda",
  "fitness",
  "inmobiliaria",
  "educacion",
  "otro",
])

export const channelEnum = pgEnum("channel", [
  "instagram",
  "linkedin",
  "referido",
  "whatsapp",
  "google",
  "evento",
  "otro",
])

export const clientStatusEnum = pgEnum("client_status", [
  "active",
  "at-risk",
  "paused",
  "churned",
])

export const currencyEnum = pgEnum("currency", ["USD", "ARS"])

export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "paid",
  "overdue",
])

export const paymentTypeEnum = pgEnum("payment_type", [
  "setup",
  "monthly",
  "one-time",
])

// ── Tables ─────────────────────────────────────────────────────
export const prospects = pgTable("prospects", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  business: varchar("business", { length: 255 }).notNull(),
  sector: sectorEnum("sector").notNull().default("otro"),
  channel: channelEnum("channel").notNull().default("instagram"),
  stage: prospectStageEnum("stage").notNull().default("lead"),
  firstContactDate: text("first_contact_date").notNull().default(""),
  nextAction: text("next_action").notNull().default(""),
  nextActionDate: text("next_action_date").notNull().default(""),
  estimatedMrr: integer("estimated_mrr").notNull().default(0),
  notes: text("notes").notNull().default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const clients = pgTable("clients", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  business: varchar("business", { length: 255 }).notNull(),
  sector: varchar("sector", { length: 100 }).notNull().default(""),
  services: text("services").array().notNull().default([]),
  mrr: integer("mrr").notNull().default(0),
  setupFee: integer("setup_fee").notNull().default(0),
  startDate: text("start_date").notNull().default(""),
  status: clientStatusEnum("status").notNull().default("active"),
  notes: text("notes").notNull().default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const payments = pgTable("payments", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id"),
  clientName: varchar("client_name", { length: 255 }).notNull(),
  amount: integer("amount").notNull().default(0),
  currency: currencyEnum("currency").notNull().default("USD"),
  dueDate: text("due_date").notNull(),
  paidDate: text("paid_date"),
  status: paymentStatusEnum("status").notNull().default("pending"),
  type: paymentTypeEnum("type").notNull().default("monthly"),
  notes: text("notes").notNull().default(""),
})

export const weeklyKpis = pgTable(
  "weekly_kpis",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    weekStart: text("week_start").notNull(),
    newProspects: integer("new_prospects").notNull().default(0),
    firstContacts: integer("first_contacts").notNull().default(0),
    responses: integer("responses").notNull().default(0),
    auditsScheduled: integer("audits_scheduled").notNull().default(0),
    proposalsSent: integer("proposals_sent").notNull().default(0),
    clientsClosed: integer("clients_closed").notNull().default(0),
    notes: text("notes").notNull().default(""),
  },
  (t) => [unique("weekly_kpis_week_start_unique").on(t.weekStart)]
)

// ── Inferred types ─────────────────────────────────────────────
export type Prospect = typeof prospects.$inferSelect
export type NewProspect = typeof prospects.$inferInsert
export type Client = typeof clients.$inferSelect
export type NewClient = typeof clients.$inferInsert
export type Payment = typeof payments.$inferSelect
export type NewPayment = typeof payments.$inferInsert
export type WeeklyKpi = typeof weeklyKpis.$inferSelect
export type NewWeeklyKpi = typeof weeklyKpis.$inferInsert
