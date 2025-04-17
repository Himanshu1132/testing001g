"use client"

import { useMemo } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface SentimentData {
  month: string
  positive: number
  neutral: number
  negative: number
}

interface CommunicationSentimentChartProps {
  data: SentimentData[]
  showTitle?: boolean
}

export function CommunicationSentimentChart({ data, showTitle = true }: CommunicationSentimentChartProps) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) {
      return [
        { month: "Jan", positive: 65, neutral: 90, negative: 100 },
        { month: "Feb", positive: 68, neutral: 90, negative: 100 },
        { month: "Mar", positive: 72, neutral: 90, negative: 100 },
        { month: "Apr", positive: 70, neutral: 90, negative: 100 },
        { month: "May", positive: 72, neutral: 90, negative: 100 },
        { month: "Jun", positive: 75, neutral: 90, negative: 100 },
        { month: "Jul", positive: 76, neutral: 90, negative: 100 },
        { month: "Aug", positive: 75, neutral: 90, negative: 100 },
        { month: "Sep", positive: 75, neutral: 90, negative: 100 },
        { month: "Oct", positive: 74, neutral: 90, negative: 100 },
      ]
    }
    return data
  }, [data])

  return (
    <div className="w-full">
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
            <Tooltip formatter={(value) => [`${value}%`, ""]} />
            <Line type="monotone" dataKey="positive" stroke="#4ade80" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="neutral" stroke="#94a3b8" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="negative" stroke="#f87171" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

