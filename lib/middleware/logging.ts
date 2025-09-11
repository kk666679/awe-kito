import { type NextRequest, NextResponse } from "next/server"
import { logger } from "../logging"

export interface RequestContext {
  requestId: string
  userId?: string
  workspaceId?: string
  sessionId?: string
}

// Generate unique request ID
function generateRequestId(): string {
  return `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Extract user context from request headers or JWT
function extractUserContext(request: NextRequest): Partial<RequestContext> {
  const authHeader = request.headers.get("authorization")
  const workspaceId = new URL(request.url).searchParams.get("workspaceId")
  const sessionId = request.headers.get("x-session-id")

  // TODO: Extract userId from JWT token when auth is implemented
  const userId = request.headers.get("x-user-id") // Temporary header-based approach

  return {
    userId: userId || undefined,
    workspaceId: workspaceId || undefined,
    sessionId: sessionId || undefined,
  }
}

// Logging middleware wrapper for API routes
export function withLogging(handler: (request: NextRequest, context: RequestContext) => Promise<NextResponse>) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const startTime = Date.now()
    const requestId = generateRequestId()
    const userContext = extractUserContext(request)
    const context: RequestContext = { requestId, ...userContext }

    // Create child logger with request context
    const requestLogger = logger.child({
      requestId,
      userId: context.userId,
      sessionId: context.sessionId,
      category: "api",
    })

    // Log incoming request
    requestLogger.info("API request started", {
      method: request.method,
      url: request.url,
      userAgent: request.headers.get("user-agent"),
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip"),
      workspaceId: context.workspaceId,
    })

    let response: NextResponse
    let statusCode = 200
    let error: Error | null = null

    try {
      // Execute the actual route handler
      response = await handler(request, context)
      statusCode = response.status

      // Log successful response
      requestLogger.info("API request completed", {
        statusCode,
        duration: Date.now() - startTime,
        method: request.method,
        url: request.url,
      })
    } catch (err) {
      error = err as Error
      statusCode = 500

      // Log error
      requestLogger.error("API request failed", error, {
        statusCode,
        duration: Date.now() - startTime,
        method: request.method,
        url: request.url,
      })

      // Return error response
      response = NextResponse.json({ success: false, error: "Internal server error", requestId }, { status: 500 })
    }

    // Add request ID to response headers
    response.headers.set("x-request-id", requestId)

    return response
  }
}

// Specialized logging for different API categories
export const withAuthLogging = (handler: Function) =>
  withLogging(async (request, context) => {
    const authLogger = logger.child({
      ...context,
      category: "auth",
    })

    try {
      const result = await handler(request)

      if (request.method === "POST") {
        authLogger.info("Authentication attempt", {
          success: result.status === 200,
          workspaceId: context.workspaceId,
        })
      }

      return result
    } catch (error) {
      authLogger.error("Authentication error", error as Error)
      throw error
    }
  })

export const withBusinessLogging = (handler: Function) =>
  withLogging(async (request, context) => {
    const businessLogger = logger.child({
      ...context,
      category: "business",
    })

    const url = new URL(request.url)
    const operation = url.pathname.split("/").pop()

    businessLogger.info(`Business ${operation} operation`, {
      method: request.method,
      workspaceId: context.workspaceId,
    })

    return await handler(request)
  })

export const withComputeLogging = (handler: Function) =>
  withLogging(async (request, context) => {
    const computeLogger = logger.child({
      ...context,
      category: "compute",
    })

    if (request.method === "POST") {
      const body = await request.json()
      computeLogger.info("Compute job submitted", {
        jobType: body.jobType,
        workspaceId: context.workspaceId,
        resourceRequest: body.resourceRequest,
      })
    }

    return await handler(request)
  })

export const withMonitoringLogging = (handler: Function) =>
  withLogging(async (request, context) => {
    const monitoringLogger = logger.child({
      ...context,
      category: "monitoring",
    })

    monitoringLogger.debug("Metrics request", {
      workspaceId: context.workspaceId,
      timeRange: new URL(request.url).searchParams.get("timeRange"),
    })

    return await handler(request)
  })
