"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building, ChevronDown, Plus, Users, Settings } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const workspaces = [
  {
    id: "1",
    name: "Tech Solutions Sdn Bhd",
    role: "Owner",
    members: 12,
    plan: "Enterprise",
    avatar: "TS",
  },
  {
    id: "2",
    name: "Digital Marketing Agency",
    role: "Admin",
    members: 8,
    plan: "Professional",
    avatar: "DM",
  },
  {
    id: "3",
    name: "E-commerce Store",
    role: "Member",
    members: 5,
    plan: "Starter",
    avatar: "EC",
  },
]

export function WorkspaceSelector() {
  const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0])

  return (
    <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lime-300/10 border border-lime-300/20">
              <Building className="h-5 w-5 text-lime-300" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Current Workspace</h3>
              <p className="text-sm text-neutral-400">Manage your business environment</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-lime-300/20 text-xs font-semibold text-lime-300">
                      {selectedWorkspace.avatar}
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium">{selectedWorkspace.name}</div>
                      <div className="text-xs text-neutral-400">{selectedWorkspace.role}</div>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-neutral-900 border-white/10">
                {workspaces.map((workspace) => (
                  <DropdownMenuItem
                    key={workspace.id}
                    onClick={() => setSelectedWorkspace(workspace)}
                    className="flex items-center gap-3 p-3 text-white hover:bg-white/10"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-lime-300/20 text-xs font-semibold text-lime-300">
                      {workspace.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{workspace.name}</div>
                      <div className="flex items-center gap-2 text-xs text-neutral-400">
                        <Users className="h-3 w-3" />
                        {workspace.members} members • {workspace.plan}
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="flex items-center gap-2 p-3 text-white hover:bg-white/10">
                  <Plus className="h-4 w-4" />
                  Create New Workspace
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 p-3 text-white hover:bg-white/10">
                  <Settings className="h-4 w-4" />
                  Workspace Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button className="bg-lime-400 text-black hover:bg-lime-300">
              <Plus className="h-4 w-4 mr-2" />
              Invite Members
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
