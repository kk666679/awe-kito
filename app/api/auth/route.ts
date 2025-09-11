import { type NextRequest, NextResponse } from "next/server"
import { withAuthLogging } from "@/lib/middleware/logging"
import { withMonitoring } from "@/lib/middleware/monitoring"
import { withGlobalErrorHandler, withRequestValidation } from "@/lib/middleware/error"
import { hashPassword, verifyPassword, generateToken, verifyToken } from "@/lib/auth"
import { ValidationError, AuthenticationError } from "@/lib/errors/types"
import { validateRequired } from "@/lib/errors/handler"
import { logger } from "@/lib/logging"

/**
 * Authentication API endpoint for multi-tenant platform
 * Handles JWT-based authentication with workspace isolation
 */
async function handlePOST(request: NextRequest) {
  const body = await request.json()
  const { email, password, workspaceId } = body

  validateRequired(body, ["email", "password"])

  if (!email.includes("@")) {
    throw new ValidationError("Invalid email format", "email", email)
  }

  if (password.length < 6) {
    throw new ValidationError("Password must be at least 6 characters", "password")
  }

  // TODO: Implement JWT authentication with Prisma
  // For now, using mock authentication

  // Mock user validation - replace with actual database lookup
  const mockUser = {
    id: "user_123",
    email,
    name: "Test User",
    role: "user",
    hashedPassword: await hashPassword("password123"), // Mock password
  }

  // Verify password (in production, compare with database)
  const isValidPassword = await verifyPassword(password, mockUser.hashedPassword)
  if (!isValidPassword) {
    logger.warn("Authentication failed - invalid credentials", {
      email,
      workspaceId,
    })

    throw new AuthenticationError("Invalid email or password", { email })
  }

  // Generate JWT token
  const token = generateToken({
    userId: mockUser.id,
    email: mockUser.email,
    workspaceId,
  })

  // Log successful authentication
  logger.info("User authenticated successfully", {
    userId: mockUser.id,
    email: mockUser.email,
    workspaceId,
  })

  const response = NextResponse.json({
    success: true,
    message: "Authentication successful",
    data: {
      user: {
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        role: mockUser.role,
      },
      token,
      workspace: workspaceId ? { id: workspaceId } : null,
    },
    requestId: request.headers.get("x-request-id"),
    timestamp: new Date().toISOString(),
  })

  // Set HTTP-only cookie for browser clients
  response.cookies.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 90 * 24 * 60 * 60, // 90 days
    path: "/",
  })

  return response
}

async function handleGET(request: NextRequest) {
  // Extract token from Authorization header or cookie
  const authHeader = request.headers.get("authorization")
  let token: string | null = null

  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.substring(7)
  } else {
    const tokenCookie = request.cookies.get("auth-token")
    token = tokenCookie?.value || null
  }

  if (!token) {
    throw new AuthenticationError("No token provided")
  }

  // Verify token
  const payload = verifyToken(token)
  if (!payload) {
    throw new AuthenticationError("Invalid or expired token")
  }

  // Get current user (mock implementation)
  const user = {
    id: payload.userId,
    email: payload.email,
    name: "Test User",
    role: "user",
    workspaceId: payload.workspaceId,
  }

  return NextResponse.json({
    success: true,
    data: { user },
    requestId: request.headers.get("x-request-id"),
    timestamp: new Date().toISOString(),
  })
}

// Logout endpoint
async function handleDELETE(request: NextRequest) {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
    requestId: request.headers.get("x-request-id"),
    timestamp: new Date().toISOString(),
  })

  // Clear auth cookie
  response.cookies.set("auth-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  })

  return response
}

export const POST = withRequestValidation(withMonitoring(withAuthLogging(withGlobalErrorHandler(handlePOST))), {
  allowedMethods: ["POST"],
  maxBodySize: 1024, // 1KB limit for auth requests
})

export const GET = withMonitoring(withAuthLogging(withGlobalErrorHandler(handleGET)))
export const DELETE = withMonitoring(withAuthLogging(withGlobalErrorHandler(handleDELETE)))
