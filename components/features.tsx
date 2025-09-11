"use client"

import { useEffect, useState } from "react"
import { Cloud, Cpu, Shield, Zap, Users, ArrowRight, Database } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface FeaturesContent {
  title: string
  subtitle: string
}

const defaultContent: FeaturesContent = {
  title: "Complete cloud infrastructure for Malaysian businesses.",
  subtitle: "Integrated business management, high-performance computing, and enterprise-grade security",
}

export function Features() {
  const [content, setContent] = useState<FeaturesContent>(defaultContent)

  useEffect(() => {
    // Load content from localStorage
    const savedContent = localStorage.getItem("awan-keusahawanan-content")
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent)
        if (parsed.features) {
          setContent(parsed.features)
        }
      } catch (error) {
        console.error("Error parsing saved content:", error)
      }
    }
  }, [])

  return (
    <section id="features" className="container mx-auto px-4 py-16 sm:py-20">
      <h2 className="mb-8 text-center text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
        {content.title}
      </h2>
      <p className="mb-12 text-center text-lg text-neutral-400 max-w-3xl mx-auto">{content.subtitle}</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Business Management Suite */}
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-lime-300" />
              <p className="text-[11px] tracking-widest text-neutral-400">BUSINESS SUITE</p>
            </div>
            <CardTitle className="mt-1 text-xl text-white">Multi-Tenant Business Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-300 mb-4">
              Complete business management suite with workspace isolation, CRM, inventory tracking, automated invoicing,
              and task management.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <div className="h-1.5 w-1.5 rounded-full bg-lime-300"></div>
                Secure multi-tenant workspaces
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <div className="h-1.5 w-1.5 rounded-full bg-lime-300"></div>
                Customer relationship management
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <div className="h-1.5 w-1.5 rounded-full bg-lime-300"></div>
                Inventory & stock management
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <div className="h-1.5 w-1.5 rounded-full bg-lime-300"></div>
                Automated invoicing & billing
              </div>
            </div>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full border-lime-300/30 text-lime-300 hover:bg-lime-300/10 bg-transparent"
            >
              <Link href="/modules" className="flex items-center gap-2">
                Explore Business Modules <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Cloud Compute Platform */}
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-lime-300" />
              <p className="text-[11px] tracking-widest text-neutral-400">COMPUTE POWER</p>
            </div>
            <CardTitle className="mt-1 text-xl text-white">High-Performance Computing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-300 mb-4">
              GPU-accelerated computing for AI training, 3D rendering, data processing, and Function-as-a-Service
              execution.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <div className="h-1.5 w-1.5 rounded-full bg-lime-300"></div>
                NVIDIA CUDA GPU acceleration
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <div className="h-1.5 w-1.5 rounded-full bg-lime-300"></div>
                Kubernetes orchestration
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <div className="h-1.5 w-1.5 rounded-full bg-lime-300"></div>
                Function-as-a-Service (FaaS)
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <div className="h-1.5 w-1.5 rounded-full bg-lime-300"></div>
                Job queueing with BullMQ
              </div>
            </div>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full border-lime-300/30 text-lime-300 hover:bg-lime-300/10 bg-transparent"
            >
              <Link href="/compute" className="flex items-center gap-2">
                View Compute Resources <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Multi-Cloud Storage */}
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Cloud className="h-5 w-5 text-lime-300" />
              <p className="text-[11px] tracking-widest text-neutral-400">MULTI-CLOUD</p>
            </div>
            <CardTitle className="mt-1 text-xl text-white">Unified Storage Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-300 mb-4">
              S3-compatible object storage with seamless integration across AWS, Azure, Google Cloud, and MinIO.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <div className="h-1.5 w-1.5 rounded-full bg-lime-300"></div>
                Cross-cloud replication
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <div className="h-1.5 w-1.5 rounded-full bg-lime-300"></div>
                Automatic failover
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <div className="h-1.5 w-1.5 rounded-full bg-lime-300"></div>
                Global data distribution
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <div className="h-1.5 w-1.5 rounded-full bg-lime-300"></div>
                S3-compatible API
              </div>
            </div>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full border-lime-300/30 text-lime-300 hover:bg-lime-300/10 bg-transparent"
            >
              <Link href="/storage" className="flex items-center gap-2">
                Manage Storage <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-lime-300" />
              <p className="text-[11px] tracking-widest text-neutral-400">DATABASE</p>
            </div>
            <CardTitle className="mt-1 text-xl text-white">Serverless Database Infrastructure</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-300 mb-4">
              Neon PostgreSQL for primary data storage with Redis for caching, sessions, and message queuing.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <div className="h-1.5 w-1.5 rounded-full bg-lime-300"></div>
                Serverless PostgreSQL (Neon)
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <div className="h-1.5 w-1.5 rounded-full bg-lime-300"></div>
                Redis caching & queues
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <div className="h-1.5 w-1.5 rounded-full bg-lime-300"></div>
                Prisma ORM integration
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <div className="h-1.5 w-1.5 rounded-full bg-lime-300"></div>
                Multi-tenant data isolation
              </div>
            </div>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full border-lime-300/30 text-lime-300 hover:bg-lime-300/10 bg-transparent"
            >
              <Link href="/dashboard" className="flex items-center gap-2">
                View Database Stats <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Security & Monitoring */}
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-lime-300" />
              <p className="text-[11px] tracking-widest text-neutral-400">SECURITY</p>
            </div>
            <CardTitle className="mt-1 text-xl text-white">Enterprise-Grade Security</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-300 mb-4">
              Comprehensive monitoring with Prometheus & Grafana, JWT authentication, and Kubernetes security policies.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <div className="h-1.5 w-1.5 rounded-full bg-lime-300"></div>
                Real-time monitoring (Prometheus)
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <div className="h-1.5 w-1.5 rounded-full bg-lime-300"></div>
                JWT authentication & RBAC
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <div className="h-1.5 w-1.5 rounded-full bg-lime-300"></div>
                Kubernetes network policies
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <div className="h-1.5 w-1.5 rounded-full bg-lime-300"></div>
                Data isolation & compliance
              </div>
            </div>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full border-lime-300/30 text-lime-300 hover:bg-lime-300/10 bg-transparent"
            >
              <Link href="/monitoring" className="flex items-center gap-2">
                View Monitoring <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-lime-300" />
              <p className="text-[11px] tracking-widest text-neutral-400">PERFORMANCE</p>
            </div>
            <CardTitle className="mt-1 text-xl text-white">Built for Malaysian SMEs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-lime-300">99.9%</div>
                <div className="text-xs text-neutral-400">Uptime SLA</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-lime-300">&lt;50ms</div>
                <div className="text-xs text-neutral-400">API Response</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-lime-300">24/7</div>
                <div className="text-xs text-neutral-400">Support</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-lime-300">Auto-Scale</div>
                <div className="text-xs text-neutral-400">Kubernetes</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-lime-300">Multi-Region</div>
                <div className="text-xs text-neutral-400">Deployment</div>
              </div>
            </div>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full border-lime-300/30 text-lime-300 hover:bg-lime-300/10 bg-transparent"
            >
              <Link href="/pricing" className="flex items-center gap-2">
                View Pricing Plans <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
