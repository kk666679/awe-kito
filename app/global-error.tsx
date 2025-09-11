"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  if (error.message.includes("ResizeObserver")) {
    return null
  }

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center space-y-4">
          <h2 className="text-2xl font-bold">Something went wrong!</h2>
          <button onClick={reset}>Try again</button>
        </div>
      </body>
    </html>
  )
}
