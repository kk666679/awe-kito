import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Package, AlertTriangle, TrendingDown, TrendingUp, Plus, Search, Filter } from "lucide-react"

const inventoryStats = [
  {
    icon: Package,
    title: "Total Products",
    value: "3,456",
    change: "+5%",
    description: "Items in inventory",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    icon: AlertTriangle,
    title: "Low Stock Items",
    value: "23",
    change: "+12%",
    description: "Need restocking",
    color: "text-red-400",
    bgColor: "bg-red-400/10",
  },
  {
    icon: TrendingUp,
    title: "Top Selling",
    value: "156",
    change: "+18%",
    description: "High demand items",
    color: "text-green-400",
    bgColor: "bg-green-400/10",
  },
  {
    icon: TrendingDown,
    title: "Slow Moving",
    value: "89",
    change: "-8%",
    description: "Consider promotion",
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
  },
]

const lowStockItems = [
  {
    name: "MacBook Pro M3 14-inch",
    sku: "MBP-M3-14-512",
    currentStock: 3,
    minStock: 10,
    price: "RM 8,999",
    supplier: "Apple Malaysia",
    category: "Laptops",
  },
  {
    name: "iPhone 15 Pro Max 256GB",
    sku: "IP15PM-256-TB",
    currentStock: 5,
    minStock: 15,
    price: "RM 5,999",
    supplier: "Apple Malaysia",
    category: "Smartphones",
  },
  {
    name: "Dell XPS 13 Plus",
    sku: "DELL-XPS13P-512",
    currentStock: 2,
    minStock: 8,
    price: "RM 6,499",
    supplier: "Dell Malaysia",
    category: "Laptops",
  },
]

const recentMovements = [
  {
    type: "in",
    product: "Samsung Galaxy S24 Ultra",
    quantity: 25,
    time: "2 hours ago",
    reference: "PO-2024-001",
  },
  {
    type: "out",
    product: "MacBook Air M2",
    quantity: 3,
    time: "4 hours ago",
    reference: "SO-2024-156",
  },
  {
    type: "adjustment",
    product: "iPad Pro 12.9-inch",
    quantity: -2,
    time: "1 day ago",
    reference: "ADJ-2024-012",
  },
  {
    type: "in",
    product: "Surface Laptop Studio",
    quantity: 10,
    time: "2 days ago",
    reference: "PO-2024-002",
  },
]

export function InventoryDashboard() {
  return (
    <div className="space-y-6">
      {/* Inventory Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {inventoryStats.map((stat, index) => {
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
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-green-400">{stat.change}</span>
                  <span className="text-sm text-neutral-400">vs last month</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Low Stock Items and Recent Movements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Items */}
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              Low Stock Alert
            </CardTitle>
            <Button size="sm" className="bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30">
              Reorder All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item, index) => (
                <div key={index} className="rounded-lg bg-red-500/10 border border-red-500/20 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-white">{item.name}</p>
                      <p className="text-xs text-neutral-400">SKU: {item.sku}</p>
                    </div>
                    <Badge variant="outline" className="border-red-500/30 text-red-300">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-neutral-400 mb-1">
                      <span>Stock Level</span>
                      <span>
                        {item.currentStock} / {item.minStock} min
                      </span>
                    </div>
                    <Progress value={(item.currentStock / item.minStock) * 100} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400">{item.supplier}</span>
                    <span className="font-semibold text-lime-300">{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Movements */}
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Recent Stock Movements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMovements.map((movement, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                  <div
                    className={`rounded-lg p-2 ${
                      movement.type === "in"
                        ? "bg-green-500/20"
                        : movement.type === "out"
                          ? "bg-red-500/20"
                          : "bg-yellow-500/20"
                    }`}
                  >
                    <Package
                      className={`h-4 w-4 ${
                        movement.type === "in"
                          ? "text-green-300"
                          : movement.type === "out"
                            ? "text-red-300"
                            : "text-yellow-300"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{movement.product}</p>
                    <p className="text-xs text-neutral-400">
                      {movement.type === "in" ? "Stock In" : movement.type === "out" ? "Stock Out" : "Adjustment"}:
                      <span
                        className={`ml-1 font-semibold ${
                          movement.type === "in" || (movement.type === "adjustment" && movement.quantity > 0)
                            ? "text-green-300"
                            : "text-red-300"
                        }`}
                      >
                        {movement.quantity > 0 ? "+" : ""}
                        {movement.quantity}
                      </span>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-neutral-500">{movement.time}</span>
                      <span className="text-xs text-neutral-400">Ref: {movement.reference}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">Inventory Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="bg-blue-500/20 border border-blue-500/30 text-blue-300 hover:bg-blue-500/30">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
            <Button className="bg-green-500/20 border border-green-500/30 text-green-300 hover:bg-green-500/30">
              <Package className="h-4 w-4 mr-2" />
              Stock In
            </Button>
            <Button className="bg-purple-500/20 border border-purple-500/30 text-purple-300 hover:bg-purple-500/30">
              <Search className="h-4 w-4 mr-2" />
              Search Products
            </Button>
            <Button className="bg-orange-500/20 border border-orange-500/30 text-orange-300 hover:bg-orange-500/30">
              <Filter className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
