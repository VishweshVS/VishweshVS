import React, { memo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckCircle, Clock, XCircle, TrendingUp, Zap, BookOpen, Users } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { LoadingState } from '@/components/ui/LoadingSpinner';
import { formatRelativeTime } from '@/lib/utils';
import { recommendationsApi } from '@/services/api';
import type { Recommendation } from '@/types';

const typeIcons = {
  automation: Zap,
  process: TrendingUp,
  training: BookOpen,
  resource: Users,
};

const typeColors = {
  automation: 'bg-primary-100 text-primary-800',
  process: 'bg-success-100 text-success-800',
  training: 'bg-warning-100 text-warning-800',
  resource: 'bg-purple-100 text-purple-800',
};

const impactColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-warning-100 text-warning-800',
  high: 'bg-danger-100 text-danger-800',
};

const effortColors = {
  low: 'bg-success-100 text-success-800',
  medium: 'bg-warning-100 text-warning-800',
  high: 'bg-danger-100 text-danger-800',
};

const statusIcons = {
  pending: Clock,
  'in-progress': TrendingUp,
  completed: CheckCircle,
  rejected: XCircle,
};

const statusColors = {
  pending: 'bg-gray-100 text-gray-800',
  'in-progress': 'bg-primary-100 text-primary-800',
  completed: 'bg-success-100 text-success-800',
  rejected: 'bg-danger-100 text-danger-800',
};

export const Recommendations = memo(() => {
  const queryClient = useQueryClient();
  
  const { data: recommendations = [], isLoading } = useQuery({
    queryKey: ['recommendations'],
    queryFn: recommendationsApi.getRecommendations,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: Recommendation['status'] }) =>
      recommendationsApi.updateRecommendation(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recommendations'] });
    },
  });

  if (isLoading) {
    return <LoadingState message="Loading recommendations..." />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Recommendations</h1>
        <p className="text-gray-600">AI-powered suggestions for process improvements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {['pending', 'in-progress', 'completed', 'rejected'].map((status) => {
          const count = recommendations.filter(rec => rec.status === status).length;
          const StatusIcon = statusIcons[status as keyof typeof statusIcons];
          
          return (
            <Card key={status}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 capitalize">{status.replace('-', ' ')}</p>
                    <p className="text-2xl font-bold text-gray-900">{count}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-100">
                    <StatusIcon className="h-6 w-6 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="space-y-4">
        {recommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
            onUpdateStatus={(status) =>
              updateStatusMutation.mutate({ id: recommendation.id, status })
            }
            isUpdating={updateStatusMutation.isPending}
          />
        ))}
      </div>
    </div>
  );
});

interface RecommendationCardProps {
  recommendation: Recommendation;
  onUpdateStatus: (status: Recommendation['status']) => void;
  isUpdating: boolean;
}

const RecommendationCard = memo<RecommendationCardProps>(({
  recommendation,
  onUpdateStatus,
  isUpdating,
}) => {
  const TypeIcon = typeIcons[recommendation.type];
  const StatusIcon = statusIcons[recommendation.status];

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <div className={`p-2 rounded-lg ${typeColors[recommendation.type]}`}>
                <TypeIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{recommendation.title}</h3>
                <p className="text-sm text-gray-500">
                  {formatRelativeTime(recommendation.createdAt)}
                </p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{recommendation.description}</p>
            
            <div className="flex items-center space-x-4">
              <Badge
                variant="secondary"
                size="sm"
                className={typeColors[recommendation.type]}
              >
                {recommendation.type}
              </Badge>
              
              <Badge
                variant="secondary"
                size="sm"
                className={impactColors[recommendation.impact]}
              >
                {recommendation.impact} impact
              </Badge>
              
              <Badge
                variant="secondary"
                size="sm"
                className={effortColors[recommendation.effort]}
              >
                {recommendation.effort} effort
              </Badge>
              
              <Badge
                variant="secondary"
                size="sm"
                className={statusColors[recommendation.status]}
              >
                <StatusIcon className="h-3 w-3 mr-1" />
                {recommendation.status.replace('-', ' ')}
              </Badge>
            </div>
          </div>
          
          <div className="flex space-x-2 ml-4">
            {recommendation.status === 'pending' && (
              <>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => onUpdateStatus('in-progress')}
                  disabled={isUpdating}
                >
                  Start
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onUpdateStatus('rejected')}
                  disabled={isUpdating}
                >
                  Reject
                </Button>
              </>
            )}
            
            {recommendation.status === 'in-progress' && (
              <Button
                variant="success"
                size="sm"
                onClick={() => onUpdateStatus('completed')}
                disabled={isUpdating}
              >
                Complete
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

RecommendationCard.displayName = 'RecommendationCard';

Recommendations.displayName = 'Recommendations';