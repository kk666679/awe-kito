import { Button } from "@/components/ui/button"
import { Cpu, Zap, Server, Code } from "lucide-react"

export function ComputeHero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center py-20 sm:py-28">
          <div className="mb-8 flex items-center gap-2">
            <Cpu className="h-8 w-8 text-lime-300" />
            <p className="text-sm uppercase tracking-[0.25em] text-lime-300/80">Cloud Compute Platform</p>
          </div>

          <h1 className="mt-3 text-center text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block">HIGH-PERFORMANCE</span>
            <span className="block text-lime-300 drop-shadow-[0_0_20px_rgba(132,204,22,0.35)]">
              GPU & CPU COMPUTING
            </span>
            <span className="block">ON DEMAND</span>
          </h1>

          <p className="mt-6 max-w-3xl text-center text-lg text-neutral-300">
            Access powerful NVIDIA GPU acceleration and scalable CPU resources for AI training, 3D rendering, data
            processing, and custom code execution. Pay only for what you use with our Kubernetes-orchestrated compute
            platform.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button className="rounded-full bg-lime-400 px-8 py-3 text-black hover:bg-lime-300">Start Computing</Button>
            <Button
              variant="outline"
              className="rounded-full border-white/20 px-8 py-3 text-white hover:bg-white/10 bg-transparent"
            >
              View Pricing
            </Button>
          </div>

          {/* Compute Services Grid */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 rounded-2xl bg-lime-300/10 p-4 border border-lime-300/20">
                <Zap className="h-8 w-8 text-lime-300" />
              </div>
              <h3 className="text-sm font-semibold text-white">GPU Acceleration</h3>
              <p className="text-xs text-neutral-400">NVIDIA CUDA & Tensor</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-3 rounded-2xl bg-lime-300/10 p-4 border border-lime-300/20">
                <Server className="h-8 w-8 text-lime-300" />
              </div>
              <h3 className="text-sm font-semibold text-white">CPU Clusters</h3>
              <p className="text-xs text-neutral-400">Scalable processing</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-3 rounded-2xl bg-lime-300/10 p-4 border border-lime-300/20">
                <Code className="h-8 w-8 text-lime-300" />
              </div>
              <h3 className="text-sm font-semibold text-white">Function-as-a-Service</h3>
              <p className="text-xs text-neutral-400">Serverless execution</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-3 rounded-2xl bg-lime-300/10 p-4 border border-lime-300/20">
                <Cpu className="h-8 w-8 text-lime-300" />
              </div>
              <h3 className="text-sm font-semibold text-white">Kubernetes</h3>
              <p className="text-xs text-neutral-400">Container orchestration</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
