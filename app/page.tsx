import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { LogoMarquee } from "@/components/logo-marquee"
import { Pricing } from "@/components/pricing"
import { AppverseFooter } from "@/components/appverse-footer"
import Script from "next/script"

// ✅ Force static generation for low TTFB
export const dynamic = "force-static"

export default function Page() {
  const pricingStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPageElement",
    "@id": "https://awan-keusahawanan.com/#pricing",
    name: "Cloud Platform Pricing Plans",
    description: "Comprehensive cloud computing and business management pricing plans for Malaysian SMEs",
    url: "https://awan-keusahawanan.com/#pricing",
    mainEntity: {
      "@type": "PriceSpecification",
      name: "Cloud Computing & Business Management Services",
      description: "Multi-tenant cloud platform with integrated business tools and compute resources",
    },
  }

  const pageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://awan-keusahawanan.com/",
    name: "Awan Keusahawanan | Comprehensive Cloud Platform for Malaysian SMEs",
    description:
      "Multi-tenant cloud platform combining business management suite (CRM, Inventory, Invoicing, Task Management) with high-performance compute resources (GPU/CPU) and multi-cloud storage integration.",
    url: "https://awan-keusahawanan.com/",
    mainEntity: {
      "@type": "Organization",
      name: "Awan Keusahawanan",
      url: "https://awan-keusahawanan.com",
      description:
        "Cloud platform provider for Malaysian SMEs offering integrated business management and compute services",
      sameAs: [
        "https://twitter.com/awan_keusahawanan",
        "https://www.youtube.com/@awankeusahawanan",
        "https://instagram.com/awan_keusahawanan",
        "https://threads.com/awan_keusahawanan",
      ],
    },
    hasPart: [
      {
        "@type": "WebPageElement",
        "@id": "https://awan-keusahawanan.com/#features",
        name: "Platform Features",
        url: "https://awan-keusahawanan.com/#features",
      },
      {
        "@type": "WebPageElement",
        "@id": "https://awan-keusahawanan.com/#pricing",
        name: "Pricing Plans",
        url: "https://awan-keusahawanan.com/#pricing",
      },
    ],
  }

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        <Hero />
        <Features />
        <LogoMarquee />
        <Pricing />
        <AppverseFooter />
      </main>

      {/* JSON-LD structured data */}
      <Script
        id="pricing-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pricingStructuredData),
        }}
      />

      <Script
        id="page-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageStructuredData),
        }}
      />
    </>
  )
}
