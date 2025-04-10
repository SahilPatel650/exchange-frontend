'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Settings,
  User,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navItems = [
  {
    title: 'Orders',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Markets',
    href: '/dashboard/markets',
    icon: BarChart3,
  },
  {
    title: 'History',
    href: '/dashboard/history',
    icon: FileText,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">Trading App</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center p-3 rounded-lg text-sm font-medium transition-colors',
                isActive 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full flex items-center justify-start p-3 text-left font-normal">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user?.displayName}</span>
                <span className="text-xs text-gray-500 truncate max-w-[140px]">{user?.email}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
} 