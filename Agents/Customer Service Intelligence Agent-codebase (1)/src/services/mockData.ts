import type { Ticket, Analytics, HeatmapData, Recommendation, Alert, User } from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: 'csr',
    department: 'Support',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'manager',
    department: 'Support',
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike.chen@company.com',
    role: 'csr',
    department: 'Technical',
  },
];

// Mock Tickets
export const mockTickets: Ticket[] = [
  {
    id: 'TK-001',
    title: 'Login issues with mobile app',
    description: 'Customer cannot login to mobile app, getting authentication errors',
    customer: {
      id: 'CUST-001',
      name: 'Alice Cooper',
      email: 'alice.cooper@email.com',
    },
    status: 'open',
    priority: 'high',
    sentiment: 'negative',
    category: 'Authentication',
    source: 'zendesk',
    assignedTo: '1',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    tags: ['mobile', 'login', 'authentication'],
    aiSuggestion: 'Check if user account is locked and reset password if needed.',
    confidence: 0.85,
  },
  {
    id: 'TK-002',
    title: 'Billing question about subscription',
    description: 'Customer wants to understand billing cycle and upgrade options',
    customer: {
      id: 'CUST-002',
      name: 'Bob Wilson',
      email: 'bob.wilson@email.com',
    },
    status: 'in-progress',
    priority: 'medium',
    sentiment: 'neutral',
    category: 'Billing',
    source: 'servicenow',
    assignedTo: '1',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    tags: ['billing', 'subscription', 'upgrade'],
    aiSuggestion: 'Provide billing cycle explanation and upgrade pricing options.',
    confidence: 0.92,
  },
  {
    id: 'TK-003',
    title: 'Feature request for dashboard',
    description: 'Customer requesting new analytics features in the dashboard',
    customer: {
      id: 'CUST-003',
      name: 'Carol Davis',
      email: 'carol.davis@email.com',
    },
    status: 'resolved',
    priority: 'low',
    sentiment: 'positive',
    category: 'Feature Request',
    source: 'email',
    assignedTo: '3',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    tags: ['feature', 'dashboard', 'analytics'],
    aiSuggestion: 'Forward to product team and provide timeline for consideration.',
    confidence: 0.78,
  },
  {
    id: 'TK-004',
    title: 'Data export not working',
    description: 'Export function fails when trying to download large datasets',
    customer: {
      id: 'CUST-004',
      name: 'David Brown',
      email: 'david.brown@email.com',
    },
    status: 'open',
    priority: 'urgent',
    sentiment: 'negative',
    category: 'Technical',
    source: 'chat',
    assignedTo: '3',
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    tags: ['export', 'technical', 'data'],
    aiSuggestion: 'Check server capacity and consider implementing chunked export for large datasets.',
    confidence: 0.88,
  },
];

// Mock Analytics
export const mockAnalytics: Analytics = {
  totalTickets: 1247,
  resolvedTickets: 1089,
  averageResolutionTime: 4.2,
  customerSatisfaction: 4.6,
  sentimentBreakdown: {
    positive: 45,
    neutral: 35,
    negative: 20,
  },
  categoryBreakdown: {
    'Technical': 35,
    'Billing': 25,
    'Authentication': 20,
    'Feature Request': 15,
    'General': 5,
  },
  priorityBreakdown: {
    'low': 30,
    'medium': 40,
    'high': 25,
    'urgent': 5,
  },
  trends: Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    tickets: Math.floor(Math.random() * 50) + 100,
    resolved: Math.floor(Math.random() * 40) + 85,
    sentiment: Math.random() * 2 + 3.5,
  })),
};

// Mock Heatmap Data
export const mockHeatmapData: HeatmapData[] = [];
const categories = ['Technical', 'Billing', 'Authentication', 'Feature Request', 'General'];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const sentiments: ('positive' | 'neutral' | 'negative')[] = ['positive', 'neutral', 'negative'];

for (let day of days) {
  for (let hour = 0; hour < 24; hour++) {
    for (let category of categories) {
      mockHeatmapData.push({
        category,
        hour,
        day,
        value: Math.floor(Math.random() * 20),
        sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
      });
    }
  }
}

// Mock Recommendations
export const mockRecommendations: Recommendation[] = [
  {
    id: 'REC-001',
    type: 'automation',
    title: 'Automate Password Reset Tickets',
    description: 'Implement automated password reset workflow for authentication tickets to reduce manual intervention.',
    impact: 'high',
    effort: 'medium',
    status: 'pending',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 9,
  },
  {
    id: 'REC-002',
    type: 'process',
    title: 'Improve Billing Query Response Templates',
    description: 'Create standardized response templates for common billing inquiries to ensure consistency.',
    impact: 'medium',
    effort: 'low',
    status: 'in-progress',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 7,
  },
  {
    id: 'REC-003',
    type: 'training',
    title: 'Technical Support Skills Training',
    description: 'Provide additional technical training for CSRs handling complex technical issues.',
    impact: 'high',
    effort: 'high',
    status: 'pending',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 8,
  },
  {
    id: 'REC-004',
    type: 'resource',
    title: 'Add Peak Hours Staffing',
    description: 'Increase staffing during peak hours (2-4 PM) to reduce response times.',
    impact: 'medium',
    effort: 'medium',
    status: 'completed',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 6,
  },
];

// Mock Alerts
export const mockAlerts: Alert[] = [
  {
    id: 'ALT-001',
    type: 'sentiment',
    title: 'High Negative Sentiment Detected',
    message: 'Customer TK-001 shows strong negative sentiment. Immediate attention required.',
    severity: 'critical',
    ticketId: 'TK-001',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    acknowledged: false,
  },
  {
    id: 'ALT-002',
    type: 'volume',
    title: 'High Ticket Volume',
    message: 'Authentication category experiencing 40% increase in ticket volume.',
    severity: 'warning',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    acknowledged: false,
  },
  {
    id: 'ALT-003',
    type: 'priority',
    title: 'Urgent Ticket Assigned',
    message: 'Urgent priority ticket TK-004 assigned to Mike Chen.',
    severity: 'error',
    ticketId: 'TK-004',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    acknowledged: true,
    assignedTo: '3',
  },
  {
    id: 'ALT-004',
    type: 'sla',
    title: 'SLA Warning',
    message: 'Ticket TK-002 approaching SLA deadline in 2 hours.',
    severity: 'warning',
    ticketId: 'TK-002',
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    acknowledged: false,
  },
];