import type { ApiResponse } from "./errors/types"
import { withRetry } from "./middleware/error"

/**
 * Safely parse JSON from a fetch response
 * Prevents "Unexpected end of JSON input" errors
 */
export async function safeJsonParse(response: Response) {
  const text = await response.text()

  if (!text || text.trim() === "") {
    return null
  }

  try {
    return JSON.parse(text)
  } catch (error) {
    console.error("Failed to parse JSON:", error)
    throw new Error("Invalid JSON response")
  }
}

/**
 * Enhanced fetch with automatic JSON parsing and error handling
 */
export async function apiRequest<T = any>(
  url: string,
  options: RequestInit & { retry?: boolean } = {},
): Promise<ApiResponse<T>> {
  const { retry = false, ...fetchOptions } = options

  const makeRequest = async (): Promise<ApiResponse<T>> => {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...fetchOptions.headers,
      },
      ...fetchOptions,
    })

    const data = await safeJsonParse(response)

    if (!response.ok) {
      throw new Error(data?.error?.message || `HTTP ${response.status}: ${response.statusText}`)
    }

    return data as ApiResponse<T>
  }

  if (retry) {
    return withRetry(makeRequest, { maxRetries: 3, delay: 1000, backoff: true })
  }

  return makeRequest()
}

// Convenience methods
export const api = {
  get: <T = any>(url: string, options?: RequestInit & { retry?: boolean }) =>
    apiRequest<T>(url, { ...options, method: "GET" }),

  post: <T = any>(url: string, data?: any, options?: RequestInit & { retry?: boolean }) =>
    apiRequest<T>(url, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T = any>(url: string, data?: any, options?: RequestInit & { retry?: boolean }) =>
    apiRequest<T>(url, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T = any>(url: string, options?: RequestInit & { retry?: boolean }) =>
    apiRequest<T>(url, { ...options, method: "DELETE" }),
}
