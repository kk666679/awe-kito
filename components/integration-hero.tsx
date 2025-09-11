"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code, Zap, Shield } from "lucide-react"
import Link from "next/link"

export function IntegrationHero() {
  return (
    <section className="relative py-20 px-4">
      <div className="container mx-auto max-w-6xl text-center">
        {/* Badge */}
        <Badge variant="secondary" className="mb-6 glass-border-subtle text-white/90 bg-white/10">
          <Zap className="mr-2 h-4 w-4" />
          Developer-First Platform
        </Badge>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 text-white">
          Powerful{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            API Integrations
          </span>{" "}
          for Your Business
        </h1>

        {/* Subheading */}
        <p className="text-xl text-gray-300 text-balance mb-8 max-w-3xl mx-auto leading-relaxed">
          Connect your existing systems with our comprehensive cloud platform. Access business management tools, compute
          resources, and storage solutions through our robust APIs.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <div className="flex items-center gap-2 px-4 py-2 glass-border-subtle rounded-full text-sm text-white/90">
            <Code className="h-4 w-4 text-purple-400" />
            RESTful APIs
          </div>
          <div className="flex items-center gap-2 px-4 py-2 glass-border-subtle rounded-full text-sm text-white/90">
            <Shield className="h-4 w-4 text-green-400" />
            Enterprise Security
          </div>
          <div className="flex items-center gap-2 px-4 py-2 glass-border-subtle rounded-full text-sm text-white/90">
            <Zap className="h-4 w-4 text-yellow-400" />
            Real-time Sync
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all hover:scale-105"
          >
            <Link href="#api-integrations">
              Explore APIs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium transition-all bg-transparent"
          >
            <Link href="#setup-guides">View Documentation</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
