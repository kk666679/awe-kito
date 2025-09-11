import { Button } from "@/components/ui/button"
import { Cloud, Shield, Zap, Globe } from "lucide-react"

export function StorageHero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center py-20 sm:py-28">
          <div className="mb-8 flex items-center gap-2">
            <Cloud className="h-8 w-8 text-lime-300" />
            <p className="text-sm uppercase tracking-[0.25em] text-lime-300/80">Multi-Cloud Storage</p>
          </div>

          <h1 className="mt-3 text-center text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block">UNIFIED STORAGE</span>
            <span className="block text-lime-300 drop-shadow-[0_0_20px_rgba(132,204,22,0.35)]">ACROSS ALL CLOUDS</span>
            <span className="block">ONE INTERFACE</span>
          </h1>

          <p className="mt-6 max-w-3xl text-center text-lg text-neutral-300">
            Manage files across AWS S3, Google Cloud Storage, Azure Blob, and more from a single dashboard. Optimize
            costs, ensure security, and scale seamlessly with intelligent multi-cloud storage orchestration.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button className="rounded-full bg-lime-400 px-8 py-3 text-black hover:bg-lime-300">Connect Storage</Button>
            <Button
              variant="outline"
              className="rounded-full border-white/20 px-8 py-3 text-white hover:bg-white/10 bg-transparent"
            >
              View Integrations
            </Button>
          </div>

          {/* Storage Benefits Grid */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 rounded-2xl bg-lime-300/10 p-4 border border-lime-300/20">
                <Globe className="h-8 w-8 text-lime-300" />
              </div>
              <h3 className="text-sm font-semibold text-white">Multi-Provider</h3>
              <p className="text-xs text-neutral-400">AWS, GCP, Azure & more</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-3 rounded-2xl bg-lime-300/10 p-4 border border-lime-300/20">
                <Shield className="h-8 w-8 text-lime-300" />
              </div>
              <h3 className="text-sm font-semibold text-white">Enterprise Security</h3>
              <p className="text-xs text-neutral-400">Encryption & compliance</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-3 rounded-2xl bg-lime-300/10 p-4 border border-lime-300/20">
                <Zap className="h-8 w-8 text-lime-300" />
              </div>
              <h3 className="text-sm font-semibold text-white">Cost Optimization</h3>
              <p className="text-xs text-neutral-400">Intelligent tiering</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-3 rounded-2xl bg-lime-300/10 p-4 border border-lime-300/20">
                <Cloud className="h-8 w-8 text-lime-300" />
              </div>
              <h3 className="text-sm font-semibold text-white">Unified API</h3>
              <p className="text-xs text-neutral-400">Single integration</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
