"use client"

import { CardTitle } from "@/components/ui/card"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { CheckCircle2, Cpu, Users, Cloud } from "lucide-react"

type Feature = { text: string; muted?: boolean }

const ACCENT = "#C6FF3A"

function FeatureItem({ text, muted = false }: Feature) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle2 className="mt-0.5 h-4 w-4" style={{ color: ACCENT }} />
      <span className={`text-sm ${muted ? "text-neutral-500" : "text-neutral-200"}`}>{text}</span>
    </li>
  )
}

type Currency = "MYR" | "USD"

const PRICES: Record<Currency, { starter: string; business: string; enterprise: string; save: string }> = {
  MYR: {
    starter: "RM299",
    business: "RM899",
    enterprise: "RM2,499",
    save: "Save RM50",
  },
  USD: {
    starter: "$79",
    business: "$199",
    enterprise: "$599",
    save: "Save $20",
  },
}

function guessLocalCurrency(): Currency {
  const lang = typeof navigator !== "undefined" ? navigator.language : ""
  const tz = typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : ""
  if (/-(MY|SG|BN)\\b/i.test(lang) || /(Kuala_Lumpur|Singapore|Brunei)/i.test(tz || "")) return "MYR"
  return "USD"
}

export function Pricing() {
  const [currency, setCurrency] = useState<Currency>("USD")

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch("/api/geo", { cache: "no-store" })
        if (!res.ok) throw new Error("geo failed")
        const data = await res.json()
        if (!cancelled) setCurrency(data?.currency === "MYR" ? "MYR" : "USD")
      } catch {
        if (!cancelled) setCurrency(guessLocalCurrency())
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section id="pricing" className="text-white" itemScope itemType="https://schema.org/PriceSpecification">
      <div className="container mx-auto px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="mx-auto mb-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
            style={{ backgroundColor: "rgba(198,255,58,0.12)", color: ACCENT }}
          >
            Cloud Platform Pricing
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl" itemProp="name">
            Scale with confidence.
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-neutral-400" itemProp="description">
            Transparent pricing for business management tools and compute resources. No hidden fees, pay for what you
            use.
          </p>
          <div className="mt-6">
            <Button
              asChild
              className="rounded-full px-5 text-neutral-900 hover:brightness-95"
              style={{ backgroundColor: "#f2f2f2" }}
            >
              <Link href="/contact" target="_blank">
                Contact Sales
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <Card
            className="relative overflow-hidden rounded-2xl liquid-glass shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-300"
            itemScope
            itemType="https://schema.org/Offer"
          >
            <div
              className="absolute right-4 top-11 rounded-full px-2 py-0.5 text-[10px]"
              style={{ backgroundColor: "#1f1f1f", color: "#d4d4d4" }}
            >
              {PRICES[currency].save}
            </div>

            <CardHeader className="space-y-3 pb-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-lime-300" />
                <div className="text-sm font-semibold text-neutral-200" itemProp="name">
                  Starter
                </div>
              </div>
              <div className="flex items-end gap-2 text-neutral-100">
                <div className="text-xl font-bold tracking-tight" itemProp="price">
                  {PRICES[currency].starter}
                </div>
                <span className="pb-0.5 text-[11px] text-neutral-400">per month</span>
                <meta itemProp="priceCurrency" content={currency} />
              </div>
              <div className="flex gap-2">
                <Button
                  asChild
                  className="flex-1 rounded-full px-4 py-2 text-sm font-medium text-black shadow transition-[box-shadow,transform,filter] active:translate-y-[1px]"
                  style={{ backgroundColor: ACCENT }}
                >
                  <Link href="/signup?plan=starter">Get Started</Link>
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <ul className="grid gap-2" itemProp="description">
                {[
                  "Up to 5 team members",
                  "Basic CRM & Inventory",
                  "10GB storage included",
                  "2 vCPU hours/month",
                  "Email support",
                  "Single workspace",
                ].map((f, i) => (
                  <FeatureItem key={i} text={f} />
                ))}
              </ul>
            </CardContent>
            <CardFooter />
          </Card>

          <Card
            className="relative overflow-hidden rounded-2xl liquid-glass shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-300"
            itemScope
            itemType="https://schema.org/Offer"
          >
            <CardHeader className="space-y-3 pb-4">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-lime-300" />
                <div className="text-sm font-semibold text-neutral-200" itemProp="name">
                  Business
                </div>
              </div>
              <div className="flex items-end gap-2 text-neutral-100">
                <div className="text-xl font-bold tracking-tight" itemProp="price">
                  {PRICES[currency].business}
                </div>
                <span className="pb-0.5 text-[11px] text-neutral-400">per month</span>
                <meta itemProp="priceCurrency" content={currency} />
              </div>

              <div className="flex gap-2">
                <Button
                  asChild
                  className="flex-1 rounded-full px-4 py-2 text-sm font-medium text-black shadow transition-[box-shadow,transform,filter] active:translate-y-[1px]"
                  style={{ backgroundColor: ACCENT }}
                >
                  <Link href="/signup?plan=business">Choose Business</Link>
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <ul className="grid gap-2" itemProp="description">
                {[
                  "Up to 25 team members",
                  "Full business suite (CRM, Inventory, Invoicing)",
                  "100GB storage + multi-cloud",
                  "20 vCPU hours + 5 GPU hours/month",
                  "Task management & reporting",
                  "Priority support",
                ].map((f, i) => (
                  <FeatureItem key={i} text={f} />
                ))}
              </ul>
            </CardContent>
            <CardFooter />
          </Card>

          <Card
            className="relative overflow-hidden rounded-2xl liquid-glass-enhanced shadow-[0_16px_50px_rgba(0,0,0,0.4)] transition-all duration-300"
            itemScope
            itemType="https://schema.org/Offer"
          >
            <CardHeader className="relative space-y-3 pb-4">
              <div className="flex items-center gap-2">
                <Cloud className="h-4 w-4 text-lime-300" />
                <div className="text-sm font-semibold text-neutral-200" itemProp="name">
                  Enterprise
                </div>
              </div>
              <div className="flex items-end gap-2 text-white">
                <div className="text-xl font-bold tracking-tight" itemProp="price">
                  {PRICES[currency].enterprise}
                </div>
                <span className="pb-0.5 text-[11px] text-neutral-400">per month</span>
                <meta itemProp="priceCurrency" content={currency} />
              </div>
              <div className="flex gap-2">
                <Button
                  asChild
                  className="flex-1 rounded-full px-4 py-2 text-sm font-medium text-black shadow transition-[box-shadow,transform,filter] active:translate-y-[1px]"
                  style={{ backgroundColor: ACCENT }}
                >
                  <Link href="/contact?plan=enterprise">Contact Sales</Link>
                </Button>
              </div>
            </CardHeader>

            <CardContent className="relative pt-0">
              <ul className="grid gap-2" itemProp="description">
                {[
                  "Unlimited team members",
                  "Advanced business analytics & reporting",
                  "1TB storage + enterprise multi-cloud",
                  "100 vCPU hours + 25 GPU hours/month",
                  "Custom integrations & API access",
                  "Dedicated support & SLA",
                  "Advanced security & compliance",
                  "Custom deployment options",
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4" style={{ color: ACCENT }} />
                    <span className="text-sm text-neutral-200">{f}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter />
          </Card>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Additional Compute Resources</h3>
          <p className="text-neutral-400 mb-6 max-w-2xl mx-auto">
            Need more computing power? Scale your resources on-demand with transparent per-hour pricing.
          </p>
          <div className="grid gap-4 md:grid-cols-3 max-w-4xl mx-auto">
            <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white">CPU Compute</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-lime-300 mb-1">{currency === "MYR" ? "RM0.15" : "$0.04"}</div>
                <div className="text-xs text-neutral-400">per vCPU hour</div>
              </CardContent>
            </Card>
            <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white">GPU Compute</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-lime-300 mb-1">{currency === "MYR" ? "RM2.50" : "$0.65"}</div>
                <div className="text-xs text-neutral-400">per GPU hour</div>
              </CardContent>
            </Card>
            <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white">Storage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-lime-300 mb-1">{currency === "MYR" ? "RM0.08" : "$0.02"}</div>
                <div className="text-xs text-neutral-400">per GB/month</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
