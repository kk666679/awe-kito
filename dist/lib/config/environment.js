"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiTenant = exports.compute = exports.fileUpload = exports.rateLimiting = exports.email = exports.monitoring = exports.cloudProviders = exports.isTest = exports.isDevelopment = exports.isProduction = exports.env = void 0;
exports.getAvailableCloudProviders = getAvailableCloudProviders;
const zod_1 = require("zod");
// Environment variable schema validation
const envSchema = zod_1.z.object({
    // Database
    DATABASE_URL: zod_1.z.string().url(),
    REDIS_URL: zod_1.z.string().url(),
    // JWT and Security
    JWT_SECRET: zod_1.z.string().min(32),
    SESSION_SECRET: zod_1.z.string().min(32),
    WEBHOOK_SECRET: zod_1.z.string().min(16),
    // Cloud Providers
    AWS_ACCESS_KEY_ID: zod_1.z.string().optional(),
    AWS_SECRET_ACCESS_KEY: zod_1.z.string().optional(),
    AWS_REGION: zod_1.z.string().default("us-east-1"),
    AWS_S3_BUCKET: zod_1.z.string().optional(),
    AZURE_STORAGE_CONNECTION_STRING: zod_1.z.string().optional(),
    AZURE_CONTAINER_NAME: zod_1.z.string().optional(),
    GCP_PROJECT_ID: zod_1.z.string().optional(),
    GCP_KEY_FILE: zod_1.z.string().optional(),
    GCP_BUCKET_NAME: zod_1.z.string().optional(),
    // Monitoring
    PROMETHEUS_URL: zod_1.z.string().url().optional(),
    GRAFANA_URL: zod_1.z.string().url().optional(),
    LOKI_URL: zod_1.z.string().url().optional(),
    // Email
    SMTP_HOST: zod_1.z.string().optional(),
    SMTP_PORT: zod_1.z.coerce.number().optional(),
    SMTP_USER: zod_1.z.string().optional(),
    SMTP_PASS: zod_1.z.string().optional(),
    FROM_EMAIL: zod_1.z.string().email().optional(),
    // Application
    NODE_ENV: zod_1.z.enum(["development", "production", "test"]).default("development"),
    NEXT_PUBLIC_APP_URL: zod_1.z.string().url(),
    // Rate Limiting
    RATE_LIMIT_WINDOW_MS: zod_1.z.coerce.number().default(900000),
    RATE_LIMIT_MAX_REQUESTS: zod_1.z.coerce.number().default(100),
    // File Upload
    MAX_FILE_SIZE: zod_1.z.coerce.number().default(10485760),
    ALLOWED_FILE_TYPES: zod_1.z.string().default("image/jpeg,image/png,image/gif,application/pdf,text/csv"),
    // Compute
    MAX_CONCURRENT_JOBS: zod_1.z.coerce.number().default(10),
    DEFAULT_JOB_TIMEOUT: zod_1.z.coerce.number().default(3600000),
    GPU_ENABLED: zod_1.z.coerce.boolean().default(true),
    CPU_CORES_LIMIT: zod_1.z.coerce.number().default(8),
    MEMORY_LIMIT_GB: zod_1.z.coerce.number().default(32),
    // Multi-tenant
    DEFAULT_WORKSPACE_PLAN: zod_1.z.enum(["starter", "business", "enterprise"]).default("starter"),
    MAX_WORKSPACES_PER_USER: zod_1.z.coerce.number().default(5),
    WORKSPACE_STORAGE_LIMIT_GB: zod_1.z.coerce.number().default(100),
});
// Validate environment variables
function validateEnv() {
    try {
        return envSchema.parse(process.env);
    }
    catch (error) {
        console.error("❌ Invalid environment variables:", error);
        throw new Error("Environment validation failed");
    }
}
// Export validated environment configuration
exports.env = validateEnv();
// Helper functions for environment checks
const isProduction = () => exports.env.NODE_ENV === "production";
exports.isProduction = isProduction;
const isDevelopment = () => exports.env.NODE_ENV === "development";
exports.isDevelopment = isDevelopment;
const isTest = () => exports.env.NODE_ENV === "test";
exports.isTest = isTest;
// Cloud provider availability checks
exports.cloudProviders = {
    aws: {
        available: !!(exports.env.AWS_ACCESS_KEY_ID && exports.env.AWS_SECRET_ACCESS_KEY),
        bucket: exports.env.AWS_S3_BUCKET,
    },
    azure: {
        available: !!exports.env.AZURE_STORAGE_CONNECTION_STRING,
        container: exports.env.AZURE_CONTAINER_NAME,
    },
    gcp: {
        available: !!(exports.env.GCP_PROJECT_ID && exports.env.GCP_KEY_FILE),
        bucket: exports.env.GCP_BUCKET_NAME,
    },
};
// Get available cloud providers
function getAvailableCloudProviders() {
    const available = [];
    if (exports.cloudProviders.aws.available)
        available.push("aws");
    if (exports.cloudProviders.azure.available)
        available.push("azure");
    if (exports.cloudProviders.gcp.available)
        available.push("gcp");
    return available;
}
// Monitoring configuration
exports.monitoring = {
    prometheus: {
        enabled: !!exports.env.PROMETHEUS_URL,
        url: exports.env.PROMETHEUS_URL,
    },
    grafana: {
        enabled: !!exports.env.GRAFANA_URL,
        url: exports.env.GRAFANA_URL,
    },
    loki: {
        enabled: !!exports.env.LOKI_URL,
        url: exports.env.LOKI_URL,
    },
};
// Email configuration
exports.email = {
    enabled: !!(exports.env.SMTP_HOST && exports.env.SMTP_USER && exports.env.SMTP_PASS),
    config: {
        host: exports.env.SMTP_HOST,
        port: exports.env.SMTP_PORT || 587,
        secure: exports.env.SMTP_PORT === 465,
        auth: {
            user: exports.env.SMTP_USER,
            pass: exports.env.SMTP_PASS,
        },
    },
    from: exports.env.FROM_EMAIL || exports.env.SMTP_USER,
};
// Rate limiting configuration
exports.rateLimiting = {
    windowMs: exports.env.RATE_LIMIT_WINDOW_MS,
    maxRequests: exports.env.RATE_LIMIT_MAX_REQUESTS,
};
// File upload configuration
exports.fileUpload = {
    maxSize: exports.env.MAX_FILE_SIZE,
    allowedTypes: exports.env.ALLOWED_FILE_TYPES.split(","),
};
// Compute configuration
exports.compute = {
    maxConcurrentJobs: exports.env.MAX_CONCURRENT_JOBS,
    defaultTimeout: exports.env.DEFAULT_JOB_TIMEOUT,
    gpuEnabled: exports.env.GPU_ENABLED,
    cpuCoresLimit: exports.env.CPU_CORES_LIMIT,
    memoryLimitGB: exports.env.MEMORY_LIMIT_GB,
};
// Multi-tenant configuration
exports.multiTenant = {
    defaultPlan: exports.env.DEFAULT_WORKSPACE_PLAN,
    maxWorkspacesPerUser: exports.env.MAX_WORKSPACES_PER_USER,
    storageLimitGB: exports.env.WORKSPACE_STORAGE_LIMIT_GB,
};
