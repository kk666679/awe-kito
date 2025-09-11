import { SiteHeader } from "@/components/site-header"
import { BusinessModulesHero } from "@/components/business-modules-hero"
import { ModulesGrid } from "@/components/modules-grid"
import { ModuleFeatures } from "@/components/module-features"
import { AppverseFooter } from "@/components/appverse-footer"
import Script from "next/script"

export const metadata = {
  title: "Business Management Modules | Awan Keusahawanan",
  description:
    "Comprehensive business management suite including CRM, Inventory, Invoicing, Task Management, and Multi-Tenant workspaces for Malaysian SMEs.",
}

export default function ModulesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://awan-keusahawanan.com/modules",
    name: "Business Management Modules",
    description: "Comprehensive business management suite for Malaysian SMEs",
    url: "https://awan-keusahawanan.com/modules",
  }

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        <BusinessModulesHero />
        <ModulesGrid />
        <ModuleFeatures />
        <AppverseFooter />
      </main>

      <Script
        id="modules-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </>
  )
}
