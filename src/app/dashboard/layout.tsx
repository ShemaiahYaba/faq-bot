import React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Bot } from 'lucide-react';
import { SidebarNav } from '@/components/sidebar-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar collapsible="icon" className="border-r">
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2">
              <Bot className="w-8 h-8 text-primary" />
              <h1 className="text-xl font-semibold font-headline text-primary">
                FAQ Bot
              </h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarNav />
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <main className="flex-1">
            <div className="p-4 sm:p-6 md:p-8">{children}</div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
