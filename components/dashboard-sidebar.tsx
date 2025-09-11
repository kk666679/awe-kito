"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Building,
  Cpu,
  Database,
  Users,
  Workflow,
  BarChart3,
  Settings,
  Calendar,
  ShoppingCart,
  FileText,
  Cloud,
  Shield,
  CreditCard,
} from "lucide-react"

interface DashboardSidebarProps {
  activeView?: string
  onViewChange?: (view: string) => void
}

export function DashboardSidebar({ activeView = "overview", onViewChange }: DashboardSidebarProps) {
  const menuItems = [
    { icon: Home, label: "Overview", view: "overview", count: null },
    { icon: Building, label: "Business Suite", view: "business", count: null, divider: true },
    { icon: Users, label: "Customer CRM", view: "customers", count: 234 },
    { icon: ShoppingCart, label: "Inventory", view: "inventory", count: 89 },
    { icon: FileText, label: "Invoicing", view: "invoicing", count: 12 },
    { icon: Workflow, label: "Task Management", view: "tasks", count: 24 },
    { icon: Cpu, label: "Compute Platform", view: "compute", count: null, divider: true },
    { icon: Database, label: "Job Queue", view: "jobs", count: 8 },
    { icon: Cloud, label: "Multi-Cloud Storage", view: "storage", count: null },
    { icon: BarChart3, label: "Analytics & Reports", view: "analytics", count: null, divider: true },
    { icon: Shield, label: "Monitoring", view: "monitoring", count: null },
    { icon: CreditCard, label: "Billing & Usage", view: "billing", count: null },
    { icon: Calendar, label: "Schedule", view: "schedule", count: null },
    { icon: Settings, label: "Settings", view: "settings", count: null },
  ]

  const handleItemClick = (view: string) => {
    if (onViewChange) {
      onViewChange(view)
    }
  }

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border p-4">
      <nav className="space-y-1">
        {menuItems.map((item, index) => (
          <div key={item.label}>
            {item.divider && index > 0 && <div className="my-3 border-t border-sidebar-border/50" />}
            <Button
              variant={activeView === item.view ? "secondary" : "ghost"}
              className={`w-full justify-start ${
                activeView === item.view
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/10"
              }`}
              onClick={() => handleItemClick(item.view)}
            >
              <item.icon className="h-4 w-4 mr-3" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.count && (
                <Badge variant="secondary" className="ml-auto">
                  {item.count}
                </Badge>
              )}
            </Button>
          </div>
        ))}
      </nav>
    </aside>
  )
}
