import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cpu, Zap } from "lucide-react"

const gpuSpecs = [
  {
    name: "NVIDIA T4",
    memory: "16GB GDDR6",
    cores: "2,560 CUDA",
    performance: "65 TFLOPS",
    price: "$0.35/hour",
    bestFor: "AI inference, light training",
  },
  {
    name: "NVIDIA V100",
    memory: "32GB HBM2",
    cores: "5,120 CUDA",
    performance: "125 TFLOPS",
    price: "$2.48/hour",
    bestFor: "Deep learning training",
  },
  {
    name: "NVIDIA A100",
    memory: "80GB HBM2e",
    cores: "6,912 CUDA",
    performance: "312 TFLOPS",
    price: "$4.10/hour",
    bestFor: "Large model training, HPC",
  },
]

const cpuSpecs = [
  {
    name: "Standard CPU",
    cores: "2-8 vCPUs",
    memory: "4-32GB RAM",
    storage: "50-500GB SSD",
    price: "$0.05/vCPU/hour",
    bestFor: "Web apps, APIs, databases",
  },
  {
    name: "High-Memory CPU",
    cores: "4-16 vCPUs",
    memory: "16-128GB RAM",
    storage: "100GB-2TB SSD",
    price: "$0.08/vCPU/hour",
    bestFor: "Data processing, analytics",
  },
  {
    name: "Compute Optimized",
    cores: "8-32 vCPUs",
    memory: "16-64GB RAM",
    storage: "200GB-1TB SSD",
    price: "$0.12/vCPU/hour",
    bestFor: "Scientific computing, simulations",
  },
]

export function ComputeSpecs() {
  return (
    <section className="container mx-auto px-4 py-16 sm:py-20">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">Hardware Specifications</h2>
        <p className="mt-4 text-lg text-neutral-300">Choose the right compute resources for your workload</p>
      </div>

      {/* GPU Specifications */}
      <div className="mb-16">
        <h3 className="mb-8 text-2xl font-bold text-white">GPU Instances</h3>
        <div className="grid gap-6 md:grid-cols-3">
          {gpuSpecs.map((gpu, index) => (
            <Card key={index} className="liquid-glass border border-lime-300/20 bg-lime-300/5 backdrop-blur-xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-lime-300/10 p-2">
                    <Zap className="h-6 w-6 text-lime-300" />
                  </div>
                  <CardTitle className="text-lg text-white">{gpu.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-400">Memory:</span>
                    <span className="text-sm text-white">{gpu.memory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-400">CUDA Cores:</span>
                    <span className="text-sm text-white">{gpu.cores}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-400">Performance:</span>
                    <span className="text-sm text-white">{gpu.performance}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-3">
                    <span className="text-sm font-semibold text-lime-300">Price:</span>
                    <span className="text-sm font-semibold text-lime-300">{gpu.price}</span>
                  </div>
                  <div className="rounded-lg bg-white/5 p-2">
                    <p className="text-xs text-neutral-300">Best for: {gpu.bestFor}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CPU Specifications */}
      <div>
        <h3 className="mb-8 text-2xl font-bold text-white">CPU Instances</h3>
        <div className="grid gap-6 md:grid-cols-3">
          {cpuSpecs.map((cpu, index) => (
            <Card key={index} className="liquid-glass border border-blue-300/20 bg-blue-300/5 backdrop-blur-xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-300/10 p-2">
                    <Cpu className="h-6 w-6 text-blue-300" />
                  </div>
                  <CardTitle className="text-lg text-white">{cpu.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-400">vCPUs:</span>
                    <span className="text-sm text-white">{cpu.cores}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-400">Memory:</span>
                    <span className="text-sm text-white">{cpu.memory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-400">Storage:</span>
                    <span className="text-sm text-white">{cpu.storage}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-3">
                    <span className="text-sm font-semibold text-blue-300">Price:</span>
                    <span className="text-sm font-semibold text-blue-300">{cpu.price}</span>
                  </div>
                  <div className="rounded-lg bg-white/5 p-2">
                    <p className="text-xs text-neutral-300">Best for: {cpu.bestFor}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
