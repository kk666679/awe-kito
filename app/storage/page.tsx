import { SiteHeader } from "@/components/site-header"
import { StorageHero } from "@/components/storage-hero"
import { StorageProviders } from "@/components/storage-providers"
import { StorageFeatures } from "@/components/storage-features"
import { StoragePricing } from "@/components/storage-pricing"
import { AppverseFooter } from "@/components/appverse-footer"
import Script from "next/script"

export const metadata = {
  title: "Multi-Cloud Storage | Awan Keusahawanan",
  description:
    "Unified multi-cloud storage management across AWS S3, Google Cloud, Azure, and more. Secure, scalable, and cost-effective storage solutions for Malaysian businesses.",
}

export default function StoragePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://awan-keusahawanan.com/storage",
    name: "Multi-Cloud Storage Platform",
    description: "Unified multi-cloud storage management and integration",
    url: "https://awan-keusahawanan.com/storage",
  }

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        <StorageHero />
        <StorageProviders />
        <StorageFeatures />
        <StoragePricing />
        <AppverseFooter />
      </main>

      <Script
        id="storage-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </>
  )
}
