import { QueryClient } from '@tanstack/react-query';
import type { 
  Ticket, 
  Analytics, 
  HeatmapData, 
  Recommendation, 
  Alert, 
  User, 
  Feedback, 
  ConversationSummary 
} from '@/types';
import { 
  mockTickets, 
  mockAnalytics, 
  mockHeatmapData, 
  mockRecommendations, 
  mockAlerts, 
  mockUsers 
} from './mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

// Users API
export const usersApi = {
  getCurrentUser: async (): Promise<User> => {
    await delay(500);
    return mockUsers[0]; // Default to CSR user
  },
  
  getUsers: async (): Promise<User[]> => {
    await delay(300);
    return mockUsers;
  },
};

// Tickets API
export const ticketsApi = {
  getTickets: async (filters?: {
    status?: string;
    priority?: string;
    category?: string;
    assignedTo?: string;
  }): Promise<Ticket[]> => {
    await delay(800);
    let filtered = [...mockTickets];
    
    if (filters?.status) {
      filtered = filtered.filter(ticket => ticket.status === filters.status);
    }
    if (filters?.priority) {
      filtered = filtered.filter(ticket => ticket.priority === filters.priority);
    }
    if (filters?.category) {
      filtered = filtered.filter(ticket => ticket.category === filters.category);
    }
    if (filters?.assignedTo) {
      filtered = filtered.filter(ticket => ticket.assignedTo === filters.assignedTo);
    }
    
    return filtered;
  },
  
  getTicket: async (id: string): Promise<Ticket | null> => {
    await delay(400);
    return mockTickets.find(ticket => ticket.id === id) || null;
  },
  
  updateTicket: async (id: string, updates: Partial<Ticket>): Promise<Ticket> => {
    await delay(600);
    const ticketIndex = mockTickets.findIndex(ticket => ticket.id === id);
    if (ticketIndex === -1) {
      throw new Error('Ticket not found');
    }
    
    const updatedTicket = {
      ...mockTickets[ticketIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    mockTickets[ticketIndex] = updatedTicket;
    return updatedTicket;
  },
};

// Analytics API
export const analyticsApi = {
  getAnalytics: async (dateRange?: { start: string; end: string }): Promise<Analytics> => {
    await delay(1200);
    return mockAnalytics;
  },
  
  getHeatmapData: async (category?: string): Promise<HeatmapData[]> => {
    await delay(900);
    if (category) {
      return mockHeatmapData.filter(data => data.category === category);
    }
    return mockHeatmapData;
  },
};

// Recommendations API
export const recommendationsApi = {
  getRecommendations: async (): Promise<Recommendation[]> => {
    await delay(700);
    return mockRecommendations.sort((a, b) => b.priority - a.priority);
  },
  
  updateRecommendation: async (id: string, status: Recommendation['status']): Promise<Recommendation> => {
    await delay(500);
    const recIndex = mockRecommendations.findIndex(rec => rec.id === id);
    if (recIndex === -1) {
      throw new Error('Recommendation not found');
    }
    
    mockRecommendations[recIndex].status = status;
    return mockRecommendations[recIndex];
  },
};

// Alerts API
export const alertsApi = {
  getAlerts: async (acknowledged?: boolean): Promise<Alert[]> => {
    await delay(400);
    if (acknowledged !== undefined) {
      return mockAlerts.filter(alert => alert.acknowledged === acknowledged);
    }
    return mockAlerts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  },
  
  acknowledgeAlert: async (id: string): Promise<Alert> => {
    await delay(300);
    const alertIndex = mockAlerts.findIndex(alert => alert.id === id);
    if (alertIndex === -1) {
      throw new Error('Alert not found');
    }
    
    mockAlerts[alertIndex].acknowledged = true;
    return mockAlerts[alertIndex];
  },
};

// Feedback API
export const feedbackApi = {
  submitFeedback: async (feedback: Omit<Feedback, 'id' | 'createdAt'>): Promise<Feedback> => {
    await delay(500);
    const newFeedback: Feedback = {
      ...feedback,
      id: `FB-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    return newFeedback;
  },
};

// AI Services API
export const aiApi = {
  getSuggestion: async (ticketId: string): Promise<{ suggestion: string; confidence: number }> => {
    await delay(1500);
    const suggestions = [
      'Review account settings and reset authentication tokens.',
      'Check billing cycle configuration and provide upgrade options.',
      'Escalate to technical team for detailed investigation.',
      'Provide knowledge base articles for self-service resolution.',
      'Schedule follow-up call to ensure issue resolution.',
    ];
    
    return {
      suggestion: suggestions[Math.floor(Math.random() * suggestions.length)],
      confidence: Math.random() * 0.3 + 0.7, // 0.7 - 1.0
    };
  },
  
  generateSummary: async (ticketId: string): Promise<ConversationSummary> => {
    await delay(2000);
    return {
      id: `SUM-${ticketId}`,
      ticketId,
      summary: 'Customer experienced login issues on mobile app. Provided troubleshooting steps and reset authentication tokens. Issue resolved after clearing app cache.',
      keyPoints: [
        'Login authentication failure',
        'Mobile app specific issue',
        'Resolved with cache clear and token reset',
        'Customer satisfied with resolution',
      ],
      sentiment: 'positive',
      confidence: 0.89,
      createdAt: new Date().toISOString(),
    };
  },
  
  classifyTicket: async (content: string): Promise<{
    category: string;
    priority: string;
    sentiment: string;
    confidence: number;
  }> => {
    await delay(1000);
    const categories = ['Technical', 'Billing', 'Authentication', 'Feature Request', 'General'];
    const priorities = ['low', 'medium', 'high', 'urgent'];
    const sentiments = ['positive', 'neutral', 'negative'];
    
    return {
      category: categories[Math.floor(Math.random() * categories.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
      confidence: Math.random() * 0.2 + 0.8, // 0.8 - 1.0
    };
  },
};