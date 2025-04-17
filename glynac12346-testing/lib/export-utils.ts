import { saveAs } from "file-saver"
import jsPDF from "jspdf"
import "jspdf-autotable"

// Type for jsPDF with autotable plugin
interface JsPDFWithAutoTable extends jsPDF {
  autoTable: (options: any) => jsPDF
}

/**
 * Convert data to CSV format and download
 */
export function exportToCSV(data: any[], filename: string) {
  // Convert data to CSV format
  const csvRows: string[] = []

  // Get headers
  const headers = Object.keys(data[0])
  csvRows.push(headers.join(","))

  // Add data rows
  for (const row of data) {
    const values = headers.map((header) => {
      const value = row[header]
      // Handle special characters and commas in values
      const escaped = String(value).replace(/"/g, '""')
      return `"${escaped}"`
    })
    csvRows.push(values.join(","))
  }

  // Create blob and download
  const csvString = csvRows.join("\n")
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" })
  saveAs(blob, `${filename}.csv`)
}

/**
 * Convert data to PDF format and download
 */
export function exportToPDF(data: any[], filename: string, title: string) {
  // Create PDF document
  const doc = new jsPDF() as JsPDFWithAutoTable

  // Add title
  doc.setFontSize(16)
  doc.text(title, 14, 15)

  // Get headers and format data for autoTable
  const headers = Object.keys(data[0])
  const rows = data.map((row) => headers.map((header) => row[header]))

  // Add table
  doc.autoTable({
    head: [headers],
    body: rows,
    startY: 25,
    theme: "grid",
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [66, 139, 202] },
  })

  // Save PDF
  doc.save(`${filename}.pdf`)
}

/**
 * Format risk alerts data for export
 */
export function formatRiskAlertsForExport(alerts: any[]) {
  return alerts.map((alert) => ({
    Title: alert.title,
    Description: alert.description,
    Severity: alert.severity,
    Timestamp: alert.timestamp,
  }))
}

/**
 * Format employee data for export
 */
export function formatEmployeeDataForExport(employees: any[]) {
  return employees.map((employee) => ({
    Name: employee.name,
    Status: employee.status,
    Sentiment: employee.sentiment,
    Workload: employee.workload,
    RiskLevel: employee.riskLevel,
  }))
}

/**
 * Format document data for export
 */
export function formatDocumentDataForExport(documents: any[]) {
  return documents.map((doc) => ({
    Name: doc.name,
    Type: doc.type,
    Creator: doc.creator,
    LastModified: doc.lastModified,
    Views: doc.views,
  }))
}

