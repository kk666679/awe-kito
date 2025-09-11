import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Zap, Clock, Shield } from "lucide-react"

const pricingTiers = [
  {
    name: "Pay-as-you-Go",
    description: "Perfect for occasional compute needs",
    icon: Clock,
    features: [
      "Hourly billing",
      "No minimum commitment",
      "All GPU & CPU types",
      "Standard support",
      "99.9% uptime SLA",
    ],
    pricing: "From $0.05/hour",
    cta: "Start Computing",
    popular: false,
  },
  {
    name: "Reserved Instances",
    description: "Save up to 60% with committed usage",
    icon: Zap,
    features: [
      "1-3 year commitments",
      "Up to 60% savings",
      "Priority access",
      "Priority support",
      "99.95% uptime SLA",
      "Custom configurations",
    ],
    pricing: "Save up to 60%",
    cta: "Contact Sales",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large workloads",
    icon: Shield,
    features: [
      "Custom pricing",
      "Dedicated resources",
      "24/7 premium support",
      "SLA guarantees",
      "Private networking",
      "Compliance certifications",
    ],
    pricing: "Custom pricing",
    cta: "Contact Sales",
    popular: false,
  },
]

export function ComputePricing() {
  return (
    <section className="container mx-auto px-4 py-16 sm:py-20">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">Compute Pricing</h2>
        <p className="mt-4 text-lg text-neutral-300">Flexible pricing options to match your compute needs</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {pricingTiers.map((tier, index) => {
          const IconComponent = tier.icon
          return (
            <Card
              key={index}
              className={`liquid-glass border backdrop-blur-xl relative ${
                tier.popular ? "border-lime-300/50 bg-lime-300/10 scale-105" : "border-white/10 bg-white/5"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-lime-300 text-black px-3 py-1 rounded-full text-xs font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader className="text-center">
                <div className="mx-auto mb-4 rounded-lg bg-white/10 p-3 w-fit">
                  <IconComponent className={`h-8 w-8 ${tier.popular ? "text-lime-300" : "text-white"}`} />
                </div>
                <CardTitle className="text-xl text-white">{tier.name}</CardTitle>
                <p className="text-sm text-neutral-300">{tier.description}</p>
                <div className="mt-4">
                  <div className={`text-2xl font-bold ${tier.popular ? "text-lime-300" : "text-white"}`}>
                    {tier.pricing}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className={`h-4 w-4 ${tier.popular ? "text-lime-300" : "text-white"}`} />
                      <span className="text-sm text-neutral-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full rounded-full ${
                    tier.popular
                      ? "bg-lime-400 text-black hover:bg-lime-300"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {tier.cta}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Additional Info */}
      <div className="mt-16 text-center">
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardContent className="p-8">
            <h3 className="mb-4 text-xl font-bold text-white">Need Help Choosing?</h3>
            <p className="mb-6 text-neutral-300">
              Our compute specialists can help you select the right resources for your specific workload requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="rounded-full bg-lime-400 px-6 text-black hover:bg-lime-300">
                Schedule Consultation
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-white/20 px-6 text-white hover:bg-white/10 bg-transparent"
              >
                View Documentation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
