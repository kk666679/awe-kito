import { Button } from "@/components/ui/button"
import { Users, Database, FileText, CheckSquare, Building } from "lucide-react"

export function BusinessModulesHero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center py-20 sm:py-28">
          <div className="mb-8 flex items-center gap-2">
            <Building className="h-8 w-8 text-lime-300" />
            <p className="text-sm uppercase tracking-[0.25em] text-lime-300/80">Business Management Suite</p>
          </div>

          <h1 className="mt-3 text-center text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block">COMPLETE BUSINESS</span>
            <span className="block text-lime-300 drop-shadow-[0_0_20px_rgba(132,204,22,0.35)]">
              MANAGEMENT PLATFORM
            </span>
            <span className="block">FOR MALAYSIAN SMEs</span>
          </h1>

          <p className="mt-6 max-w-3xl text-center text-lg text-neutral-300">
            Streamline your operations with our integrated suite of business tools. From customer relationships to
            inventory management, everything you need to run your business efficiently in one secure, multi-tenant
            platform.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button className="rounded-full bg-lime-400 px-8 py-3 text-black hover:bg-lime-300">
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-white/20 px-8 py-3 text-white hover:bg-white/10 bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>

          {/* Module Icons Grid */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 rounded-2xl bg-lime-300/10 p-4 border border-lime-300/20">
                <Users className="h-8 w-8 text-lime-300" />
              </div>
              <h3 className="text-sm font-semibold text-white">Customer CRM</h3>
              <p className="text-xs text-neutral-400">Manage relationships</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-3 rounded-2xl bg-lime-300/10 p-4 border border-lime-300/20">
                <Database className="h-8 w-8 text-lime-300" />
              </div>
              <h3 className="text-sm font-semibold text-white">Inventory</h3>
              <p className="text-xs text-neutral-400">Track stock levels</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-3 rounded-2xl bg-lime-300/10 p-4 border border-lime-300/20">
                <FileText className="h-8 w-8 text-lime-300" />
              </div>
              <h3 className="text-sm font-semibold text-white">Invoicing</h3>
              <p className="text-xs text-neutral-400">Automated billing</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-3 rounded-2xl bg-lime-300/10 p-4 border border-lime-300/20">
                <CheckSquare className="h-8 w-8 text-lime-300" />
              </div>
              <h3 className="text-sm font-semibold text-white">Task Management</h3>
              <p className="text-xs text-neutral-400">Organize projects</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
