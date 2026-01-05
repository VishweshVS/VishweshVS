import React, { memo } from 'react';
import { TrendingUp, TrendingDown, Clock, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import type { Analytics } from '@/types';

interface StatsGridProps {
  analytics: Analytics;
}

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color: string;
}

const StatCard = memo<StatCardProps>(({ title, value, change, icon, color }) => (
  <Card>
    <CardContent>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change !== undefined && (
            <div className={`flex items-center mt-2 text-sm ${
              change >= 0 ? 'text-success-600' : 'text-danger-600'
            }`}>
              {change >= 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {Math.abs(change)}%
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
));

StatCard.displayName = 'StatCard';

export const StatsGrid = memo<StatsGridProps>(({ analytics }) => {
  const resolutionRate = ((analytics.resolvedTickets / analytics.totalTickets) * 100).toFixed(1);

  const stats = [
    {
      title: 'Total Tickets',
      value: analytics.totalTickets.toLocaleString(),
      change: 12.5,
      icon: <Clock className="h-6 w-6 text-primary-600" />,
      color: 'bg-primary-100',
    },
    {
      title: 'Resolution Rate',
      value: `${resolutionRate}%`,
      change: 3.2,
      icon: <TrendingUp className="h-6 w-6 text-success-600" />,
      color: 'bg-success-100',
    },
    {
      title: 'Avg Resolution Time',
      value: `${analytics.averageResolutionTime}h`,
      change: -8.1,
      icon: <Clock className="h-6 w-6 text-warning-600" />,
      color: 'bg-warning-100',
    },
    {
      title: 'Customer Satisfaction',
      value: analytics.customerSatisfaction.toFixed(1),
      change: 5.4,
      icon: <Star className="h-6 w-6 text-warning-600" />,
      color: 'bg-warning-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
});

StatsGrid.displayName = 'StatsGrid';