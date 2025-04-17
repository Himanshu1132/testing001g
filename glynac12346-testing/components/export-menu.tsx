"use client"

import { Download, FileText, FileSpreadsheet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { exportToCSV, exportToPDF } from "@/lib/export-utils"

interface ExportMenuProps {
  data: any[]
  filename: string
  title: string
}

export function ExportMenu({ data, filename, title }: ExportMenuProps) {
  const handleExportCSV = () => {
    exportToCSV(data, filename)
  }

  const handleExportPDF = () => {
    exportToPDF(data, filename, title)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Download className="mr-1 h-4 w-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleExportCSV}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          <span>Export as CSV</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportPDF}>
          <FileText className="mr-2 h-4 w-4" />
          <span>Export as PDF</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

