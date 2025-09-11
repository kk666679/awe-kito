import { type NextRequest, NextResponse } from "next/server"
import { monitoringService } from "../monitoring"
import { logger } from "../logging"

export interface RequestMetrics {
  method: string
  path: string
  statusCode: number
  duration: number
  userAgent?: string
  ip?: string
  workspaceId?: string
  userId?: string
}

// Monitoring middleware wrapper for API routes
export function withMonitoring(handler: (request: NextRequest) => Promise<NextResponse>) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const startTime = Date.now()
    const url = new URL(request.url)
    const path = url.pathname
    const method = request.method

    // Extract context
    const userAgent = request.headers.get("user-agent")
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip")
    const workspaceId = url.searchParams.get("workspaceId")
    const userId = request.headers.get("x-user-id")

    let response: NextResponse
    let statusCode = 200
    let error: Error | null = null

    try {
      // Execute the route handler
      response = await handler(request)
      statusCode = response.status
    } catch (err) {
      error = err as Error
      statusCode = 500
      response = NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
    }

    const duration = Date.now() - startTime

    // Record request metrics
    const requestMetrics: RequestMetrics = {
      method,
      path,
      statusCode,
      duration,
      userAgent: userAgent || undefined,
      ip: ip || undefined,
      workspaceId: workspaceId || undefined,
      userId: userId || undefined,
    }

    // Record monitoring metrics
    recordRequestMetrics(requestMetrics, error)

    return response
  }
}

// Record detailed request metrics
function recordRequestMetrics(metrics: RequestMetrics, error: Error | null): void {
  const tags = {
    method: metrics.method,
    path: metrics.path,
    status_code: metrics.statusCode.toString(),
    workspace_id: metrics.workspaceId || "unknown",
  }

  // Record response time
  monitoringService.recordMetric({
    name: "api_request_duration",
    value: metrics.duration,
    unit: "ms",
    tags,
  })

  // Record request count
  monitoringService.recordMetric({
    name: "api_request_count",
    value: 1,
    unit: "count",
    tags,
  })

  // Record error rate
  if (error || metrics.statusCode >= 400) {
    monitoringService.recordMetric({
      name: "api_error_count",
      value: 1,
      unit: "count",
      tags: {
        ...tags,
        error_type: error?.name || "http_error",
      },
    })
  }

  // Record success rate
  if (metrics.statusCode >= 200 && metrics.statusCode < 400) {
    monitoringService.recordMetric({
      name: "api_success_count",
      value: 1,
      unit: "count",
      tags,
    })
  }

  // Record workspace activity
  if (metrics.workspaceId) {
    monitoringService.recordMetric({
      name: "workspace_activity",
      value: 1,
      unit: "count",
      resourceId: metrics.workspaceId,
      tags: {
        workspace_id: metrics.workspaceId,
        endpoint: metrics.path,
      },
    })
  }

  // Log slow requests
  if (metrics.duration > 1000) {
    logger.warn("Slow API request detected", {
      path: metrics.path,
      method: metrics.method,
      duration: metrics.duration,
      workspaceId: metrics.workspaceId,
    })

    monitoringService.recordMetric({
      name: "api_slow_request",
      value: metrics.duration,
      unit: "ms",
      tags,
    })
  }
}

// Business-specific monitoring
export function recordBusinessMetric(
  workspaceId: string,
  metricName: string,
  value: number,
  unit = "count",
  additionalTags?: Record<string, string>,
): void {
  monitoringService.recordMetric({
    name: `business_${metricName}`,
    value,
    unit,
    resourceId: workspaceId,
    tags: {
      workspace_id: workspaceId,
      ...additionalTags,
    },
  })
}

// Compute job monitoring
export function recordComputeMetric(
  jobId: string,
  workspaceId: string,
  metricName: string,
  value: number,
  unit = "count",
): void {
  monitoringService.recordMetric({
    name: `compute_${metricName}`,
    value,
    unit,
    resourceId: jobId,
    tags: {
      job_id: jobId,
      workspace_id: workspaceId,
    },
  })
}

// Storage monitoring
export function recordStorageMetric(
  provider: string,
  workspaceId: string,
  operation: string,
  size?: number,
  success = true,
): void {
  monitoringService.recordMetric({
    name: "storage_operation",
    value: 1,
    unit: "count",
    provider,
    tags: {
      provider,
      workspace_id: workspaceId,
      operation,
      success: success.toString(),
    },
  })

  if (size) {
    monitoringService.recordMetric({
      name: "storage_bytes_transferred",
      value: size,
      unit: "bytes",
      provider,
      tags: {
        provider,
        workspace_id: workspaceId,
        operation,
      },
    })
  }
}

// System health monitoring
export async function recordSystemHealth(): Promise<void> {
  try {
    // CPU usage (mock - in real implementation, use system monitoring)
    const cpuUsage = Math.random() * 100
    monitoringService.recordMetric({
      name: "system_cpu_usage",
      value: cpuUsage,
      unit: "percent",
    })

    // Memory usage (mock)
    const memoryUsage = Math.random() * 100
    monitoringService.recordMetric({
      name: "system_memory_usage",
      value: memoryUsage,
      unit: "percent",
    })

    // Disk usage (mock)
    const diskUsage = Math.random() * 100
    monitoringService.recordMetric({
      name: "system_disk_usage",
      value: diskUsage,
      unit: "percent",
    })

    // Active connections (mock)
    const activeConnections = Math.floor(Math.random() * 1000)
    monitoringService.recordMetric({
      name: "system_active_connections",
      value: activeConnections,
      unit: "count",
    })
  } catch (error) {
    logger.error("Failed to record system health metrics", error as Error)
  }
}

// Initialize default alert rules
export function initializeDefaultAlerts(): void {
  // High error rate alert
  monitoringService.createAlertRule({
    name: "High API Error Rate",
    metric: "api_error_count",
    condition: "gt",
    threshold: 10,
    duration: 300, // 5 minutes
    enabled: true,
    actions: [
      {
        type: "email",
        target: "admin@awan-keusahawanan.com",
        message: "API error rate is above threshold",
      },
    ],
  })

  // Slow response time alert
  monitoringService.createAlertRule({
    name: "Slow API Response",
    metric: "api_request_duration",
    condition: "gt",
    threshold: 5000, // 5 seconds
    duration: 60, // 1 minute
    enabled: true,
    actions: [
      {
        type: "webhook",
        target: process.env.ALERT_WEBHOOK_URL || "",
        message: "API response time is above 5 seconds",
      },
    ],
  })

  // High CPU usage alert
  monitoringService.createAlertRule({
    name: "High CPU Usage",
    metric: "system_cpu_usage",
    condition: "gt",
    threshold: 80,
    duration: 300, // 5 minutes
    enabled: true,
    actions: [
      {
        type: "email",
        target: "ops@awan-keusahawanan.com",
        message: "System CPU usage is above 80%",
      },
    ],
  })

  // High memory usage alert
  monitoringService.createAlertRule({
    name: "High Memory Usage",
    metric: "system_memory_usage",
    condition: "gt",
    threshold: 85,
    duration: 300, // 5 minutes
    enabled: true,
    actions: [
      {
        type: "email",
        target: "ops@awan-keusahawanan.com",
        message: "System memory usage is above 85%",
      },
    ],
  })

  logger.info("Default monitoring alerts initialized")
}

// Start system monitoring
export function startSystemMonitoring(): void {
  // Record system health every 30 seconds
  setInterval(recordSystemHealth, 30000)

  // Initialize default alerts
  initializeDefaultAlerts()

  logger.info("System monitoring started")
}
