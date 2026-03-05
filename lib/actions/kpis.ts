"use server"

import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { db, weeklyKpis, type NewWeeklyKpi } from "@/lib/db"

export async function getKPIs() {
  return db.select().from(weeklyKpis).orderBy(weeklyKpis.weekStart)
}

export async function upsertKPI(data: Omit<NewWeeklyKpi, "id">) {
  const existing = await db
    .select()
    .from(weeklyKpis)
    .where(eq(weeklyKpis.weekStart, data.weekStart))

  if (existing.length > 0) {
    await db
      .update(weeklyKpis)
      .set(data)
      .where(eq(weeklyKpis.weekStart, data.weekStart))
  } else {
    await db.insert(weeklyKpis).values(data)
  }

  revalidatePath("/dashboard")
  revalidatePath("/dashboard/kpis")
}

