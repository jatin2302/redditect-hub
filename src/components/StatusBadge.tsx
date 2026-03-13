import { Badge } from '@/components/ui/badge';

const statusConfig: Record<string, { className: string; label: string }> = {
  pending: { className: 'bg-warning/15 text-warning border-warning/30', label: 'Pending' },
  in_progress: { className: 'bg-info/15 text-info border-info/30', label: 'In Progress' },
  completed: { className: 'bg-success/15 text-success border-success/30', label: 'Completed' },
  cancelled: { className: 'bg-destructive/15 text-destructive border-destructive/30', label: 'Cancelled' },
  refunded: { className: 'bg-muted text-muted-foreground border-border', label: 'Refunded' },
  open: { className: 'bg-warning/15 text-warning border-warning/30', label: 'Open' },
  replied: { className: 'bg-info/15 text-info border-info/30', label: 'Replied' },
  closed: { className: 'bg-muted text-muted-foreground border-border', label: 'Closed' },
  low: { className: 'bg-muted text-muted-foreground border-border', label: 'Low' },
  medium: { className: 'bg-warning/15 text-warning border-warning/30', label: 'Medium' },
  high: { className: 'bg-destructive/15 text-destructive border-destructive/30', label: 'High' },
};

const StatusBadge = ({ status }: { status: string }) => {
  const config = statusConfig[status] || { className: 'bg-muted text-muted-foreground', label: status };
  return (
    <Badge variant="outline" className={`text-xs font-medium ${config.className}`}>
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
