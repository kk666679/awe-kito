import { type NextRequest, NextResponse } from "next/server"
import { AppError, type ErrorResponse, ValidationError, DatabaseError, ExternalServiceError } from "./types"
import { logger } from "../logging"
import { monitoringService } from "../monitoring"

// Error handler middleware
export function withErrorHandler(handler: (request: NextRequest) => Promise<NextResponse>) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const requestId = request.headers.get("x-request-id") || generateRequestId()

    try {
      return await handler(request)
    } catch (error) {
      return handleError(error, request, requestId)
    }
  }
}

// Central error handling function
export function handleError(error: unknown, request: NextRequest, requestId?: string): NextResponse {
  const id = requestId || generateRequestId()
  const timestamp = new Date().toISOString()

  // Handle known AppError instances
  if (error instanceof AppError) {
    const errorResponse: ErrorResponse = {
      success: false,
      error: {
        message: error.message,
        code: error.errorCode,
        statusCode: error.statusCode,
        requestId: id,
        timestamp,
        context: error.context,
      },
    }

    // Log operational errors as warnings, others as errors
    if (error.isOperational) {
      logger.warn("Operational error occurred", {
        error: error.message,
        code: error.errorCode,
        statusCode: error.statusCode,
        requestId: id,
        url: request.url,
        method: request.method,
        context: error.context,
      })
    } else {
      logger.error("Non-operational error occurred", error, {
        requestId: id,
        url: request.url,
        method: request.method,
      })
    }

    // Record error metrics
    recordErrorMetrics(error, request)

    return NextResponse.json(errorResponse, {
      status: error.statusCode,
      headers: { "x-request-id": id },
    })
  }

  // Handle unknown errors
  const unknownError = error as Error
  const errorResponse: ErrorResponse = {
    success: false,
    error: {
      message: "Internal server error",
      code: "INTERNAL_ERROR",
      statusCode: 500,
      requestId: id,
      timestamp,
      ...(process.env.NODE_ENV === "development" && {
        stack: unknownError.stack,
        context: { originalMessage: unknownError.message },
      }),
    },
  }

  // Log unknown errors
  logger.error("Unknown error occurred", unknownError, {
    requestId: id,
    url: request.url,
    method: request.method,
  })

  // Record error metrics
  recordErrorMetrics(unknownError, request)

  return NextResponse.json(errorResponse, {
    status: 500,
    headers: { "x-request-id": id },
  })
}

// Record error metrics
function recordErrorMetrics(error: Error, request: NextRequest): void {
  const url = new URL(request.url)
  const tags = {
    method: request.method,
    path: url.pathname,
    error_type: error.constructor.name,
    error_code: error instanceof AppError ? error.errorCode : "UNKNOWN_ERROR",
  }

  monitoringService.recordMetric({
    name: "api_error_occurred",
    value: 1,
    unit: "count",
    tags,
  })

  if (error instanceof AppError) {
    monitoringService.recordMetric({
      name: "api_error_by_status",
      value: 1,
      unit: "count",
      tags: {
        ...tags,
        status_code: error.statusCode.toString(),
      },
    })
  }
}

// Generate unique request ID
function generateRequestId(): string {
  return `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Async error wrapper for route handlers
export function asyncHandler(handler: (request: NextRequest) => Promise<NextResponse>) {
  return withErrorHandler(handler)
}

// Validation helper
export function validateRequired(data: Record<string, any>, fields: string[]): void {
  const missing = fields.filter((field) => !data[field])
  if (missing.length > 0) {
    throw new ValidationError(`Missing required fields: ${missing.join(", ")}`)
  }
}

// Database operation wrapper
export async function withDatabaseErrorHandling<T>(operation: () => Promise<T>, operationName: string): Promise<T> {
  try {
    return await operation()
  } catch (error) {
    logger.error(`Database operation failed: ${operationName}`, error as Error)
    throw new DatabaseError(operationName, error as Error)
  }
}

// External service call wrapper
export async function withExternalServiceErrorHandling<T>(
  operation: () => Promise<T>,
  serviceName: string,
): Promise<T> {
  try {
    return await operation()
  } catch (error) {
    logger.error(`External service call failed: ${serviceName}`, error as Error)
    throw new ExternalServiceError(serviceName, error as Error)
  }
}

// Circuit breaker implementation
class CircuitBreaker {
  private failures = 0
  private lastFailureTime = 0
  private state: "CLOSED" | "OPEN" | "HALF_OPEN" = "CLOSED"

  constructor(
    private readonly threshold: number = 5,
    private readonly timeout: number = 60000, // 1 minute
  ) {}

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === "OPEN") {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = "HALF_OPEN"
      } else {
        throw new ExternalServiceError("Circuit breaker is OPEN")
      }
    }

    try {
      const result = await operation()
      this.onSuccess()
      return result
    } catch (error) {
      this.onFailure()
      throw error
    }
  }

  private onSuccess(): void {
    this.failures = 0
    this.state = "CLOSED"
  }

  private onFailure(): void {
    this.failures++
    this.lastFailureTime = Date.now()

    if (this.failures >= this.threshold) {
      this.state = "OPEN"
    }
  }

  getState(): string {
    return this.state
  }
}

export const circuitBreaker = new CircuitBreaker()
