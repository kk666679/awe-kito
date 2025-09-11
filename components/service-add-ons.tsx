import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Headphones, Zap, Users, Database, Lock } from "lucide-react"

const addOns = [
  {
    icon: Shield,
    name: "Advanced Security",
    description: "Enhanced security features and compliance certifications",
    price: "RM 49/month",
    features: ["SOC 2 compliance", "Advanced threat detection", "Security auditing", "Custom security policies"],
  },
  {
    icon: Headphones,
    name: "Premium Support",
    description: "24/7 dedicated support with guaranteed response times",
    price: "RM 99/month",
    features: ["24/7 phone support", "Dedicated account manager", "Priority issue resolution", "Custom training"],
  },
  {
    icon: Zap,
    name: "Performance Plus",
    description: "Enhanced performance and monitoring capabilities",
    price: "RM 79/month",
    features: ["Advanced monitoring", "Performance optimization", "Custom dashboards", "Real-time alerts"],
  },
  {
    icon: Users,
    name: "Team Collaboration",
    description: "Advanced collaboration tools and workflow management",
    price: "RM 39/month",
    features: ["Advanced permissions", "Workflow automation", "Team analytics", "Custom roles"],
  },
  {
    icon: Database,
    name: "Data Analytics Pro",
    description: "Advanced analytics and business intelligence tools",
    price: "RM 129/month",
    features: ["Custom reports", "Predictive analytics", "Data visualization", "Export capabilities"],
  },
  {
    icon: Lock,
    name: "Compliance Suite",
    description: "Industry-specific compliance and regulatory tools",
    price: "RM 199/month",
    features: ["GDPR compliance", "Industry certifications", "Audit trails", "Compliance reporting"],
  },
]

export function ServiceAddOns() {
  return (
    <section className="container mx-auto px-4 py-16 sm:py-20">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">Service Add-Ons</h2>
        <p className="mt-4 text-lg text-neutral-300">Enhance your platform with additional capabilities</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {addOns.map((addon, index) => {
          const IconComponent = addon.icon
          return (
            <Card key={index} className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-lime-300/10 p-2">
                      <IconComponent className="h-6 w-6 text-lime-300" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white">{addon.name}</CardTitle>
                    </div>
                  </div>
                  <Badge className="bg-lime-300/10 text-lime-300 border border-lime-300/20">{addon.price}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-300 mb-4">{addon.description}</p>
                <ul className="space-y-2">
                  {addon.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm text-neutral-400">
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
