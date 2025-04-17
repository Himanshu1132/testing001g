"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import {
  Download,
  Filter,
  FileText,
  FileSpreadsheet,
  FileCode,
  FileIcon as FilePdf,
  FileImage,
  ChevronUp,
  ChevronDown,
  Clock,
  Eye,
  Calendar,
  Search,
  BarChart4,
  PieChart,
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
} from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for document types
const documentTypesData = [
  { name: "Word Documents", value: 35, color: "#3b82f6", icon: FileText },
  { name: "Spreadsheets", value: 25, color: "#10b981", icon: FileSpreadsheet },
  { name: "PDFs", value: 20, color: "#ef4444", icon: FilePdf },
  { name: "Code Files", value: 15, color: "#8b5cf6", icon: FileCode },
  { name: "Images", value: 5, color: "#f59e0b", icon: FileImage },
]

// Mock data for document activity over time
const documentActivityData = [
  { month: "Jan", created: 45, accessed: 120, modified: 30 },
  { month: "Feb", created: 50, accessed: 130, modified: 35 },
  { month: "Mar", created: 60, accessed: 140, modified: 40 },
  { month: "Apr", created: 70, accessed: 150, modified: 45 },
  { month: "May", created: 65, accessed: 160, modified: 50 },
  { month: "Jun", created: 80, accessed: 170, modified: 55 },
  { month: "Jul", created: 90, accessed: 180, modified: 60 },
  { month: "Aug", created: 85, accessed: 190, modified: 65 },
  { month: "Sep", created: 95, accessed: 200, modified: 70 },
  { month: "Oct", created: 100, accessed: 210, modified: 75 },
]

// Mock data for inactive documents
const inactiveDocumentsData = [
  {
    id: "1",
    name: "Q3_Marketing_Strategy.docx",
    type: "docx",
    creator: "John Doe",
    lastModified: "45 days ago",
    views: 0,
    size: "2.5 MB",
  },
  {
    id: "2",
    name: "Annual_Budget_2024.xlsx",
    type: "xlsx",
    creator: "Finance Team",
    lastModified: "67 days ago",
    views: 0,
    size: "4.2 MB",
  },
  {
    id: "3",
    name: "Employee_Handbook_Draft.docx",
    type: "docx",
    creator: "HR",
    lastModified: "89 days ago",
    views: 2,
    size: "3.7 MB",
  },
  {
    id: "4",
    name: "Product_Roadmap_2023.pptx",
    type: "pptx",
    creator: "Product Team",
    lastModified: "120 days ago",
    views: 5,
    size: "8.1 MB",
  },
  {
    id: "5",
    name: "Company_Logo_Guidelines.pdf",
    type: "pdf",
    creator: "Design Team",
    lastModified: "150 days ago",
    views: 3,
    size: "5.3 MB",
  },
  {
    id: "6",
    name: "Sales_Targets_Q2.xlsx",
    type: "xlsx",
    creator: "Sales Team",
    lastModified: "180 days ago",
    views: 1,
    size: "1.8 MB",
  },
  {
    id: "7",
    name: "API_Documentation.md",
    type: "code",
    creator: "Engineering",
    lastModified: "200 days ago",
    views: 0,
    size: "0.5 MB",
  },
]

// Mock data for most accessed documents
const mostAccessedDocumentsData = [
  {
    id: "1",
    name: "Company_Policies_2024.pdf",
    type: "pdf",
    creator: "HR",
    lastModified: "5 days ago",
    views: 245,
    size: "3.2 MB",
  },
  {
    id: "2",
    name: "Q4_Sales_Report.xlsx",
    type: "xlsx",
    creator: "Sales Team",
    lastModified: "2 days ago",
    views: 187,
    size: "5.6 MB",
  },
  {
    id: "3",
    name: "Product_Launch_Presentation.pptx",
    type: "pptx",
    creator: "Marketing",
    lastModified: "1 day ago",
    views: 156,
    size: "12.4 MB",
  },
  {
    id: "4",
    name: "Engineering_Standards.docx",
    type: "docx",
    creator: "Engineering",
    lastModified: "3 days ago",
    views: 134,
    size: "2.8 MB",
  },
  {
    id: "5",
    name: "Customer_Feedback_Summary.xlsx",
    type: "xlsx",
    creator: "Customer Support",
    lastModified: "4 days ago",
    views: 112,
    size: "3.5 MB",
  },
]

// Mock data for document access by department
const documentAccessByDepartmentData = [
  { department: "Marketing", count: 450 },
  { department: "Engineering", count: 380 },
  { department: "Product", count: 320 },
  { department: "Finance", count: 280 },
  { department: "HR", count: 250 },
  { department: "Sales", count: 420 },
  { department: "Customer Support", count: 300 },
  { department: "Legal", count: 180 },
]

// Mock data for document storage usage
const documentStorageUsageData = [
  { name: "Marketing", value: 25, color: "#3b82f6" },
  { name: "Engineering", value: 30, color: "#8b5cf6" },
  { name: "Product", value: 15, color: "#10b981" },
  { name: "Finance", value: 10, color: "#f59e0b" },
  { name: "HR", value: 5, color: "#ef4444" },
  { name: "Sales", value: 10, color: "#ec4899" },
  { name: "Other", value: 5, color: "#94a3b8" },
]

// Mock data for users with unusual access patterns
const unusualAccessPatternsData = [
  {
    name: "David Kim",
    department: "Finance",
    documentsAccessed: 47,
    timeFrame: "1 hour",
    riskLevel: "high",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    name: "Sarah Johnson",
    department: "Marketing",
    documentsAccessed: 35,
    timeFrame: "2 hours",
    riskLevel: "medium",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "Michael Chen",
    department: "Engineering",
    documentsAccessed: 28,
    timeFrame: "3 hours",
    riskLevel: "medium",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    name: "Emily Rodriguez",
    department: "Product",
    documentsAccessed: 22,
    timeFrame: "4 hours",
    riskLevel: "low",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    name: "Alex Thompson",
    department: "Sales",
    documentsAccessed: 18,
    timeFrame: "5 hours",
    riskLevel: "low",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
]

export default function DocumentsPage() {
  const [timeRange, setTimeRange] = useState("30")
  const [documentType, setDocumentType] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const { data, isLoading } = useQuery({
    queryKey: ["documents", timeRange, documentType],
    queryFn: async () => {
      const response = await api.get(`/api/dashboard/documents?timeRange=${timeRange}&type=${documentType}`)
      return response.data
    },
  })

  const filteredInactiveDocuments = inactiveDocumentsData.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()),
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
          <h2 className="text-3xl font-bold tracking-tight">Document & File Activity</h2>
          <p className="text-muted-foreground">Analyze document usage, access patterns, and storage</p>
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
          <Select value={documentType} onValueChange={setDocumentType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Document type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="docx">Word Documents</SelectItem>
              <SelectItem value="xlsx">Spreadsheets</SelectItem>
              <SelectItem value="pdf">PDFs</SelectItem>
              <SelectItem value="code">Code Files</SelectItem>
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
          <TabsTrigger value="inactive">Inactive Files</TabsTrigger>
          <TabsTrigger value="popular">Most Accessed</TabsTrigger>
          <TabsTrigger value="departments">By Department</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,547</div>
                <p className="text-xs text-muted-foreground">+156 from last month</p>
                <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-1 rounded-full" style={{ width: "75%" }}></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">458 GB</div>
                <p className="text-xs text-muted-foreground">+24 GB from last month</p>
                <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-1 rounded-full" style={{ width: "65%" }}></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Inactive Files</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">342</div>
                <p className="text-xs text-muted-foreground">13% of total files</p>
                <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-1 rounded-full" style={{ width: "13%" }}></div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Access Alerts</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">+3 from last month</p>
                <div className="mt-4 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-1 rounded-full" style={{ width: "40%" }}></div>
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
                  <CardTitle>Document Types</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={documentTypesData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {documentTypesData.map((entry, index) => (
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
                  <CardTitle>Document Activity</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={documentActivityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="created"
                          name="Created"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="accessed"
                          name="Accessed"
                          stroke="#10b981"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="modified"
                          name="Modified"
                          stroke="#f59e0b"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                        />
                      </LineChart>
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
                <CardTitle>Storage Usage by Department</CardTitle>
                <BarChart4 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={documentStorageUsageData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {documentStorageUsageData.map((entry, index) => (
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
        </TabsContent>

        <TabsContent value="inactive" className="space-y-6 mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Inactive Documents</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
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
                    <TableHead className="w-[40px]"></TableHead>
                    <TableHead>Document</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead className="text-right">Views</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInactiveDocuments.map((document) => (
                    <TableRow key={document.id} className="group">
                      <TableCell>{getDocumentIcon(document.type)}</TableCell>
                      <TableCell className="font-medium">{document.name}</TableCell>
                      <TableCell>{document.creator}</TableCell>
                      <TableCell>{document.lastModified}</TableCell>
                      <TableCell>{document.size}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          {document.views}
                          {document.id === "1" && <ChevronUp className="ml-1 h-4 w-4 text-gray-400" />}
                          {document.id === "2" && <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="link" size="sm">
                          Archive
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="popular" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Most Accessed Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]"></TableHead>
                    <TableHead>Document</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead className="text-right">Views</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mostAccessedDocumentsData.map((document) => (
                    <TableRow key={document.id} className="group">
                      <TableCell>{getDocumentIcon(document.type)}</TableCell>
                      <TableCell className="font-medium">{document.name}</TableCell>
                      <TableCell>{document.creator}</TableCell>
                      <TableCell>{document.lastModified}</TableCell>
                      <TableCell>{document.size}</TableCell>
                      <TableCell className="text-right">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{document.views}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="link" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Access by Department</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={documentAccessByDepartmentData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="department" type="category" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Documents Accessed" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Unusual Access Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Documents Accessed</TableHead>
                    <TableHead>Time Frame</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {unusualAccessPatternsData.map((user) => (
                    <TableRow key={user.name} className="group">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage src={user.image} alt={user.name} />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>{user.documentsAccessed}</TableCell>
                      <TableCell>{user.timeFrame}</TableCell>
                      <TableCell>
                        <Badge
                          variant={user.riskLevel === "high" ? "destructive" : "outline"}
                          className={
                            user.riskLevel === "medium"
                              ? "border-yellow-500 text-yellow-600"
                              : user.riskLevel === "low"
                                ? "border-green-500 text-green-600"
                                : ""
                          }
                        >
                          {user.riskLevel === "high" ? "High" : user.riskLevel === "medium" ? "Medium" : "Low"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="link" size="sm">
                          Investigate
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

function getDocumentIcon(type: string) {
  switch (type) {
    case "xlsx":
      return <FileSpreadsheet className="h-5 w-5 text-green-600" />
    case "docx":
      return <FileText className="h-5 w-5 text-blue-600" />
    case "pdf":
      return <FilePdf className="h-5 w-5 text-red-600" />
    case "pptx":
      return <FileText className="h-5 w-5 text-orange-600" />
    case "code":
      return <FileCode className="h-5 w-5 text-purple-600" />
    default:
      return <FileText className="h-5 w-5 text-gray-600" />
  }
}

