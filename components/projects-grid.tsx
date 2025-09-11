"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { MoreHorizontal, Play } from "lucide-react"

export function ProjectsGrid() {
  const projects = [
    {
      id: 1,
      name: "TechCorp Product Launch",
      client: "TechCorp Inc.",
      status: "In Progress",
      progress: 75,
      dueDate: "Dec 15, 2024",
      type: "Pro Plan",
      duration: "25s",
    },
    {
      id: 2,
      name: "Startup Brand Animation",
      client: "StartupXYZ",
      status: "Review",
      progress: 90,
      dueDate: "Dec 10, 2024",
      type: "Startup Plan",
      duration: "15s",
    },
    {
      id: 3,
      name: "Enterprise Campaign",
      client: "BigCorp Ltd.",
      status: "Concept",
      progress: 25,
      dueDate: "Jan 20, 2025",
      type: "Premium Plan",
      duration: "60s",
    },
    {
      id: 4,
      name: "Mobile App Promo",
      client: "AppStudio",
      status: "Production",
      progress: 60,
      dueDate: "Dec 22, 2024",
      type: "Pro Plan",
      duration: "20s",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-chart-2 text-white"
      case "Review":
        return "bg-chart-3 text-white"
      case "Concept":
        return "bg-chart-4 text-white"
      case "Production":
        return "bg-accent text-accent-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Active Projects</h2>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4" style={{ willChange: "transform" }}>
        {projects.map((project) => (
          <Card
            key={project.id}
            className="glass-border hover:glass-border-enhanced transition-all"
            style={{ willChange: "transform" }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-base text-foreground">{project.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{project.client}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                <span className="text-sm text-muted-foreground">{project.type}</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-foreground">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Due: {project.dueDate}</span>
                <span className="text-muted-foreground">Duration: {project.duration}</span>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Play className="h-3 w-3 mr-1" />
                  Preview
                </Button>
                <Button size="sm" className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
                  Open
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
