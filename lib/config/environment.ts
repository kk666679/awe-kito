import { z } from "zod"

// Environment variable schema validation
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),

  // JWT and Security
  JWT_SECRET: z.string().min(32),
  SESSION_SECRET: z.string().min(32),
  WEBHOOK_SECRET: z.string().min(16),

  // Cloud Providers
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
  AWS_REGION: z.string().default("us-east-1"),
  AWS_S3_BUCKET: z.string().optional(),

  AZURE_STORAGE_CONNECTION_STRING: z.string().optional(),
  AZURE_CONTAINER_NAME: z.string().optional(),

  GCP_PROJECT_ID: z.string().optional(),
  GCP_KEY_FILE: z.string().optional(),
  GCP_BUCKET_NAME: z.string().optional(),

  // Monitoring
  PROMETHEUS_URL: z.string().url().optional(),
  GRAFANA_URL: z.string().url().optional(),
  LOKI_URL: z.string().url().optional(),

  // Email
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  FROM_EMAIL: z.string().email().optional(),

  // Application
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url(),

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(900000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(100),

  // File Upload
  MAX_FILE_SIZE: z.coerce.number().default(10485760),
  ALLOWED_FILE_TYPES: z.string().default("image/jpeg,image/png,image/gif,application/pdf,text/csv"),

  // Compute
  MAX_CONCURRENT_JOBS: z.coerce.number().default(10),
  DEFAULT_JOB_TIMEOUT: z.coerce.number().default(3600000),
  GPU_ENABLED: z.coerce.boolean().default(true),
  CPU_CORES_LIMIT: z.coerce.number().default(8),
  MEMORY_LIMIT_GB: z.coerce.number().default(32),

  // Multi-tenant
  DEFAULT_WORKSPACE_PLAN: z.enum(["starter", "business", "enterprise"]).default("starter"),
  MAX_WORKSPACES_PER_USER: z.coerce.number().default(5),
  WORKSPACE_STORAGE_LIMIT_GB: z.coerce.number().default(100),
})

// Validate environment variables
function validateEnv() {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    console.error("❌ Invalid environment variables:", error)
    throw new Error("Environment validation failed")
  }
}

// Export validated environment configuration
export const env = validateEnv()

// Helper functions for environment checks
export const isProduction = () => env.NODE_ENV === "production"
export const isDevelopment = () => env.NODE_ENV === "development"
export const isTest = () => env.NODE_ENV === "test"

// Cloud provider availability checks
export const cloudProviders = {
  aws: {
    available: !!(env.AWS_ACCESS_KEY_ID && env.AWS_SECRET_ACCESS_KEY),
    bucket: env.AWS_S3_BUCKET,
  },
  azure: {
    available: !!env.AZURE_STORAGE_CONNECTION_STRING,
    container: env.AZURE_CONTAINER_NAME,
  },
  gcp: {
    available: !!(env.GCP_PROJECT_ID && env.GCP_KEY_FILE),
    bucket: env.GCP_BUCKET_NAME,
  },
}

// Get available cloud providers
export function getAvailableCloudProviders(): Array<"aws" | "azure" | "gcp"> {
  const available: Array<"aws" | "azure" | "gcp"> = []

  if (cloudProviders.aws.available) available.push("aws")
  if (cloudProviders.azure.available) available.push("azure")
  if (cloudProviders.gcp.available) available.push("gcp")

  return available
}

// Monitoring configuration
export const monitoring = {
  prometheus: {
    enabled: !!env.PROMETHEUS_URL,
    url: env.PROMETHEUS_URL,
  },
  grafana: {
    enabled: !!env.GRAFANA_URL,
    url: env.GRAFANA_URL,
  },
  loki: {
    enabled: !!env.LOKI_URL,
    url: env.LOKI_URL,
  },
}

// Email configuration
export const email = {
  enabled: !!(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS),
  config: {
    host: env.SMTP_HOST,
    port: env.SMTP_PORT || 587,
    secure: env.SMTP_PORT === 465,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  },
  from: env.FROM_EMAIL || env.SMTP_USER,
}

// Rate limiting configuration
export const rateLimiting = {
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  maxRequests: env.RATE_LIMIT_MAX_REQUESTS,
}

// File upload configuration
export const fileUpload = {
  maxSize: env.MAX_FILE_SIZE,
  allowedTypes: env.ALLOWED_FILE_TYPES.split(","),
}

// Compute configuration
export const compute = {
  maxConcurrentJobs: env.MAX_CONCURRENT_JOBS,
  defaultTimeout: env.DEFAULT_JOB_TIMEOUT,
  gpuEnabled: env.GPU_ENABLED,
  cpuCoresLimit: env.CPU_CORES_LIMIT,
  memoryLimitGB: env.MEMORY_LIMIT_GB,
}

// Multi-tenant configuration
export const multiTenant = {
  defaultPlan: env.DEFAULT_WORKSPACE_PLAN,
  maxWorkspacesPerUser: env.MAX_WORKSPACES_PER_USER,
  storageLimitGB: env.WORKSPACE_STORAGE_LIMIT_GB,
}
