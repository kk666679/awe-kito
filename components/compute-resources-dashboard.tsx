import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Cpu, Zap, Server, Activity, Play, Square } from "lucide-react"

const computeStats = [
  {
    iconName: "Zap",
    title: "GPU Hours",
    value: "127.5",
    limit: "500",
    unit: "hours",
    usage: 25.5,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
  },
  {
    iconName: "Cpu",
    title: "CPU Hours",
    value: "342.8",
    limit: "1000",
    unit: "hours",
    usage: 34.3,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    iconName: "Server",
    title: "Storage",
    value: "1.2",
    limit: "5.0",
    unit: "TB",
    usage: 24,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
  },
  {
    iconName: "Activity",
    title: "Active Jobs",
    value: "8",
    limit: "20",
    unit: "jobs",
    usage: 40,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
  },
]

const getIcon = (iconName: string) => {
  const icons = {
    Zap,
    Cpu,
    Server,
    Activity,
  }
  return icons[iconName as keyof typeof icons] || Cpu
}

const activeJobs = [
  {
    id: "job_gpu_001",
    name: "AI Model Training",
    type: "GPU",
    status: "running",
    progress: 75,
    eta: "2h 15m",
    resource: "NVIDIA A100",
  },
  {
    id: "job_cpu_002",
    name: "Data Processing",
    type: "CPU",
    status: "running",
    progress: 45,
    eta: "1h 30m",
    resource: "8 vCPUs",
  },
  {
    id: "job_gpu_003",
    name: "3D Rendering",
    type: "GPU",
    status: "queued",
    progress: 0,
    eta: "Waiting",
    resource: "NVIDIA T4",
  },
]

export function ComputeResourcesDashboard() {
  return (
    <div className="space-y-6">
      {/* Compute Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {computeStats.map((stat, index) => {
          const IconComponent = getIcon(stat.iconName)
          return (
            <Card key={index} className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-neutral-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">
                      {stat.value}
                      <span className="text-sm text-neutral-400">
                        /{stat.limit} {stat.unit}
                      </span>
                    </p>
                  </div>
                  <div className={`rounded-lg p-3 ${stat.bgColor}`}>
                    <IconComponent className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <Progress value={stat.usage} className="h-2" />
                <p className="text-xs text-neutral-400 mt-2">{stat.usage}% used</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Active Jobs and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Jobs */}
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Active Compute Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeJobs.map((job, index) => (
                <div key={index} className="rounded-lg bg-white/5 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-white">{job.name}</p>
                      <p className="text-xs text-neutral-400">{job.resource}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          job.status === "running"
                            ? "bg-green-500/20 text-green-300"
                            : "bg-yellow-500/20 text-yellow-300"
                        }`}
                      >
                        {job.status}
                      </span>
                      {job.status === "running" ? (
                        <Button size="sm" variant="outline" className="h-6 w-6 p-0 bg-transparent">
                          <Square className="h-3 w-3" />
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" className="h-6 w-6 p-0 bg-transparent">
                          <Play className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <Progress value={job.progress} className="h-2 mb-2" />
                  <div className="flex justify-between text-xs text-neutral-400">
                    <span>{job.progress}% complete</span>
                    <span>ETA: {job.eta}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Launch */}
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Quick Launch</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 hover:bg-yellow-500/30">
                <Zap className="h-4 w-4 mr-2" />
                Launch GPU Instance
              </Button>
              <Button className="w-full bg-blue-500/20 border border-blue-500/30 text-blue-300 hover:bg-blue-500/30">
                <Cpu className="h-4 w-4 mr-2" />
                Launch CPU Instance
              </Button>
              <Button className="w-full bg-purple-500/20 border border-purple-500/30 text-purple-300 hover:bg-purple-500/30">
                <Server className="h-4 w-4 mr-2" />
                Deploy Function
              </Button>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-lime-300/10 border border-lime-300/20">
              <h4 className="text-sm font-semibold text-lime-300 mb-2">Resource Recommendations</h4>
              <p className="text-xs text-neutral-300">
                Based on your usage patterns, consider upgrading to Reserved Instances to save up to 60% on compute
                costs.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
