import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Cloud, HardDrive, Upload, Download, Folder, File, Shield, Zap, MoreHorizontal, Plus } from "lucide-react"

const storageProviders = [
  {
    name: "AWS S3",
    icon: "🟠",
    status: "connected",
    usage: 2.4,
    limit: 10,
    cost: "RM 45.20",
    files: 1247,
    color: "border-orange-500/30 bg-orange-500/10",
  },
  {
    name: "Google Cloud",
    icon: "🔵",
    status: "connected",
    usage: 1.8,
    limit: 5,
    cost: "RM 32.10",
    files: 892,
    color: "border-blue-500/30 bg-blue-500/10",
  },
  {
    name: "Azure Blob",
    icon: "🔷",
    status: "connected",
    usage: 0.9,
    limit: 3,
    cost: "RM 18.50",
    files: 456,
    color: "border-cyan-500/30 bg-cyan-500/10",
  },
  {
    name: "Vercel Blob",
    icon: "⚫",
    status: "available",
    usage: 0,
    limit: 1,
    cost: "RM 0.00",
    files: 0,
    color: "border-neutral-500/30 bg-neutral-500/10",
  },
]

const recentFiles = [
  {
    name: "product-catalog.pdf",
    size: "2.4 MB",
    provider: "AWS S3",
    uploaded: "2 hours ago",
    type: "pdf",
  },
  {
    name: "customer-data.xlsx",
    size: "1.8 MB",
    provider: "Google Cloud",
    uploaded: "4 hours ago",
    type: "excel",
  },
  {
    name: "website-backup.zip",
    size: "45.2 MB",
    provider: "Azure Blob",
    uploaded: "1 day ago",
    type: "archive",
  },
  {
    name: "marketing-images/",
    size: "156 files",
    provider: "AWS S3",
    uploaded: "2 days ago",
    type: "folder",
  },
]

const storageStats = [
  {
    icon: HardDrive,
    title: "Total Storage",
    value: "5.1 TB",
    change: "+12%",
    description: "Across all providers",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    icon: Upload,
    title: "Uploads Today",
    value: "47",
    change: "+8%",
    description: "Files uploaded",
    color: "text-green-400",
    bgColor: "bg-green-400/10",
  },
  {
    icon: Download,
    title: "Downloads",
    value: "1.2k",
    change: "+15%",
    description: "This month",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
  },
  {
    icon: Shield,
    title: "Security Score",
    value: "98%",
    change: "+2%",
    description: "Encryption & access",
    color: "text-lime-400",
    bgColor: "bg-lime-400/10",
  },
]

export function MultiCloudStorageDashboard() {
  return (
    <div className="space-y-6">
      {/* Storage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {storageStats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <Card key={index} className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-neutral-400">{stat.description}</p>
                  </div>
                  <div className={`rounded-lg p-3 ${stat.bgColor}`}>
                    <IconComponent className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-green-400">{stat.change}</span>
                  <span className="text-sm text-neutral-400">vs last month</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Storage Providers and Recent Files */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Storage Providers */}
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Storage Providers</CardTitle>
            <Button size="sm" className="bg-lime-400 text-black hover:bg-lime-300">
              <Plus className="h-4 w-4 mr-2" />
              Add Provider
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {storageProviders.map((provider, index) => (
                <div key={index} className={`rounded-lg border p-4 ${provider.color}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{provider.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-white">{provider.name}</p>
                        <p className="text-xs text-neutral-400">{provider.files} files</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={provider.status === "connected" ? "default" : "secondary"}
                        className={
                          provider.status === "connected"
                            ? "bg-green-500/20 text-green-300"
                            : "bg-neutral-500/20 text-neutral-300"
                        }
                      >
                        {provider.status}
                      </Badge>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {provider.status === "connected" && (
                    <>
                      <div className="mb-2">
                        <div className="flex justify-between text-xs text-neutral-400 mb-1">
                          <span>{provider.usage} GB used</span>
                          <span>{provider.limit} GB limit</span>
                        </div>
                        <Progress value={(provider.usage / provider.limit) * 100} className="h-2" />
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xs text-neutral-400">Monthly cost</span>
                        <span className="text-sm font-semibold text-white">{provider.cost}</span>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Files */}
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Recent Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                  <div className="rounded-lg bg-white/10 p-2">
                    {file.type === "folder" ? (
                      <Folder className="h-4 w-4 text-lime-300" />
                    ) : (
                      <File className="h-4 w-4 text-blue-300" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{file.name}</p>
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <span>{file.size}</span>
                      <span>•</span>
                      <span>{file.provider}</span>
                      <span>•</span>
                      <span>{file.uploaded}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* File Management Actions */}
      <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">File Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="bg-blue-500/20 border border-blue-500/30 text-blue-300 hover:bg-blue-500/30">
              <Upload className="h-4 w-4 mr-2" />
              Upload Files
            </Button>
            <Button className="bg-green-500/20 border border-green-500/30 text-green-300 hover:bg-green-500/30">
              <Folder className="h-4 w-4 mr-2" />
              Create Folder
            </Button>
            <Button className="bg-purple-500/20 border border-purple-500/30 text-purple-300 hover:bg-purple-500/30">
              <Cloud className="h-4 w-4 mr-2" />
              Sync Providers
            </Button>
            <Button className="bg-orange-500/20 border border-orange-500/30 text-orange-300 hover:bg-orange-500/30">
              <Shield className="h-4 w-4 mr-2" />
              Security Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
