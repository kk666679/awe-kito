import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

const providers = [
  {
    name: "Amazon S3",
    logo: "🟠",
    description: "Industry-leading object storage with 99.999999999% durability",
    features: ["Intelligent tiering", "Lifecycle policies", "Cross-region replication", "Event notifications"],
    regions: "25+ regions",
    pricing: "From $0.023/GB",
    popular: true,
  },
  {
    name: "Google Cloud Storage",
    logo: "🔵",
    description: "Unified object storage with global edge caching and CDN integration",
    features: ["Multi-regional storage", "Nearline & Coldline", "Cloud CDN integration", "IAM & encryption"],
    regions: "20+ regions",
    pricing: "From $0.020/GB",
    popular: false,
  },
  {
    name: "Azure Blob Storage",
    logo: "🔷",
    description: "Massively scalable object storage for unstructured data",
    features: ["Hot, cool, archive tiers", "Azure CDN", "Immutable storage", "Advanced threat protection"],
    regions: "60+ regions",
    pricing: "From $0.018/GB",
    popular: false,
  },
  {
    name: "Vercel Blob",
    logo: "⚫",
    description: "Fast, global edge storage optimized for web applications",
    features: ["Edge locations", "Instant uploads", "Automatic optimization", "Next.js integration"],
    regions: "Global edge",
    pricing: "From $0.15/GB",
    popular: false,
  },
  {
    name: "Cloudflare R2",
    logo: "🟡",
    description: "Zero egress fees object storage with global distribution",
    features: ["Zero egress costs", "S3 compatibility", "Global network", "Workers integration"],
    regions: "Global",
    pricing: "From $0.015/GB",
    popular: false,
  },
  {
    name: "DigitalOcean Spaces",
    logo: "🔵",
    description: "Simple, scalable object storage with built-in CDN",
    features: ["Built-in CDN", "S3 compatibility", "Simple pricing", "Developer-friendly"],
    regions: "8 regions",
    pricing: "From $0.02/GB",
    popular: false,
  },
]

export function StorageProviders() {
  return (
    <section className="container mx-auto px-4 py-16 sm:py-20">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">Supported Storage Providers</h2>
        <p className="mt-4 text-lg text-neutral-300">Connect and manage storage across all major cloud providers</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {providers.map((provider, index) => (
          <Card
            key={index}
            className={`liquid-glass border backdrop-blur-xl relative ${
              provider.popular ? "border-lime-300/50 bg-lime-300/10" : "border-white/10 bg-white/5"
            }`}
          >
            {provider.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-lime-300 text-black">Most Popular</Badge>
              </div>
            )}

            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{provider.logo}</span>
                <div>
                  <CardTitle className="text-lg text-white">{provider.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-neutral-400">{provider.regions}</span>
                    <span className="text-xs text-neutral-400">•</span>
                    <span className="text-xs text-lime-300">{provider.pricing}</span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-neutral-300 mb-4">{provider.description}</p>

              <div className="space-y-2">
                {provider.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-lime-300" />
                    <span className="text-sm text-neutral-300">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
