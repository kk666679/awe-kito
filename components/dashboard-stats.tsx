"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Clock, CheckCircle, DollarSign } from "lucide-react"

export function DashboardStats() {
  const stats = [
    {
      title: "Active Projects",
      value: "12",
      change: "+2 from last month",
      icon: TrendingUp,
      color: "text-chart-1",
    },
    {
      title: "In Progress",
      value: "8",
      change: "4 pending review",
      icon: Clock,
      color: "text-chart-2",
    },
    {
      title: "Completed",
      value: "24",
      change: "+6 this month",
      icon: CheckCircle,
      color: "text-chart-3",
    },
    {
      title: "Revenue",
      value: "$18,420",
      change: "+12% from last month",
      icon: DollarSign,
      color: "text-accent",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" style={{ willChange: "transform" }}>
      {stats.map((stat) => (
        <Card key={stat.title} className="glass-border" style={{ willChange: "transform" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
