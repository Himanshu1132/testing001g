"\"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const navigationItems = [
  {
    title: "Risks",
    href: "/dashboard/risks",
  },
  {
    title: "Retention",
    href: "/dashboard/retention",
  },
  {
    title: "Performance",
    href: "/dashboard/performance",
  },
  {
    title: "Employees",
    href: "/dashboard/employees",
  },
  {
    title: "Documents",
    href: "/dashboard/documents",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navigationItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle({
                  active: pathname === item.href,
                })}
              >
                {item.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

