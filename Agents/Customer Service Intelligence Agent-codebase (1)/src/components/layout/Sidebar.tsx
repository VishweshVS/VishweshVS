import React, { memo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Ticket,
  BarChart3,
  Lightbulb,
  AlertTriangle,
  MessageSquare,
  Settings,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { User } from '@/types';

interface SidebarProps {
  user: User | null;
  collapsed: boolean;
}

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
    roles: ['csr', 'manager'],
  },
  {
    name: 'Tickets',
    href: '/tickets',
    icon: Ticket,
    roles: ['csr', 'manager'],
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    roles: ['manager'],
  },
  {
    name: 'Recommendations',
    href: '/recommendations',
    icon: Lightbulb,
    roles: ['manager'],
  },
  {
    name: 'Alerts',
    href: '/alerts',
    icon: AlertTriangle,
    roles: ['csr', 'manager'],
  },
  {
    name: 'Feedback',
    href: '/feedback',
    icon: MessageSquare,
    roles: ['csr', 'manager'],
  },
  {
    name: 'Users',
    href: '/users',
    icon: Users,
    roles: ['manager'],
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['csr', 'manager'],
  },
];

export const Sidebar = memo<SidebarProps>(({ user, collapsed }) => {
  const location = useLocation();
  
  const filteredItems = navigationItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <div className={cn(
      'bg-white border-r border-gray-200 transition-all duration-300',
      collapsed ? 'w-16' : 'w-64'
    )}>
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                CS Intelligence
              </h1>
              <p className="text-xs text-gray-500">Agent Dashboard</p>
            </div>
          )}
        </div>
      </div>

      <nav className="px-4 pb-4">
        <ul className="space-y-2">
          {filteredItems.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== '/' && location.pathname.startsWith(item.href));
            
            return (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={({ isActive: active }) =>
                    cn(
                      'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                      active || isActive
                        ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      collapsed ? 'justify-center' : ''
                    )
                  }
                  title={collapsed ? item.name : undefined}
                >
                  <item.icon className={cn(
                    'flex-shrink-0',
                    collapsed ? 'h-5 w-5' : 'h-5 w-5 mr-3'
                  )} />
                  {!collapsed && item.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {!collapsed && user && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user.role}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

Sidebar.displayName = 'Sidebar';