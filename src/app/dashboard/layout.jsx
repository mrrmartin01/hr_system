import React from 'react'
import { SidebarInset } from "@/components/ui/sidebar"
import HRSidebar from '@/components/sidebar/sidebar'

export default function Layout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <HRSidebar />
      <SidebarInset>
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </SidebarInset>
    </div>
  )
}