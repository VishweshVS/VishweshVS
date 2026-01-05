import React, { memo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AlertTriangle, AlertCircle, Info, Zap, Check } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { LoadingState } from '@/components/ui/LoadingSpinner';
import { formatRelativeTime } from '@/lib/utils';
import { alertsApi } from '@/services/api';
import type { Alert } from '@/types';

const severityIcons = {
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  critical: Zap,
};

const severityColors = {
  info: 'bg-blue-100 text-blue-800',
  warning: 'bg-warning-100 text-warning-800',
  error: 'bg-danger-100 text-danger-800',
  critical: 'bg-purple-100 text-purple-800',
};

const typeColors = {
  sentiment: 'bg-pink-100 text-pink-800',
  volume: 'bg-blue-100 text-blue-800',
  priority: 'bg-warning-100 text-warning-800',
  sla: 'bg-danger-100 text-danger-800',
};

export const Alerts = memo(() => {
  const queryClient = useQueryClient();
  
  const { data: alerts = [], isLoading } = useQuery({
    queryKey: ['alerts'],
    queryFn: () => alertsApi.getAlerts(),
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const acknowledgeMutation = useMutation({
    mutationFn: (id: string) => alertsApi.acknowledgeAlert(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });

  const unacknowledgedAlerts = alerts.filter(alert => !alert.acknowledged);
  const acknowledgedAlerts = alerts.filter(alert => alert.acknowledged);

  if (isLoading) {
    return <LoadingState message="Loading alerts..." />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Alerts</h1>
        <p className="text-gray-600">System alerts and notifications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {['info', 'warning', 'error', 'critical'].map((severity) => {
          const count = unacknowledgedAlerts.filter(alert => alert.severity === severity).length;
          const SeverityIcon = severityIcons[severity as keyof typeof severityIcons];
          
          return (
            <Card key={severity}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 capitalize">{severity}</p>
                    <p className="text-2xl font-bold text-gray-900">{count}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${severityColors[severity as keyof typeof severityColors]}`}>
                    <SeverityIcon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {unacknowledgedAlerts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Active Alerts</h2>
          {unacknowledgedAlerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onAcknowledge={() => acknowledgeMutation.mutate(alert.id)}
              isAcknowledging={acknowledgeMutation.isPending}
            />
          ))}
        </div>
      )}

      {acknowledgedAlerts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Acknowledged Alerts</h2>
          {acknowledgedAlerts.slice(0, 10).map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onAcknowledge={() => {}}
              isAcknowledging={false}
            />
          ))}
        </div>
      )}

      {alerts.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <CheckCircle className="h-12 w-12 text-success-500 mx-auto mb-4" />
            <p className="text-gray-600">No active alerts</p>
            <p className="text-sm text-gray-500 mt-1">All systems are running smoothly</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
});

interface AlertCardProps {
  alert: Alert;
  onAcknowledge: () => void;
  isAcknowledging: boolean;
}

const AlertCard = memo<AlertCardProps>(({ alert, onAcknowledge, isAcknowledging }) => {
  const SeverityIcon = severityIcons[alert.severity];
  
  return (
    <Card className={`border-l-4 ${
      alert.severity === 'critical' ? 'border-l-purple-500' :
      alert.severity === 'error' ? 'border-l-danger-500' :
      alert.severity === 'warning' ? 'border-l-warning-500' :
      'border-l-blue-500'
    } ${alert.acknowledged ? 'opacity-60' : ''}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <div className={`p-2 rounded-lg ${severityColors[alert.severity]}`}>
                <SeverityIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                <p className="text-sm text-gray-500">
                  {formatRelativeTime(alert.timestamp)}
                </p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{alert.message}</p>
            
            <div className="flex items-center space-x-4">
              <Badge
                variant="secondary"
                size="sm"
                className={typeColors[alert.type]}
              >
                {alert.type}
              </Badge>
              
              <Badge
                variant="secondary"
                size="sm"
                className={severityColors[alert.severity]}
              >
                {alert.severity}
              </Badge>
              
              {alert.ticketId && (
                <Badge variant="secondary" size="sm">
                  Ticket #{alert.ticketId}
                </Badge>
              )}
              
              {alert.acknowledged && (
                <Badge variant="success" size="sm">
                  <Check className="h-3 w-3 mr-1" />
                  Acknowledged
                </Badge>
              )}
            </div>
          </div>
          
          {!alert.acknowledged && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onAcknowledge}
              disabled={isAcknowledging}
              loading={isAcknowledging}
            >
              Acknowledge
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

AlertCard.displayName = 'AlertCard';

Alerts.displayName = 'Alerts';