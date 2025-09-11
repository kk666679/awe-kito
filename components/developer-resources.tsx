"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Download,
  Github,
  MessageCircle,
  FileText,
  Zap,
  Bug,
  Lightbulb,
  ExternalLink,
  Code,
  Terminal,
  Book,
  Users,
} from "lucide-react"
import Link from "next/link"

const sdks = [
  {
    name: "Node.js SDK",
    description: "Official Node.js SDK with TypeScript support",
    version: "v2.1.4",
    downloads: "15.2k",
    language: "JavaScript/TypeScript",
    github: "https://github.com/awan-keusahawanan/nodejs-sdk",
    npm: "npm install @awan-keusahawanan/sdk",
  },
  {
    name: "Python SDK",
    description: "Comprehensive Python SDK with async support",
    version: "v1.8.2",
    downloads: "8.7k",
    language: "Python",
    github: "https://github.com/awan-keusahawanan/python-sdk",
    npm: "pip install awan-keusahawanan",
  },
  {
    name: "PHP SDK",
    description: "Modern PHP SDK with Laravel integration",
    version: "v1.5.1",
    downloads: "4.3k",
    language: "PHP",
    github: "https://github.com/awan-keusahawanan/php-sdk",
    npm: "composer require awan-keusahawanan/sdk",
  },
  {
    name: "Go SDK",
    description: "High-performance Go SDK for enterprise applications",
    version: "v1.2.0",
    downloads: "2.1k",
    language: "Go",
    github: "https://github.com/awan-keusahawanan/go-sdk",
    npm: "go get github.com/awan-keusahawanan/go-sdk",
  },
]

const faqs = [
  {
    question: "How do I get started with the API?",
    answer:
      "Start by creating an account and generating your API keys in the dashboard. Then follow our Quick Start Guide to make your first API call. We recommend using one of our official SDKs for the best developer experience.",
  },
  {
    question: "What are the rate limits for API calls?",
    answer:
      "Rate limits vary by plan: Starter (1,000 requests/hour), Professional (10,000 requests/hour), Enterprise (100,000 requests/hour). Rate limit headers are included in all responses to help you track usage.",
  },
  {
    question: "How do I handle authentication?",
    answer:
      "We support multiple authentication methods: API Keys for server-to-server communication, OAuth 2.0 for user-facing applications, and JWT tokens for session management. All requests must be made over HTTPS.",
  },
  {
    question: "Can I use webhooks for real-time updates?",
    answer:
      "Yes! Configure webhooks in your dashboard to receive real-time notifications for events like new orders, payment updates, inventory changes, and more. We support retry logic and signature verification for security.",
  },
  {
    question: "What support is available for enterprise customers?",
    answer:
      "Enterprise customers get dedicated support channels, custom SLAs, priority bug fixes, and access to our solutions engineering team for complex integrations. Contact our sales team for more details.",
  },
  {
    question: "How do I migrate from another platform?",
    answer:
      "We provide migration tools and dedicated support to help you transition from other platforms. Our solutions team can assist with data mapping, API compatibility, and custom migration scripts.",
  },
]

export function DeveloperResources() {
  return (
    <section id="developer-resources" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Developer Resources</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto text-balance">
            Everything you need to build, deploy, and scale your integrations with our comprehensive developer toolkit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* SDKs & Libraries */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Code className="h-6 w-6 text-purple-400" />
              SDKs & Libraries
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sdks.map((sdk) => (
                <Card key={sdk.name} className="glass-border hover:glass-border-enhanced transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-white text-lg">{sdk.name}</CardTitle>
                      <Badge variant="outline" className="text-xs text-gray-400 border-gray-600">
                        {sdk.version}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-300 text-sm">{sdk.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Language:</span>
                      <span className="text-white">{sdk.language}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Downloads:</span>
                      <span className="text-white flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        {sdk.downloads}
                      </span>
                    </div>
                    <div className="bg-black/30 p-2 rounded text-xs font-mono text-purple-300">{sdk.npm}</div>
                    <div className="flex gap-2">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="flex-1 border-purple-600/50 text-purple-400 hover:bg-purple-600/20 bg-transparent"
                      >
                        <Link href={sdk.github}>
                          <Github className="mr-2 h-3 w-3" />
                          GitHub
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="border-gray-600/50 text-gray-400 hover:bg-gray-600/20 bg-transparent"
                      >
                        <Link href={`/docs/sdk/${sdk.name.toLowerCase().replace(" ", "-")}`}>
                          <Book className="mr-2 h-3 w-3" />
                          Docs
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="h-6 w-6 text-yellow-400" />
              Quick Links
            </h3>
            <div className="space-y-4">
              <Card className="glass-border p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-600/20">
                    <FileText className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">API Reference</h4>
                    <p className="text-gray-400 text-sm">Complete API documentation</p>
                  </div>
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/docs/api">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>

              <Card className="glass-border p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-600/20">
                    <Terminal className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">API Explorer</h4>
                    <p className="text-gray-400 text-sm">Interactive API testing</p>
                  </div>
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/api-explorer">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>

              <Card className="glass-border p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-600/20">
                    <Code className="h-5 w-5 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">Code Examples</h4>
                    <p className="text-gray-400 text-sm">Ready-to-use snippets</p>
                  </div>
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/examples">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>

              <Card className="glass-border p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-600/20">
                    <Bug className="h-5 w-5 text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">Status Page</h4>
                    <p className="text-gray-400 text-sm">API uptime & incidents</p>
                  </div>
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/status">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" />
            Frequently Asked Questions
          </h3>
          <Card className="glass-border">
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-gray-700">
                    <AccordionTrigger className="text-white hover:text-purple-400 text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 leading-relaxed">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Community & Support */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="glass-border p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-blue-600/20">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Developer Community</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Join thousands of developers building with our platform. Get help, share knowledge, and collaborate on
                  projects.
                </p>
                <div className="flex gap-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-blue-600/50 text-blue-400 hover:bg-blue-600/20 bg-transparent"
                  >
                    <Link href="/community">
                      <MessageCircle className="mr-2 h-3 w-3" />
                      Join Discord
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-gray-600/50 text-gray-400 hover:bg-gray-600/20 bg-transparent"
                  >
                    <Link href="/forum">Forum</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="glass-border p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-green-600/20">
                <MessageCircle className="h-6 w-6 text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Technical Support</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Need help with your integration? Our technical support team is here to assist with implementation
                  questions and troubleshooting.
                </p>
                <div className="flex gap-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-green-600/50 text-green-400 hover:bg-green-600/20 bg-transparent"
                  >
                    <Link href="/support">Get Support</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-gray-600/50 text-gray-400 hover:bg-gray-600/20 bg-transparent"
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
