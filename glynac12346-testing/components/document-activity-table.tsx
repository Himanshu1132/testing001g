"use client"
import { FileText, FileSpreadsheet, FileCode, ChevronUp, ChevronDown } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Document {
  id: string
  name: string
  type: string
  creator: string
  lastModified: string
  views: number
}

interface DocumentActivityTableProps {
  documents: Document[]
  showTitle?: boolean
}

export function DocumentActivityTable({ documents, showTitle = true }: DocumentActivityTableProps) {
  // If no data is provided, use sample data
  const displayDocuments =
    documents && documents.length > 0
      ? documents
      : [
          {
            id: "1",
            name: "Q3_Marketing_Strategy.docx",
            type: "docx",
            creator: "John Doe",
            lastModified: "45 days ago",
            views: 0,
          },
          {
            id: "2",
            name: "Annual_Budget_2024.xlsx",
            type: "xlsx",
            creator: "Finance Team",
            lastModified: "67 days ago",
            views: 0,
          },
          {
            id: "3",
            name: "Employee_Handbook_Draft.docx",
            type: "docx",
            creator: "HR",
            lastModified: "89 days ago",
            views: 2,
          },
        ]

  return (
    <div>
      <ScrollArea className="h-[300px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead>Document</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead className="text-right">Views in last 30 days</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayDocuments.map((document) => (
              <TableRow key={document.id} className="group">
                <TableCell>{getDocumentIcon(document.type)}</TableCell>
                <TableCell className="font-medium">{document.name}</TableCell>
                <TableCell>{document.creator}</TableCell>
                <TableCell>{document.lastModified}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    {document.views}
                    {document.id === "1" && <ChevronUp className="ml-1 h-4 w-4 text-gray-400" />}
                    {document.id === "2" && <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  )
}

function getDocumentIcon(type: string) {
  switch (type) {
    case "xlsx":
      return <FileSpreadsheet className="h-5 w-5 text-green-600" />
    case "docx":
      return <FileText className="h-5 w-5 text-blue-600" />
    case "code":
      return <FileCode className="h-5 w-5 text-purple-600" />
    default:
      return <FileText className="h-5 w-5 text-gray-600" />
  }
}

