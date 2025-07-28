'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, FileText } from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export function SidebarNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/dashboard',
      label: 'Documents',
      icon: FileText,
    },
    {
      href: '/dashboard/chatbot',
      label: 'Chatbot Settings',
      icon: Bot,
    },
  ];

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href}
            className={cn(
              'w-full justify-start',
              pathname === item.href &&
                'bg-primary/10 text-primary hover:bg-primary/20'
            )}
          >
            <Link href={item.href}>
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
