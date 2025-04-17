"use client"

import { AlertTriangle, Flame, FileWarning, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface RiskAlert {
  id: string
  title: string
  description: string
  severity: "high" | "medium" | "low"
  timestamp: string
  icon: "harassment" | "burnout" | "file"
}

interface RiskAlertsListProps {
  alerts: RiskAlert[]
}

export function RiskAlertsList({ alerts }: RiskAlertsListProps) {
  // If no data is provided, use sample data
  const displayAlerts =
    alerts && alerts.length > 0
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

  return (
    <div className="space-y-2">
      {displayAlerts.map((alert) => (
        <div key={alert.id} className="flex items-start gap-4 rounded-md border-l-4 border-l-red-500 bg-white p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
            {getAlertIcon(alert.icon)}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{alert.title}</h3>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                <RiskBadge severity={alert.severity} />
              </div>
            </div>
            <div className="mt-2">
              <Button variant="outline" size="sm">
                View Details
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function getAlertIcon(icon: string) {
  switch (icon) {
    case "harassment":
      return <AlertTriangle className="h-5 w-5 text-red-600" />
    case "burnout":
      return <Flame className="h-5 w-5 text-red-600" />
    case "file":
      return <FileWarning className="h-5 w-5 text-yellow-600" />
    default:
      return <AlertTriangle className="h-5 w-5 text-red-600" />
  }
}

function RiskBadge({ severity }: { severity: "high" | "medium" | "low" }) {
  if (severity === "high") {
    return <Badge variant="destructive">High Risk</Badge>
  } else if (severity === "medium") {
    return (
      <Badge variant="outline" className="border-yellow-500 text-yellow-600">
        Medium Risk
      </Badge>
    )
  } else {
    return (
      <Badge variant="outline" className="border-green-500 text-green-600">
        Low Risk
      </Badge>
    )
  }
}

