"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AlertTriangle, FileText, Home, UserCheck, TrendingDown } from "lucide-react"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const routes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Risks",
    icon: AlertTriangle,
    href: "/dashboard/risks",
    color: "text-rose-500",
  },
  {
    label: "Retention",
    icon: UserCheck,
    href: "/dashboard/retention",
    color: "text-green-500",
  },
  {
    label: "Performance",
    icon: TrendingDown,
    href: "/dashboard/performance",
    color: "text-orange-500",
  },
  {
    label: "Documents",
    icon: FileText,
    href: "/dashboard/documents",
    color: "text-violet-500",
  },
]

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden px-0 text-base hover:bg-transparent hover:text-primary">
          <svg strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <SheetHeader>
          <SheetTitle className="text-left">Navigation</SheetTitle>
        </SheetHeader>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
          <div className="flex flex-col space-y-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary ${
                  pathname === route.href ? "bg-secondary" : ""
                }`}
              >
                <route.icon className={`h-4 w-4 ${route.color}`} />
                {route.label}
              </Link>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

