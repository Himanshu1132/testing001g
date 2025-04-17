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

    // Get users with performance data
    const users = await prisma.user.findMany({
      where: {
        isAdmin: false,
      },
      include: {
        performanceData: true,
        retentionData: true,
      },
    })

    // Filter users based on performance type
    let filteredUsers = [...users]
    if (type !== "all") {
      switch (type) {
        case "leadership":
          filteredUsers = users.filter(
            (user) => user.performanceData?.leadershipComplaints && user.performanceData.leadershipComplaints > 0,
          )
          break
        case "complaints":
          filteredUsers = users.filter(
            (user) => user.performanceData?.complaintsCount && user.performanceData.complaintsCount > 3,
          )
          break
        case "communication":
          filteredUsers = users.filter(
            (user) => user.performanceData?.communicationVolume && user.performanceData.communicationVolume < 50,
          )
          break
        case "response":
          filteredUsers = users.filter(
            (user) => user.performanceData?.responseTimeAvg && user.performanceData.responseTimeAvg > 60,
          )
          break
        case "language":
          filteredUsers = users.filter(
            (user) =>
              user.performanceData?.negativeLanguagePercent && user.performanceData.negativeLanguagePercent > 30,
          )
          break
        case "tasks":
          filteredUsers = users.filter(
            (user) => user.performanceData?.overdueTasksCount && user.performanceData.overdueTasksCount > 5,
          )
          break
      }
    }

    // Get employee insights
    const employeeInsights = filteredUsers.map((user) => {
      // Determine status based on performance metrics
      let status = "good"
      if (
        (user.performanceData?.leadershipComplaints && user.performanceData.leadershipComplaints > 3) ||
        (user.performanceData?.negativeLanguagePercent && user.performanceData.negativeLanguagePercent > 40) ||
        (user.performanceData?.overdueTasksCount && user.performanceData.overdueTasksCount > 10)
      ) {
        status = "at_risk"
      } else if (
        (user.performanceData?.leadershipComplaints && user.performanceData.leadershipComplaints > 0) ||
        (user.performanceData?.negativeLanguagePercent && user.performanceData.negativeLanguagePercent > 25) ||
        (user.performanceData?.overdueTasksCount && user.performanceData.overdueTasksCount > 5)
      ) {
        status = "warning"
      }

      // Determine sentiment based on negative language percentage
      let sentiment = "neutral"
      if (user.performanceData?.negativeLanguagePercent && user.performanceData.negativeLanguagePercent > 40) {
        sentiment = "negative"
      } else if (user.retentionData?.positiveLanguagePercent && user.retentionData.positiveLanguagePercent > 60) {
        sentiment = "positive"
      }

      // Determine workload based on communication volume
      let workload = "balanced"
      if (user.performanceData?.communicationVolume && user.performanceData.communicationVolume > 80) {
        workload = "overloaded"
      } else if (user.performanceData?.communicationVolume && user.performanceData.communicationVolume < 40) {
        workload = "underloaded"
      }

      // Determine risk level
      let riskLevel = "low"
      if (status === "at_risk") {
        riskLevel = "high"
      } else if (status === "warning") {
        riskLevel = "medium"
      }

      return {
        id: user.id,
        name: user.name,
        status,
        sentiment,
        workload,
        riskLevel,
      }
    })

    return NextResponse.json({
      employeeInsights,
    })
  } catch (error) {
    console.error("Error fetching performance data:", error)
    return NextResponse.json({ error: "Failed to fetch performance data" }, { status: 500 })
  }
}

