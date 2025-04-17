import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const timeRange = Number.parseInt(searchParams.get("timeRange") || "30")
    const type = searchParams.get("type") || "all"

    // Calculate date range
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - timeRange)

    // Build query based on risk type
    let categoryFilter = {}
    if (type !== "all") {
      categoryFilter = {
        category: {
          contains: type,
          mode: "insensitive",
        },
      }
    }

    // Get risk alerts
    const riskAlerts = await prisma.riskAlert.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        isResolved: false,
        ...categoryFilter,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            department: true,
          },
        },
      },
    })

    return NextResponse.json({
      alerts: riskAlerts.map((alert) => ({
        id: alert.id,
        title: alert.title,
        description: alert.description,
        severity: alert.severity,
        timestamp: formatTimestamp(alert.createdAt),
        icon: mapCategoryToIcon(alert.category),
      })),
    })
  } catch (error) {
    console.error("Error fetching risk data:", error)
    return NextResponse.json({ error: "Failed to fetch risk data" }, { status: 500 })
  }
}

function formatTimestamp(date: Date): string {
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 24) {
    return `Today, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
  } else if (diffInHours < 48) {
    return "Yesterday"
  } else {
    return `${Math.floor(diffInHours / 24)} days ago`
  }
}

function mapCategoryToIcon(category: string): string {
  switch (category) {
    case "harassment":
    case "language":
    case "disputes":
      return "harassment"
    case "retention":
    case "workload":
      return "burnout"
    case "security":
    case "access":
      return "file"
    default:
      return "harassment"
  }
}

