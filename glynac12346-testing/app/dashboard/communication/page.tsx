"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { Filter, MessageSquare, TrendingUp, Users, AlertTriangle, ThumbsUp, ThumbsDown } from "lucide-react"
import { api } from "@/lib/axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Update the export functionality in the communication page
// At the top of the file, add these imports:
import { ExportMenu } from "@/components/export-menu"

// Mock data for sentiment over time
const sentimentOverTimeData = [
  { month: "Jan", positive: 65, neutral: 25, negative: 10 },
  { month: "Feb", positive: 63, neutral: 27, negative: 10 },
  { month: "Mar", positive: 60, neutral: 28, negative: 12 },
  { month: "Apr", positive: 58, neutral: 27, negative: 15 },
  { month: "May", positive: 55, neutral: 28, negative: 17 },
  { month: "Jun", positive: 52, neutral: 28, negative: 20 },
  { month: "Jul", positive: 54, neutral: 26, negative: 20 },
  { month: "Aug", positive: 56, neutral: 24, negative: 20 },
  { month: "Sep", positive: 60, neutral: 22, negative: 18 },
  { month: "Oct", positive: 65, neutral: 20, negative: 15 },
  { month: "Nov", positive: 68, neutral: 18, negative: 14 },
  { month: "Dec", positive: 70, neutral: 18, negative: 12 },
]

// Mock data for department sentiment
const departmentSentimentData = [
  { department: "Marketing", positive: 70, neutral: 20, negative: 10 },
  { department: "Engineering", positive: 65, neutral: 25, negative: 10 },
  { department: "Product", positive: 60, neutral: 30, negative: 10 },
  { department: "Finance", positive: 55, neutral: 30, negative: 15 },
  { department: "HR", positive: 75, neutral: 20, negative: 5 },
  { department: "Sales", positive: 60, neutral: 25, negative: 15 },
  { department: "Customer Support", positive: 50, neutral: 30, negative: 20 },
  { department: "Legal", positive: 45, neutral: 40, negative: 15 },
]

// Mock data for communication channels
const communicationChannelsData = [
  { name: "Email", value: 40, color: "#3b82f6" },
  { name: "Slack", value: 30, color: "#8b5cf6" },
  { name: "Meetings", value: 20, color: "#10b981" },
  { name: "Phone", value: 10, color: "#f59e0b" },
]

// Mock data for sentiment by topic
const sentimentByTopicData = [
  { topic: "Project Deadlines", positive: 40, neutral: 30, negative: 30 },
  { topic: "Work Environment", positive: 60, neutral: 30, negative: 10 },
  { topic: "Team Collaboration", positive: 70, neutral: 20, negative: 10 },
  { topic: "Management", positive: 50, neutral: 20, negative: 30 },
  { topic: "Compensation", positive: 40, neutral: 40, negative: 20 },
  { topic: "Work-Life Balance", positive: 55, neutral: 25, negative: 20 },
]

// Mock data for negative sentiment trends
const negativeSentimentTrendsData = [
  { week: "Week 1", management: 20, workload: 15, compensation: 10 },
  { week: "Week 2", management: 22, workload: 18, compensation: 12 },
  { week: "Week 3", management: 25, workload: 20, compensation: 15 },
  { week: "Week 4", management: 30, workload: 25, compensation: 18 },
  { week: "Week 5", management: 28, workload: 30, compensation: 20 },
  { week: "Week 6", management: 25, workload: 28, compensation: 22 },
  { week: "Week 7", management: 22, workload: 25, compensation: 20 },
  { week: "Week 8", management: 20, workload: 22, compensation: 18 },
]

// Mock data for employees with negative sentiment
const negativeEmployeesData = [
  {
    name: "Alex Thompson",
    department: "Sales",
    negativeSentiment: 35,
    recentMessage: "This deadline is impossible to meet. I'm working overtime every day!",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Sarah Johnson",
    department: "Marketing",
    negativeSentiment: 30,
    recentMessage: "I'm not getting the support I need from management on this project.",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "Michael Chen",
    department: "Engineering",
    negativeSentiment: 28,
    recentMessage: "The constant changes to requirements are making it impossible to finish.",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    name: "Emily Rodriguez",
    department: "Product",
    negativeSentiment: 25,
    recentMessage: "We need more resources if we're expected to deliver on time.",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    name: "David Kim",
    department: "Finance",
    negativeSentiment: 22,
    recentMessage: "The budget constraints are making it difficult to do our jobs effectively.",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
]

// Mock data for flagged messages
const flaggedMessagesData = [
  {
    from: "John Martinez",
    to: "Team",
    message: "Back off! I'm sick of your constant criticism. You're a terrible manager!",
    severity: "high",
    date: "2 days ago",
  },
  {
    from: "Sarah Johnson",
    to: "Project Lead",
    message: "The deadline for this project is ridiculous! We need more time.",
    severity: "medium",
    date: "3 days ago",
  },
  {
    from: "Michael Chen",
    to: "HR",
    message: "I'm being overworked and nobody seems to care about my wellbeing.",
    severity: "medium",
    date: "1 week ago",
  },
  {
    from: "Emily Rodriguez",
    to: "Management",
    message: "This company doesn't value its employees. I'm considering other options.",
    severity: "high",
    date: "2 weeks ago",
  },
  {
    from: "David Kim",
    to: "Team Lead",
    message: "I'm frustrated with the lack of direction on this project.",
    severity: "low",
    date: "3 weeks ago",
  },
]

export default function CommunicationPage() {
  const [timeRange, setTimeRange] = useState("30")
  const [department, setDepartment] = useState("all")

  const { data, isLoading } = useQuery({
    queryKey: ["communication", timeRange, department],
    queryFn: async () => {
      const response = await api.get(`/api/dashboard/communication?timeRange=${timeRange}&department=${department}`)
      return response.data
    },
  })

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
          <h2 className="text-3xl font-bold tracking-tight">Communication Sentiment</h2>
          <p className="text-muted-foreground">Analyze communication patterns and sentiment across the organization</p>
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
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="product">Product</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="hr">HR</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
            </SelectContent>
          </Select>
          {/* Then in the return statement, find the div with the filter button and add: */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <ExportMenu
              data={sentimentOverTimeData}
              filename="communication-sentiment"
              title="Communication Sentiment"
            />
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="topics">Topics</TabsTrigger>
          <TabsTrigger value="negative">Negative Sentiment</TabsTrigger>
          <TabsTrigger value="flagged">Flagged Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Positive Sentiment</CardTitle>
                <ThumbsUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">74%</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
                <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-1 rounded-full" style={{ width: "74%" }}></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Neutral Sentiment</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-600">18%</div>
                <p className="text-xs text-muted-foreground">-2% from last month</p>
                <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-gray-500 h-1 rounded-full" style={{ width: "18%" }}></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Negative Sentiment</CardTitle>
                <ThumbsDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">8%</div>
                <p className="text-xs text-muted-foreground">-3% from last month</p>
                <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-1 rounded-full" style={{ width: "8%" }}></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Flagged Messages</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-600">12</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
                <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-1 rounded-full" style={{ width: "40%" }}></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>Sentiment Over Time</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={sentimentOverTimeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(value) => `${value}%`} />
                        <Tooltip formatter={(value) => [`${value}%`, ""]} />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="positive"
                          stackId="1"
                          stroke="#4ade80"
                          fill="#4ade80"
                          fillOpacity={0.8}
                        />
                        <Area
                          type="monotone"
                          dataKey="neutral"
                          stackId="1"
                          stroke="#94a3b8"
                          fill="#94a3b8"
                          fillOpacity={0.8}
                        />
                        <Area
                          type="monotone"
                          dataKey="negative"
                          stackId="1"
                          stroke="#f87171"
                          fill="#f87171"
                          fillOpacity={0.8}
                        />
                      </AreaChart>
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
                  <CardTitle>Communication Channels</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={communicationChannelsData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {communicationChannelsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, ""]} />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Employees with Negative Sentiment</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Negative Sentiment</TableHead>
                      <TableHead>Recent Message</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {negativeEmployeesData.map((employee) => (
                      <TableRow key={employee.name}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar>
                              <AvatarImage src={employee.image} alt={employee.name} />
                              <AvatarFallback>
                                {employee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{employee.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>
                          <Badge
                            variant={employee.negativeSentiment > 30 ? "destructive" : "outline"}
                            className={
                              employee.negativeSentiment <= 30 && employee.negativeSentiment > 20
                                ? "border-yellow-500 text-yellow-600"
                                : ""
                            }
                          >
                            {employee.negativeSentiment}%
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{employee.recentMessage}</TableCell>
                        <TableCell>
                          <Button variant="link" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Department Sentiment Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentSentimentData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                    <YAxis dataKey="department" type="category" width={100} />
                    <Tooltip formatter={(value) => [`${value}%`, ""]} />
                    <Legend />
                    <Bar dataKey="positive" name="Positive" stackId="a" fill="#4ade80" />
                    <Bar dataKey="neutral" name="Neutral" stackId="a" fill="#94a3b8" />
                    <Bar dataKey="negative" name="Negative" stackId="a" fill="#f87171" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Sentiment by Topic</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sentimentByTopicData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="topic" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => [`${value}%`, ""]} />
                    <Legend />
                    <Bar dataKey="positive" name="Positive" fill="#4ade80" />
                    <Bar dataKey="neutral" name="Neutral" fill="#94a3b8" />
                    <Bar dataKey="negative" name="Negative" fill="#f87171" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="negative" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Negative Sentiment Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={negativeSentimentTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => [`${value}%`, ""]} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="management"
                      name="Management Issues"
                      stroke="#ef4444"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="workload"
                      name="Workload Issues"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="compensation"
                      name="Compensation Issues"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flagged" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Flagged Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {flaggedMessagesData.map((message, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{message.from}</TableCell>
                      <TableCell>{message.to}</TableCell>
                      <TableCell className="max-w-xs truncate">{message.message}</TableCell>
                      <TableCell>
                        <Badge
                          variant={message.severity === "high" ? "destructive" : "outline"}
                          className={
                            message.severity === "medium"
                              ? "border-yellow-500 text-yellow-600"
                              : message.severity === "low"
                                ? "border-green-500 text-green-600"
                                : ""
                          }
                        >
                          {message.severity === "high" ? "High" : message.severity === "medium" ? "Medium" : "Low"}
                        </Badge>
                      </TableCell>
                      <TableCell>{message.date}</TableCell>
                      <TableCell>
                        <Button variant="link" size="sm">
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

