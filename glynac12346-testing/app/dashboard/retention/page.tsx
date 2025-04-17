"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { Download, Filter, TrendingUp, Calendar, MessageSquare, Volume2, Frown, BarChart, Users } from "lucide-react"
import { api } from "@/lib/axios"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { EmployeeInsightsTable } from "@/components/employee-insights-table"

export default function RetentionPage() {
  const [timeRange, setTimeRange] = useState("30")
  const [retentionType, setRetentionType] = useState("all")

  const { data, isLoading } = useQuery({
    queryKey: ["retention", timeRange, retentionType],
    queryFn: async () => {
      const response = await api.get(`/api/dashboard/retention?timeRange=${timeRange}&type=${retentionType}`)
      return response.data
    },
  })

  // Mock data for star employee retention
  const starEmployeeData = [
    { name: "Performance", value: 85 },
    { name: "Compensation", value: 65 },
    { name: "Work-Life Balance", value: 70 },
    { name: "Career Growth", value: 60 },
    { name: "Management", value: 75 },
  ]

  // Mock data for calendar overload
  const calendarOverloadData = [
    { day: "Monday", meetings: 8, focus: 2 },
    { day: "Tuesday", meetings: 6, focus: 3 },
    { day: "Wednesday", meetings: 9, focus: 1 },
    { day: "Thursday", meetings: 7, focus: 2 },
    { day: "Friday", meetings: 5, focus: 4 },
  ]

  // Mock data for complaints trend
  const complaintsTrendData = [
    { month: "Jan", complaints: 12 },
    { month: "Feb", complaints: 15 },
    { month: "Mar", complaints: 18 },
    { month: "Apr", complaints: 22 },
    { month: "May", complaints: 19 },
    { month: "Jun", complaints: 25 },
  ]

  // Mock data for communication volume
  const communicationVolumeData = [
    { month: "Jan", emails: 450, chats: 320, calls: 120 },
    { month: "Feb", emails: 420, chats: 300, calls: 110 },
    { month: "Mar", emails: 400, chats: 280, calls: 100 },
    { month: "Apr", emails: 380, chats: 260, calls: 90 },
    { month: "May", emails: 350, chats: 240, calls: 85 },
    { month: "Jun", emails: 320, chats: 220, calls: 80 },
  ]

  // Mock data for language sentiment
  const languageSentimentData = [
    { month: "Jan", positive: 65, neutral: 25, negative: 10 },
    { month: "Feb", positive: 63, neutral: 27, negative: 10 },
    { month: "Mar", positive: 60, neutral: 28, negative: 12 },
    { month: "Apr", positive: 58, neutral: 27, negative: 15 },
    { month: "May", positive: 55, neutral: 28, negative: 17 },
    { month: "Jun", positive: 52, neutral: 28, negative: 20 },
  ]

  // Mock data for meeting types
  const meetingTypesData = [
    { name: "Required", value: 65, color: "#3b82f6" },
    { name: "Optional", value: 35, color: "#8b5cf6" },
  ]

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Retention Analysis</h2>
          <p className="text-muted-foreground">Monitor factors affecting employee retention</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="14">Last 14 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="all" onValueChange={setRetentionType}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-7">
          <TabsTrigger value="all">All Factors</TabsTrigger>
          <TabsTrigger value="star">Star Employees</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="complaints">Complaints</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="morale">Morale</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Star Employee Retention</CardTitle>
                    <CardDescription>Key factors affecting top performer retention</CardDescription>
                  </div>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={starEmployeeData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar
                          name="Retention Factors"
                          dataKey="value"
                          stroke="#8884d8"
                          fill="#8884d8"
                          fillOpacity={0.6}
                        />
                        <Tooltip formatter={(value) => [`${value}%`, "Score"]} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Calendar & Workload Analysis</CardTitle>
                    <CardDescription>Meeting hours vs. focus time by day</CardDescription>
                  </div>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={calendarOverloadData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis label={{ value: "Hours", angle: -90, position: "insideLeft" }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="meetings" name="Meeting Hours" fill="#3b82f6" />
                        <Bar dataKey="focus" name="Focus Blocks" fill="#10b981" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Complaints Trend</CardTitle>
                    <CardDescription>Monthly trend of employee complaints</CardDescription>
                  </div>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={complaintsTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value} complaints`, ""]} />
                        <Line type="monotone" dataKey="complaints" stroke="#ef4444" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Communication Volume</CardTitle>
                    <CardDescription>Trend of communication channels over time</CardDescription>
                  </div>
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={communicationVolumeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="emails" name="Emails" stroke="#3b82f6" strokeWidth={2} />
                        <Line type="monotone" dataKey="chats" name="Chat Messages" stroke="#8b5cf6" strokeWidth={2} />
                        <Line type="monotone" dataKey="calls" name="Calls" stroke="#10b981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Language Sentiment</CardTitle>
                    <CardDescription>Positive vs. negative language trends</CardDescription>
                  </div>
                  <Frown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={languageSentimentData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(value) => `${value}%`} />
                        <Tooltip formatter={(value) => [`${value}%`, ""]} />
                        <Legend />
                        <Line type="monotone" dataKey="positive" name="Positive" stroke="#10b981" strokeWidth={2} />
                        <Line type="monotone" dataKey="neutral" name="Neutral" stroke="#94a3b8" strokeWidth={2} />
                        <Line type="monotone" dataKey="negative" name="Negative" stroke="#ef4444" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Meeting Types</CardTitle>
                    <CardDescription>Required vs. optional meetings</CardDescription>
                  </div>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={meetingTypesData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {meetingTypesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, ""]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Employee Retention Risk</CardTitle>
                  <CardDescription>Employees at risk of leaving based on various factors</CardDescription>
                </div>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <EmployeeInsightsTable employees={data?.employeeInsights || []} />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Additional tab content for specific sections would go here */}
      </Tabs>
    </div>
  )
}

