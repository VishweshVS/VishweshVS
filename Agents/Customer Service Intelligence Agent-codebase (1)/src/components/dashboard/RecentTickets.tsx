import React, { memo } from 'react';
import { formatRelativeTime, getSentimentColor, getPriorityColor } from '@/lib/utils';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ExternalLink, Clock } from 'lucide-react';
import type { Ticket } from '@/types';

interface RecentTicketsProps {
  tickets: Ticket[];
}

export const RecentTickets = memo<RecentTicketsProps>(({ tickets }) => {
  const recentTickets = tickets
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Recent Tickets</h3>
          <p className="text-sm text-gray-600">Latest customer inquiries</p>
        </div>
        <Button variant="secondary" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-200">
          {recentTickets.map((ticket) => (
            <div key={ticket.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-medium text-gray-900">{ticket.title}</h4>
                    <Badge
                      variant="secondary"
                      size="sm"
                      className={getSentimentColor(ticket.sentiment)}
                    >
                      {ticket.sentiment}
                    </Badge>
                    <Badge
                      variant="secondary"
                      size="sm"
                      className={getPriorityColor(ticket.priority)}
                    >
                      {ticket.priority}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    {ticket.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>#{ticket.id}</span>
                    <span>{ticket.customer.name}</span>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatRelativeTime(ticket.createdAt)}
                    </div>
                  </div>
                </div>
                
                <div className="ml-4 flex-shrink-0">
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {ticket.aiSuggestion && (
                <div className="mt-4 p-3 bg-primary-50 rounded-lg border-l-4 border-primary-500">
                  <div className="flex items-start">
                    <div className="flex-1">
                      <p className="text-sm text-primary-700 font-medium mb-1">
                        AI Suggestion ({Math.round((ticket.confidence || 0) * 100)}% confidence)
                      </p>
                      <p className="text-sm text-primary-600">
                        {ticket.aiSuggestion}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

RecentTickets.displayName = 'RecentTickets';