import React, { memo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import type { Analytics } from '@/types';

interface SentimentChartProps {
  analytics: Analytics;
}

const SENTIMENT_COLORS = {
  positive: '#22c55e',
  neutral: '#6b7280',
  negative: '#ef4444',
};

export const SentimentChart = memo<SentimentChartProps>(({ analytics }) => {
  const data = [
    {
      name: 'Positive',
      value: analytics.sentimentBreakdown.positive,
      color: SENTIMENT_COLORS.positive,
    },
    {
      name: 'Neutral',
      value: analytics.sentimentBreakdown.neutral,
      color: SENTIMENT_COLORS.neutral,
    },
    {
      name: 'Negative',
      value: analytics.sentimentBreakdown.negative,
      color: SENTIMENT_COLORS.negative,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">Sentiment Analysis</h3>
        <p className="text-sm text-gray-600">Distribution of customer sentiment</p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          {data.map((item) => (
            <div key={item.name} className="text-center">
              <div className="flex items-center justify-center mb-2">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-medium text-gray-600">{item.name}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{item.value}%</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

SentimentChart.displayName = 'SentimentChart';