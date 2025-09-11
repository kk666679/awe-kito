"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("../lib/config/environment");
async function validateEnvironment() {
    console.log("🔍 Validating environment configuration...");
    let hasErrors = false;
    const warnings = [];
    // Check required environment variables
    console.log("\n📋 Core Configuration:");
    console.log(`✅ Database URL: ${environment_1.env.DATABASE_URL ? "Configured" : "❌ Missing"}`);
    console.log(`✅ Redis URL: ${environment_1.env.REDIS_URL ? "Configured" : "❌ Missing"}`);
    console.log(`✅ JWT Secret: ${environment_1.env.JWT_SECRET ? "Configured" : "❌ Missing"}`);
    console.log(`✅ App URL: ${environment_1.env.NEXT_PUBLIC_APP_URL}`);
    // Check cloud providers
    console.log("\n☁️  Cloud Providers:");
    console.log(`AWS: ${environment_1.cloudProviders.aws.available ? "✅ Available" : "⚠️  Not configured"}`);
    console.log(`Azure: ${environment_1.cloudProviders.azure.available ? "✅ Available" : "⚠️  Not configured"}`);
    console.log(`GCP: ${environment_1.cloudProviders.gcp.available ? "✅ Available" : "⚠️  Not configured"}`);
    const availableProviders = Object.values(environment_1.cloudProviders).filter((p) => p.available).length;
    if (availableProviders === 0) {
        console.log("❌ No cloud providers configured! At least one is required.");
        hasErrors = true;
    }
    else {
        console.log(`✅ ${availableProviders} cloud provider(s) available`);
    }
    // Check monitoring
    console.log("\n📊 Monitoring:");
    console.log(`Prometheus: ${environment_1.monitoring.prometheus.enabled ? "✅ Enabled" : "⚠️  Disabled"}`);
    console.log(`Grafana: ${environment_1.monitoring.grafana.enabled ? "✅ Enabled" : "⚠️  Disabled"}`);
    console.log(`Loki: ${environment_1.monitoring.loki.enabled ? "✅ Enabled" : "⚠️  Disabled"}`);
    // Check email
    console.log("\n📧 Email Configuration:");
    console.log(`SMTP: ${environment_1.email.enabled ? "✅ Configured" : "⚠️  Not configured"}`);
    if (!environment_1.email.enabled) {
        warnings.push("Email notifications will not work without SMTP configuration");
    }
    // Security checks
    console.log("\n🔒 Security:");
    if (environment_1.env.JWT_SECRET.length < 32) {
        console.log("❌ JWT_SECRET should be at least 32 characters long");
        hasErrors = true;
    }
    else {
        console.log("✅ JWT_SECRET length is adequate");
    }
    if (environment_1.env.NODE_ENV === "production") {
        if (environment_1.env.JWT_SECRET.includes("your_jwt_secret")) {
            console.log("❌ JWT_SECRET contains default value in production!");
            hasErrors = true;
        }
        if (environment_1.env.SESSION_SECRET.includes("your_session_secret")) {
            console.log("❌ SESSION_SECRET contains default value in production!");
            hasErrors = true;
        }
    }
    // Print warnings
    if (warnings.length > 0) {
        console.log("\n⚠️  Warnings:");
        warnings.forEach((warning) => console.log(`   ${warning}`));
    }
    // Final result
    console.log("\n" + "=".repeat(50));
    if (hasErrors) {
        console.log("❌ Environment validation failed! Please fix the errors above.");
        process.exit(1);
    }
    else {
        console.log("✅ Environment validation passed!");
        console.log("🚀 Ready to start the application");
    }
}
validateEnvironment().catch((error) => {
    console.error("Environment validation error:", error);
    process.exit(1);
});
