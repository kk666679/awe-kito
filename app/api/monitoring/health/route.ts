import { NextResponse } from "next/server"
import { monitoringService } from "@/lib/monitoring"
import { withMonitoring } from "@/lib/middleware/monitoring"

/**
 * System Health Check API
 * Provides comprehensive system health status
 */
async function handleGET() {
  try {
    const systemHealth = await monitoringService.getSystemHealth()

    return NextResponse.json({
      success: true,
      health: systemHealth,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to get system health",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

export const GET = withMonitoring(handleGET)
