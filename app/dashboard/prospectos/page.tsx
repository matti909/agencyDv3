export const dynamic = "force-dynamic"

import { getProspects } from "@/lib/actions/prospects"
import { ProspectosClient } from "./client"

export default async function ProspectosPage() {
  const prospects = await getProspects()
  return <ProspectosClient prospects={prospects} />
}
