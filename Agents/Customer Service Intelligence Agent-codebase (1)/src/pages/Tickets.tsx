import React, { memo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, Plus, Eye, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LoadingState } from '@/components/ui/LoadingSpinner';
import { formatRelativeTime, getSentimentColor, getPriorityColor, getStatusColor } from '@/lib/utils';
import { ticketsApi } from '@/services/api';
import type { Ticket } from '@/types';

export const Tickets = memo(() => {
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    category: '',
    search: '',
  });

  const { data: tickets = [], isLoading, error } = useQuery({
    queryKey: ['tickets', filters],
    queryFn: () => ticketsApi.getTickets({
      status: filters.status || undefined,
      priority: filters.priority || undefined,
      category: filters.category || undefined,
    }),
  });

  const filteredTickets = tickets.filter((ticket) =>
    !filters.search ||
    ticket.title.toLowerCase().includes(filters.search.toLowerCase()) ||
    ticket.customer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
    ticket.id.toLowerCase().includes(filters.search.toLowerCase())
  );

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  if (isLoading) {
    return <LoadingState message="Loading tickets..." />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Failed to load tickets</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tickets</h1>
          <p className="text-gray-600">Manage customer service tickets</p>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />}>
          New Ticket
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tickets..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
            
            <div className="flex gap-3">
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
              
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={filters.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
              >
                <option value="">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
              
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Technical">Technical</option>
                <option value="Billing">Billing</option>
                <option value="Authentication">Authentication</option>
                <option value="Feature Request">Feature Request</option>
                <option value="General">General</option>
              </select>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
        
        {filteredTickets.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-600">No tickets found matching your criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
});

interface TicketCardProps {
  ticket: Ticket;
}

const TicketCard = memo<TicketCardProps>(({ ticket }) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardContent>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="font-semibold text-gray-900">{ticket.title}</h3>
            <Badge
              variant="secondary"
              size="sm"
              className={getStatusColor(ticket.status)}
            >
              {ticket.status}
            </Badge>
            <Badge
              variant="secondary"
              size="sm"
              className={getPriorityColor(ticket.priority)}
            >
              {ticket.priority}
            </Badge>
            <Badge
              variant="secondary"
              size="sm"
              className={getSentimentColor(ticket.sentiment)}
            >
              {ticket.sentiment}
            </Badge>
          </div>
          
          <p className="text-gray-600 mb-4">{ticket.description}</p>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <span>#{ticket.id}</span>
            <span>{ticket.customer.name}</span>
            <span>{ticket.category}</span>
            <span>{formatRelativeTime(ticket.createdAt)}</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {ticket.aiSuggestion && (
        <div className="mt-4 p-3 bg-primary-50 rounded-lg border-l-4 border-primary-500">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-primary-700 font-medium mb-1">
                AI Suggestion ({Math.round((ticket.confidence || 0) * 100)}% confidence)
              </p>
              <p className="text-sm text-primary-600">
                {ticket.aiSuggestion}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="text-primary-600 hover:bg-primary-100">
                Apply
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100">
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      )}
    </CardContent>
  </Card>
));

TicketCard.displayName = 'TicketCard';

Tickets.displayName = 'Tickets';