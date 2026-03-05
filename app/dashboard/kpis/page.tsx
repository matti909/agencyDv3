export const dynamic = "force-dynamic"

import { getKPIs } from "@/lib/actions/kpis"
import { getWeekStart } from "@/lib/utils"
import { KPIsClient } from "./client"

export default async function KPIsPage() {
  const kpis = await getKPIs()
  const thisWeek = getWeekStart()
  return <KPIsClient kpis={kpis} thisWeek={thisWeek} />
}
