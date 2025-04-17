"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Info } from "lucide-react"

export function DevLoginHelper() {
  const [showCredentials, setShowCredentials] = useState(true) // Default to showing credentials

  return (
    <div className="mt-6">
      <Button
        variant="outline"
        size="sm"
        className="w-full text-sm"
        onClick={() => setShowCredentials(!showCredentials)}
      >
        <Info className="h-4 w-4 mr-2" />
        {showCredentials ? "Hide Demo Credentials" : "Show Demo Credentials"}
      </Button>

      {showCredentials && (
        <Card className="mt-2 p-3 bg-blue-50 border-blue-200">
          <h3 className="font-medium text-blue-800 mb-2">Demo Admin Accounts:</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center p-2 bg-white rounded border border-blue-100">
              <div>
                <div className="font-medium">Admin User</div>
                <div className="text-gray-500">admin@glynac.com</div>
              </div>
              <div className="text-blue-600 font-mono">admin123</div>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded border border-blue-100">
              <div>
                <div className="font-medium">Sarah Williams</div>
                <div className="text-gray-500">sarah@glynac.com</div>
              </div>
              <div className="text-blue-600 font-mono">admin123</div>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded border border-blue-100">
              <div>
                <div className="font-medium">Michael Chen</div>
                <div className="text-gray-500">michael@glynac.com</div>
              </div>
              <div className="text-blue-600 font-mono">admin123</div>
            </div>
          </div>
          <p className="mt-2 text-xs text-blue-600">Use any of these accounts to log in to the demo</p>
        </Card>
      )}
    </div>
  )
}

