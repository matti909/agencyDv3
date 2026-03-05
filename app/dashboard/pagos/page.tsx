export const dynamic = "force-dynamic"

import { getPayments } from "@/lib/actions/payments"
import { getClients } from "@/lib/actions/clients"
import { PagosClient } from "./client"

export default async function PagosPage() {
  const [payments, clients] = await Promise.all([getPayments(), getClients()])
  return <PagosClient payments={payments} clients={clients} />
}
