import { type NextRequest, NextResponse } from "next/server"
import { verifyToken, getCurrentUser } from "../auth"
import { logger } from "../logging"
import { monitoringService } from "../monitoring"

export interface AuthContext {
  user: {
    id: string
    email: string
    name?: string
    role: string
  }
  workspace?: {
    id: string
    name: string
    plan: string
    role: string
  }
  permissions: string[]
}

export interface AuthenticatedRequest extends NextRequest {
  auth: AuthContext
}

// Extract JWT token from request
function extractToken(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization")

  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.substring(7)
  }

  // Fallback to cookie for browser requests
  const tokenCookie = request.cookies.get("auth-token")
  return tokenCookie?.value || null
}

// Validate workspace access
async function validateWorkspaceAccess(
  userId: string,
  workspaceId: string,
): Promise<{ workspace: any; role: string } | null> {
  try {
    // TODO: Implement with Prisma when database is ready
    // const membership = await prisma.workspaceMember.findFirst({
    //   where: {
    //     userId,
    //     workspaceId,
    //   },
    //   include: {
    //     workspace: true,
    //   },
    // })

    // Mock workspace validation for now
    const mockWorkspace = {
      id: workspaceId,
      name: "Mock Workspace",
      plan: "business",
    }

    return {
      workspace: mockWorkspace,
      role: "admin", // Mock role
    }
  } catch (error) {
    logger.error("Failed to validate workspace access", error as Error, {
      userId,
      workspaceId,
    })
    return null
  }
}

// Get user permissions based on role and workspace
function getUserPermissions(userRole: string, workspaceRole?: string): string[] {
  const permissions: string[] = []

  // Base user permissions
  permissions.push("read:profile", "update:profile")

  // Workspace-specific permissions
  if (workspaceRole) {
    switch (workspaceRole) {
      case "owner":
        permissions.push(
          "read:workspace",
          "update:workspace",
          "delete:workspace",
          "manage:members",
          "read:billing",
          "update:billing",
          "read:analytics",
          "manage:integrations",
        )
        break
      case "admin":
        permissions.push(
          "read:workspace",
          "update:workspace",
          "manage:members",
          "read:analytics",
          "manage:integrations",
        )
        break
      case "member":
        permissions.push("read:workspace", "read:analytics")
        break
      case "viewer":
        permissions.push("read:workspace")
        break
    }
  }

  // System-wide permissions based on user role
  if (userRole === "super_admin") {
    permissions.push("admin:system", "read:all_workspaces", "manage:all_users")
  }

  return permissions
}

// Authentication middleware
export function withAuth(
  handler: (request: AuthenticatedRequest) => Promise<NextResponse>,
  options: {
    requireWorkspace?: boolean
    requiredPermissions?: string[]
    allowedRoles?: string[]
  } = {},
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const startTime = Date.now()

    try {
      // Extract token
      const token = extractToken(request)
      if (!token) {
        monitoringService.recordMetric({
          name: "auth_failure",
          value: 1,
          unit: "count",
          tags: { reason: "no_token", path: request.nextUrl.pathname },
        })

        return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 })
      }

      // Verify token
      const payload = verifyToken(token)
      if (!payload) {
        monitoringService.recordMetric({
          name: "auth_failure",
          value: 1,
          unit: "count",
          tags: { reason: "invalid_token", path: request.nextUrl.pathname },
        })

        return NextResponse.json({ success: false, error: "Invalid or expired token" }, { status: 401 })
      }

      // Get user details
      const user = await getCurrentUser(token)
      if (!user) {
        monitoringService.recordMetric({
          name: "auth_failure",
          value: 1,
          unit: "count",
          tags: { reason: "user_not_found", path: request.nextUrl.pathname },
        })

        return NextResponse.json({ success: false, error: "User not found" }, { status: 401 })
      }

      // Check workspace access if required
      let workspaceContext: { workspace: any; role: string } | null = null
      const requestedWorkspaceId = new URL(request.url).searchParams.get("workspaceId") || payload.workspaceId

      if (options.requireWorkspace && !requestedWorkspaceId) {
        return NextResponse.json({ success: false, error: "Workspace ID required" }, { status: 400 })
      }

      if (requestedWorkspaceId) {
        workspaceContext = await validateWorkspaceAccess(user.id, requestedWorkspaceId)
        if (!workspaceContext) {
          monitoringService.recordMetric({
            name: "auth_failure",
            value: 1,
            unit: "count",
            tags: { reason: "workspace_access_denied", workspace_id: requestedWorkspaceId },
          })

          return NextResponse.json({ success: false, error: "Workspace access denied" }, { status: 403 })
        }
      }

      // Build auth context
      const authContext: AuthContext = {
        user: {
          id: user.id,
          email: user.email,
          name: user.name || undefined,
          role: user.role || "user",
        },
        workspace: workspaceContext
          ? {
              id: workspaceContext.workspace.id,
              name: workspaceContext.workspace.name,
              plan: workspaceContext.workspace.plan,
              role: workspaceContext.role,
            }
          : undefined,
        permissions: getUserPermissions(user.role || "user", workspaceContext?.role),
      }

      // Check role requirements
      if (options.allowedRoles && !options.allowedRoles.includes(authContext.user.role)) {
        return NextResponse.json({ success: false, error: "Insufficient role permissions" }, { status: 403 })
      }

      // Check permission requirements
      if (options.requiredPermissions) {
        const hasAllPermissions = options.requiredPermissions.every((permission) =>
          authContext.permissions.includes(permission),
        )

        if (!hasAllPermissions) {
          return NextResponse.json({ success: false, error: "Insufficient permissions" }, { status: 403 })
        }
      }

      // Add auth context to request
      const authenticatedRequest = request as AuthenticatedRequest
      authenticatedRequest.auth = authContext

      // Record successful authentication
      monitoringService.recordMetric({
        name: "auth_success",
        value: 1,
        unit: "count",
        tags: {
          user_id: authContext.user.id,
          workspace_id: authContext.workspace?.id || "none",
          path: request.nextUrl.pathname,
        },
      })

      // Log authentication
      logger.info("User authenticated", {
        userId: authContext.user.id,
        email: authContext.user.email,
        workspaceId: authContext.workspace?.id,
        permissions: authContext.permissions.length,
        duration: Date.now() - startTime,
      })

      // Execute handler with authenticated request
      return await handler(authenticatedRequest)
    } catch (error) {
      logger.error("Authentication middleware error", error as Error)

      monitoringService.recordMetric({
        name: "auth_error",
        value: 1,
        unit: "count",
        tags: { path: request.nextUrl.pathname },
      })

      return NextResponse.json({ success: false, error: "Authentication error" }, { status: 500 })
    }
  }
}

// Specialized auth middleware for different access levels
export const withUserAuth = (handler: (request: AuthenticatedRequest) => Promise<NextResponse>) =>
  withAuth(handler, {
    allowedRoles: ["user", "admin", "super_admin"],
  })

export const withAdminAuth = (handler: (request: AuthenticatedRequest) => Promise<NextResponse>) =>
  withAuth(handler, {
    allowedRoles: ["admin", "super_admin"],
  })

export const withSuperAdminAuth = (handler: (request: AuthenticatedRequest) => Promise<NextResponse>) =>
  withAuth(handler, {
    allowedRoles: ["super_admin"],
  })

export const withWorkspaceAuth = (
  handler: (request: AuthenticatedRequest) => Promise<NextResponse>,
  requiredPermissions?: string[],
) =>
  withAuth(handler, {
    requireWorkspace: true,
    requiredPermissions,
  })

// Workspace-specific auth helpers
export const withWorkspaceAdminAuth = (handler: (request: AuthenticatedRequest) => Promise<NextResponse>) =>
  withWorkspaceAuth(handler, ["update:workspace"])

export const withWorkspaceOwnerAuth = (handler: (request: AuthenticatedRequest) => Promise<NextResponse>) =>
  withWorkspaceAuth(handler, ["delete:workspace"])

// Utility function to check permissions in handlers
export function hasPermission(authContext: AuthContext, permission: string): boolean {
  return authContext.permissions.includes(permission)
}

// Utility function to check if user is workspace owner/admin
export function isWorkspaceAdmin(authContext: AuthContext): boolean {
  return authContext.workspace?.role === "owner" || authContext.workspace?.role === "admin"
}

// Rate limiting by user
export function withUserRateLimit(
  handler: (request: AuthenticatedRequest) => Promise<NextResponse>,
  options: {
    windowMs: number
    maxRequests: number
  } = { windowMs: 60000, maxRequests: 100 },
) {
  const userRequestCounts = new Map<string, { count: number; resetTime: number }>()

  return withAuth(async (request: AuthenticatedRequest) => {
    const userId = request.auth.user.id
    const now = Date.now()
    const userLimit = userRequestCounts.get(userId)

    if (!userLimit || now > userLimit.resetTime) {
      userRequestCounts.set(userId, {
        count: 1,
        resetTime: now + options.windowMs,
      })
    } else {
      userLimit.count++
      if (userLimit.count > options.maxRequests) {
        monitoringService.recordMetric({
          name: "rate_limit_exceeded",
          value: 1,
          unit: "count",
          tags: { user_id: userId },
        })

        return NextResponse.json({ success: false, error: "Rate limit exceeded" }, { status: 429 })
      }
    }

    return await handler(request)
  })
}
