"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Employee {
  id: string
  name: string
  status: "at_risk" | "warning" | "good"
  sentiment: "positive" | "negative" | "neutral"
  workload: "overloaded" | "balanced" | "underloaded"
  riskLevel: "high" | "medium" | "low"
}

interface EmployeeInsightsTableProps {
  employees: Employee[]
  showTitle?: boolean
}

export function EmployeeInsightsTable({ employees, showTitle = true }: EmployeeInsightsTableProps) {
  const [sortColumn, setSortColumn] = useState<keyof Employee>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (column: keyof Employee) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedEmployees = [...(employees || [])].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortColumn] > b[sortColumn] ? 1 : -1
    } else {
      return a[sortColumn] < b[sortColumn] ? 1 : -1
    }
  })

  // If no data is provided, use sample data
  const displayEmployees =
    sortedEmployees.length > 0
      ? sortedEmployees
      : ([
          {
            id: "1",
            name: "Sarah Johnson",
            status: "at_risk",
            sentiment: "negative",
            workload: "overloaded",
            riskLevel: "high",
          },
          {
            id: "2",
            name: "Michael Chen",
            status: "warning",
            sentiment: "neutral",
            workload: "balanced",
            riskLevel: "medium",
          },
          {
            id: "3",
            name: "Emily Rodriguez",
            status: "good",
            sentiment: "positive",
            workload: "balanced",
            riskLevel: "low",
          },
          {
            id: "4",
            name: "David Kim",
            status: "good",
            sentiment: "positive",
            workload: "underloaded",
            riskLevel: "low",
          },
          {
            id: "5",
            name: "Alex Thompson",
            status: "warning",
            sentiment: "neutral",
            workload: "overloaded",
            riskLevel: "medium",
          },
        ] as Employee[])

  return (
    <div>
      <ScrollArea className="h-[300px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer hover:text-primary" onClick={() => handleSort("name")}>
                Employee
                {sortColumn === "name" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
              </TableHead>
              <TableHead className="cursor-pointer hover:text-primary" onClick={() => handleSort("status")}>
                Status
                {sortColumn === "status" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
              </TableHead>
              <TableHead className="cursor-pointer hover:text-primary" onClick={() => handleSort("sentiment")}>
                Sentiment
                {sortColumn === "sentiment" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
              </TableHead>
              <TableHead className="cursor-pointer hover:text-primary" onClick={() => handleSort("workload")}>
                Workload
                {sortColumn === "workload" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
              </TableHead>
              <TableHead className="cursor-pointer hover:text-primary" onClick={() => handleSort("riskLevel")}>
                Risk Level
                {sortColumn === "riskLevel" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  <Link
                    href={`/dashboard/employees/${employee.id}`}
                    className="flex items-center hover:text-primary hover:underline"
                  >
                    {employee.name}
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Link>
                </TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
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

