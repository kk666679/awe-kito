"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { ProjectsGrid } from "@/components/projects-grid"
import { ClientChat } from "@/components/client-chat"
import { WorkflowTracker } from "@/components/workflow-tracker"
import { DashboardStats } from "@/components/dashboard-stats"
import { WorkspaceSelector } from "@/components/workspace-selector"
import { BusinessModulesDashboard } from "@/components/business-modules-dashboard"
import { ComputeResourcesDashboard } from "@/components/compute-resources-dashboard"
import { MultiCloudStorageDashboard } from "@/components/multi-cloud-storage-dashboard"
import { CRMDashboard } from "@/components/crm-dashboard"
import { InventoryDashboard } from "@/components/inventory-dashboard"

export default function DashboardPage() {
  const [activeView, setActiveView] = useState("overview")

  useEffect(() => {
    const handleResizeObserverError = (e: ErrorEvent) => {
      if (e.message === "ResizeObserver loop completed with undelivered notifications.") {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
    }

    window.addEventListener("error", handleResizeObserverError)

    return () => {
      window.removeEventListener("error", handleResizeObserverError)
    }
  }, [])

  const renderDashboardContent = () => {
    switch (activeView) {
      case "business":
        return <BusinessModulesDashboard />
      case "customers":
        return <CRMDashboard />
      case "inventory":
        return <InventoryDashboard />
      case "compute":
        return <ComputeResourcesDashboard />
      case "storage":
        return <MultiCloudStorageDashboard />
      default:
        return (
          <>
            {/* Dashboard Stats */}
            <DashboardStats />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Projects Section */}
              <div className="lg:col-span-2 space-y-6">
                <ProjectsGrid />
                <WorkflowTracker />
              </div>

              {/* Client Communication */}
              <div className="lg:col-span-1">
                <ClientChat />
              </div>
            </div>
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="flex">
        <DashboardSidebar activeView={activeView} onViewChange={setActiveView} />

        <main className="flex-1 p-6 space-y-6">
          <WorkspaceSelector />

          {renderDashboardContent()}
        </main>
      </div>
    </div>
  )
}
