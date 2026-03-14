import { useParams, useNavigate } from 'react-router-dom';
import { orders, tickets, transactions } from '@/lib/mock-data';
import StatusBadge from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Mail, Calendar, DollarSign, Package, MessageSquare } from 'lucide-react';

const clients = [
  { id: 'c1', name: 'John D.', email: 'john@example.com', balance: 682.50, orders: 3, totalSpent: 867.50, joined: '2025-12-01' },
  { id: 'c2', name: 'Sarah M.', email: 'sarah@example.com', balance: 150.00, orders: 2, totalSpent: 300.00, joined: '2026-01-15' },
  { id: 'c3', name: 'Alex K.', email: 'alex@example.com', balance: 0.00, orders: 1, totalSpent: 125.00, joined: '2026-02-10' },
  { id: 'c4', name: 'Mike R.', email: 'mike@example.com', balance: 1200.00, orders: 8, totalSpent: 4500.00, joined: '2025-10-05' },
  { id: 'c5', name: 'Lisa T.', email: 'lisa@example.com', balance: 50.00, orders: 4, totalSpent: 950.00, joined: '2025-11-20' },
];

const ClientDetailView = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const client = clients.find(c => c.id === clientId);

  if (!client) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <p className="text-muted-foreground">Client not found.</p>
      </div>
    );
  }

  const clientOrders = orders.filter(o => o.clientId === clientId);
  const clientTickets = tickets.filter(t => t.clientId === clientId);
  const clientTx = transactions.filter(t => t.clientId === clientId);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">{client.name}</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-lg border border-border bg-card p-4 shadow-card">
          <div className="flex items-center gap-2 mb-1"><Mail className="h-3.5 w-3.5 text-muted-foreground" /><p className="text-xs text-muted-foreground">Email</p></div>
          <p className="text-sm font-medium text-foreground">{client.email}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 shadow-card">
          <div className="flex items-center gap-2 mb-1"><DollarSign className="h-3.5 w-3.5 text-muted-foreground" /><p className="text-xs text-muted-foreground">Balance</p></div>
          <p className="text-sm font-semibold text-foreground">${client.balance.toFixed(2)}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 shadow-card">
          <div className="flex items-center gap-2 mb-1"><Package className="h-3.5 w-3.5 text-muted-foreground" /><p className="text-xs text-muted-foreground">Total Spent</p></div>
          <p className="text-sm font-semibold text-foreground">${client.totalSpent.toFixed(2)}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 shadow-card">
          <div className="flex items-center gap-2 mb-1"><Calendar className="h-3.5 w-3.5 text-muted-foreground" /><p className="text-xs text-muted-foreground">Joined</p></div>
          <p className="text-sm font-medium text-foreground">{new Date(client.joined).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Orders */}
      <div className="rounded-lg border border-border bg-card shadow-card overflow-auto">
        <div className="p-4 border-b border-border flex items-center gap-2">
          <Package className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-semibold text-foreground">Orders ({clientOrders.length})</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">ID</TableHead>
              <TableHead className="text-muted-foreground">Service</TableHead>
              <TableHead className="text-muted-foreground">Total</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientOrders.map(o => (
              <TableRow key={o.id} className="border-border cursor-pointer hover:bg-secondary/50" onClick={() => navigate(`/admin/orders/${o.id}`)}>
                <TableCell className="font-mono text-sm text-foreground">{o.id}</TableCell>
                <TableCell className="text-foreground">{o.serviceName}</TableCell>
                <TableCell className="text-foreground">${o.totalPrice.toFixed(2)}</TableCell>
                <TableCell><StatusBadge status={o.status} /></TableCell>
              </TableRow>
            ))}
            {clientOrders.length === 0 && <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground">No orders</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>

      {/* Tickets */}
      <div className="rounded-lg border border-border bg-card shadow-card overflow-auto">
        <div className="p-4 border-b border-border flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-semibold text-foreground">Tickets ({clientTickets.length})</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">ID</TableHead>
              <TableHead className="text-muted-foreground">Subject</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientTickets.map(t => (
              <TableRow key={t.id} className="border-border">
                <TableCell className="font-mono text-sm text-foreground">{t.id}</TableCell>
                <TableCell className="text-foreground">{t.subject}</TableCell>
                <TableCell><StatusBadge status={t.status} /></TableCell>
                <TableCell><StatusBadge status={t.priority} /></TableCell>
              </TableRow>
            ))}
            {clientTickets.length === 0 && <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground">No tickets</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ClientDetailView;
