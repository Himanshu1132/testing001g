"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Filter } from "lucide-react"
import { api } from "@/lib/axios"
import { GlynacScoreCard } from "@/components/glynac-score-card"
import { RiskAlerts } from "@/components/risk-alerts"
import { CommunicationSentimentChart } from "@/components/charts/communication-sentiment-chart"
import { WorkloadAnalysisChart } from "@/components/charts/workload-analysis-chart"
import { DocumentActivityTable } from "@/components/document-activity-table"
import { EmployeeInsightsTable } from "@/components/employee-insights-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExportMenu } from "@/components/export-menu"
import { formatRiskAlertsForExport, formatEmployeeDataForExport, formatDocumentDataForExport } from "@/lib/export-utils"
import Link from "next/link"

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("30")

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard", timeRange],
    queryFn: async () => {
      const response = await api.get(`/api/dashboard?timeRange=${timeRange}`)
      return response.data
    },
  })

  if (isLoading) {
    return <DashboardSkeleton />
  }

  // Format data for export
  const riskAlertsData = formatRiskAlertsForExport(data?.riskAlerts || [])
  const employeeData = formatEmployeeDataForExport(data?.employeeInsights || [])
  const documentData = formatDocumentDataForExport(data?.inactiveDocuments || [])

  return (
    <div className="space-y-6">
      {/* Top Row */}
      <div className="grid gap-6 md:grid-cols-3">
        <GlynacScoreCard
          score={data?.glynacScore || 73}
          difference={data?.scoreDifference || 5}
          communicationScore={data?.communicationScore || 68}
          workloadScore={data?.workloadScore || 81}
          wellbeingScore={data?.wellbeingScore || 70}
        />
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Link href="/dashboard/risks" className="hover:text-primary">
                <CardTitle className="cursor-pointer">Risk Alerts</CardTitle>
              </Link>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Filter className="mr-1 h-4 w-4" />
                  Filter
                </Button>
                <ExportMenu data={riskAlertsData} filename="risk-alerts" title="Risk Alerts" />
              </div>
            </CardHeader>
            <CardContent>
              <RiskAlerts alerts={data?.riskAlerts || []} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Middle Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <Link href="/dashboard/communication" className="hover:text-primary">
              <CardTitle className="cursor-pointer">Communication Sentiment</CardTitle>
            </Link>
            <div className="flex items-center gap-2">
              <Select value="all" onValueChange={() => {}}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                </SelectContent>
              </Select>
              <ExportMenu
                data={data?.communicationSentiment || []}
                filename="communication-sentiment"
                title="Communication Sentiment"
              />
            </div>
          </CardHeader>
          <CardContent>
            <CommunicationSentimentChart data={data?.communicationSentiment || []} />
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="rounded-lg bg-blue-50 p-3 text-center">
                <div className="text-2xl font-bold text-blue-600">74%</div>
                <div className="text-sm text-blue-700">Positive Tone</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3 text-center">
                <div className="text-2xl font-bold text-gray-600">18%</div>
                <div className="text-sm text-gray-700">Neutral Tone</div>
              </div>
              <div className="rounded-lg bg-red-50 p-3 text-center">
                <div className="text-2xl font-bold text-red-600">8%</div>
                <div className="text-sm text-red-700">Negative Tone</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <Link href="/dashboard/workload" className="hover:text-primary">
              <CardTitle className="cursor-pointer">Calendar & Workload Analysis</CardTitle>
            </Link>
            <div className="flex items-center gap-2">
              <Select value="all" onValueChange={() => {}}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teams</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                </SelectContent>
              </Select>
              <ExportMenu data={data?.workloadAnalysis || []} filename="workload-analysis" title="Workload Analysis" />
            </div>
          </CardHeader>
          <CardContent>
            <WorkloadAnalysisChart data={data?.workloadAnalysis || []} />
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="rounded-lg bg-blue-50 p-3 text-center">
                <div className="text-2xl font-bold text-blue-600">24.3</div>
                <div className="text-sm text-blue-700">Avg Meeting Hours/Week</div>
              </div>
              <div className="rounded-lg bg-purple-50 p-3 text-center">
                <div className="text-2xl font-bold text-purple-600">12%</div>
                <div className="text-sm text-purple-700">After-Hours Work</div>
              </div>
              <div className="rounded-lg bg-green-50 p-3 text-center">
                <div className="text-2xl font-bold text-green-600">9</div>
                <div className="text-sm text-green-700">Avg Focus Blocks/Week</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <Link href="/dashboard/documents" className="hover:text-primary">
              <CardTitle className="cursor-pointer">Document & File Activity</CardTitle>
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Filter className="mr-1 h-4 w-4" />
                Filter
              </Button>
              <ExportMenu data={documentData} filename="document-activity" title="Document Activity" />
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="inactive">
              <TabsList>
                <TabsTrigger value="inactive">Inactive Files</TabsTrigger>
                <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
                <TabsTrigger value="access">Access Patterns</TabsTrigger>
              </TabsList>
              <TabsContent value="inactive">
                <DocumentActivityTable documents={data?.inactiveDocuments || []} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <Link href="/dashboard/employees" className="hover:text-primary">
              <CardTitle className="cursor-pointer">Employee Insights</CardTitle>
            </Link>
            <div className="flex items-center gap-2">
              <Select value="all" onValueChange={() => {}}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                </SelectContent>
              </Select>
              <ExportMenu data={employeeData} filename="employee-insights" title="Employee Insights" />
            </div>
          </CardHeader>
          <CardContent>
            <EmployeeInsightsTable employees={data?.employeeInsights || []} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="h-[300px] animate-pulse rounded-lg bg-gray-200" />
        <div className="md:col-span-2 h-[300px] animate-pulse rounded-lg bg-gray-200" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="h-[400px] animate-pulse rounded-lg bg-gray-200" />
        <div className="h-[400px] animate-pulse rounded-lg bg-gray-200" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="h-[300px] animate-pulse rounded-lg bg-gray-200" />
        <div className="h-[300px] animate-pulse rounded-lg bg-gray-200" />
      </div>
    </div>
  )
}

