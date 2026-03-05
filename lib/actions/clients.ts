"use server"

import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { db, clients, type NewClient } from "@/lib/db"

export async function getClients() {
  return db.select().from(clients).orderBy(clients.createdAt)
}

export async function addClient(data: Omit<NewClient, "id" | "createdAt">) {
  const [client] = await db.insert(clients).values(data).returning()
  revalidatePath("/dashboard")
  revalidatePath("/dashboard/clientes")
  return client
}

export async function updateClient(id: string, data: Partial<NewClient>) {
  const [updated] = await db
    .update(clients)
    .set(data)
    .where(eq(clients.id, id))
    .returning()
  revalidatePath("/dashboard")
  revalidatePath("/dashboard/clientes")
  return updated
}

export async function deleteClient(id: string) {
  await db.delete(clients).where(eq(clients.id, id))
  revalidatePath("/dashboard")
  revalidatePath("/dashboard/clientes")
}
