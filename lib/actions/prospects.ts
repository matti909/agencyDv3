"use server"

import { revalidatePath } from "next/cache"
import { eq, and, lt, ne, notInArray } from "drizzle-orm"
import { db, prospects, clients, type NewProspect } from "@/lib/db"

export async function getProspects() {
  return db.select().from(prospects).orderBy(prospects.createdAt)
}

export async function getOverdueActions() {
  const today = new Date().toISOString().split("T")[0]
  return db
    .select()
    .from(prospects)
    .where(
      and(
        ne(prospects.nextActionDate, ""),
        lt(prospects.nextActionDate, today),
        notInArray(prospects.stage, ["cliente", "perdido"])
      )
    )
    .orderBy(prospects.nextActionDate)
}

export async function addProspect(data: Omit<NewProspect, "id" | "createdAt" | "updatedAt">) {
  const [prospect] = await db.insert(prospects).values(data).returning()
  revalidatePath("/dashboard")
  revalidatePath("/dashboard/prospectos")
  return prospect
}

export async function updateProspect(id: string, data: Partial<NewProspect>) {
  const [updated] = await db
    .update(prospects)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(prospects.id, id))
    .returning()
  revalidatePath("/dashboard")
  revalidatePath("/dashboard/prospectos")
  revalidatePath("/dashboard/pipeline")
  return updated
}

export async function deleteProspect(id: string) {
  await db.delete(prospects).where(eq(prospects.id, id))
  revalidatePath("/dashboard")
  revalidatePath("/dashboard/prospectos")
}

export async function convertToClient(prospectId: string) {
  const [prospect] = await db.select().from(prospects).where(eq(prospects.id, prospectId))
  if (!prospect) throw new Error("Prospecto no encontrado")

  await db.insert(clients).values({
    name: prospect.name,
    business: prospect.business,
    sector: prospect.sector,
    services: [],
    mrr: prospect.estimatedMrr,
    setupFee: 0,
    startDate: new Date().toISOString().split("T")[0],
    status: "active",
    notes: prospect.notes,
  })

  await db
    .update(prospects)
    .set({ stage: "cliente", updatedAt: new Date() })
    .where(eq(prospects.id, prospectId))

  revalidatePath("/dashboard")
  revalidatePath("/dashboard/prospectos")
  revalidatePath("/dashboard/clientes")
}
