import { logger } from "./logging"
import { getCloudMetrics } from "./cloud"

export interface MonitoringMetric {
  id: string
  name: string
  value: number
  unit: string
  timestamp: Date
  provider?: string
  resourceId?: string
  tags?: Record<string, string>
}

export interface AlertRule {
  id: string
  name: string
  metric: string
  condition: "gt" | "lt" | "eq" | "ne"
  threshold: number
  duration: number // in seconds
  enabled: boolean
  actions: AlertAction[]
}

export interface AlertAction {
  type: "email" | "webhook" | "slack"
  target: string
  message?: string
}

export interface Alert {
  id: string
  ruleId: string
  metric: MonitoringMetric
  triggered: Date
  resolved?: Date
  status: "active" | "resolved"
  message: string
}

class MonitoringService {
  private metrics: MonitoringMetric[] = []
  private alertRules: AlertRule[] = []
  private activeAlerts: Alert[] = []
  private metricsBuffer: MonitoringMetric[] = []
  private readonly BUFFER_SIZE = 1000
  private readonly RETENTION_PERIOD = 7 * 24 * 60 * 60 * 1000 // 7 days

  constructor() {
    // Start periodic cleanup
    setInterval(() => this.cleanup(), 60 * 60 * 1000) // Every hour
  }

  // Record a metric
  recordMetric(metric: Omit<MonitoringMetric, "id" | "timestamp">): void {
    const fullMetric: MonitoringMetric = {
      ...metric,
      id: `metric-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
    }

    this.metricsBuffer.push(fullMetric)

    // Flush buffer if full
    if (this.metricsBuffer.length >= this.BUFFER_SIZE) {
      this.flushMetrics()
    }

    // Check alert rules
    this.checkAlertRules(fullMetric)
  }

  // Flush metrics buffer
  private flushMetrics(): void {
    this.metrics.push(...this.metricsBuffer)
    this.metricsBuffer = []

    logger.debug(`Flushed ${this.metricsBuffer.length} metrics to storage`)
  }

  // Get metrics with filtering
  getMetrics(filter?: {
    name?: string
    provider?: string
    resourceId?: string
    startTime?: Date
    endTime?: Date
    limit?: number
  }): MonitoringMetric[] {
    let filtered = [...this.metrics, ...this.metricsBuffer]

    if (filter) {
      if (filter.name) {
        filtered = filtered.filter((m) => m.name === filter.name)
      }
      if (filter.provider) {
        filtered = filtered.filter((m) => m.provider === filter.provider)
      }
      if (filter.resourceId) {
        filtered = filtered.filter((m) => m.resourceId === filter.resourceId)
      }
      if (filter.startTime) {
        filtered = filtered.filter((m) => m.timestamp >= filter.startTime!)
      }
      if (filter.endTime) {
        filtered = filtered.filter((m) => m.timestamp <= filter.endTime!)
      }
    }

    // Sort by timestamp descending
    filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

    const limit = filter?.limit || 100
    return filtered.slice(0, limit)
  }

  // Create alert rule
  createAlertRule(rule: Omit<AlertRule, "id">): AlertRule {
    const fullRule: AlertRule = {
      ...rule,
      id: `rule-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    }

    this.alertRules.push(fullRule)
    logger.info(`Created alert rule: ${fullRule.name}`)

    return fullRule
  }

  // Check alert rules against a metric
  private checkAlertRules(metric: MonitoringMetric): void {
    for (const rule of this.alertRules) {
      if (!rule.enabled || rule.metric !== metric.name) continue

      const shouldTrigger = this.evaluateCondition(rule, metric)

      if (shouldTrigger) {
        this.triggerAlert(rule, metric)
      }
    }
  }

  // Evaluate alert condition
  private evaluateCondition(rule: AlertRule, metric: MonitoringMetric): boolean {
    switch (rule.condition) {
      case "gt":
        return metric.value > rule.threshold
      case "lt":
        return metric.value < rule.threshold
      case "eq":
        return metric.value === rule.threshold
      case "ne":
        return metric.value !== rule.threshold
      default:
        return false
    }
  }

  // Trigger an alert
  private triggerAlert(rule: AlertRule, metric: MonitoringMetric): void {
    // Check if alert is already active
    const existingAlert = this.activeAlerts.find((a) => a.ruleId === rule.id && a.status === "active")

    if (existingAlert) return

    const alert: Alert = {
      id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ruleId: rule.id,
      metric,
      triggered: new Date(),
      status: "active",
      message: `Alert: ${rule.name} - ${metric.name} is ${metric.value} ${metric.unit}`,
    }

    this.activeAlerts.push(alert)

    logger.warn(`Alert triggered: ${alert.message}`, {
      alertId: alert.id,
      ruleId: rule.id,
      metric: metric.name,
      value: metric.value,
    })

    // Execute alert actions
    this.executeAlertActions(rule, alert)
  }

  // Execute alert actions
  private async executeAlertActions(rule: AlertRule, alert: Alert): Promise<void> {
    for (const action of rule.actions) {
      try {
        switch (action.type) {
          case "email":
            await this.sendEmailAlert(action, alert)
            break
          case "webhook":
            await this.sendWebhookAlert(action, alert)
            break
          case "slack":
            await this.sendSlackAlert(action, alert)
            break
        }
      } catch (error) {
        logger.error(`Failed to execute alert action: ${action.type}`, error as Error)
      }
    }
  }

  // Send email alert
  private async sendEmailAlert(action: AlertAction, alert: Alert): Promise<void> {
    logger.info(`Sending email alert to ${action.target}`, {
      alertId: alert.id,
      message: alert.message,
    })
    // Email implementation would go here
  }

  // Send webhook alert
  private async sendWebhookAlert(action: AlertAction, alert: Alert): Promise<void> {
    logger.info(`Sending webhook alert to ${action.target}`, {
      alertId: alert.id,
      message: alert.message,
    })
    // Webhook implementation would go here
  }

  // Send Slack alert
  private async sendSlackAlert(action: AlertAction, alert: Alert): Promise<void> {
    logger.info(`Sending Slack alert to ${action.target}`, {
      alertId: alert.id,
      message: alert.message,
    })
    // Slack implementation would go here
  }

  // Get system health overview
  async getSystemHealth(): Promise<{
    status: "healthy" | "degraded" | "unhealthy"
    services: Array<{
      name: string
      status: "up" | "down" | "degraded"
      latency?: number
      lastCheck: Date
    }>
    alerts: Alert[]
    metrics: {
      cpu: number
      memory: number
      disk: number
      network: number
    }
  }> {
    const cloudMetrics = await getCloudMetrics()
    const activeAlerts = this.getActiveAlerts()

    // Determine overall system status
    let status: "healthy" | "degraded" | "unhealthy" = "healthy"
    if (activeAlerts.length > 5) {
      status = "unhealthy"
    } else if (activeAlerts.length > 0) {
      status = "degraded"
    }

    const services = cloudMetrics.map((metric) => ({
      name: metric.provider,
      status:
        metric.status === "healthy"
          ? ("up" as const)
          : metric.status === "degraded"
            ? ("degraded" as const)
            : ("down" as const),
      latency: metric.latency,
      lastCheck: metric.lastChecked,
    }))

    // Mock system metrics
    const systemMetrics = {
      cpu: 45,
      memory: 62,
      disk: 78,
      network: 23,
    }

    return {
      status,
      services,
      alerts: activeAlerts,
      metrics: systemMetrics,
    }
  }

  // Get active alerts
  getActiveAlerts(): Alert[] {
    return this.activeAlerts.filter((a) => a.status === "active")
  }

  // Resolve an alert
  resolveAlert(alertId: string): boolean {
    const alert = this.activeAlerts.find((a) => a.id === alertId)
    if (!alert) return false

    alert.status = "resolved"
    alert.resolved = new Date()

    logger.info(`Alert resolved: ${alertId}`)
    return true
  }

  // Clean up old data
  private cleanup(): void {
    const cutoff = new Date(Date.now() - this.RETENTION_PERIOD)

    // Clean up old metrics
    const oldMetricsCount = this.metrics.length
    this.metrics = this.metrics.filter((m) => m.timestamp > cutoff)

    // Clean up old alerts
    const oldAlertsCount = this.activeAlerts.length
    this.activeAlerts = this.activeAlerts.filter((a) => a.status === "active" || (a.resolved && a.resolved > cutoff))

    logger.debug(
      `Cleanup completed: removed ${oldMetricsCount - this.metrics.length} metrics and ${oldAlertsCount - this.activeAlerts.length} alerts`,
    )
  }
}

// Export singleton instance
export const monitoringService = new MonitoringService()

// Export as default
export default monitoringService
