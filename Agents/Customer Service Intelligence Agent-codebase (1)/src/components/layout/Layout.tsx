import React, { memo, useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import type { User } from '@/types';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
}

export const Layout = memo<LayoutProps>(({ children, user }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar user={user} collapsed={sidebarCollapsed} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          user={user}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
});

Layout.displayName = 'Layout';