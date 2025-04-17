"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Filter, AlertTriangle } from "lucide-react"
import { ExportMenu } from "@/components/export-menu"

const activeRisks = [
  {
    employee: "Emma Taylor",
    alert: "Password Sharing",
    type: "Security",
    severity: "medium",
    time: "2 days ago",
  },
  {
    employee: "Michael Chen",
    alert: "Overwork Alert",
    type: "Burnout",
    severity: "high",
    time: "2 days ago",
  },
  {
    employee: "David Kim",
    alert: "Calendar Alert",
    type: "Calendar Overload",
    severity: "medium",
    time: "2 days ago",
  },
  {
    employee: "Alex Thompson",
    alert: "Potential Harassment Incident",
    type: "Harassment",
    severity: "high",
    time: "2 days ago",
  },
  {
    employee: "Emily Rodriguez",
    alert: "Complaint from Team Member",
    type: "Complaint",
    severity: "low",
    time: "2 days ago",
  },
]

const securityRisks = [
  { employee: "Alex Thompson", level: "medium" },
  { employee: "Emma Taylor", level: "medium" },
  { employee: "Michael Chen", level: "high" },
  { employee: "John Martinez", level: "high" },
]

const flaggedMessages = [
  {
    from: "John Martinez",
    message: "Back off! I'm sick of your constant criticism. You're a terrible manager!",
  },
  {
    from: "Sarah Johnson",
    message: "The deadline for this project is ridiculous! We need more time.",
  },
]

export default function RisksPage() {
  // Format data for export
  const risksForExport = activeRisks.map((risk) => ({
    Employee: risk.employee,
    Alert: risk.alert,
    Type: risk.type,
    Severity: risk.severity,
    Time: risk.time,
  }))

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Risk Management & Employee Behavior</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <ExportMenu data={risksForExport} filename="risk-management" title="Risk Management & Employee Behavior" />
        </div>
      </div>

      <div className="rounded-lg border bg-white">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold">Active Risk Alerts</h2>
          <Button variant="link" size="sm">
            View All
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Alert</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeRisks.map((risk) => (
              <TableRow key={risk.employee}>
                <TableCell>{risk.employee}</TableCell>
                <TableCell>{risk.alert}</TableCell>
                <TableCell>{risk.type}</TableCell>
                <TableCell>
                  <Badge
                    variant={risk.severity === "high" ? "destructive" : "outline"}
                    className={
                      risk.severity === "medium"
                        ? "border-yellow-500 text-yellow-600"
                        : risk.severity === "low"
                          ? "border-green-500 text-green-600"
                          : ""
                    }
                  >
                    {risk.severity === "high" ? "High" : risk.severity === "medium" ? "Medium" : "Low"}
                  </Badge>
                </TableCell>
                <TableCell>{risk.time}</TableCell>
                <TableCell>
                  <Button variant="link" size="sm">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-white">
          <div className="p-4">
            <h2 className="text-lg font-semibold">Security Risks</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Risk Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {securityRisks.map((risk) => (
                <TableRow key={risk.employee}>
                  <TableCell>{risk.employee}</TableCell>
                  <TableCell>
                    <Badge
                      variant={risk.level === "high" ? "destructive" : "outline"}
                      className={risk.level === "medium" ? "border-yellow-500 text-yellow-600" : ""}
                    >
                      {risk.level === "high" ? "High" : "Medium"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="rounded-lg border bg-white">
          <div className="p-4">
            <h2 className="text-lg font-semibold">Abusive Language & Harassment</h2>
          </div>
          <div className="p-4 space-y-4">
            {flaggedMessages.map((msg, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-start gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5 mt-0.5" />
                  <div>
                    <p className="font-medium">Message from {msg.from}:</p>
                    <p className="text-gray-600">"{msg.message}"</p>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="link" className="text-blue-600">
              View all flagged messages
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

