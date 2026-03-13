import { orders } from '@/lib/mock-data';
import StatusBadge from '@/components/StatusBadge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ClientOrders = () => {
  const myOrders = orders.filter(o => o.clientId === 'c1');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Orders</h1>
        <p className="text-sm text-muted-foreground">Track your active and past orders.</p>
      </div>

      <div className="rounded-lg border border-border bg-card shadow-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Order ID</TableHead>
              <TableHead className="text-muted-foreground">Service</TableHead>
              <TableHead className="text-muted-foreground">Target</TableHead>
              <TableHead className="text-muted-foreground">Qty</TableHead>
              <TableHead className="text-muted-foreground">Total</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Progress</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myOrders.map(order => (
              <TableRow key={order.id} className="border-border">
                <TableCell className="font-mono text-sm text-foreground">{order.id}</TableCell>
                <TableCell className="text-foreground">{order.serviceName}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{order.targetUrl}</TableCell>
                <TableCell className="text-foreground">{order.quantity.toLocaleString()}</TableCell>
                <TableCell className="font-semibold text-foreground">${order.totalPrice.toFixed(2)}</TableCell>
                <TableCell><StatusBadge status={order.status} /></TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 min-w-[100px]">
                    <Progress value={order.progress} className="h-1.5 flex-1" />
                    <span className="text-xs text-muted-foreground">{order.progress}%</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ClientOrders;
