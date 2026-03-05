export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import { getProspects } from "@/lib/actions/prospects"
import { getClients } from "@/lib/actions/clients"
import { getPayments } from "@/lib/actions/payments"
import { getKPIs } from "@/lib/actions/kpis"

export async function GET() {
  const [prospects, clients, payments, kpis] = await Promise.all([
    getProspects(),
    getClients(),
    getPayments(),
    getKPIs(),
  ])

  const data = {
    exportedAt: new Date().toISOString(),
    prospects,
    clients,
    payments,
    kpis,
  }

  return new NextResponse(JSON.stringify(data, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="disruptlab-crm-${new Date().toISOString().split("T")[0]}.json"`,
    },
  })
}
