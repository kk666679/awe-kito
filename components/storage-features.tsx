import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Zap, BarChart3, Send as Sync, Lock, Globe, FileSearch, Workflow } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "End-to-end encryption, access controls, and compliance certifications across all providers.",
    benefits: ["AES-256 encryption", "IAM integration", "Audit logging", "Compliance ready"],
    color: "from-red-500/20 to-pink-500/20",
    borderColor: "border-red-500/30",
  },
  {
    icon: Zap,
    title: "Cost Optimization",
    description: "Intelligent storage tiering and cost analysis to minimize your multi-cloud storage expenses.",
    benefits: ["Automated tiering", "Cost analytics", "Usage forecasting", "Optimization alerts"],
    color: "from-yellow-500/20 to-orange-500/20",
    borderColor: "border-yellow-500/30",
  },
  {
    icon: BarChart3,
    title: "Analytics & Monitoring",
    description: "Comprehensive insights into storage usage, performance, and costs across all providers.",
    benefits: ["Usage analytics", "Performance metrics", "Cost tracking", "Custom dashboards"],
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
  },
  {
    icon: Sync,
    title: "Cross-Cloud Sync",
    description: "Seamlessly synchronize and replicate data between different cloud storage providers.",
    benefits: ["Real-time sync", "Conflict resolution", "Bandwidth optimization", "Selective sync"],
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
  },
  {
    icon: Lock,
    title: "Data Governance",
    description: "Centralized policies for data retention, classification, and compliance management.",
    benefits: ["Retention policies", "Data classification", "Compliance automation", "Policy enforcement"],
    color: "from-purple-500/20 to-violet-500/20",
    borderColor: "border-purple-500/30",
  },
  {
    icon: Globe,
    title: "Global CDN Integration",
    description: "Accelerate content delivery with integrated CDN services from multiple providers.",
    benefits: ["Edge caching", "Global distribution", "Performance optimization", "Bandwidth savings"],
    color: "from-indigo-500/20 to-blue-500/20",
    borderColor: "border-indigo-500/30",
  },
  {
    icon: FileSearch,
    title: "Intelligent Search",
    description: "AI-powered search and discovery across all your cloud storage repositories.",
    benefits: ["Content indexing", "Metadata search", "AI tagging", "Advanced filters"],
    color: "from-teal-500/20 to-cyan-500/20",
    borderColor: "border-teal-500/30",
  },
  {
    icon: Workflow,
    title: "Automation Workflows",
    description: "Create custom workflows for file processing, backup, and data lifecycle management.",
    benefits: ["Custom triggers", "Automated processing", "Workflow templates", "Event-driven actions"],
    color: "from-rose-500/20 to-pink-500/20",
    borderColor: "border-rose-500/30",
  },
]

export function StorageFeatures() {
  return (
    <section className="container mx-auto px-4 py-16 sm:py-20">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">Platform Features</h2>
        <p className="mt-4 text-lg text-neutral-300">Everything you need to manage multi-cloud storage effectively</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => {
          const IconComponent = feature.icon
          return (
            <Card
              key={index}
              className={`liquid-glass border ${feature.borderColor} bg-gradient-to-br ${feature.color} backdrop-blur-xl`}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-white/10 p-2">
                    <IconComponent className="h-6 w-6 text-lime-300" />
                  </div>
                  <CardTitle className="text-lg text-white">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-300 mb-4">{feature.description}</p>

                <div className="space-y-1">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center gap-2 text-xs text-neutral-400">
                      <div className="h-1.5 w-1.5 rounded-full bg-lime-300"></div>
                      {benefit}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
