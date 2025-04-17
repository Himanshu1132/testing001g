"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import {
  Download,
  Filter,
  Users,
  UserCheck,
  UserMinus,
  Clock,
  Calendar,
  BarChart4,
  PieChart,
  Search,
  MessageSquare,
} from "lucide-react"
import { api } from "@/lib/axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for employee status
const employeeStatusData = [
  { name: "At Risk", value: 15, color: "#ef4444" },
  { name: "Warning", value: 25, color: "#f59e0b" },
  { name: "Good", value: 60, color: "#10b981" },
]

// Mock data for retention risk factors
const retentionRiskFactorsData = [
  { factor: "Workload", score: 75 },
  { factor: "Compensation", score: 60 },
  { factor: "Work-Life Balance", score: 55 },
  { factor: "Management", score: 70 },
  { factor: "Career Growth", score: 50 },
  { factor: "Team Dynamics", score: 65 },
]

// Mock data for employee sentiment over time
const employeeSentimentData = [
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
]

// Mock data for department workload
const departmentWorkloadData = [
  { department: "Marketing", meetingHours: 28, afterHoursWork: 5, focusTime: 15 },
  { department: "Engineering", meetingHours: 22, afterHoursWork: 12, focusTime: 20 },
  { department: "Product", meetingHours: 25, afterHoursWork: 8, focusTime: 18 },
  { department: "Finance", meetingHours: 24, afterHoursWork: 3, focusTime: 22 },
  { department: "HR", meetingHours: 20, afterHoursWork: 2, focusTime: 25 },
  { department: "Sales", meetingHours: 25, afterHoursWork: 6, focusTime: 17 },
]

// Mock data for employee insights
const employeeInsightsData = [
  {
    id: "1",
    name: "Sarah Johnson",
    department: "Marketing",
    position: "Marketing Manager",
    status: "at_risk",
    sentiment: "negative",
    workload: "overloaded",
    riskLevel: "high",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: "2",
    name: "Michael Chen",
    department: "Engineering",
    position: "Senior Developer",
    status: "warning",
    sentiment: "neutral",
    workload: "balanced",
    riskLevel: "medium",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    department: "Product",
    position: "Product Manager",
    status: "good",
    sentiment: "positive",
    workload: "balanced",
    riskLevel: "low",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: "4",
    name: "David Kim",
    department: "Finance",
    position: "Financial Analyst",
    status: "good",
    sentiment: "positive",
    workload: "underloaded",
    riskLevel: "low",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: "5",
    name: "Alex Thompson",
    department: "Sales",
    position: "Sales Representative",
    status: "warning",
    sentiment: "neutral",
    workload: "overloaded",
    riskLevel: "medium",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "6",
    name: "Jessica Williams",
    department: "HR",
    position: "HR Specialist",
    status: "good",
    sentiment: "positive",
    workload: "balanced",
    riskLevel: "low",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    id: "7",
    name: "Robert Garcia",
    department: "Engineering",
    position: "Frontend Developer",
    status: "warning",
    sentiment: "neutral",
    workload: "overloaded",
    riskLevel: "medium",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    id: "8",
    name: "Lisa Brown",
    department: "Marketing",
    position: "Content Strategist",
    status: "at_risk",
    sentiment: "negative",
    workload: "overloaded",
    riskLevel: "high",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
  },
]

// Mock data for employee risk alerts
const employeeRiskAlertsData = [
  {
    id: "1",
    employee: "Sarah Johnson",
    department: "Marketing",
    alert: "Burnout Risk",
    description: "Working consistently past 9 PM for the last 14 days",
    severity: "high",
    timestamp: "2 days ago",
  },
  {
    id: "2",
    employee: "Michael Chen",
    department: "Engineering",
    alert: "Negative Sentiment",
    description: "Multiple messages with negative sentiment detected in team chat",
    severity: "medium",
    timestamp: "3 days ago",
  },
  {
    id: "3",
    employee: "Lisa Brown",
    department: "Marketing",
    alert: "Potential Harassment",
    description: "Concerning messages detected in private communications",
    severity: "high",
    timestamp: "1 day ago",
  },
  {
    id: "4",
    employee: "Alex Thompson",
    department: "Sales",
    alert: "Workload Imbalance",
    description: "Calendar overbooked with meetings, minimal focus time",
    severity: "medium",
    timestamp: "4 days ago",
  },
  {
    id: "5",
    employee: "Robert Garcia",
    department: "Engineering",
    alert: "After-Hours Work",
    description: "Consistent work activity detected between 10 PM and 1 AM",
    severity: "medium",
    timestamp: "5 days ago",
  },
]

export default function EmployeesPage() {
  const [timeRange, setTimeRange] = useState("30")
  const [department, setDepartment] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const { data, isLoading } = useQuery({
    queryKey: ["employees", timeRange, department],
    queryFn: async () => {
      const response = await api.get(`/api/dashboard/employees?timeRange=${timeRange}&department=${department}`)
      return response.data
    },
  })

  const filteredEmployees = employeeInsightsData.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
          <h2 className="text-3xl font-bold tracking-tight">Employee Insights</h2>
          <p className="text-muted-foreground">Monitor employee wellbeing, workload, and retention risk</p>
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

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="directory">Directory</TabsTrigger>
          <TabsTrigger value="retention">Retention</TabsTrigger>
          <TabsTrigger value="workload">Workload</TabsTrigger>
          <TabsTrigger value="alerts">Risk Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">248</div>
                <p className="text-xs text-muted-foreground">+12 from last month</p>
                <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-1 rounded-full" style={{ width: "75%" }}></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">-2% from last month</p>
                <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-1 rounded-full" style={{ width: "92%" }}></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">At-Risk Employees</CardTitle>
                <UserMinus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-muted-foreground">+3 from last month</p>
                <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-1 rounded-full" style={{ width: "15%" }}></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Avg. Meeting Hours</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24.3</div>
                <p className="text-xs text-muted-foreground">hours per week</p>
                <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-1 rounded-full" style={{ width: "60%" }}></div>
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
                  <CardTitle>Employee Status</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={employeeStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {employeeStatusData.map((entry, index) => (
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

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>Retention Risk Factors</CardTitle>
                  <BarChart4 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={retentionRiskFactorsData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="factor" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar name="Risk Score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        <Tooltip formatter={(value) => [`${value}%`, "Risk Score"]} />
                      </RadarChart>
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
                  <CardTitle>Employee Sentiment</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={employeeSentimentData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(value) => `${value}%`} />
                        <Tooltip formatter={(value) => [`${value}%`, ""]} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="positive"
                          name="Positive"
                          stroke="#10b981"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="neutral"
                          name="Neutral"
                          stroke="#94a3b8"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="negative"
                          name="Negative"
                          stroke="#ef4444"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                        />
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
                  <CardTitle>Department Workload</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={departmentWorkloadData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="department" />
                        <YAxis label={{ value: "Hours per Week", angle: -90, position: "insideLeft" }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="meetingHours" name="Meeting Hours" fill="#60a5fa" />
                        <Bar dataKey="focusTime" name="Focus Time" fill="#10b981" />
                        <Bar dataKey="afterHoursWork" name="After-Hours Work" fill="#a78bfa" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="directory" className="space-y-6 mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Employee Directory</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sentiment</TableHead>
                    <TableHead>Workload</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
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
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>
                        <StatusBadge status={employee.status} />
                      </TableCell>
                      <TableCell>
                        <SentimentBadge sentiment={employee.sentiment} />
                      </TableCell>
                      <TableCell>
                        <WorkloadBadge workload={employee.workload} />
                      </TableCell>
                      <TableCell>
                        <RiskLevelBadge riskLevel={employee.riskLevel} />
                      </TableCell>
                      <TableCell>
                        <Button variant="link" size="sm">
                          View Profile
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retention" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Retention Risk Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={retentionRiskFactorsData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="factor" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Risk Score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Tooltip formatter={(value) => [`${value}%`, "Risk Score"]} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workload" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Employee Workload Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentWorkloadData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis label={{ value: "Hours per Week", angle: -90, position: "insideLeft" }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="meetingHours" name="Meeting Hours" fill="#60a5fa" />
                    <Bar dataKey="focusTime" name="Focus Time" fill="#10b981" />
                    <Bar dataKey="afterHoursWork" name="After-Hours Work" fill="#a78bfa" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Employee Risk Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Alert</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employeeRiskAlertsData.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell className="font-medium">{alert.employee}</TableCell>
                      <TableCell>{alert.department}</TableCell>
                      <TableCell>{alert.alert}</TableCell>
                      <TableCell className="max-w-xs truncate">{alert.description}</TableCell>
                      <TableCell>
                        <Badge
                          variant={alert.severity === "high" ? "destructive" : "outline"}
                          className={alert.severity === "medium" ? "border-yellow-500 text-yellow-600" : ""}
                        >
                          {alert.severity === "high" ? "High" : "Medium"}
                        </Badge>
                      </TableCell>
                      <TableCell>{alert.timestamp}</TableCell>
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
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StatusBadge({ status }: { status: "at_risk" | "warning" | "good" }) {
  if (status === "at_risk") {
    return <Badge variant="destructive">At Risk</Badge>
  } else if (status === "warning") {
    return (
      <Badge variant="outline" className="border-yellow-500 text-yellow-600">
        Warning
      </Badge>
    )
  } else {
    return (
      <Badge variant="outline" className="border-green-500 text-green-600">
        Good
      </Badge>
    )
  }
}

function SentimentBadge({ sentiment }: { sentiment: "positive" | "negative" | "neutral" }) {
  if (sentiment === "positive") {
    return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Positive</Badge>
  } else if (sentiment === "negative") {
    return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Negative</Badge>
  } else {
    return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Neutral</Badge>
  }
}

function WorkloadBadge({ workload }: { workload: "overloaded" | "balanced" | "underloaded" }) {
  if (workload === "overloaded") {
    return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Overloaded</Badge>
  } else if (workload === "balanced") {
    return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Balanced</Badge>
  } else {
    return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Underloaded</Badge>
  }
}

function RiskLevelBadge({ riskLevel }: { riskLevel: "high" | "medium" | "low" }) {
  if (riskLevel === "high") {
    return <Badge variant="destructive">High</Badge>
  } else if (riskLevel === "medium") {
    return (
      <Badge variant="outline" className="border-yellow-500 text-yellow-600">
        Medium
      </Badge>
    )
  } else {
    return (
      <Badge variant="outline" className="border-green-500 text-green-600">
        Low
      </Badge>
    )
  }
}

