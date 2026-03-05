export const dynamic = "force-dynamic"

import Link from "next/link"
import { LayoutDashboard, Users, UserCheck, CreditCard, BarChart2, GitBranch, Zap } from "lucide-react"
import { getClients } from "@/lib/actions/clients"
import { getPayments } from "@/lib/actions/payments"
import { getProspects } from "@/lib/actions/prospects"
import { SidebarNav } from "./sidebar-nav"
import { LogoutButton } from "./logout-button"

const NAV = [
  { href: "/dashboard", label: "Overview", icon: "LayoutDashboard", exact: true },
  { href: "/dashboard/prospectos", label: "Prospectos", icon: "Users" },
  { href: "/dashboard/pipeline", label: "Pipeline", icon: "GitBranch" },
  { href: "/dashboard/clientes", label: "Clientes", icon: "UserCheck" },
  { href: "/dashboard/pagos", label: "Pagos", icon: "CreditCard" },
  { href: "/dashboard/kpis", label: "KPIs", icon: "BarChart2" },
]

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [clients, payments, prospects] = await Promise.all([
    getClients(),
    getPayments(),
    getProspects(),
  ])

  const mrr = clients.filter((c) => c.status === "active").reduce((s, c) => s + c.mrr, 0)
  const overdueCount = payments.filter((p) => p.status === "overdue").length
  const openProposals = prospects.filter((p) => p.stage === "propuesta").length

  return (
    <div className="min-h-screen" style={{ background: "#07080a" }}>
      <aside
        className="fixed left-0 top-0 h-screen w-56 flex flex-col z-50"
        style={{ background: "#08090a", borderRight: "1px solid #141618" }}
      >
        {/* Brand */}
        <div className="px-5 py-5 border-b" style={{ borderColor: "#141618" }}>
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #10b981, #0d9488)" }}
            >
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-white leading-none">DisruptLab</p>
              <p className="text-[9px] tracking-wider uppercase mt-0.5" style={{ color: "#10b981" }}>CRM</p>
            </div>
          </Link>
        </div>

        {/* Nav — client component for active state */}
        <SidebarNav nav={NAV} />

        {/* Stats footer */}
        <div className="px-4 py-4 border-t space-y-3" style={{ borderColor: "#141618" }}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest" style={{ color: "#374151" }}>MRR</span>
            <span className="font-mono text-sm font-bold" style={{ color: "#10b981" }}>${mrr.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest" style={{ color: "#374151" }}>Propuestas</span>
            <span className="font-mono text-sm font-semibold" style={{ color: "#f59e0b" }}>{openProposals}</span>
          </div>
          {overdueCount > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest" style={{ color: "#374151" }}>Vencidos</span>
              <span className="font-mono text-sm font-semibold" style={{ color: "#ef4444" }}>{overdueCount}</span>
            </div>
          )}
          <div className="pt-1">
            <LogoutButton />
          </div>
        </div>
      </aside>

      <main className="pl-56 min-h-screen">
        <div className="max-w-6xl mx-auto px-8 py-8">{children}</div>
      </main>
    </div>
  )
}
