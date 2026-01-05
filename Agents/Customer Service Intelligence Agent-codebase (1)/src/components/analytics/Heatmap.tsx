import React, { memo, useMemo } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import type { HeatmapData } from '@/types';

interface HeatmapProps {
  data: HeatmapData[];
  title?: string;
}

export const Heatmap = memo<HeatmapProps>(({ data, title = 'Ticket Volume Heatmap' }) => {
  const heatmapMatrix = useMemo(() => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    const matrix: { day: string; hour: number; value: number; sentiment: string }[][] = [];
    
    for (const day of days) {
      const dayData: { day: string; hour: number; value: number; sentiment: string }[] = [];
      for (const hour of hours) {
        const dayHourData = data.filter(d => d.day === day && d.hour === hour);
        const totalValue = dayHourData.reduce((sum, d) => sum + d.value, 0);
        const avgSentiment = dayHourData.length > 0 
          ? dayHourData.reduce((sum, d) => {
              const sentimentScore = d.sentiment === 'positive' ? 1 : d.sentiment === 'negative' ? -1 : 0;
              return sum + sentimentScore;
            }, 0) / dayHourData.length
          : 0;
        
        const sentiment = avgSentiment > 0.2 ? 'positive' : avgSentiment < -0.2 ? 'negative' : 'neutral';
        
        dayData.push({
          day,
          hour,
          value: totalValue,
          sentiment,
        });
      }
      matrix.push(dayData);
    }
    
    return matrix;
  }, [data]);

  const maxValue = useMemo(() => {
    return Math.max(...data.map(d => d.value));
  }, [data]);

  const getIntensity = (value: number) => {
    return value / maxValue;
  };

  const getCellColor = (value: number, sentiment: string) => {
    const intensity = getIntensity(value);
    
    if (intensity === 0) return 'bg-gray-50';
    
    const baseIntensity = Math.max(0.1, intensity);
    
    switch (sentiment) {
      case 'positive':
        return `bg-success-500 opacity-${Math.floor(baseIntensity * 100)}`;
      case 'negative':
        return `bg-danger-500 opacity-${Math.floor(baseIntensity * 100)}`;
      default:
        return `bg-primary-500 opacity-${Math.floor(baseIntensity * 100)}`;
    }
  };

  const getCellStyle = (value: number, sentiment: string) => {
    const intensity = getIntensity(value);
    
    if (intensity === 0) return { backgroundColor: '#f9fafb' };
    
    const baseIntensity = Math.max(0.1, intensity);
    
    switch (sentiment) {
      case 'positive':
        return { backgroundColor: `rgba(34, 197, 94, ${baseIntensity})` };
      case 'negative':
        return { backgroundColor: `rgba(239, 68, 68, ${baseIntensity})` };
      default:
        return { backgroundColor: `rgba(59, 130, 246, ${baseIntensity})` };
    }
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">
          Ticket volume and sentiment by day and hour
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            <div className="grid grid-cols-25 gap-px bg-gray-200 rounded-lg p-2">
              {/* Header row with hours */}
              <div className="text-xs font-medium text-gray-600 p-2"></div>
              {Array.from({ length: 24 }, (_, i) => (
                <div key={i} className="text-xs font-medium text-gray-600 p-1 text-center">
                  {i}
                </div>
              ))}
              
              {/* Data rows */}
              {heatmapMatrix.map((dayData, dayIndex) => (
                <React.Fragment key={dayIndex}>
                  <div className="text-xs font-medium text-gray-600 p-2 flex items-center">
                    {dayData[0].day.slice(0, 3)}
                  </div>
                  {dayData.map((cell, hourIndex) => (
                    <div
                      key={`${dayIndex}-${hourIndex}`}
                      className="w-6 h-6 rounded cursor-pointer hover:ring-2 hover:ring-gray-400 transition-all"
                      style={getCellStyle(cell.value, cell.sentiment)}
                      title={`${cell.day} ${cell.hour}:00 - ${cell.value} tickets (${cell.sentiment})`}
                    />
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Low</span>
            <div className="flex space-x-1">
              {[0.2, 0.4, 0.6, 0.8, 1.0].map((intensity, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: `rgba(59, 130, 246, ${intensity})` }}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">High</span>
          </div>
          
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-success-500 rounded mr-2" />
              <span className="text-gray-600">Positive</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-primary-500 rounded mr-2" />
              <span className="text-gray-600">Neutral</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-danger-500 rounded mr-2" />
              <span className="text-gray-600">Negative</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

Heatmap.displayName = 'Heatmap';