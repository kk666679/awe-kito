import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, UserPlus, Phone, Mail, Calendar, TrendingUp, Star } from "lucide-react"

const crmStats = [
  {
    icon: Users,
    title: "Total Customers",
    value: "1,247",
    change: "+12%",
    description: "Active customers",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    icon: UserPlus,
    title: "New This Month",
    value: "89",
    change: "+23%",
    description: "New acquisitions",
    color: "text-green-400",
    bgColor: "bg-green-400/10",
  },
  {
    icon: Star,
    title: "VIP Customers",
    value: "156",
    change: "+8%",
    description: "High-value clients",
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
  },
  {
    icon: TrendingUp,
    title: "Conversion Rate",
    value: "24.5%",
    change: "+5%",
    description: "Lead to customer",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
  },
]

const recentCustomers = [
  {
    name: "Tech Solutions Sdn Bhd",
    email: "contact@techsolutions.my",
    phone: "+60123456789",
    status: "active",
    value: "RM 25,000",
    lastContact: "2 hours ago",
    priority: "high",
  },
  {
    name: "Digital Marketing Agency",
    email: "hello@digitalmarketing.my",
    phone: "+60198765432",
    status: "prospect",
    value: "RM 15,000",
    lastContact: "1 day ago",
    priority: "medium",
  },
  {
    name: "E-commerce Store",
    email: "support@ecommerce.my",
    phone: "+60187654321",
    status: "active",
    value: "RM 8,500",
    lastContact: "3 days ago",
    priority: "low",
  },
]

const upcomingTasks = [
  {
    type: "call",
    title: "Follow-up call with Tech Solutions",
    time: "Today, 2:00 PM",
    customer: "Tech Solutions Sdn Bhd",
    priority: "high",
  },
  {
    type: "meeting",
    title: "Product demo for Digital Marketing",
    time: "Tomorrow, 10:00 AM",
    customer: "Digital Marketing Agency",
    priority: "medium",
  },
  {
    type: "email",
    title: "Send proposal to E-commerce Store",
    time: "Friday, 9:00 AM",
    customer: "E-commerce Store",
    priority: "low",
  },
]

export function CRMDashboard() {
  return (
    <div className="space-y-6">
      {/* CRM Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {crmStats.map((stat, index) => {
          const IconComponent = stat.icon
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

      {/* Recent Customers and Upcoming Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Customers */}
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Recent Customers</CardTitle>
            <Button size="sm" className="bg-lime-400 text-black hover:bg-lime-300">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCustomers.map((customer, index) => (
                <div key={index} className="rounded-lg bg-white/5 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-white">{customer.name}</p>
                      <p className="text-xs text-neutral-400">{customer.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={customer.status === "active" ? "default" : "secondary"}
                        className={
                          customer.status === "active"
                            ? "bg-green-500/20 text-green-300"
                            : "bg-yellow-500/20 text-yellow-300"
                        }
                      >
                        {customer.status}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          customer.priority === "high"
                            ? "border-red-500/30 text-red-300"
                            : customer.priority === "medium"
                              ? "border-yellow-500/30 text-yellow-300"
                              : "border-green-500/30 text-green-300"
                        }
                      >
                        {customer.priority}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span>{customer.phone}</span>
                    <span className="font-semibold text-lime-300">{customer.value}</span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">Last contact: {customer.lastContact}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Upcoming Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                  <div className="rounded-lg bg-white/10 p-2">
                    {task.type === "call" ? (
                      <Phone className="h-4 w-4 text-blue-300" />
                    ) : task.type === "meeting" ? (
                      <Calendar className="h-4 w-4 text-green-300" />
                    ) : (
                      <Mail className="h-4 w-4 text-purple-300" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{task.title}</p>
                    <p className="text-xs text-neutral-400">{task.customer}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-neutral-500">{task.time}</span>
                      <Badge
                        variant="outline"
                        className={
                          task.priority === "high"
                            ? "border-red-500/30 text-red-300"
                            : task.priority === "medium"
                              ? "border-yellow-500/30 text-yellow-300"
                              : "border-green-500/30 text-green-300"
                        }
                      >
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="bg-blue-500/20 border border-blue-500/30 text-blue-300 hover:bg-blue-500/30">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
            <Button className="bg-green-500/20 border border-green-500/30 text-green-300 hover:bg-green-500/30">
              <Phone className="h-4 w-4 mr-2" />
              Schedule Call
            </Button>
            <Button className="bg-purple-500/20 border border-purple-500/30 text-purple-300 hover:bg-purple-500/30">
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
            <Button className="bg-orange-500/20 border border-orange-500/30 text-orange-300 hover:bg-orange-500/30">
              <Calendar className="h-4 w-4 mr-2" />
              Book Meeting
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
