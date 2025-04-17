// This file provides mock data for the application when a real database is not available

export interface User {
  id: string
  name: string
  email: string
  image?: string
  isAdmin: boolean
  department: string
  position: string
}

export interface RiskAlert {
  id: string
  title: string
  description: string
  severity: "high" | "medium" | "low"
  category: string
  timestamp: string
  icon: "harassment" | "burnout" | "file"
  isResolved: boolean
  userId: string
}

export interface RetentionData {
  userId: string
  retentionRisk: number
  meetingLoad: number
  afterHoursWork: number
  complaintsCount: number
  communicationVolume: number
  positiveLanguagePercent: number
}

export interface PerformanceData {
  userId: string
  leadershipComplaints: number
  complaintsCount: number
  communicationVolume: number
  responseTimeAvg: number
  negativeLanguagePercent: number
  overdueTasksCount: number
}

export interface Document {
  id: string
  name: string
  type: string
  creator: string
  lastModified: string
  views: number
  category: string
}

// Mock users
export const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@glynac.com",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    isAdmin: true,
    department: "Administration",
    position: "System Administrator",
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah@glynac.com",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    isAdmin: true,
    department: "HR",
    position: "HR Director",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael@glynac.com",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    isAdmin: true,
    department: "Technology",
    position: "CTO",
  },
  {
    id: "4",
    name: "Sarah Johnson",
    email: "sarahj@glynac.com",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    isAdmin: false,
    department: "Marketing",
    position: "Marketing Manager",
  },
  {
    id: "5",
    name: "David Kim",
    email: "david@glynac.com",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    isAdmin: false,
    department: "Finance",
    position: "Financial Analyst",
  },
]

// Mock risk alerts
export const riskAlerts: RiskAlert[] = [
  {
    id: "1",
    title: "Potential Harassment in Marketing Team",
    description: "Multiple concerning messages detected between employees #1024 and #1036",
    severity: "high",
    category: "harassment",
    timestamp: "Today, 10:45 AM",
    icon: "harassment",
    isResolved: false,
    userId: "4",
  },
  {
    id: "2",
    title: "Burnout Risk for Sarah Johnson",
    description: "Working consistently past 9 PM for the last 14 days",
    severity: "high",
    category: "burnout",
    timestamp: "Yesterday",
    icon: "burnout",
    isResolved: false,
    userId: "4",
  },
  {
    id: "3",
    title: "Unusual File Access Pattern",
    description: "Employee #1089 accessed 47 confidential documents in 1 hour",
    severity: "medium",
    category: "security",
    timestamp: "2 days ago",
    icon: "file",
    isResolved: false,
    userId: "5",
  },
]

// Mock retention data
export const retentionData: RetentionData[] = [
  {
    userId: "4",
    retentionRisk: 75,
    meetingLoad: 32,
    afterHoursWork: 15,
    complaintsCount: 8,
    communicationVolume: 45,
    positiveLanguagePercent: 30,
  },
  {
    userId: "5",
    retentionRisk: 15,
    meetingLoad: 18,
    afterHoursWork: 3,
    complaintsCount: 0,
    communicationVolume: 50,
    positiveLanguagePercent: 80,
  },
]

// Mock performance data
export const performanceData: PerformanceData[] = [
  {
    userId: "4",
    leadershipComplaints: 5,
    complaintsCount: 8,
    communicationVolume: 45,
    responseTimeAvg: 120,
    negativeLanguagePercent: 40,
    overdueTasksCount: 12,
  },
  {
    userId: "5",
    leadershipComplaints: 0,
    complaintsCount: 0,
    communicationVolume: 50,
    responseTimeAvg: 45,
    negativeLanguagePercent: 5,
    overdueTasksCount: 1,
  },
]

// Mock documents
export const documents: Document[] = [
  {
    id: "1",
    name: "Q3_Marketing_Strategy.docx",
    type: "docx",
    creator: "John Doe",
    lastModified: "45 days ago",
    views: 0,
    category: "inactive",
  },
  {
    id: "2",
    name: "Annual_Budget_2024.xlsx",
    type: "xlsx",
    creator: "Finance Team",
    lastModified: "67 days ago",
    views: 0,
    category: "inactive",
  },
  {
    id: "3",
    name: "Employee_Handbook_Draft.docx",
    type: "docx",
    creator: "HR",
    lastModified: "89 days ago",
    views: 2,
    category: "inactive",
  },
]

// Mock data for dashboard
export const mockDashboardData = {
  glynacScore: 73,
  scoreDifference: 5,
  communicationScore: 68,
  workloadScore: 81,
  wellbeingScore: 70,
  riskAlerts,
  communicationSentiment: [
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
  ],
  sentimentSummary: {
    positive: 74,
    neutral: 18,
    negative: 8,
  },
  workloadAnalysis: [
    { department: "Marketing", meetingHours: 28, afterHoursWork: 5 },
    { department: "Engineering", meetingHours: 22, afterHoursWork: 12 },
    { department: "Product", meetingHours: 25, afterHoursWork: 8 },
    { department: "Finance", meetingHours: 24, afterHoursWork: 3 },
    { department: "HR", meetingHours: 20, afterHoursWork: 2 },
    { department: "Sales", meetingHours: 25, afterHoursWork: 6 },
  ],
  workloadSummary: {
    avgMeetingHours: 24.3,
    afterHoursWork: 12,
    avgFocusBlocks: 9,
  },
  inactiveDocuments: documents,
  employeeInsights: users
    .filter((user) => !user.isAdmin)
    .map((user) => {
      const retention = retentionData.find((data) => data.userId === user.id)

      // Determine status based on retention risk
      let status = "good"
      if (retention?.retentionRisk && retention.retentionRisk > 60) {
        status = "at_risk"
      } else if (retention?.retentionRisk && retention.retentionRisk > 30) {
        status = "warning"
      }

      // Determine sentiment based on positive language percentage
      let sentiment = "neutral"
      if (retention?.positiveLanguagePercent && retention.positiveLanguagePercent > 60) {
        sentiment = "positive"
      } else if (retention?.positiveLanguagePercent && retention.positiveLanguagePercent < 40) {
        sentiment = "negative"
      }

      // Determine workload based on meeting load
      let workload = "balanced"
      if (retention?.meetingLoad && retention.meetingLoad > 30) {
        workload = "overloaded"
      } else if (retention?.meetingLoad && retention.meetingLoad < 15) {
        workload = "underloaded"
      }

      // Determine risk level
      let riskLevel = "low"
      if (retention?.retentionRisk && retention.retentionRisk > 60) {
        riskLevel = "high"
      } else if (retention?.retentionRisk && retention.retentionRisk > 30) {
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
    }),
}

