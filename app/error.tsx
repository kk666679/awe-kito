"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    if (error.message.includes("ResizeObserver")) {
      console.warn("ResizeObserver error suppressed:", error.message)
      return
    }
    console.error("Application error:", error)
  }, [error])

  if (error.message.includes("ResizeObserver")) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <p className="text-muted-foreground">An error occurred while loading the application.</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}
