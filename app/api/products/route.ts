import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { withBusinessLogging } from "@/lib/middleware/logging"
import { withMonitoring } from "@/lib/middleware/monitoring"
import { withGlobalErrorHandler, withRequestValidation } from "@/lib/middleware/error"

async function handleGET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    const token = authHeader?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Token tidak disediakan" }, { status: 401 })
    }

    const user = await getCurrentUser(token)
    if (!user) {
      return NextResponse.json({ error: "Token tidak sah" }, { status: 401 })
    }

    const workspaceId = request.headers.get("x-workspace-id") || user.workspaces[0]?.workspaceId

    if (!workspaceId) {
      return NextResponse.json({ error: "Workspace tidak dijumpai" }, { status: 400 })
    }

    const products = await prisma.product.findMany({
      where: { workspaceId },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ products })
  } catch (error) {
    console.error("Products fetch error:", error)
    return NextResponse.json({ error: "Ralat dalaman pelayan" }, { status: 500 })
  }
}

async function handlePOST(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  const token = authHeader?.replace("Bearer ", "")

  if (!token) {
    return NextResponse.json({ error: "Token tidak disediakan" }, { status: 401 })
  }

  const user = await getCurrentUser(token)
  if (!user) {
    return NextResponse.json({ error: "Token tidak sah" }, { status: 401 })
  }

  const workspaceId = request.headers.get("x-workspace-id") || user.workspaces[0]?.workspaceId

  if (!workspaceId) {
    return NextResponse.json({ error: "Workspace tidak dijumpai" }, { status: 400 })
  }

  const { name, description, sku, price, cost, stock, lowStock } = await request.json()

  if (!name || price === undefined || stock === undefined || lowStock === undefined) {
    return NextResponse.json({ error: "Nama, harga, stok, dan tahap stok rendah diperlukan" }, { status: 400 })
  }

  // Check if SKU already exists in workspace
  if (sku) {
    const existingSku = await prisma.product.findFirst({
      where: { workspaceId, sku },
    })

    if (existingSku) {
      return NextResponse.json({ error: "SKU sudah wujud dalam workspace ini" }, { status: 400 })
    }
  }

  const product = await prisma.product.create({
    data: {
      workspaceId,
      name,
      description: description || null,
      sku: sku || null,
      price,
      cost: cost || null,
      stock,
      lowStock,
    },
  })

  return NextResponse.json({ product })
}

export const GET = withRequestValidation(withMonitoring(withBusinessLogging(withGlobalErrorHandler(handleGET))), {
  allowedMethods: ["GET"],
})

export const POST = withRequestValidation(withMonitoring(withBusinessLogging(withGlobalErrorHandler(handlePOST))), {
  allowedMethods: ["POST"],
  maxBodySize: 2048, // 2KB limit for product creation
})
