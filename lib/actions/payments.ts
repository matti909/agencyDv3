"use server"

import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { db, payments, type NewPayment } from "@/lib/db"

export async function getPayments() {
  return db.select().from(payments).orderBy(payments.dueDate)
}

export async function addPayment(data: Omit<NewPayment, "id">) {
  const [payment] = await db.insert(payments).values(data).returning()
  revalidatePath("/dashboard")
  revalidatePath("/dashboard/pagos")
  return payment
}

export async function updatePayment(id: string, data: Partial<NewPayment>) {
  const [updated] = await db
    .update(payments)
    .set(data)
    .where(eq(payments.id, id))
    .returning()
  revalidatePath("/dashboard")
  revalidatePath("/dashboard/pagos")
  return updated
}

export async function markPaid(id: string) {
  const [updated] = await db
    .update(payments)
    .set({ status: "paid", paidDate: new Date().toISOString().split("T")[0] })
    .where(eq(payments.id, id))
    .returning()
  revalidatePath("/dashboard")
  revalidatePath("/dashboard/pagos")
  return updated
}
