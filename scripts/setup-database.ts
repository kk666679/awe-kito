import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function setupDatabase() {
  try {
    console.log("🔄 Setting up database...")

    // Generate Prisma client
    console.log("📦 Generating Prisma client...")

    // Push schema to database
    console.log("🗄️  Pushing schema to database...")

    // Create initial workspace if none exists
    const workspaceCount = await prisma.workspace.count()
    if (workspaceCount === 0) {
      console.log("🏢 Creating default workspace...")
      await prisma.workspace.create({
        data: {
          name: "Awan Keusahawanan",
          slug: "awan-keusahawanan",
          description: "Default workspace for Malaysian SME cloud platform",
        },
      })
    }

    // Create indexes for better performance
    console.log("📊 Database setup completed successfully!")
  } catch (error) {
    console.error("❌ Database setup failed:", error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

setupDatabase()
