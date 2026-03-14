import { useParams, useNavigate } from 'react-router-dom';
import { orders } from '@/lib/mock-data';
import StatusBadge from '@/components/StatusBadge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Clock, Package, DollarSign, Target } from 'lucide-react';

const OrderDetailView = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <p className="text-muted-foreground">Order not found.</p>
      </div>
    );
  }

  const details = [
    { label: 'Order ID', value: order.id, icon: Package },
    { label: 'Service', value: order.serviceName, icon: Package },
    { label: 'Target URL', value: order.targetUrl, icon: Target },
    { label: 'Quantity', value: order.quantity.toLocaleString(), icon: Package },
    { label: 'Total Price', value: `$${order.totalPrice.toFixed(2)}`, icon: DollarSign },
    { label: 'Created', value: new Date(order.createdAt).toLocaleString(), icon: Clock },
    { label: 'Last Updated', value: new Date(order.updatedAt).toLocaleString(), icon: Clock },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Order {order.id}</h1>
          <p className="text-sm text-muted-foreground">Placed by {order.clientName}</p>
        </div>
        <div className="ml-auto">
          <StatusBadge status={order.status} />
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6 shadow-card space-y-6">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Progress</p>
          <div className="flex items-center gap-3">
            <Progress value={order.progress} className="h-2 flex-1" />
            <span className="text-sm font-semibold text-foreground">{order.progress}%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {details.map(d => (
            <div key={d.label} className="rounded-md bg-secondary/50 p-3">
              <div className="flex items-center gap-2 mb-1">
                <d.icon className="h-3.5 w-3.5 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">{d.label}</p>
              </div>
              <p className="text-sm font-medium text-foreground">{d.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailView;
