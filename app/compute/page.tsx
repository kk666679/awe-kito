import { SiteHeader } from "@/components/site-header"
import { ComputeHero } from "@/components/compute-hero"
import { ComputeServices } from "@/components/compute-services"
import { ComputeSpecs } from "@/components/compute-specs"
import { ComputePricing } from "@/components/compute-pricing"
import { AppverseFooter } from "@/components/appverse-footer"
import Script from "next/script"

export const metadata = {
  title: "Cloud Compute Platform | Awan Keusahawanan",
  description:
    "High-performance GPU and CPU cloud computing resources for AI training, 3D rendering, data processing, and Function-as-a-Service for Malaysian businesses.",
}

export default function ComputePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://awan-keusahawanan.com/compute",
    name: "Cloud Compute Platform",
    description: "High-performance GPU and CPU cloud computing resources",
    url: "https://awan-keusahawanan.com/compute",
  }

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        <ComputeHero />
        <ComputeServices />
        <ComputeSpecs />
        <ComputePricing />
        <AppverseFooter />
      </main>

      <Script
        id="compute-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </>
  )
}
