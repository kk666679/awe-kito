import { prisma } from "./db"
import fs from "fs/promises"
import path from "path"

export interface LogEntry {
  id: string
  timestamp: Date
  level: "debug" | "info" | "warn" | "error" | "critical"
  message: string
  category: string
  userId?: string
  sessionId?: string
  requestId?: string
  provider?: string
  operation?: string
  resourceId?: string
  duration?: number
  statusCode?: number
  error?: {
    name: string
    message: string
    stack?: string
  }
  metadata?: Record<string, any>
  tags?: string[]
}

export interface LogConfig {
  level: "debug" | "info" | "warn" | "error" | "critical"
  enableConsole: boolean
  enableFile: boolean
  enableDatabase: boolean
  maxFileSize: number // in bytes
  maxFiles: number
  logDirectory: string
  structured: boolean
  includeStackTrace: boolean
}

export interface LogQuery {
  level?: LogEntry["level"]
  category?: string
  userId?: string
  provider?: string
  operation?: string
  startDate?: Date
  endDate?: Date
  limit?: number
  offset?: number
  search?: string
}

class Logger {
  private config: LogConfig
  private logBuffer: LogEntry[] = []
  private readonly BUFFER_SIZE = 100
  private readonly FLUSH_INTERVAL = 30000 // 30 seconds

  constructor() {
    this.config = {
      level: "info",
      enableConsole: true,
      enableFile: false,
      enableDatabase: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      maxFiles: 5,
      logDirectory: "./logs",
      structured: true,
      includeStackTrace: true,
    }

    // Start periodic buffer flush
    setInterval(() => this.flushBuffer(), this.FLUSH_INTERVAL)
  }

  // Update logger configuration
  updateConfig(newConfig: Partial<LogConfig>): void {
    this.config = { ...this.config, ...newConfig }
  }

  // Log methods for different levels
  debug(message: string, metadata?: Record<string, any>, category = "general"): void {
    this.log("debug", message, category, metadata)
  }

  info(message: string, metadata?: Record<string, any>, category = "general"): void {
    this.log("info", message, category, metadata)
  }

  warn(message: string, metadata?: Record<string, any>, category = "general"): void {
    this.log("warn", message, category, metadata)
  }

  error(message: string, error?: Error, metadata?: Record<string, any>, category = "general"): void {
    const errorInfo = error
      ? {
          name: error.name,
          message: error.message,
          stack: this.config.includeStackTrace ? error.stack : undefined,
        }
      : undefined

    this.log("error", message, category, { ...metadata, error: errorInfo })
  }

  critical(message: string, error?: Error, metadata?: Record<string, any>, category = "general"): void {
    const errorInfo = error
      ? {
          name: error.name,
          message: error.message,
          stack: this.config.includeStackTrace ? error.stack : undefined,
        }
      : undefined

    this.log("critical", message, category, { ...metadata, error: errorInfo })
  }

  // Core logging method
  private log(level: LogEntry["level"], message: string, category: string, metadata?: Record<string, any>): void {
    // Check if log level should be processed
    if (!this.shouldLog(level)) {
      return
    }

    const logEntry: LogEntry = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      level,
      message,
      category,
      metadata,
    }

    // Add to buffer
    this.logBuffer.push(logEntry)

    // Immediate console output if enabled
    if (this.config.enableConsole) {
      this.outputToConsole(logEntry)
    }

    // Flush buffer if it's full
    if (this.logBuffer.length >= this.BUFFER_SIZE) {
      this.flushBuffer()
    }
  }

  // Check if log level should be processed
  private shouldLog(level: LogEntry["level"]): boolean {
    const levels = ["debug", "info", "warn", "error", "critical"]
    const currentLevelIndex = levels.indexOf(this.config.level)
    const messageLevelIndex = levels.indexOf(level)

    return messageLevelIndex >= currentLevelIndex
  }

  // Output to console
  private outputToConsole(logEntry: LogEntry): void {
    const timestamp = logEntry.timestamp.toISOString()
    const level = logEntry.level.toUpperCase().padEnd(8)
    const category = logEntry.category.padEnd(12)
    const message = logEntry.message

    let output = `[${timestamp}] ${level} ${category} ${message}`

    if (logEntry.metadata) {
      if (this.config.structured) {
        output += ` ${JSON.stringify(logEntry.metadata)}`
      } else {
        const metadataStr = Object.entries(logEntry.metadata)
          .map(([key, value]) => `${key}=${value}`)
          .join(" ")
        output += ` ${metadataStr}`
      }
    }

    switch (logEntry.level) {
      case "debug":
        console.debug(output)
        break
      case "info":
        console.info(output)
        break
      case "warn":
        console.warn(output)
        break
      case "error":
      case "critical":
        console.error(output)
        break
    }
  }

  // Flush log buffer
  private async flushBuffer(): Promise<void> {
    if (this.logBuffer.length === 0) return

    const entriesToFlush = [...this.logBuffer]
    this.logBuffer = []

    try {
      // Store in database if enabled
      if (this.config.enableDatabase) {
        await this.storeInDatabase(entriesToFlush)
      }

      // Store in file if enabled
      if (this.config.enableFile) {
        await this.storeInFile(entriesToFlush)
      }
    } catch (error) {
      console.error("Error flushing log buffer:", error)
      // Re-add entries to buffer for retry
      this.logBuffer.unshift(...entriesToFlush)
    }
  }

  // Store logs in database
  private async storeInDatabase(entries: LogEntry[]): Promise<void> {
    if (!prisma) return

    try {
      await prisma.logEntry.createMany({
        data: entries.map((entry) => ({
          timestamp: entry.timestamp,
          level: entry.level,
          message: entry.message,
          category: entry.category,
          userId: entry.userId,
          sessionId: entry.sessionId,
          requestId: entry.requestId,
          provider: entry.provider,
          operation: entry.operation,
          resourceId: entry.resourceId,
          duration: entry.duration,
          statusCode: entry.statusCode,
          error: entry.error ? JSON.parse(JSON.stringify(entry.error)) : null,
          metadata: entry.metadata ? JSON.parse(JSON.stringify(entry.metadata)) : null,
          tags: entry.tags || [],
        })),
      })

      console.log(`Successfully stored ${entries.length} log entries in database`)
    } catch (error) {
      console.error("Error storing logs in database:", error)
      throw error
    }
  }

  // Store logs in file
  private async storeInFile(entries: LogEntry[]): Promise<void> {
    try {
      // Ensure log directory exists
      await fs.mkdir(this.config.logDirectory, { recursive: true })

      const logFile = path.join(this.config.logDirectory, `app-${new Date().toISOString().split("T")[0]}.log`)

      const logLines = entries.map((entry) => {
        if (this.config.structured) {
          return JSON.stringify(entry)
        } else {
          return `[${entry.timestamp.toISOString()}] ${entry.level.toUpperCase()} ${entry.category} ${entry.message}`
        }
      })

      await fs.appendFile(logFile, logLines.join("\n") + "\n")

      // Rotate files if needed
      await this.rotateLogFiles()
    } catch (error) {
      console.error("Error storing logs in file:", error)
      throw error
    }
  }

  // Rotate log files
  private async rotateLogFiles(): Promise<void> {
    try {
      const logDir = this.config.logDirectory
      const files = await fs.readdir(logDir)

      const logFiles = files
        .filter((file) => file.startsWith("app-") && file.endsWith(".log"))
        .sort()
        .reverse()

      // Remove old files
      while (logFiles.length > this.config.maxFiles) {
        const oldFile = logFiles.pop()
        if (oldFile) {
          await fs.unlink(path.join(logDir, oldFile))
        }
      }
    } catch (error) {
      console.error("Error rotating log files:", error)
    }
  }

  // Query logs
  async queryLogs(query: LogQuery): Promise<LogEntry[]> {
    try {
      const whereClause: any = {}

      if (query.level) {
        whereClause.level = query.level
      }

      if (query.category) {
        whereClause.category = query.category
      }

      if (query.userId) {
        whereClause.userId = query.userId
      }

      if (query.provider) {
        whereClause.provider = query.provider
      }

      if (query.operation) {
        whereClause.operation = query.operation
      }

      if (query.startDate || query.endDate) {
        whereClause.timestamp = {}
        if (query.startDate) {
          whereClause.timestamp.gte = query.startDate
        }
        if (query.endDate) {
          whereClause.timestamp.lte = query.endDate
        }
      }

      if (query.search) {
        whereClause.OR = [
          { message: { contains: query.search, mode: "insensitive" } },
          { category: { contains: query.search, mode: "insensitive" } },
        ]
      }

      const dbEntries = await prisma.logEntry.findMany({
        where: whereClause,
        orderBy: { timestamp: "desc" },
        skip: query.offset || 0,
        take: query.limit || 100,
      })

      // Convert database entries to LogEntry interface format
      return dbEntries.map((entry) => ({
        id: entry.id,
        timestamp: entry.timestamp,
        level: entry.level as LogEntry["level"],
        message: entry.message,
        category: entry.category,
        userId: entry.userId || undefined,
        sessionId: entry.sessionId || undefined,
        requestId: entry.requestId || undefined,
        provider: entry.provider || undefined,
        operation: entry.operation || undefined,
        resourceId: entry.resourceId || undefined,
        duration: entry.duration || undefined,
        statusCode: entry.statusCode || undefined,
        error: (entry.error as LogEntry["error"]) || undefined,
        metadata: (entry.metadata as Record<string, any>) || undefined,
        tags: entry.tags || undefined,
      }))
    } catch (error) {
      console.error("Error querying logs from database:", error)
      // Fallback to buffer entries if database query fails
      let results = [...this.logBuffer]

      if (query.level) {
        results = results.filter((entry) => entry.level === query.level)
      }

      if (query.category) {
        results = results.filter((entry) => entry.category === query.category)
      }

      if (query.userId) {
        results = results.filter((entry) => entry.userId === query.userId)
      }

      if (query.provider) {
        results = results.filter((entry) => entry.provider === query.provider)
      }

      if (query.operation) {
        results = results.filter((entry) => entry.operation === query.operation)
      }

      if (query.startDate) {
        results = results.filter((entry) => entry.timestamp >= query.startDate!)
      }

      if (query.endDate) {
        results = results.filter((entry) => entry.timestamp <= query.endDate!)
      }

      if (query.search) {
        const searchLower = query.search.toLowerCase()
        results = results.filter(
          (entry) =>
            entry.message.toLowerCase().includes(searchLower) || entry.category.toLowerCase().includes(searchLower),
        )
      }

      // Apply pagination
      const offset = query.offset || 0
      const limit = query.limit || 100

      return results.slice(offset, offset + limit)
    }
  }

  // Get log statistics
  async getLogStats(): Promise<{
    totalEntries: number
    entriesByLevel: Record<string, number>
    entriesByCategory: Record<string, number>
    recentErrors: LogEntry[]
  }> {
    try {
      const totalEntries = await prisma.logEntry.count()

      const levelStats = await prisma.logEntry.groupBy({
        by: ["level"],
        _count: { level: true },
      })

      const categoryStats = await prisma.logEntry.groupBy({
        by: ["category"],
        _count: { category: true },
      })

      const recentErrorEntries = await prisma.logEntry.findMany({
        where: {
          level: { in: ["error", "critical"] },
        },
        orderBy: { timestamp: "desc" },
        take: 10,
      })

      const entriesByLevel = levelStats.reduce(
        (acc, stat) => {
          acc[stat.level] = stat._count.level
          return acc
        },
        {} as Record<string, number>,
      )

      const entriesByCategory = categoryStats.reduce(
        (acc, stat) => {
          acc[stat.category] = stat._count.category
          return acc
        },
        {} as Record<string, number>,
      )

      const recentErrors = recentErrorEntries.map((entry) => ({
        id: entry.id,
        timestamp: entry.timestamp,
        level: entry.level as LogEntry["level"],
        message: entry.message,
        category: entry.category,
        userId: entry.userId || undefined,
        sessionId: entry.sessionId || undefined,
        requestId: entry.requestId || undefined,
        provider: entry.provider || undefined,
        operation: entry.operation || undefined,
        resourceId: entry.resourceId || undefined,
        duration: entry.duration || undefined,
        statusCode: entry.statusCode || undefined,
        error: (entry.error as LogEntry["error"]) || undefined,
        metadata: (entry.metadata as Record<string, any>) || undefined,
        tags: entry.tags || undefined,
      }))

      return {
        totalEntries,
        entriesByLevel,
        entriesByCategory,
        recentErrors,
      }
    } catch (error) {
      console.error("Error getting log stats from database:", error)
      // Fallback to buffer stats
      const entriesByLevel = this.logBuffer.reduce(
        (acc, entry) => {
          acc[entry.level] = (acc[entry.level] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      )

      const entriesByCategory = this.logBuffer.reduce(
        (acc, entry) => {
          acc[entry.category] = (acc[entry.category] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      )

      const recentErrors = this.logBuffer
        .filter((entry) => ["error", "critical"].includes(entry.level))
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, 10)

      return {
        totalEntries: this.logBuffer.length,
        entriesByLevel,
        entriesByCategory,
        recentErrors,
      }
    }
  }

  // Force flush buffer (useful for testing or shutdown)
  async flush(): Promise<void> {
    await this.flushBuffer()
  }

  // Create child logger with context
  child(context: {
    category?: string
    userId?: string
    sessionId?: string
    requestId?: string
  }): Logger {
    const childLogger = new Logger()
    childLogger.config = { ...this.config }

    // Override log method to include context
    const originalLog = childLogger.log.bind(childLogger)
    childLogger.log = (level: LogEntry["level"], message: string, category: string, metadata?: Record<string, any>) => {
      const contextualMetadata = {
        ...metadata,
        ...context,
      }
      originalLog(level, message, context.category || category, contextualMetadata)
    }

    return childLogger
  }
}

// Export singleton instance
export const logger = new Logger()

// Export as default
export default logger
