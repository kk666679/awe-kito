// Custom error classes for different error categories
export class AppError extends Error {
  public readonly statusCode: number
  public readonly isOperational: boolean
  public readonly errorCode: string
  public readonly context?: Record<string, any>

  constructor(
    message: string,
    statusCode = 500,
    errorCode = "INTERNAL_ERROR",
    isOperational = true,
    context?: Record<string, any>,
  ) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode
    this.isOperational = isOperational
    this.errorCode = errorCode
    this.context = context

    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  constructor(message: string, field?: string, value?: any) {
    super(message, 400, "VALIDATION_ERROR", true, { field, value })
  }
}

export class AuthenticationError extends AppError {
  constructor(message = "Authentication required", context?: Record<string, any>) {
    super(message, 401, "AUTH_ERROR", true, context)
  }
}

export class AuthorizationError extends AppError {
  constructor(message = "Insufficient permissions", context?: Record<string, any>) {
    super(message, 403, "AUTHORIZATION_ERROR", true, context)
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, identifier?: string) {
    const message = identifier ? `${resource} with ID '${identifier}' not found` : `${resource} not found`
    super(message, 404, "NOT_FOUND", true, { resource, identifier })
  }
}

export class ConflictError extends AppError {
  constructor(message: string, context?: Record<string, any>) {
    super(message, 409, "CONFLICT_ERROR", true, context)
  }
}

export class RateLimitError extends AppError {
  constructor(limit: number, windowMs: number) {
    super(`Rate limit exceeded: ${limit} requests per ${windowMs}ms`, 429, "RATE_LIMIT_ERROR", true, {
      limit,
      windowMs,
    })
  }
}

export class ExternalServiceError extends AppError {
  constructor(service: string, originalError?: Error) {
    super(`External service error: ${service}`, 502, "EXTERNAL_SERVICE_ERROR", true, {
      service,
      originalError: originalError?.message,
    })
  }
}

export class DatabaseError extends AppError {
  constructor(operation: string, originalError?: Error) {
    super(`Database operation failed: ${operation}`, 500, "DATABASE_ERROR", true, {
      operation,
      originalError: originalError?.message,
    })
  }
}

export class WorkspaceError extends AppError {
  constructor(message: string, workspaceId?: string) {
    super(message, 403, "WORKSPACE_ERROR", true, { workspaceId })
  }
}

// Error response interface
export interface ErrorResponse {
  success: false
  error: {
    message: string
    code: string
    statusCode: number
    requestId?: string
    timestamp: string
    context?: Record<string, any>
    stack?: string
  }
}

// Success response interface
export interface SuccessResponse<T = any> {
  success: true
  data: T
  requestId?: string
  timestamp: string
}

export type ApiResponse<T = any> = SuccessResponse<T> | ErrorResponse
