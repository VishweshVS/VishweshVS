import React, { memo } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  text?: string;
}

export const LoadingSpinner = memo<LoadingSpinnerProps>(({ 
  size = 'md', 
  className,
  text
}) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  };

  if (text) {
    return (
      <div className="flex items-center justify-center space-x-2">
        <Loader2 className={cn('animate-spin text-primary-600', sizes[size], className)} />
        <span className="text-sm text-gray-600">{text}</span>
      </div>
    );
  }

  return (
    <Loader2 className={cn('animate-spin text-primary-600', sizes[size], className)} />
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState = memo<LoadingStateProps>(({ 
  message = 'Loading...', 
  className 
}) => (
  <div className={cn('flex items-center justify-center py-8', className)}>
    <LoadingSpinner size="lg" text={message} />
  </div>
));

LoadingState.displayName = 'LoadingState';