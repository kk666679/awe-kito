"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "What's included in the free trial?",
    answer:
      "The free trial includes full access to all features in the Professional plan for 14 days. No credit card required. You can invite team members, use all business modules, and test compute resources with RM 50 in credits.",
  },
  {
    question: "Can I change plans anytime?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the billing accordingly. There are no cancellation fees or long-term contracts.",
  },
  {
    question: "How does compute billing work?",
    answer:
      "Compute resources are billed per hour of usage. You only pay for the time your instances are running. We provide detailed usage analytics and cost forecasting to help you optimize your spending.",
  },
  {
    question: "Is there a setup fee?",
    answer:
      "No, there are no setup fees for any of our plans. You can start using the platform immediately after signing up. Our team provides free onboarding assistance for Professional and Enterprise plans.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, bank transfers, and Malaysian online banking. Enterprise customers can also pay via invoice with NET 30 terms.",
  },
  {
    question: "Do you offer discounts for startups or non-profits?",
    answer:
      "Yes, we offer special pricing for qualified startups and non-profit organizations. Contact our sales team to learn about available discounts and programs.",
  },
  {
    question: "What happens if I exceed my plan limits?",
    answer:
      "We'll notify you before you reach your limits. You can either upgrade your plan or purchase additional resources as needed. We never cut off access without warning.",
  },
  {
    question: "Is my data secure and backed up?",
    answer:
      "Yes, all data is encrypted in transit and at rest. We perform automated daily backups with point-in-time recovery. Enterprise plans include additional security features and compliance certifications.",
  },
]

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="container mx-auto px-4 py-16 sm:py-20">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">Frequently Asked Questions</h2>
        <p className="mt-4 text-lg text-neutral-300">Everything you need to know about our pricing</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <Card key={index} className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
            <CardContent className="p-0">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-lime-300" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-lime-300" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-neutral-300">{faq.answer}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="mt-16 text-center">
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardContent className="p-8">
            <h3 className="mb-4 text-xl font-bold text-white">Still have questions?</h3>
            <p className="mb-6 text-neutral-300">
              Our team is here to help you choose the right plan for your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="rounded-full bg-lime-400 px-6 py-3 text-black hover:bg-lime-300 transition-colors">
                Contact Sales
              </button>
              <button className="rounded-full border border-white/20 px-6 py-3 text-white hover:bg-white/10 transition-colors">
                Schedule Demo
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
