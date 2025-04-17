"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertTriangle, Flame, FileWarning } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface RiskAlert {
  id: string
  title: string
  description: string
  severity: "high" | "medium" | "low"
  timestamp: string
  icon: "harassment" | "burnout" | "file"
}

interface RiskAlertsProps {
  alerts: RiskAlert[]
}

export function RiskAlerts({ alerts }: RiskAlertsProps) {
  const displayAlerts =
    alerts.length > 0
      ? alerts
      : [
          {
            id: "1",
            title: "Potential Harassment in Marketing Team",
            description: "Multiple concerning messages detected between employees #1024 and #1036",
            severity: "high",
            timestamp: "Today, 10:45 AM",
            icon: "harassment",
          },
          {
            id: "2",
            title: "Burnout Risk for Sarah Johnson",
            description: "Working consistently past 9 PM for the last 14 days",
            severity: "high",
            timestamp: "Yesterday",
            icon: "burnout",
          },
          {
            id: "3",
            title: "Unusual File Access Pattern",
            description: "Employee #1089 accessed 47 confidential documents in 1 hour",
            severity: "medium",
            timestamp: "2 days ago",
            icon: "file",
          },
        ]

  const [selectedAlert, setSelectedAlert] = useState<RiskAlert | null>(null)

  return (
    <>
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-4">
          {displayAlerts.map((alert) => (
            <Link key={alert.id} href="/dashboard/risks">
              <div
                className={`flex items-start gap-4 rounded-md border-l-4 bg-white p-4 hover:bg-gray-50 cursor-pointer
                ${alert.severity === "high" ? "border-l-red-500" : "border-l-yellow-500"}`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full 
                ${alert.severity === "high" ? "bg-red-100" : "bg-yellow-100"}`}
                >
                  {alert.icon === "harassment" && <AlertTriangle className="h-5 w-5 text-red-600" />}
                  {alert.icon === "burnout" && <Flame className="h-5 w-5 text-red-600" />}
                  {alert.icon === "file" && <FileWarning className="h-5 w-5 text-yellow-600" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{alert.title}</h3>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                      <Badge
                        variant={alert.severity === "high" ? "destructive" : "outline"}
                        className={alert.severity === "medium" ? "border-yellow-500 text-yellow-600" : ""}
                      >
                        {alert.severity === "high" ? "High Risk" : "Medium Risk"}
                      </Badge>
                    </div>
                  </div>
                  {alert.severity === "high" && (
                    <Button variant="outline" size="sm" className="mt-2">
                      View Details
                    </Button>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </ScrollArea>

      <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedAlert?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg bg-gray-50 p-4">
              <h4 className="font-semibold mb-2">Risk Details</h4>
              <p>{selectedAlert?.description}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-4">
                <h4 className="font-semibold mb-2">Severity</h4>
                <Badge
                  variant={selectedAlert?.severity === "high" ? "destructive" : "outline"}
                  className={selectedAlert?.severity === "medium" ? "border-yellow-500 text-yellow-600" : ""}
                >
                  {selectedAlert?.severity === "high" ? "High Risk" : "Medium Risk"}
                </Badge>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <h4 className="font-semibold mb-2">Reported</h4>
                <p className="text-sm text-muted-foreground">{selectedAlert?.timestamp}</p>
              </div>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <h4 className="font-semibold mb-2">Recommended Actions</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Immediate investigation required</li>
                <li>Schedule meeting with HR</li>
                <li>Document all findings</li>
                <li>Prepare intervention plan</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

