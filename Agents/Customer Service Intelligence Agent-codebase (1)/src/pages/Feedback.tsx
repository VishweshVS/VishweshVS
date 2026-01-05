import React, { memo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Star, Send, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { feedbackApi } from '@/services/api';
import { cn } from '@/lib/utils';

const feedbackSchema = z.object({
  ticketId: z.string().min(1, 'Ticket ID is required'),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
  type: z.enum(['suggestion', 'classification', 'summary', 'general']),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

export const Feedback = memo(() => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
  });

  const submitFeedbackMutation = useMutation({
    mutationFn: (data: FeedbackFormData) =>
      feedbackApi.submitFeedback({
        ...data,
        userId: '1', // Mock user ID
      }),
    onSuccess: () => {
      setIsSubmitted(true);
      reset();
      setSelectedRating(0);
      setTimeout(() => setIsSubmitted(false), 3000);
    },
  });

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    setValue('rating', rating);
  };

  const onSubmit = (data: FeedbackFormData) => {
    submitFeedbackMutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in">
        <Card>
          <CardContent className="text-center py-12">
            <CheckCircle className="h-12 w-12 text-success-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Thank you for your feedback!
            </h2>
            <p className="text-gray-600">
              Your input helps us improve our AI assistance and service quality.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Feedback</h1>
        <p className="text-gray-600">
          Help us improve by sharing your experience with our AI suggestions and system performance
        </p>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Submit Feedback</h3>
          <p className="text-sm text-gray-600">
            Your feedback helps improve AI accuracy and system performance
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ticket ID *
              </label>
              <input
                type="text"
                placeholder="e.g., TK-001"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                {...register('ticketId')}
              />
              {errors.ticketId && (
                <p className="text-sm text-danger-600 mt-1">{errors.ticketId.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Feedback Type *
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                {...register('type')}
              >
                <option value="">Select feedback type</option>
                <option value="suggestion">AI Suggestion Quality</option>
                <option value="classification">Ticket Classification</option>
                <option value="summary">Conversation Summary</option>
                <option value="general">General System Feedback</option>
              </select>
              {errors.type && (
                <p className="text-sm text-danger-600 mt-1">{errors.type.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating *
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    className={cn(
                      'p-1 transition-colors',
                      rating <= (hoveredRating || selectedRating)
                        ? 'text-warning-500'
                        : 'text-gray-300'
                    )}
                    onClick={() => handleRatingClick(rating)}
                    onMouseEnter={() => setHoveredRating(rating)}
                    onMouseLeave={() => setHoveredRating(0)}
                  >
                    <Star className="h-8 w-8 fill-current" />
                  </button>
                ))}
              </div>
              {errors.rating && (
                <p className="text-sm text-danger-600 mt-1">Please select a rating</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comments (Optional)
              </label>
              <textarea
                rows={4}
                placeholder="Share your detailed feedback, suggestions, or concerns..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                {...register('comment')}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              loading={submitFeedbackMutation.isPending}
              leftIcon={<Send className="h-4 w-4" />}
            >
              Submit Feedback
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">Why Your Feedback Matters</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Improve AI Accuracy</h4>
              <p className="text-sm text-gray-600">
                Your ratings help train our models to provide better suggestions and classifications.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Enhance User Experience</h4>
              <p className="text-sm text-gray-600">
                Your insights help us identify areas for improvement in the user interface and workflows.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">System Performance</h4>
              <p className="text-sm text-gray-600">
                Feedback helps us monitor and optimize system performance and reliability.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Feature Development</h4>
              <p className="text-sm text-gray-600">
                Your suggestions guide our product roadmap and feature prioritization.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

Feedback.displayName = 'Feedback';