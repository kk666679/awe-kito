"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Rocket, Settings, Shield, Code2, Smartphone, Globe, Clock, Users, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const guides = [
  {
    id: "quick-start",
    title: "Quick Start Guide",
    description: "Get up and running with the Awan Keusahawanan API in under 10 minutes.",
    icon: Rocket,
    duration: "5-10 min",
    difficulty: "Beginner",
    topics: ["API Keys", "Authentication", "First API Call", "Testing"],
    thumbnail: "/placeholder-gpu00.png",
  },
  {
    id: "authentication",
    title: "Authentication Setup",
    description: "Comprehensive guide to API authentication, OAuth flows, and security best practices.",
    icon: Shield,
    duration: "15-20 min",
    difficulty: "Intermediate",
    topics: ["OAuth 2.0", "JWT Tokens", "API Keys", "Rate Limiting"],
    thumbnail: "/placeholder-cbvh7.png",
  },
  {
    id: "sdk-integration",
    title: "SDK Integration",
    description: "Step-by-step integration guides for popular programming languages and frameworks.",
    icon: Code2,
    duration: "20-30 min",
    difficulty: "Intermediate",
    topics: ["Node.js SDK", "Python SDK", "PHP SDK", "React Components"],
    thumbnail: "/placeholder-xa7tl.png",
  },
  {
    id: "mobile-integration",
    title: "Mobile App Integration",
    description: "Connect your mobile applications with native iOS and Android SDK implementations.",
    icon: Smartphone,
    duration: "30-45 min",
    difficulty: "Advanced",
    topics: ["iOS SDK", "Android SDK", "React Native", "Flutter"],
    thumbnail: "/placeholder-5ulk9.png",
  },
  {
    id: "webhook-setup",
    title: "Webhook Configuration",
    description: "Configure real-time webhooks for event-driven integrations and notifications.",
    icon: Settings,
    duration: "15-25 min",
    difficulty: "Intermediate",
    topics: ["Webhook URLs", "Event Types", "Retry Logic", "Security"],
    thumbnail: "/placeholder-c8xs5.png",
  },
  {
    id: "enterprise-deployment",
    title: "Enterprise Deployment",
    description: "Large-scale deployment strategies, load balancing, and enterprise security configurations.",
    icon: Globe,
    duration: "45-60 min",
    difficulty: "Advanced",
    topics: ["Load Balancing", "Multi-region", "SSO Integration", "Compliance"],
    thumbnail: "/placeholder-wkb1i.png",
  },
]

export function SetupGuides() {
  return (
    <section id="setup-guides" className="py-20 px-4 bg-black/20">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Setup Guides</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto text-balance">
            Comprehensive step-by-step guides to help you integrate and deploy our platform quickly and efficiently.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {guides.map((guide) => (
            <Card
              key={guide.id}
              className="glass-border hover:glass-border-enhanced transition-all duration-300 group overflow-hidden"
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={guide.thumbnail || "/placeholder.svg"}
                  alt={guide.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4">
                  <div className="p-2 rounded-lg bg-purple-600/80 backdrop-blur-sm">
                    <guide.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      guide.difficulty === "Beginner"
                        ? "border-green-600 text-green-400"
                        : guide.difficulty === "Intermediate"
                          ? "border-yellow-600 text-yellow-400"
                          : "border-red-600 text-red-400"
                    }`}
                  >
                    {guide.difficulty}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    {guide.duration}
                  </div>
                </div>
                <CardTitle className="text-white text-lg">{guide.title}</CardTitle>
                <CardDescription className="text-gray-300 text-sm">{guide.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Topics Covered */}
                <div>
                  <h4 className="text-sm font-medium text-white mb-2">Topics Covered</h4>
                  <div className="flex flex-wrap gap-1">
                    {guide.topics.map((topic) => (
                      <Badge key={topic} variant="secondary" className="text-xs bg-white/10 text-white/80">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full border-purple-600/50 text-purple-400 hover:bg-purple-600/20 group-hover:border-purple-500 bg-transparent"
                >
                  <Link href={`/docs/guides/${guide.id}`}>
                    Start Guide
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="glass-border p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-blue-600/20">
                <BookOpen className="h-6 w-6 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Complete Documentation</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Access our comprehensive documentation with detailed API references, code examples, and
                  troubleshooting guides.
                </p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-blue-600/50 text-blue-400 hover:bg-blue-600/20 bg-transparent"
                >
                  <Link href="/docs">Browse Documentation</Link>
                </Button>
              </div>
            </div>
          </Card>

          <Card className="glass-border p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-green-600/20">
                <Users className="h-6 w-6 text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Community Support</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Join our developer community for discussions, support, and to share your integration experiences with
                  other developers.
                </p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-green-600/50 text-green-400 hover:bg-green-600/20 bg-transparent"
                >
                  <Link href="/community">Join Community</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
