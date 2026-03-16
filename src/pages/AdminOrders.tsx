import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { orders, services } from '@/lib/mock-data';
import StatusBadge from '@/components/StatusBadge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Download, CheckSquare } from 'lucide-react';
import { toast } from 'sonner';

const dateFilters = [
  { label: 'All Time', value: 'all' },
  { label: 'Today', value: 'today' },
  { label: 'Last 7 Days', value: '7d' },
  { label: 'Last 30 Days', value: '30d' },
  { label: 'Last 90 Days', value: '90d' },
];

const AdminOrders = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const uniqueServices = [...new Set(orders.map(o => o.serviceName))];

  const filtered = orders.filter(o => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (serviceFilter !== 'all' && o.serviceName !== serviceFilter) return false;
    if (search && !o.id.toLowerCase().includes(search.toLowerCase()) && !o.clientName.toLowerCase().includes(search.toLowerCase())) return false;

    if (dateFilter !== 'all') {
      const now = new Date();
      const created = new Date(o.createdAt);
      const diffDays = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
      if (dateFilter === 'today' && diffDays > 1) return false;
      if (dateFilter === '7d' && diffDays > 7) return false;
      if (dateFilter === '30d' && diffDays > 30) return false;
      if (dateFilter === '90d' && diffDays > 90) return false;
    }
    return true;
  });

  const toggleSelect = (id: string) => {
    setSelectedOrders(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedOrders.length === filtered.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filtered.map(o => o.id));
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedOrders.length === 0) { toast.error('No orders selected'); return; }
    toast.success(`${selectedOrders.length} order(s) marked as ${action}`);
    setSelectedOrders([]);
  };

  const handleExportCSV = () => {
    const dataToExport = selectedOrders.length > 0 ? filtered.filter(o => selectedOrders.includes(o.id)) : filtered;
    const headers = ['Order ID', 'Client', 'Service', 'Quantity', 'Total', 'Status', 'Progress', 'Created'];
    const rows = dataToExport.map(o => [o.id, o.clientName, o.serviceName, o.quantity, o.totalPrice.toFixed(2), o.status, `${o.progress}%`, o.createdAt]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${dataToExport.length} orders`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Manage Orders</h1>
        <Button variant="outline" size="sm" className="gap-2" onClick={handleExportCSV}>
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by ID or client..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select value={serviceFilter} onValueChange={setServiceFilter}>
          <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Services</SelectItem>
            {uniqueServices.map(s => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            {dateFilters.map(d => (
              <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Bulk Actions Bar */}
      {selectedOrders.length > 0 && (
        <div className="flex items-center gap-3 rounded-lg bg-primary/10 border border-primary/20 p-3">
          <CheckSquare className="h-4 w-4 text-primary" />
          <span className="text-sm font-bold text-foreground">{selectedOrders.length} selected</span>
          <div className="flex gap-2 ml-auto">
            <Button size="sm" variant="outline" onClick={() => handleBulkAction('in_progress')}>Start Processing</Button>
            <Button size="sm" variant="outline" onClick={() => handleBulkAction('completed')}>Mark Complete</Button>
            <Button size="sm" variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => handleBulkAction('cancelled')}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="rounded-lg border border-border bg-card shadow-card overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-[40px]">
                <Checkbox
                  checked={selectedOrders.length === filtered.length && filtered.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
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
              <TableRow key={order.id} className={`border-border ${selectedOrders.includes(order.id) ? 'bg-primary/5' : ''}`}>
                <TableCell>
                  <Checkbox
                    checked={selectedOrders.includes(order.id)}
                    onCheckedChange={() => toggleSelect(order.id)}
                  />
                </TableCell>
                <TableCell
                  className="font-mono text-sm text-primary cursor-pointer hover:underline"
                  onClick={() => navigate(`/admin/orders/${order.id}`)}
                >
                  {order.id}
                </TableCell>
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
                  <Button variant="outline" size="sm" onClick={() => navigate(`/admin/orders/${order.id}`)}>View</Button>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow><TableCell colSpan={9} className="text-center text-muted-foreground py-8">No orders found</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminOrders;
