"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { Filter, Calendar, Clock, Users, Briefcase, Moon, BarChart4, PieChart } from "lucide-react"
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ExportMenu } from "@/components/export-menu"

// Mock data for department workload
const departmentWorkloadData = [
  { department: "Marketing", meetingHours: 28, afterHoursWork: 5, focusTime: 15, overtime: 8 },
  { department: "Engineering", meetingHours: 22, afterHoursWork: 12, focusTime: 20, overtime: 14 },
  { department: "Product", meetingHours: 25, afterHoursWork: 8, focusTime: 18, overtime: 10 },
  { department: "Finance", meetingHours: 24, afterHoursWork: 3, focusTime: 22, overtime: 5 },
  { department: "HR", meetingHours: 20, afterHoursWork: 2, focusTime: 25, overtime: 3 },
  { department: "Sales", meetingHours: 25, afterHoursWork: 6, focusTime: 17, overtime: 9 },
  { department: "Customer Support", meetingHours: 18, afterHoursWork: 4, focusTime: 28, overtime: 6 },
  { department: "Legal", meetingHours: 26, afterHoursWork: 7, focusTime: 16, overtime: 9 },
]

// Mock data for weekly workload
const weeklyWorkloadData = [
  { day: "Monday", meetings: 8, focus: 2, admin: 3 },
  { day: "Tuesday", meetings: 6, focus: 3, admin: 4 },
  { day: "Wednesday", meetings: 9, focus: 1, admin: 2 },
  { day: "Thursday", meetings: 7, focus: 2, admin: 3 },
  { day: "Friday", meetings: 5, focus: 4, admin: 2 },
]

// Mock data for time of day activity
const timeOfDayData = [
  { hour: "6 AM", activity: 5 },
  { hour: "7 AM", activity: 10 },
  { hour: "8 AM", activity: 25 },
  { hour: "9 AM", activity: 60 },
  { hour: "10 AM", activity: 85 },
  { hour: "11 AM", activity: 90 },
  { hour: "12 PM", activity: 70 },
  { hour: "1 PM", activity: 75 },
  { hour: "2 PM", activity: 80 },
  { hour: "3 PM", activity: 75 },
  { hour: "4 PM", activity: 65 },
  { hour: "5 PM", activity: 50 },
  { hour: "6 PM", activity: 30 },
  { hour: "7 PM", activity: 20 },
  { hour: "8 PM", activity: 15 },
  { hour: "9 PM", activity: 10 },
  { hour: "10 PM", activity: 5 },
]

// Mock data for meeting types
const meetingTypesData = [
  { name: "Team Standup", value: 35, color: "#3b82f6" },
  { name: "Project Planning", value: 25, color: "#8b5cf6" },
  { name: "Client Calls", value: 20, color: "#10b981" },
  { name: "1:1 Meetings", value: 15, color: "#f59e0b" },
  { name: "All Hands", value: 5, color: "#ef4444" },
]

// Mock data for work-life balance
const workLifeBalanceData = [
  { name: "Work Hours", value: 40, fullMark: 60 },
  { name: "After Hours", value: 12, fullMark: 60 },
  { name: "Weekend Work", value: 8, fullMark: 60 },
  { name: "Vacation Used", value: 15, fullMark: 60 },
  { name: "Break Time", value: 25, fullMark: 60 },
]

// Mock data for employee workload comparison
const employeeWorkloadData = [
  { name: "Sarah Johnson", meetings: 15, focus: 20, admin: 10, x: 15, y: 20, z: 25 },
  { name: "Michael Chen", meetings: 10, focus: 25, admin: 5, x: 10, y: 25, z: 15 },
  { name: "Emily Rodriguez", meetings: 8, focus: 30, admin: 7, x: 8, y: 30, z: 15 },
  { name: "David Kim", meetings: 12, focus: 22, admin: 6, x: 12, y: 22, z: 18 },
  { name: "Alex Thompson", meetings: 18, focus: 15, admin: 12, x: 18, y: 15, z: 30 },
]

// Mock data for employees with high workload
const highWorkloadEmployees = [
  {
    name: "Sarah Johnson",
    department: "Marketing",
    meetingHours: 32,
    afterHours: 15,
    riskLevel: "high",
  },
  {
    name: "Alex Thompson",
    department: "Sales",
    meetingHours: 28,
    afterHours: 12,
    riskLevel: "high",
  },
  {
    name: "Michael Chen",
    department: "Engineering",
    meetingHours: 26,
    afterHours: 14,
    riskLevel: "medium",
  },
  {
    name: "Jessica Williams",
    department: "Product",
    meetingHours: 25,
    afterHours: 10,
    riskLevel: "medium",
  },
  {
    name: "Robert Garcia",
    department: "Engineering",
    meetingHours: 24,
    afterHours: 8,
    riskLevel: "medium",
  },
]

export default function WorkloadPage() {
  const [timeRange, setTimeRange] = useState("30")
  const [department, setDepartment] = useState("all")

  const { data, isLoading } = useQuery({
    queryKey: ["workload", timeRange, department],
    queryFn: async () => {
      const response = await api.get(`/api/dashboard/workload?timeRange=${timeRange}&department=${department}`)
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
          <h2 className="text-3xl font-bold tracking-tight">Calendar & Workload Analysis</h2>
          <p className="text-muted-foreground">Analyze meeting load, focus time, and work patterns</p>
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
            <ExportMenu
              data={departmentWorkloadData}
              filename="workload-analysis"
              title="Calendar & Workload Analysis"
            />
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
          <TabsTrigger value="worklife">Work-Life Balance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Avg. Meeting Hours</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24.3</div>
                <p className="text-xs text-muted-foreground">hours per week</p>
                <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-1 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Avg. Focus Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18.7</div>
                <p className="text-xs text-muted-foreground">hours per week</p>
                <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-1 rounded-full" style={{ width: "45%" }}></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">After-Hours Work</CardTitle>
                <Moon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12%</div>
                <p className="text-xs text-muted-foreground">of total work time</p>
                <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-1 rounded-full" style={{ width: "12%" }}></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Meeting Efficiency</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <p className="text-xs text-muted-foreground">rated as productive</p>
                <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-1 rounded-full" style={{ width: "68%" }}></div>
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
                  <CardTitle>Department Workload</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
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

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>Weekly Workload Distribution</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyWorkloadData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis label={{ value: "Hours", angle: -90, position: "insideLeft" }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="meetings" name="Meetings" stackId="a" fill="#60a5fa" />
                        <Bar dataKey="focus" name="Focus Time" stackId="a" fill="#10b981" />
                        <Bar dataKey="admin" name="Admin Tasks" stackId="a" fill="#f59e0b" />
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
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>Time of Day Activity</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={timeOfDayData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" />
                        <YAxis label={{ value: "Activity Level (%)", angle: -90, position: "insideLeft" }} />
                        <Tooltip formatter={(value) => [`${value}%`, "Activity"]} />
                        <Line
                          type="monotone"
                          dataKey="activity"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                          activeDot={{ r: 5 }}
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
                  <CardTitle>Meeting Types</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={meetingTypesData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {meetingTypesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, ""]} />
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
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Employees with High Workload</CardTitle>
                <BarChart4 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Meeting Hours</TableHead>
                      <TableHead>After-Hours Work</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {highWorkloadEmployees.map((employee) => (
                      <TableRow key={employee.name}>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.meetingHours} hrs/week</TableCell>
                        <TableCell>{employee.afterHours} hrs/week</TableCell>
                        <TableCell>
                          <Badge
                            variant={employee.riskLevel === "high" ? "destructive" : "outline"}
                            className={employee.riskLevel === "medium" ? "border-yellow-500 text-yellow-600" : ""}
                          >
                            {employee.riskLevel === "high" ? "High" : "Medium"}
                          </Badge>
                        </TableCell>
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
          {/* Department-specific content would go here */}
          <Card>
            <CardHeader>
              <CardTitle>Department Workload Comparison</CardTitle>
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
                    <Bar dataKey="overtime" name="Overtime" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employees" className="space-y-6 mt-6">
          {/* Employee-specific content would go here */}
          <Card>
            <CardHeader>
              <CardTitle>Employee Workload Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" dataKey="meetings" name="Meeting Hours" unit="hrs" />
                    <YAxis type="number" dataKey="focus" name="Focus Time" unit="hrs" />
                    <ZAxis type="number" dataKey="z" range={[60, 400]} name="Total Work" unit="hrs" />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Legend />
                    <Scatter name="Employees" data={employeeWorkloadData} fill="#8884d8" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meetings" className="space-y-6 mt-6">
          {/* Meeting-specific content would go here */}
          <Card>
            <CardHeader>
              <CardTitle>Meeting Types Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={meetingTypesData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {meetingTypesData.map((entry, index) => (
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
        </TabsContent>

        <TabsContent value="worklife" className="space-y-6 mt-6">
          {/* Work-life balance content would go here */}
          <Card>
            <CardHeader>
              <CardTitle>Work-Life Balance Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={workLifeBalanceData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis angle={30} domain={[0, 60]} />
                    <Radar name="Work-Life Balance" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Tooltip formatter={(value) => [`${value} hours`, ""]} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

