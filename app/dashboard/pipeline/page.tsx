export const dynamic = "force-dynamic"

import { getProspects } from "@/lib/actions/prospects"
import { PipelineClient } from "./client"

export default async function PipelinePage() {
  const prospects = await getProspects()
  return <PipelineClient prospects={prospects} />
}
