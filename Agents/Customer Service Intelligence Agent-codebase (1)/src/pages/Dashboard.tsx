import React, { memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LoadingState } from '@/components/ui/LoadingSpinner';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { SentimentChart } from '@/components/dashboard/SentimentChart';
import { RecentTickets } from '@/components/dashboard/RecentTickets';
import { Heatmap } from '@/components/analytics/Heatmap';
import { analyticsApi, ticketsApi } from '@/services/api';

export const Dashboard = memo(() => {
  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: analyticsApi.getAnalytics,
  });

  const { data: tickets = [], isLoading: ticketsLoading } = useQuery({
    queryKey: ['tickets', { recent: true }],
    queryFn: () => ticketsApi.getTickets(),
  });

  const { data: heatmapData = [], isLoading: heatmapLoading } = useQuery({
    queryKey: ['heatmap'],
    queryFn: analyticsApi.getHeatmapData,
  });

  if (analyticsLoading || ticketsLoading) {
    return <LoadingState message="Loading dashboard..." />;
  }

  if (!analytics) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Failed to load analytics data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of customer service performance</p>
      </div>

      <StatsGrid analytics={analytics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SentimentChart analytics={analytics} />
        <RecentTickets tickets={tickets} />
      </div>

      {!heatmapLoading && (
        <Heatmap data={heatmapData} title="Ticket Activity Heatmap" />
      )}
    </div>
  );
});

Dashboard.displayName = 'Dashboard';