export interface User {
  id: string;
  name: string;
  email: string;
  role: 'csr' | 'manager';
  avatar?: string;
  department?: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  customer: {
    name: string;
    email: string;
    id: string;
  };
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  sentiment: 'positive' | 'neutral' | 'negative';
  category: string;
  source: 'zendesk' | 'servicenow' | 'email' | 'chat';
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  aiSuggestion?: string;
  confidence?: number;
}

export interface Analytics {
  totalTickets: number;
  resolvedTickets: number;
  averageResolutionTime: number;
  customerSatisfaction: number;
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  categoryBreakdown: Record<string, number>;
  priorityBreakdown: Record<string, number>;
  trends: {
    date: string;
    tickets: number;
    resolved: number;
    sentiment: number;
  }[];
}

export interface HeatmapData {
  category: string;
  hour: number;
  day: string;
  value: number;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export interface Recommendation {
  id: string;
  type: 'automation' | 'process' | 'training' | 'resource';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  createdAt: string;
  priority: number;
}

export interface Alert {
  id: string;
  type: 'sentiment' | 'volume' | 'priority' | 'sla';
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  ticketId?: string;
  timestamp: string;
  acknowledged: boolean;
  assignedTo?: string;
}

export interface Feedback {
  id: string;
  userId: string;
  ticketId: string;
  suggestionId?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment?: string;
  type: 'suggestion' | 'classification' | 'summary' | 'general';
  createdAt: string;
}

export interface ConversationSummary {
  id: string;
  ticketId: string;
  summary: string;
  keyPoints: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  confidence: number;
  createdAt: string;
}