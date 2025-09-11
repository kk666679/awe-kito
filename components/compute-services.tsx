import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Brain, Video, BarChart3 } from "lucide-react"

const services = [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Train deep learning models with NVIDIA GPU acceleration and popular ML frameworks.",
    features: ["PyTorch & TensorFlow", "CUDA acceleration", "Model deployment", "Auto-scaling"],
    useCases: ["Image recognition", "Natural language processing", "Predictive analytics", "Computer vision"],
    color: "from-purple-500/20 to-violet-500/20",
    borderColor: "border-purple-500/30",
  },
  {
    icon: Video,
    title: "3D Rendering & Video",
    description: "High-performance rendering for 3D graphics, animations, and video processing.",
    features: ["GPU rendering", "FFmpeg NVENC", "Blender support", "Real-time processing"],
    useCases: ["3D animation", "Video transcoding", "Visual effects", "Architectural visualization"],
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
  },
  {
    icon: BarChart3,
    title: "Data Processing",
    description: "Scalable data analytics and processing for large datasets and complex computations.",
    features: ["Parallel processing", "Memory optimization", "Distributed computing", "Real-time analytics"],
    useCases: ["Big data analysis", "Financial modeling", "Scientific computing", "Business intelligence"],
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
  },
  {
    icon: Code,
    title: "Function-as-a-Service",
    description: "Execute custom code on-demand with automatic scaling and secure container isolation.",
    features: ["Multi-language support", "Auto-scaling", "Secure isolation", "Event triggers"],
    useCases: ["API endpoints", "Data transformation", "Scheduled tasks", "Microservices"],
    color: "from-orange-500/20 to-red-500/20",
    borderColor: "border-orange-500/30",
  },
]

export function ComputeServices() {
  return (
    <section className="container mx-auto px-4 py-16 sm:py-20">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">Compute Services</h2>
        <p className="mt-4 text-lg text-neutral-300">Powerful computing resources for every business need</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {services.map((service, index) => {
          const IconComponent = service.icon
          return (
            <Card
              key={index}
              className={`liquid-glass border ${service.borderColor} bg-gradient-to-br ${service.color} backdrop-blur-xl`}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-white/10 p-2">
                    <IconComponent className="h-6 w-6 text-lime-300" />
                  </div>
                  <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-neutral-300">{service.description}</p>

                <div className="mb-4">
                  <h4 className="mb-2 text-sm font-semibold text-white">Key Features:</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-xs text-neutral-400">
                        <div className="h-1.5 w-1.5 rounded-full bg-lime-300"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-semibold text-white">Use Cases:</h4>
                  <div className="flex flex-wrap gap-1">
                    {service.useCases.map((useCase, useCaseIndex) => (
                      <span key={useCaseIndex} className="rounded-full bg-white/10 px-2 py-1 text-xs text-neutral-300">
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
