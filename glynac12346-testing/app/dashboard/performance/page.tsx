"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import {
  Download,
  Filter,
  UserX,
  MessageSquare,
  Volume2,
  Clock,
  AlertTriangle,
  Repeat,
  CheckSquare,
  Search,
} from "lucide-react"
import { api } from "@/lib/axios"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  BarChart,
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
} from "recharts"
import { EmployeeInsightsTable } from "@/components/employee-insights-table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function PerformancePage() {
  const [timeRange, setTimeRange] = useState("30")
  const [performanceType, setPerformanceType] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const { data, isLoading } = useQuery({
    queryKey: ["performance", timeRange, performanceType],
    queryFn: async () => {
      const response = await api.get(`/api/dashboard/performance?timeRange=${timeRange}&type=${performanceType}`)
      return response.data
    },
  })

  // Mock data for leadership criticism
  const leadershipCriticismData = [
    { department: "Marketing", count: 12 },
    { department: "Engineering", count: 8 },
    { department: "Product", count: 5 },
    { department: "Finance", count: 3 },
    { department: "HR", count: 2 },
    { department: "Sales", count: 10 },
  ]

  // Mock data for complainers
  const complainersData = [
    {
      name: "Alex Thompson",
      department: "Sales",
      complaints: 15,
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      name: "Sarah Johnson",
      department: "Marketing",
      complaints: 12,
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      name: "Mike Chen",
      department: "Engineering",
      complaints: 9,
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      name: "Emily Rodriguez",
      department: "Product",
      complaints: 7,
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    { name: "David Kim", department: "Finance", complaints: 5, image: "https://randomuser.me/api/portraits/men/5.jpg" },
  ]

  // Mock data for communication volume
  const communicationVolumeData = [
    { employee: "Alex T.", emails: 15, chats: 25, calls: 5 },
    { employee: "Sarah J.", emails: 45, chats: 60, calls: 12 },
    { employee: "Mike C.", emails: 30, chats: 40, calls: 8 },
    { employee: "Emily R.", emails: 60, chats: 75, calls: 15 },
    { employee: "David K.", emails: 25, chats: 30, calls: 6 },
  ]

  // Mock data for response time
  const responseTimeData = [
    { employee: "Alex T.", time: 120 },
    { employee: "Sarah J.", time: 45 },
    { employee: "Mike C.", time: 90 },
    { employee: "Emily R.", time: 30 },
    { employee: "David K.", time: 60 },
  ]

  // Mock data for language sentiment
  const languageSentimentData = [
    { employee: "Alex T.", positive: 30, neutral: 40, negative: 30 },
    { employee: "Sarah J.", positive: 20, neutral: 30, negative: 50 },
    { employee: "Mike C.", positive: 40, neutral: 40, negative: 20 },
    { employee: "Emily R.", positive: 60, neutral: 30, negative: 10 },
    { employee: "David K.", positive: 50, neutral: 30, negative: 20 },
  ]

  // Mock data for repeated topics
  const repeatedTopicsData = [
    { topic: "Project Delays", count: 15 },
    { topic: "Budget Issues", count: 12 },
    { topic: "Resource Allocation", count: 10 },
    { topic: "Client Complaints", count: 8 },
    { topic: "Technical Problems", count: 7 },
  ]

  // Mock data for overdue tasks
  const overdueTasksData = [
    { employee: "Alex T.", count: 12 },
    { employee: "Sarah J.", count: 8 },
    { employee: "Mike C.", count: 5 },
    { employee: "Emily R.", count: 2 },
    { employee: "David K.", count: 4 },
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
          <h2 className="text-3xl font-bold tracking-tight">Performance Drags</h2>
          <p className="text-muted-foreground">Identify factors negatively impacting workplace performance</p>
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

      <Tabs defaultValue="all" onValueChange={setPerformanceType}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-7">
          <TabsTrigger value="all">All Factors</TabsTrigger>
          <TabsTrigger value="leadership">Leadership Issues</TabsTrigger>
          <TabsTrigger value="complaints">Complainers</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="response">Response Time</TabsTrigger>
          <TabsTrigger value="language">Negative Language</TabsTrigger>
          <TabsTrigger value="tasks">Overdue Tasks</TabsTrigger>
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
                    <CardTitle>Leadership Criticism</CardTitle>
                    <CardDescription>Negative comments about leadership by department</CardDescription>
                  </div>
                  <UserX className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={leadershipCriticismData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="department" type="category" width={100} />
                        <Tooltip formatter={(value) => [`${value} instances`, ""]} />
                        <Bar dataKey="count" name="Criticism Instances" fill="#ef4444" />
                      </BarChart>
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
                    <CardTitle>Top Complainers</CardTitle>
                    <CardDescription>Employees with highest complaint frequency</CardDescription>
                  </div>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                      {complainersData.map((employee, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={employee.image} alt={employee.name} />
                              <AvatarFallback>
                                {employee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{employee.name}</p>
                              <p className="text-sm text-muted-foreground">{employee.department}</p>
                            </div>
                          </div>
                          <Badge variant="destructive">{employee.complaints} complaints</Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
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
                    <CardTitle>Communication Volume</CardTitle>
                    <CardDescription>Communication activity by employee</CardDescription>
                  </div>
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={communicationVolumeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="employee" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="emails" name="Emails" fill="#3b82f6" />
                        <Bar dataKey="chats" name="Chat Messages" fill="#8b5cf6" />
                        <Bar dataKey="calls" name="Calls" fill="#10b981" />
                      </BarChart>
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
                    <CardTitle>Response Time</CardTitle>
                    <CardDescription>Average response time in minutes</CardDescription>
                  </div>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={responseTimeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="employee" />
                        <YAxis label={{ value: "Minutes", angle: -90, position: "insideLeft" }} />
                        <Tooltip formatter={(value) => [`${value} minutes`, ""]} />
                        <Bar dataKey="time" name="Response Time" fill="#f97316">
                          {responseTimeData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.time > 90 ? "#ef4444" : entry.time > 60 ? "#f97316" : "#10b981"}
                            />
                          ))}
                        </Bar>
                      </BarChart>
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
                    <CardDescription>Positive vs. negative language by employee</CardDescription>
                  </div>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={languageSentimentData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                        <YAxis dataKey="employee" type="category" width={60} />
                        <Tooltip formatter={(value) => [`${value}%`, ""]} />
                        <Legend />
                        <Bar dataKey="positive" name="Positive" stackId="a" fill="#10b981" />
                        <Bar dataKey="neutral" name="Neutral" stackId="a" fill="#94a3b8" />
                        <Bar dataKey="negative" name="Negative" stackId="a" fill="#ef4444" />
                      </BarChart>
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
                    <CardTitle>Repeated Topics</CardTitle>
                    <CardDescription>Most frequently repeated discussion topics</CardDescription>
                  </div>
                  <Repeat className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={repeatedTopicsData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="count"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {repeatedTopicsData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={["#ef4444", "#f97316", "#eab308", "#3b82f6", "#8b5cf6"][index % 5]}
                            />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} instances`, ""]} />
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
                  <CardTitle>Overdue Tasks</CardTitle>
                  <CardDescription>Number of overdue tasks by employee</CardDescription>
                </div>
                <CheckSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={overdueTasksData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="employee" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} tasks`, ""]} />
                      <Bar dataKey="count" name="Overdue Tasks" fill="#ef4444">
                        {overdueTasksData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.count > 10 ? "#ef4444" : entry.count > 5 ? "#f97316" : "#eab308"}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Performance Drag Factors</CardTitle>
                  <CardDescription>Employees with performance issues based on selected factors</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search employees..."
                    className="pl-8 w-full md:w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
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

