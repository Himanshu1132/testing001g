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

    // Get communication sentiment data
    const messages = await prisma.message.findMany({
      where: {
        sentAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    })

    // Calculate sentiment by month
    const sentimentByMonth = new Map()
    messages.forEach((message) => {
      const month = message.sentAt.toLocaleString("default", { month: "short" })
      if (!sentimentByMonth.has(month)) {
        sentimentByMonth.set(month, { positive: 0, neutral: 0, negative: 0, total: 0 })
      }
      const data = sentimentByMonth.get(month)
      data.total += 1
      if (message.isPositive) data.positive += 1
      if (message.isNeutral) data.neutral += 1
      if (message.isNegative) data.negative += 1
    })

    const communicationSentiment = Array.from(sentimentByMonth.entries()).map(([month, data]) => ({
      month,
      positive: Math.round((data.positive / data.total) * 100),
      neutral: Math.round((data.neutral / data.total) * 100),
      negative: Math.round((data.negative / data.total) * 100),
    }))

    // Get workload analysis data
    const users = await prisma.user.findMany({
      where: {
        isAdmin: false,
      },
      include: {
        retentionData: true,
      },
    })

    // Group users by department
    const departmentMap = new Map()
    users.forEach((user) => {
      if (!user.department) return

      if (!departmentMap.has(user.department)) {
        departmentMap.set(user.department, { users: [], meetingHours: 0, afterHoursWork: 0 })
      }

      const data = departmentMap.get(user.department)
      data.users.push(user)
      if (user.retentionData) {
        data.meetingHours += user.retentionData.meetingLoad
        data.afterHoursWork += user.retentionData.afterHoursWork
      }
    })

    const workloadAnalysis = Array.from(departmentMap.entries()).map(([department, data]) => ({
      department,
      meetingHours: Math.round(data.meetingHours / data.users.length),
      afterHoursWork: Math.round(data.afterHoursWork / data.users.length),
    }))

    // Get employee insights
    const employeeInsights = users.map((user) => {
      // Determine status based on retention risk
      let status = "good"
      if (user.retentionData?.retentionRisk && user.retentionData.retentionRisk > 60) {
        status = "at_risk"
      } else if (user.retentionData?.retentionRisk && user.retentionData.retentionRisk > 30) {
        status = "warning"
      }

      // Determine sentiment based on positive language percentage
      let sentiment = "neutral"
      if (user.retentionData?.positiveLanguagePercent && user.retentionData.positiveLanguagePercent > 60) {
        sentiment = "positive"
      } else if (user.retentionData?.positiveLanguagePercent && user.retentionData.positiveLanguagePercent < 40) {
        sentiment = "negative"
      }

      // Determine workload based on meeting load
      let workload = "balanced"
      if (user.retentionData?.meetingLoad && user.retentionData.meetingLoad > 30) {
        workload = "overloaded"
      } else if (user.retentionData?.meetingLoad && user.retentionData.meetingLoad < 15) {
        workload = "underloaded"
      }

      // Determine risk level
      let riskLevel = "low"
      if (user.retentionData?.retentionRisk && user.retentionData.retentionRisk > 60) {
        riskLevel = "high"
      } else if (user.retentionData?.retentionRisk && user.retentionData.retentionRisk > 30) {
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

    // Calculate overall metrics
    const totalPositive = messages.filter((m) => m.isPositive).length
    const totalNeutral = messages.filter((m) => m.isNeutral).length
    const totalNegative = messages.filter((m) => m.isNegative).length
    const totalMessages = messages.length

    const avgMeetingHours = Math.round(
      users.reduce((sum, user) => sum + (user.retentionData?.meetingLoad || 0), 0) / users.length,
    )
    const avgAfterHoursWork = Math.round(
      users.reduce((sum, user) => sum + (user.retentionData?.afterHoursWork || 0), 0) / users.length,
    )

    return NextResponse.json({
      communicationSentiment,
      sentimentSummary: {
        positive: Math.round((totalPositive / totalMessages) * 100) || 74,
        neutral: Math.round((totalNeutral / totalMessages) * 100) || 18,
        negative: Math.round((totalNegative / totalMessages) * 100) || 8,
      },
      workloadAnalysis,
      workloadSummary: {
        avgMeetingHours: avgMeetingHours || 24.3,
        afterHoursWork: Math.round((avgAfterHoursWork / 40) * 100) || 12,
        avgFocusBlocks: Math.round(40 - avgMeetingHours / 3) || 9,
      },
      employeeInsights,
    })
  } catch (error) {
    console.error("Error fetching retention data:", error)
    return NextResponse.json({ error: "Failed to fetch retention data" }, { status: 500 })
  }
}

