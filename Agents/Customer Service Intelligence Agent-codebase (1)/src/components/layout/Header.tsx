import React, { memo, useState } from 'react';
import { Bell, Search, Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useQuery } from '@tanstack/react-query';
import { alertsApi } from '@/services/api';
import type { User as UserType } from '@/types';

interface HeaderProps {
  user: UserType | null;
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export const Header = memo<HeaderProps>(({ 
  user, 
  sidebarCollapsed, 
  onToggleSidebar 
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const { data: unacknowledgedAlerts = [] } = useQuery({
    queryKey: ['alerts', { acknowledged: false }],
    queryFn: () => alertsApi.getAlerts(false),
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="p-2"
        >
          {sidebarCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </Button>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tickets, customers..."
            className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          className="relative p-2"
        >
          <Bell className="h-5 w-5" />
          {unacknowledgedAlerts.length > 0 && (
            <Badge 
              variant="danger" 
              size="sm" 
              className="absolute -top-1 -right-1 min-w-5 h-5 flex items-center justify-center p-0 text-xs"
            >
              {unacknowledgedAlerts.length}
            </Badge>
          )}
        </Button>

        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 p-2"
          >
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {user?.name.split(' ').map(n => n[0]).join('') || 'U'}
              </span>
            </div>
            {user && (
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
            )}
          </Button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="py-1">
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </button>
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';