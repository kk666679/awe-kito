import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Database, FileText, CheckSquare, Building2, BarChart3, Bell, Shield } from "lucide-react"

const modules = [
  {
    icon: Building2,
    title: "Multi-Tenancy Core",
    description: "Secure workspace isolation for every business with complete data separation and user management.",
    features: ["Workspace isolation", "User role management", "Data security", "Custom branding"],
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
  },
  {
    icon: Users,
    title: "Customer CRM",
    description: "Comprehensive customer relationship management with contact tracking and interaction history.",
    features: ["Contact management", "Interaction history", "Lead tracking", "Customer insights"],
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
  },
  {
    icon: Database,
    title: "Inventory Management",
    description: "Real-time stock tracking with automated alerts and comprehensive product management.",
    features: ["Stock level tracking", "Low stock alerts", "Product catalog", "Supplier management"],
    color: "from-purple-500/20 to-violet-500/20",
    borderColor: "border-purple-500/30",
  },
  {
    icon: FileText,
    title: "Invoicing & Billing",
    description: "Automated invoice generation with payment tracking and financial reporting.",
    features: ["Invoice automation", "Payment tracking", "Financial reports", "Tax calculations"],
    color: "from-orange-500/20 to-red-500/20",
    borderColor: "border-orange-500/30",
  },
  {
    icon: CheckSquare,
    title: "Task Management",
    description: "Project organization with team collaboration and deadline tracking.",
    features: ["Project planning", "Team assignments", "Deadline tracking", "Progress monitoring"],
    color: "from-indigo-500/20 to-blue-500/20",
    borderColor: "border-indigo-500/30",
  },
  {
    icon: BarChart3,
    title: "Reporting Dashboard",
    description: "Comprehensive business analytics with real-time KPI tracking and insights.",
    features: ["Real-time analytics", "Custom reports", "KPI tracking", "Data visualization"],
    color: "from-teal-500/20 to-green-500/20",
    borderColor: "border-teal-500/30",
  },
  {
    icon: Bell,
    title: "Notification Service",
    description: "Multi-channel notifications for important business events and updates.",
    features: ["Email notifications", "In-app alerts", "SMS integration", "Custom triggers"],
    color: "from-yellow-500/20 to-orange-500/20",
    borderColor: "border-yellow-500/30",
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "Enterprise-grade security with data encryption and compliance monitoring.",
    features: ["Data encryption", "Access controls", "Audit logs", "Compliance reporting"],
    color: "from-red-500/20 to-pink-500/20",
    borderColor: "border-red-500/30",
  },
]

export function ModulesGrid() {
  return (
    <section className="container mx-auto px-4 py-16 sm:py-20">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">Comprehensive Business Management Modules</h2>
        <p className="mt-4 text-lg text-neutral-300">
          Everything you need to run your business efficiently in one integrated platform
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" style={{ willChange: "transform" }}>
        {modules.map((module, index) => {
          const IconComponent = module.icon
          return (
            <Card
              key={index}
              className={`liquid-glass border ${module.borderColor} bg-gradient-to-br ${module.color} backdrop-blur-xl`}
              style={{ willChange: "transform" }}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-white/10 p-2">
                    <IconComponent className="h-6 w-6 text-lime-300" />
                  </div>
                  <CardTitle className="text-lg text-white">{module.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-neutral-300">{module.description}</p>
                <ul className="space-y-2">
                  {module.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-xs text-neutral-400">
                      <div className="h-1.5 w-1.5 rounded-full bg-lime-300"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
