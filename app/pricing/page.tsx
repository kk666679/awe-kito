import { SiteHeader } from "@/components/site-header"
import { PricingHero } from "@/components/pricing-hero"
import { PlatformPricing } from "@/components/platform-pricing"
import { ServiceAddOns } from "@/components/service-add-ons"
import { PricingFAQ } from "@/components/pricing-faq"
import { AppverseFooter } from "@/components/appverse-footer"
import Script from "next/script"

export const metadata = {
  title: "Pricing Plans | Awan Keusahawanan",
  description:
    "Transparent pricing for cloud platform services, business management modules, compute resources, and storage solutions. Choose the right plan for your Malaysian business.",
}

export default function PricingPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://awan-keusahawanan.com/pricing",
    name: "Platform Pricing Plans",
    description: "Comprehensive pricing for all cloud platform services",
    url: "https://awan-keusahawanan.com/pricing",
  }

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        <PricingHero />
        <PlatformPricing />
        <ServiceAddOns />
        <PricingFAQ />
        <AppverseFooter />
      </main>

      <Script
        id="pricing-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </>
  )
}
