"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, UserCheck, CreditCard, BarChart2, GitBranch, ChevronRight } from "lucide-react"

const ICONS: Record<string, React.ElementType> = {
  LayoutDashboard,
  Users,
  UserCheck,
  CreditCard,
  BarChart2,
  GitBranch,
}

interface NavItem {
  href: string
  label: string
  icon: string
  exact?: boolean
}

export function SidebarNav({ nav }: { nav: NavItem[] }) {
  const pathname = usePathname()
  return (
    <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
      {nav.map(({ href, label, icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href)
        const Icon = ICONS[icon]
        return (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-150"
            style={{
              background: active ? "rgba(16,185,129,0.1)" : "transparent",
              color: active ? "#10b981" : "#6b7280",
              borderLeft: active ? "2px solid #10b981" : "2px solid transparent",
            }}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium">{label}</span>
            {active && <ChevronRight className="w-3 h-3 ml-auto opacity-60" />}
          </Link>
        )
      })}
    </nav>
  )
}
