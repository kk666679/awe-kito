"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Building, Zap, Crown, Users, Database, Cpu, Cloud } from "lucide-react"

const platformPlans = [
  {
    name: "Starter",
    description: "Perfect for small businesses getting started",
    icon: Building,
    monthlyPrice: "RM 99",
    yearlyPrice: "RM 990",
    yearlyDiscount: "2 months free",
    features: [
      "Up to 5 team members",
      "Basic business modules (CRM, Invoicing)",
      "5GB cloud storage",
      "Email support",
      "Basic analytics",
      "Mobile apps",
    ],
    limits: {
      users: "5 users",
      storage: "5GB",
      compute: "10 CPU hours/month",
      support: "Email support",
    },
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    description: "For growing businesses with advanced needs",
    icon: Zap,
    monthlyPrice: "RM 299",
    yearlyPrice: "RM 2,990",
    yearlyDiscount: "2 months free",
    features: [
      "Up to 25 team members",
      "All business modules",
      "100GB cloud storage",
      "Priority support",
      "Advanced analytics",
      "API access",
      "Custom integrations",
      "Multi-workspace support",
    ],
    limits: {
      users: "25 users",
      storage: "100GB",
      compute: "100 CPU hours/month",
      support: "Priority support",
    },
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations with custom requirements",
    icon: Crown,
    monthlyPrice: "Custom",
    yearlyPrice: "Custom",
    yearlyDiscount: "Volume discounts",
    features: [
      "Unlimited team members",
      "All business modules + custom",
      "Unlimited cloud storage",
      "24/7 dedicated support",
      "Custom analytics & reporting",
      "White-label options",
      "On-premise deployment",
      "SLA guarantees",
      "Dedicated account manager",
    ],
    limits: {
      users: "Unlimited",
      storage: "Unlimited",
      compute: "Custom allocation",
      support: "24/7 dedicated",
    },
    cta: "Contact Sales",
    popular: false,
  },
]

const computePricing = [
  {
    type: "CPU Instances",
    icon: Cpu,
    pricing: [
      { name: "Standard CPU", price: "RM 0.20/vCPU/hour", specs: "2-8 vCPUs, 4-32GB RAM" },
      { name: "High-Memory CPU", price: "RM 0.32/vCPU/hour", specs: "4-16 vCPUs, 16-128GB RAM" },
      { name: "Compute Optimized", price: "RM 0.48/vCPU/hour", specs: "8-32 vCPUs, 16-64GB RAM" },
    ],
  },
  {
    type: "GPU Instances",
    icon: Zap,
    pricing: [
      { name: "NVIDIA T4", price: "RM 1.40/hour", specs: "16GB GDDR6, 2,560 CUDA cores" },
      { name: "NVIDIA V100", price: "RM 9.92/hour", specs: "32GB HBM2, 5,120 CUDA cores" },
      { name: "NVIDIA A100", price: "RM 16.40/hour", specs: "80GB HBM2e, 6,912 CUDA cores" },
    ],
  },
]

const storagePricing = [
  {
    provider: "Multi-Cloud Management",
    icon: Cloud,
    tiers: [
      { name: "Standard Storage", price: "RM 0.092/GB/month", description: "Frequently accessed data" },
      { name: "Infrequent Access", price: "RM 0.046/GB/month", description: "Monthly access patterns" },
      { name: "Archive Storage", price: "RM 0.016/GB/month", description: "Long-term archival" },
    ],
  },
]

export function PlatformPricing() {
  const [billingCycle, setBillingCycle] = useState("monthly")

  return (
    <section className="container mx-auto px-4 py-16 sm:py-20">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">Platform Pricing</h2>
        <p className="mt-4 text-lg text-neutral-300">Choose the right plan for your business needs</p>
      </div>

      <Tabs defaultValue="platform" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10">
          <TabsTrigger
            value="platform"
            className="data-[state=active]:bg-lime-300/20 data-[state=active]:text-lime-300"
          >
            <Users className="h-4 w-4 mr-2" />
            Platform Plans
          </TabsTrigger>
          <TabsTrigger value="compute" className="data-[state=active]:bg-lime-300/20 data-[state=active]:text-lime-300">
            <Cpu className="h-4 w-4 mr-2" />
            Compute Resources
          </TabsTrigger>
          <TabsTrigger value="storage" className="data-[state=active]:bg-lime-300/20 data-[state=active]:text-lime-300">
            <Database className="h-4 w-4 mr-2" />
            Storage & Data
          </TabsTrigger>
        </TabsList>

        <TabsContent value="platform" className="mt-8">
          {/* Billing Toggle */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-4 p-1 rounded-full bg-white/5 border border-white/10">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  billingCycle === "monthly" ? "bg-lime-300 text-black" : "text-white hover:bg-white/10"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  billingCycle === "yearly" ? "bg-lime-300 text-black" : "text-white hover:bg-white/10"
                }`}
              >
                Yearly
                <Badge className="ml-2 bg-green-500/20 text-green-300 text-xs">Save 20%</Badge>
              </button>
            </div>
          </div>

          {/* Platform Plans */}
          <div className="grid gap-8 md:grid-cols-3">
            {platformPlans.map((plan, index) => {
              const IconComponent = plan.icon
              return (
                <Card
                  key={index}
                  className={`liquid-glass border backdrop-blur-xl relative ${
                    plan.popular ? "border-lime-300/50 bg-lime-300/10 scale-105" : "border-white/10 bg-white/5"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-lime-300 text-black">Most Popular</Badge>
                    </div>
                  )}

                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 rounded-lg bg-white/10 p-3 w-fit">
                      <IconComponent className={`h-8 w-8 ${plan.popular ? "text-lime-300" : "text-white"}`} />
                    </div>
                    <CardTitle className="text-xl text-white">{plan.name}</CardTitle>
                    <p className="text-sm text-neutral-300">{plan.description}</p>
                    <div className="mt-4">
                      <div className={`text-3xl font-bold ${plan.popular ? "text-lime-300" : "text-white"}`}>
                        {billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                        {plan.monthlyPrice !== "Custom" && (
                          <span className="text-lg font-normal text-neutral-400">
                            /{billingCycle === "monthly" ? "month" : "year"}
                          </span>
                        )}
                      </div>
                      {billingCycle === "yearly" && plan.yearlyDiscount && (
                        <p className="text-sm text-green-400 mt-1">{plan.yearlyDiscount}</p>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          <Check className={`h-4 w-4 ${plan.popular ? "text-lime-300" : "text-white"}`} />
                          <span className="text-sm text-neutral-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full rounded-full mb-4 ${
                        plan.popular
                          ? "bg-lime-400 text-black hover:bg-lime-300"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      {plan.cta}
                    </Button>

                    <div className="text-xs text-neutral-400 space-y-1">
                      <div className="flex justify-between">
                        <span>Users:</span>
                        <span>{plan.limits.users}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Storage:</span>
                        <span>{plan.limits.storage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Compute:</span>
                        <span>{plan.limits.compute}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="compute" className="mt-8">
          <div className="grid gap-8 md:grid-cols-2">
            {computePricing.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Card key={index} className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-lime-300/10 p-2">
                        <IconComponent className="h-6 w-6 text-lime-300" />
                      </div>
                      <CardTitle className="text-xl text-white">{category.type}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.pricing.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                          <div>
                            <p className="text-sm font-medium text-white">{item.name}</p>
                            <p className="text-xs text-neutral-400">{item.specs}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-lime-300">{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="storage" className="mt-8">
          <div className="grid gap-8">
            {storagePricing.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Card key={index} className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-lime-300/10 p-2">
                        <IconComponent className="h-6 w-6 text-lime-300" />
                      </div>
                      <CardTitle className="text-xl text-white">{category.provider}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      {category.tiers.map((tier, tierIndex) => (
                        <div key={tierIndex} className="p-4 rounded-lg bg-white/5">
                          <h4 className="text-sm font-medium text-white mb-2">{tier.name}</h4>
                          <p className="text-lg font-semibold text-lime-300 mb-2">{tier.price}</p>
                          <p className="text-xs text-neutral-400">{tier.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}
