import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const target = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - target.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
}

export function getSentimentColor(sentiment: 'positive' | 'neutral' | 'negative'): string {
  switch (sentiment) {
    case 'positive':
      return 'text-success-600 bg-success-50';
    case 'negative':
      return 'text-danger-600 bg-danger-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

export function getPriorityColor(priority: 'low' | 'medium' | 'high' | 'urgent'): string {
  switch (priority) {
    case 'urgent':
      return 'text-danger-600 bg-danger-50';
    case 'high':
      return 'text-warning-600 bg-warning-50';
    case 'medium':
      return 'text-primary-600 bg-primary-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

export function getStatusColor(status: 'open' | 'in-progress' | 'resolved' | 'closed'): string {
  switch (status) {
    case 'resolved':
    case 'closed':
      return 'text-success-600 bg-success-50';
    case 'in-progress':
      return 'text-primary-600 bg-primary-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}