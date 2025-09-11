import { type NextRequest, NextResponse } from "next/server"
import { handleError } from "../errors/handler"
import { logger } from "../logging"

// Global error handling middleware
export function withGlobalErrorHandler(handler: (request: NextRequest) => Promise<NextResponse>) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const startTime = Date.now()
    const requestId = `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Add request ID to headers for tracking
    const requestWithId = new Request(request, {
      headers: {
        ...Object.fromEntries(request.headers.entries()),
        "x-request-id": requestId,
      },
    }) as NextRequest

    try {
      const response = await handler(requestWithId)

      // Add request ID to response headers
      response.headers.set("x-request-id", requestId)

      // Log successful requests
      logger.info("Request completed successfully", {
        requestId,
        method: request.method,
        url: request.url,
        statusCode: response.status,
        duration: Date.now() - startTime,
      })

      return response
    } catch (error) {
      // Log request failure
      logger.error("Request failed with unhandled error", error as Error, {
        requestId,
        method: request.method,
        url: request.url,
        duration: Date.now() - startTime,
      })

      return handleError(error, requestWithId, requestId)
    }
  }
}

// Request validation middleware
export function withRequestValidation(
  handler: (request: NextRequest) => Promise<NextResponse>,
  options: {
    maxBodySize?: number
    allowedMethods?: string[]
    requiredHeaders?: string[]
  } = {},
) {
  return withGlobalErrorHandler(async (request: NextRequest) => {
    const { maxBodySize = 10 * 1024 * 1024, allowedMethods, requiredHeaders } = options

    // Validate HTTP method
    if (allowedMethods && !allowedMethods.includes(request.method)) {
      return NextResponse.json({ success: false, error: `Method ${request.method} not allowed` }, { status: 405 })
    }

    // Validate required headers
    if (requiredHeaders) {
      const missing = requiredHeaders.filter((header) => !request.headers.get(header))
      if (missing.length > 0) {
        return NextResponse.json(
          { success: false, error: `Missing required headers: ${missing.join(", ")}` },
          { status: 400 },
        )
      }
    }

    // Validate content length
    const contentLength = request.headers.get("content-length")
    if (contentLength && Number.parseInt(contentLength) > maxBodySize) {
      return NextResponse.json({ success: false, error: "Request body too large" }, { status: 413 })
    }

    return await handler(request)
  })
}

// Retry mechanism for external calls
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: {
    maxRetries?: number
    delay?: number
    backoff?: boolean
  } = {},
): Promise<T> {
  const { maxRetries = 3, delay = 1000, backoff = true } = options
  let lastError: Error

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error as Error

      if (attempt === maxRetries) {
        throw lastError
      }

      const waitTime = backoff ? delay * Math.pow(2, attempt - 1) : delay
      logger.warn(`Operation failed, retrying in ${waitTime}ms (attempt ${attempt}/${maxRetries})`, {
        error: lastError.message,
        attempt,
        maxRetries,
      })

      await new Promise((resolve) => setTimeout(resolve, waitTime))
    }
  }

  throw lastError!
}
