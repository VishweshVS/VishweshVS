import React, { memo } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated';
}

export const Card = memo<CardProps>(({ 
  children, 
  className, 
  variant = 'default',
  ...props 
}) => {
  const variants = {
    default: 'bg-white border border-gray-200 shadow-sm',
    outlined: 'bg-white border border-gray-300',
    elevated: 'bg-white shadow-lg border border-gray-200',
  };

  return (
    <div 
      className={cn(
        'rounded-lg',
        variants[variant],
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader = memo<CardHeaderProps>(({ 
  children, 
  className, 
  ...props 
}) => (
  <div className={cn('px-6 py-4 border-b border-gray-200', className)} {...props}>
    {children}
  </div>
));

CardHeader.displayName = 'CardHeader';

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = memo<CardContentProps>(({ 
  children, 
  className, 
  ...props 
}) => (
  <div className={cn('px-6 py-4', className)} {...props}>
    {children}
  </div>
));

CardContent.displayName = 'CardContent';

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardFooter = memo<CardFooterProps>(({ 
  children, 
  className, 
  ...props 
}) => (
  <div className={cn('px-6 py-4 border-t border-gray-200', className)} {...props}>
    {children}
  </div>
));

CardFooter.displayName = 'CardFooter';