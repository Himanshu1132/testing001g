import type React from "react"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { UserNav } from "@/components/user-nav"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/signin")
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b bg-white px-4">
        <span className="text-xl font-bold text-primary">Glynac</span>
        <div className="flex items-center gap-4">
          <select className="rounded-md border px-2 py-1 text-sm">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
          </select>
          <UserNav user={session.user} />
        </div>
      </header>
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto space-y-4 p-4">{children}</div>
      </main>
    </div>
  )
}

