"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Database,
  Users,
  ShoppingCart,
  FileText,
  Cpu,
  Cloud,
  BarChart3,
  Webhook,
  ArrowRight,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"

const integrations = [
  {
    id: "crm",
    title: "CRM Integration",
    description: "Manage customer relationships, leads, and sales pipelines through our comprehensive CRM API.",
    icon: Users,
    category: "Business Management",
    endpoints: ["GET /api/customers", "POST /api/leads", "PUT /api/deals"],
    features: ["Customer Management", "Lead Tracking", "Sales Analytics"],
    status: "stable",
  },
  {
    id: "inventory",
    title: "Inventory Management",
    description: "Real-time inventory tracking, stock management, and automated reordering capabilities.",
    icon: ShoppingCart,
    category: "Business Management",
    endpoints: ["GET /api/inventory", "POST /api/products", "PUT /api/stock"],
    features: ["Stock Tracking", "Auto Reorder", "Multi-location"],
    status: "stable",
  },
  {
    id: "invoicing",
    title: "Invoicing & Billing",
    description: "Generate invoices, process payments, and manage billing cycles programmatically.",
    icon: FileText,
    category: "Business Management",
    endpoints: ["POST /api/invoices", "GET /api/payments", "PUT /api/billing"],
    features: ["Invoice Generation", "Payment Processing", "Recurring Billing"],
    status: "stable",
  },
  {
    id: "compute",
    title: "Cloud Compute",
    description: "Access high-performance GPU/CPU resources for AI, rendering, and data processing workloads.",
    icon: Cpu,
    category: "Infrastructure",
    endpoints: ["POST /api/compute/jobs", "GET /api/compute/status", "DELETE /api/compute/jobs"],
    features: ["GPU Acceleration", "Auto Scaling", "Job Queuing"],
    status: "beta",
  },
  {
    id: "storage",
    title: "Multi-Cloud Storage",
    description: "Unified storage API across multiple cloud providers with automatic failover and sync.",
    icon: Cloud,
    category: "Infrastructure",
    endpoints: ["PUT /api/storage/upload", "GET /api/storage/files", "DELETE /api/storage/files"],
    features: ["Multi-Provider", "Auto Sync", "CDN Integration"],
    status: "stable",
  },
  {
    id: "analytics",
    title: "Business Analytics",
    description: "Access comprehensive business metrics, reports, and real-time dashboard data.",
    icon: BarChart3,
    category: "Analytics",
    endpoints: ["GET /api/analytics/metrics", "POST /api/reports", "GET /api/dashboards"],
    features: ["Real-time Metrics", "Custom Reports", "Data Export"],
    status: "stable",
  },
  {
    id: "webhooks",
    title: "Webhooks & Events",
    description: "Real-time event notifications and webhook integrations for system synchronization.",
    icon: Webhook,
    category: "Integration",
    endpoints: ["POST /api/webhooks", "GET /api/events", "PUT /api/subscriptions"],
    features: ["Real-time Events", "Custom Triggers", "Retry Logic"],
    status: "stable",
  },
  {
    id: "database",
    title: "Database Access",
    description: "Direct database access with query optimization and connection pooling.",
    icon: Database,
    category: "Infrastructure",
    endpoints: ["POST /api/database/query", "GET /api/database/schema", "PUT /api/database/migrate"],
    features: ["Query Optimization", "Connection Pooling", "Schema Management"],
    status: "beta",
  },
]

export function ApiIntegrations() {
  return (
    <section id="api-integrations" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">API Integrations</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto text-balance">
            Connect your applications with our comprehensive suite of APIs. Built for developers, designed for scale.
          </p>
        </div>

        {/* Integration Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {integrations.map((integration) => (
            <Card
              key={integration.id}
              className="glass-border hover:glass-border-enhanced transition-all duration-300 group"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 rounded-lg bg-purple-600/20">
                    <integration.icon className="h-6 w-6 text-purple-400" />
                  </div>
                  <Badge
                    variant={integration.status === "stable" ? "default" : "secondary"}
                    className={
                      integration.status === "stable"
                        ? "bg-green-600/20 text-green-400"
                        : "bg-yellow-600/20 text-yellow-400"
                    }
                  >
                    {integration.status}
                  </Badge>
                </div>
                <CardTitle className="text-white text-lg">{integration.title}</CardTitle>
                <CardDescription className="text-gray-300 text-sm">{integration.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Category */}
                <Badge variant="outline" className="text-xs text-gray-400 border-gray-600">
                  {integration.category}
                </Badge>

                {/* Key Features */}
                <div>
                  <h4 className="text-sm font-medium text-white mb-2">Key Features</h4>
                  <div className="flex flex-wrap gap-1">
                    {integration.features.map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs bg-white/10 text-white/80">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Sample Endpoints */}
                <div>
                  <h4 className="text-sm font-medium text-white mb-2">Sample Endpoints</h4>
                  <div className="space-y-1">
                    {integration.endpoints.slice(0, 2).map((endpoint) => (
                      <code
                        key={endpoint}
                        className="block text-xs bg-black/30 text-purple-300 px-2 py-1 rounded font-mono"
                      >
                        {endpoint}
                      </code>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full mt-4 border-purple-600/50 text-purple-400 hover:bg-purple-600/20 group-hover:border-purple-500 bg-transparent"
                >
                  <Link href={`/docs/api/${integration.id}`}>
                    View Documentation
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all hover:scale-105"
          >
            <Link href="/docs/api">
              View Complete API Reference
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
