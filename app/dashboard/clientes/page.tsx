export const dynamic = "force-dynamic"

import { getClients } from "@/lib/actions/clients"
import { ClientesClient } from "./client"

export default async function ClientesPage() {
  const clients = await getClients()
  return <ClientesClient clients={clients} />
}
