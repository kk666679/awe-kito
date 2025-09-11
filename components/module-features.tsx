import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Globe, Lock, Cpu } from "lucide-react"

export function ModuleFeatures() {
  return (
    <section className="container mx-auto px-4 py-16 sm:py-20">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">Platform Advantages</h2>
        <p className="mt-4 text-lg text-neutral-300">
          Built specifically for Malaysian businesses with enterprise-grade capabilities
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-lime-300/10 p-2">
                <Zap className="h-6 w-6 text-lime-300" />
              </div>
              <CardTitle className="text-xl text-white">High Performance</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-neutral-300">
              Built on modern cloud infrastructure with Kubernetes orchestration for maximum scalability and
              reliability.
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-lime-300">99.9%</div>
                <div className="text-xs text-neutral-400">Uptime SLA</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-lime-300">&lt;50ms</div>
                <div className="text-xs text-neutral-400">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-lime-300">24/7</div>
                <div className="text-xs text-neutral-400">Support</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-lime-300/10 p-2">
                <Globe className="h-6 w-6 text-lime-300" />
              </div>
              <CardTitle className="text-xl text-white">Multi-Cloud Integration</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-neutral-300">
              Seamless integration with AWS, Azure, Google Cloud, and local storage providers for maximum flexibility.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <div className="h-2 w-2 rounded-full bg-lime-300"></div>
                Cross-cloud data replication
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <div className="h-2 w-2 rounded-full bg-lime-300"></div>
                Automatic failover protection
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <div className="h-2 w-2 rounded-full bg-lime-300"></div>
                Global content delivery
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-lime-300/10 p-2">
                <Lock className="h-6 w-6 text-lime-300" />
              </div>
              <CardTitle className="text-xl text-white">Enterprise Security</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-neutral-300">
              Bank-level security with end-to-end encryption, role-based access control, and comprehensive audit trails.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <div className="h-2 w-2 rounded-full bg-lime-300"></div>
                AES-256 encryption
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <div className="h-2 w-2 rounded-full bg-lime-300"></div>
                Role-based permissions
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <div className="h-2 w-2 rounded-full bg-lime-300"></div>
                Complete audit logging
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-lime-300/10 p-2">
                <Cpu className="h-6 w-6 text-lime-300" />
              </div>
              <CardTitle className="text-xl text-white">Compute Integration</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-neutral-300">
              Access powerful GPU and CPU resources for advanced analytics, AI processing, and data-intensive
              operations.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <div className="h-2 w-2 rounded-full bg-lime-300"></div>
                NVIDIA GPU acceleration
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <div className="h-2 w-2 rounded-full bg-lime-300"></div>
                Scalable CPU resources
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <div className="h-2 w-2 rounded-full bg-lime-300"></div>
                Function-as-a-Service
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
