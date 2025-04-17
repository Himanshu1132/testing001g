"use client"

import { useMemo } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface WorkloadData {
  department: string
  meetingHours: number
  afterHoursWork: number
}

interface WorkloadAnalysisChartProps {
  data: WorkloadData[]
  showTitle?: boolean
}

export function WorkloadAnalysisChart({ data, showTitle = true }: WorkloadAnalysisChartProps) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) {
      return [
        { department: "Marketing", meetingHours: 28, afterHoursWork: 5 },
        { department: "Engineering", meetingHours: 22, afterHoursWork: 12 },
        { department: "Product", meetingHours: 25, afterHoursWork: 8 },
        { department: "Finance", meetingHours: 24, afterHoursWork: 3 },
        { department: "HR", meetingHours: 20, afterHoursWork: 2 },
        { department: "Sales", meetingHours: 25, afterHoursWork: 6 },
      ]
    }
    return data
  }, [data])

  return (
    <div className="w-full">
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="department" />
            <YAxis label={{ value: "Hours per Week", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Bar dataKey="meetingHours" name="Meeting Hours" fill="#60a5fa" />
            <Bar dataKey="afterHoursWork" name="After-Hours Work" fill="#a78bfa" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

