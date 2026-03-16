import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orders, tickets, transactions } from '@/lib/mock-data';
import StatusBadge from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Mail, Calendar, DollarSign, Package, MessageSquare, PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

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
  const [creditAmount, setCreditAmount] = useState('');
  const [creditType, setCreditType] = useState<'add' | 'deduct'>('add');
  const [creditOpen, setCreditOpen] = useState(false);
  const [clientBalance, setClientBalance] = useState(client?.balance ?? 0);

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

  const handleCreditAdjust = () => {
    const amount = parseFloat(creditAmount);
    if (!amount || amount <= 0) { toast.error('Enter a valid amount'); return; }
    if (creditType === 'add') {
      setClientBalance(prev => prev + amount);
      toast.success(`Added $${amount.toFixed(2)} to ${client.name}'s balance`);
    } else {
      if (amount > clientBalance) { toast.error('Cannot deduct more than current balance'); return; }
      setClientBalance(prev => prev - amount);
      toast.success(`Deducted $${amount.toFixed(2)} from ${client.name}'s balance`);
    }
    setCreditAmount('');
    setCreditOpen(false);
  };

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
          <p className="text-sm font-semibold text-primary">${clientBalance.toFixed(2)}</p>
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

      {/* Manual Credit Adjustment */}
      <div className="flex items-center gap-3">
        <Dialog open={creditOpen} onOpenChange={setCreditOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-xl font-bold">
              <PlusCircle className="h-4 w-4" /> Adjust Balance
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border sm:max-w-[400px]">
            <DialogHeader><DialogTitle className="text-foreground">Adjust Client Balance</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Current Balance</p>
                <p className="text-3xl font-black text-primary font-mono">${clientBalance.toFixed(2)}</p>
              </div>
              <div>
                <Label className="text-foreground">Action</Label>
                <Select value={creditType} onValueChange={(v: 'add' | 'deduct') => setCreditType(v)}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="add">Add Credit</SelectItem>
                    <SelectItem value="deduct">Deduct Credit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-foreground">Amount ($)</Label>
                <Input type="number" min="0" step="0.01" className="mt-1" placeholder="0.00" value={creditAmount} onChange={e => setCreditAmount(e.target.value)} />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold" onClick={handleCreditAdjust}>
                {creditType === 'add' ? 'Add' : 'Deduct'} ${creditAmount || '0.00'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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
