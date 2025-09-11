import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calculator, TrendingDown, Shield } from "lucide-react"

export function PricingHero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center py-20 sm:py-28">
          <Badge className="mb-8 bg-lime-300/10 border border-lime-300/20 text-lime-300">Transparent Pricing</Badge>

          <h1 className="mt-3 text-center text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block">SIMPLE, TRANSPARENT</span>
            <span className="block text-lime-300 drop-shadow-[0_0_20px_rgba(132,204,22,0.35)]">PRICING</span>
            <span className="block">FOR EVERY BUSINESS</span>
          </h1>

          <p className="mt-6 max-w-3xl text-center text-lg text-neutral-300">
            Choose from flexible pricing plans designed for Malaysian SMEs. No hidden fees, no vendor lock-in. Scale up
            or down as your business grows with transparent, predictable costs.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button className="rounded-full bg-lime-400 px-8 py-3 text-black hover:bg-lime-300">
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-white/20 px-8 py-3 text-white hover:bg-white/10 bg-transparent"
            >
              Calculate Costs
            </Button>
          </div>

          {/* Pricing Benefits */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 rounded-2xl bg-lime-300/10 p-4 border border-lime-300/20">
                <TrendingDown className="h-8 w-8 text-lime-300" />
              </div>
              <h3 className="text-sm font-semibold text-white">Save up to 60%</h3>
              <p className="text-xs text-neutral-400">Compared to enterprise solutions</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-3 rounded-2xl bg-lime-300/10 p-4 border border-lime-300/20">
                <Calculator className="h-8 w-8 text-lime-300" />
              </div>
              <h3 className="text-sm font-semibold text-white">Pay-as-you-Scale</h3>
              <p className="text-xs text-neutral-400">Only pay for what you use</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-3 rounded-2xl bg-lime-300/10 p-4 border border-lime-300/20">
                <Shield className="h-8 w-8 text-lime-300" />
              </div>
              <h3 className="text-sm font-semibold text-white">No Lock-in</h3>
              <p className="text-xs text-neutral-400">Cancel or change anytime</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
