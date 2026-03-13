import { useState } from 'react';
import { orders, Order } from '@/lib/mock-data';
import StatusBadge from '@/components/StatusBadge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const AdminOrders = () => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filtered = orders.filter(o =>
    (statusFilter === 'all' || o.status === statusFilter) &&
    (o.id.toLowerCase().includes(search.toLowerCase()) || o.clientName.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Manage Orders</h1>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by ID or client..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border border-border bg-card shadow-card overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Order ID</TableHead>
              <TableHead className="text-muted-foreground">Client</TableHead>
              <TableHead className="text-muted-foreground">Service</TableHead>
              <TableHead className="text-muted-foreground">Qty</TableHead>
              <TableHead className="text-muted-foreground">Total</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Progress</TableHead>
              <TableHead className="text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(order => (
              <TableRow key={order.id} className="border-border">
                <TableCell className="font-mono text-sm text-foreground">{order.id}</TableCell>
                <TableCell className="text-foreground">{order.clientName}</TableCell>
                <TableCell className="text-foreground">{order.serviceName}</TableCell>
                <TableCell className="text-foreground">{order.quantity.toLocaleString()}</TableCell>
                <TableCell className="font-semibold text-foreground">${order.totalPrice.toFixed(2)}</TableCell>
                <TableCell><StatusBadge status={order.status} /></TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 min-w-[80px]">
                    <Progress value={order.progress} className="h-1.5 flex-1" />
                    <span className="text-xs text-muted-foreground">{order.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminOrders;
