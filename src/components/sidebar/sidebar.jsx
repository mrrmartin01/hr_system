'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Users, 
  Briefcase, 
  Calendar, 
  FileText, 
  BarChart, 
  Settings, 
  LogOut,
  UserPlus,
  GraduationCap,
  ClipboardList,
} from 'lucide-react'

const navItems = [
  { 
    name: 'Employees', 
    href: '/employees', 
    icon: Users,
    subItems: [
      { name: 'All Employees', href: '/employees' },
      { name: 'Add Employee', href: '/employees/add', icon: UserPlus },
    ]
  },
  { name: 'Jobs', href: '/jobs', icon: Briefcase },
  { name: 'Schedule', href: '/schedule', icon: Calendar },
  { name: 'Payroll', href: '/payroll', icon: FileText },
  { 
    name: 'Performance', 
    href: '/performance', 
    icon: BarChart,
    subItems: [
      { name: 'Reviews', href: '/performance/reviews' },
      { name: 'Goals', href: '/performance/goals' },
    ]
  },
  { 
    name: 'Training', 
    href: '/training', 
    icon: GraduationCap,
    subItems: [
      { name: 'Courses', href: '/training/courses' },
      { name: 'Certifications', href: '/training/certifications' },
    ]
  },
  { name: 'Reports', href: '/reports', icon: ClipboardList },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function HRSidebar() {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b p-4">
          <Link href="/" className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="/logo.png" alt="HR System Logo" />
              <AvatarFallback>HR</AvatarFallback>
            </Avatar>
            <span className="text-lg font-bold">HR System</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href || pathname.startsWith(`${item.href}/`)}
                    tooltip={item.name}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.subItems && (
                    <SidebarMenuSub>
                      {item.subItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.href}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === subItem.href}
                          >
                            <Link href={subItem.href}>
                              {subItem.icon && <subItem.icon className="h-4 w-4" />}
                              <span>{subItem.name}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </ScrollArea>
        </SidebarContent>
        <SidebarFooter className="border-t p-4">
          <Button variant="outline" className="w-full justify-start" asChild>
            <Link href="/logout" className="flex items-center space-x-2">
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </Link>
          </Button>
        </SidebarFooter>
        <SidebarTrigger />
      </Sidebar>
    </SidebarProvider>
  )
}