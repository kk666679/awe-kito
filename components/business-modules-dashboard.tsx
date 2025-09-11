import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Database, FileText, CheckSquare, TrendingUp, AlertCircle } from "lucide-react"

const moduleStats = [
  {
    iconName: "Users",
    title: "Customer CRM",
    value: "1,247",
    change: "+12%",
    description: "Active customers",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    iconName: "Database",
    title: "Inventory",
    value: "3,456",
    change: "-5%",
    description: "Items in stock",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
  },
  {
    iconName: "FileText",
    title: "Invoices",
    value: "RM 89,234",
    change: "+23%",
    description: "This month",
    color: "text-green-400",
    bgColor: "bg-green-400/10",
  },
  {
    iconName: "CheckSquare",
    title: "Tasks",
    value: "156",
    change: "+8%",
    description: "Active tasks",
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
  },
]

const recentActivities = [
  {
    type: "invoice",
    title: "Invoice #INV-2024-001 created",
    description: "RM 2,500 for Tech Solutions Sdn Bhd",
    time: "2 hours ago",
    iconName: "FileText",
  },
  {
    type: "customer",
    title: "New customer added",
    description: "Digital Marketing Agency joined",
    time: "4 hours ago",
    iconName: "Users",
  },
  {
    type: "inventory",
    title: "Low stock alert",
    description: "MacBook Pro M3 - Only 3 units left",
    time: "6 hours ago",
    iconName: "AlertCircle",
  },
  {
    type: "task",
    title: "Task completed",
    description: "Website redesign project finished",
    time: "1 day ago",
    iconName: "CheckSquare",
  },
]

const getIcon = (iconName: string) => {
  const icons = {
    Users,
    Database,
    FileText,
    CheckSquare,
    AlertCircle,
  }
  return icons[iconName as keyof typeof icons] || Users
}

export function BusinessModulesDashboard() {
  return (
    <div className="space-y-6">
      {/* Module Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {moduleStats.map((stat, index) => {
          const IconComponent = getIcon(stat.iconName)
          return (
            <Card key={index} className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-neutral-400">{stat.description}</p>
                  </div>
                  <div className={`rounded-lg p-3 ${stat.bgColor}`}>
                    <IconComponent className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-green-400">{stat.change}</span>
                  <span className="text-sm text-neutral-400">vs last month</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Business Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const IconComponent = getIcon(activity.iconName)
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="rounded-lg bg-white/10 p-2">
                      <IconComponent className="h-4 w-4 text-lime-300" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{activity.title}</p>
                      <p className="text-xs text-neutral-400">{activity.description}</p>
                      <p className="text-xs text-neutral-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button className="bg-blue-500/20 border border-blue-500/30 text-blue-300 hover:bg-blue-500/30">
                <Users className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
              <Button className="bg-purple-500/20 border border-purple-500/30 text-purple-300 hover:bg-purple-500/30">
                <Database className="h-4 w-4 mr-2" />
                Add Product
              </Button>
              <Button className="bg-green-500/20 border border-green-500/30 text-green-300 hover:bg-green-500/30">
                <FileText className="h-4 w-4 mr-2" />
                Create Invoice
              </Button>
              <Button className="bg-orange-500/20 border border-orange-500/30 text-orange-300 hover:bg-orange-500/30">
                <CheckSquare className="h-4 w-4 mr-2" />
                New Task
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
