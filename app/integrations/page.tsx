import { SiteHeader } from "@/components/site-header"
import { IntegrationHero } from "@/components/integration-hero"
import { ApiIntegrations } from "@/components/api-integrations"
import { SetupGuides } from "@/components/setup-guides"
import { DeveloperResources } from "@/components/developer-resources"
import { AppverseFooter } from "@/components/appverse-footer"
import Script from "next/script"

// ✅ Force static generation for low TTFB
export const dynamic = "force-static"

export default function IntegrationsPage() {
  const integrationStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://awan-keusahawanan.com/integrations",
    name: "API Integrations & Developer Resources | Awan Keusahawanan",
    description:
      "Comprehensive API integrations, setup guides, and developer resources for the Awan Keusahawanan cloud platform. Connect your business systems seamlessly.",
    url: "https://awan-keusahawanan.com/integrations",
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Awan Keusahawanan API",
      description: "Cloud platform API for Malaysian SMEs with business management and compute integrations",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
    },
  }

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        <IntegrationHero />
        <ApiIntegrations />
        <SetupGuides />
        <DeveloperResources />
        <AppverseFooter />
      </main>

      {/* JSON-LD structured data */}
      <Script
        id="integration-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(integrationStructuredData),
        }}
      />
    </>
  )
}
