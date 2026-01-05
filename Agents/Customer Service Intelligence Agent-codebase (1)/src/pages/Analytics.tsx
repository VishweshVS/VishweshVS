import React, { memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { LoadingState } from '@/components/ui/LoadingSpinner';
import { SentimentChart } from '@/components/dashboard/SentimentChart';
import { Heatmap } from '@/components/analytics/Heatmap';
import { analyticsApi } from '@/services/api';

export const Analytics = memo(() => {
  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: analyticsApi.getAnalytics,
  });

  const { data: heatmapData = [], isLoading: heatmapLoading } = useQuery({
    queryKey: ['heatmap'],
    queryFn: analyticsApi.getHeatmapData,
  });

  if (analyticsLoading) {
    return <LoadingState message="Loading analytics..." />;
  }

  if (!analytics) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Failed to load analytics data</p>
      </div>
    );
  }

  const categoryData = Object.entries(analytics.categoryBreakdown).map(([category, value]) => ({
    category,
    value,
  }));

  const priorityData = Object.entries(analytics.priorityBreakdown).map(([priority, value]) => ({
    priority,
    value,
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Detailed insights and performance metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SentimentChart analytics={analytics} />
        
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Category Breakdown</h3>
            <p className="text-sm text-gray-600">Tickets by category</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Priority Distribution</h3>
            <p className="text-sm text-gray-600">Tickets by priority level</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={priorityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="priority" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  <Bar 
                    dataKey="value" 
                    fill={(entry) => {
                      switch (entry?.priority) {
                        case 'urgent': return '#ef4444';
                        case 'high': return '#f59e0b';
                        case 'medium': return '#3b82f6';
                        default: return '#6b7280';
                      }
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Trend Analysis</h3>
            <p className="text-sm text-gray-600">Tickets and sentiment over time</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.trends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="tickets" fill="#3b82f6" name="Tickets" />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="sentiment" 
                    stroke="#22c55e" 
                    name="Sentiment Score"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {!heatmapLoading && (
        <Heatmap data={heatmapData} title="Detailed Activity Heatmap" />
      )}
    </div>
  );
});

Analytics.displayName = 'Analytics';