"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, AlertCircle, Play } from "lucide-react"

const iconMap = {
  CheckCircle,
  Clock,
  AlertCircle,
  Play,
}

const getIconComponent = (iconName: string) => {
  return iconMap[iconName as keyof typeof iconMap] || Clock
}

export function WorkflowTracker() {
  const workflows = [
    {
      id: 1,
      project: "TechCorp Product Launch",
      stages: [
        { name: "Concept", status: "completed", icon: "CheckCircle" },
        { name: "Storyboard", status: "completed", icon: "CheckCircle" },
        { name: "3D Modeling", status: "active", icon: "Play" },
        { name: "Animation", status: "pending", icon: "Clock" },
        { name: "Rendering", status: "pending", icon: "Clock" },
        { name: "Review", status: "pending", icon: "Clock" },
      ],
    },
    {
      id: 2,
      project: "Startup Brand Animation",
      stages: [
        { name: "Concept", status: "completed", icon: "CheckCircle" },
        { name: "Storyboard", status: "completed", icon: "CheckCircle" },
        { name: "3D Modeling", status: "completed", icon: "CheckCircle" },
        { name: "Animation", status: "completed", icon: "CheckCircle" },
        { name: "Rendering", status: "completed", icon: "CheckCircle" },
        { name: "Review", status: "active", icon: "AlertCircle" },
      ],
    },
  ]

  const getStageColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-chart-3"
      case "active":
        return "text-accent"
      case "pending":
        return "text-muted-foreground"
      default:
        return "text-muted-foreground"
    }
  }

  const getStageBackground = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-chart-3/10"
      case "active":
        return "bg-accent/10"
      case "pending":
        return "bg-muted/10"
      default:
        return "bg-muted/10"
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Animation Pipeline</h2>

      <div className="space-y-4">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="glass-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-foreground">{workflow.project}</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex items-center justify-between overflow-x-auto">
                {workflow.stages.map((stage, index) => {
                  const IconComponent = getIconComponent(stage.icon)
                  return (
                    <div key={stage.name} className="flex flex-col items-center space-y-2 min-w-0 flex-shrink-0">
                      <div className={`p-2 rounded-full ${getStageBackground(stage.status)}`}>
                        <IconComponent className={`h-4 w-4 ${getStageColor(stage.status)}`} />
                      </div>
                      <span className="text-xs text-center text-muted-foreground whitespace-nowrap">{stage.name}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
