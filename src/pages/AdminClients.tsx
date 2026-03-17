import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Eye, DollarSign } from 'lucide-react';

const clients = [
  { id: 'c1', name: 'John D.', email: 'john@example.com', balance: 682.50, orders: 3, totalSpent: 867.50, joined: '2025-12-01' },
  { id: 'c2', name: 'Sarah M.', email: 'sarah@example.com', balance: 150.00, orders: 2, totalSpent: 300.00, joined: '2026-01-15' },
  { id: 'c3', name: 'Alex K.', email: 'alex@example.com', balance: 0.00, orders: 1, totalSpent: 125.00, joined: '2026-02-10' },
  { id: 'c4', name: 'Mike R.', email: 'mike@example.com', balance: 1200.00, orders: 8, totalSpent: 4500.00, joined: '2025-10-05' },
  { id: 'c5', name: 'Lisa T.', email: 'lisa@example.com', balance: 50.00, orders: 4, totalSpent: 950.00, joined: '2025-11-20' },
];

const AdminClients = () => {
  const navigate = useNavigate();
  const [clientData, setClientData] = useState(clients);
  
  // Credit dialog state
  const [creditOpen, setCreditOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<typeof clients[0] | null>(null);
  const [creditAmount, setCreditAmount] = useState('');
  const [creditType, setCreditType] = useState<'add' | 'deduct'>('add');

  const openCreditDialog = (client: typeof clients[0]) => {
    setSelectedClient(client);
    setCreditAmount('');
    setCreditType('add');
    setCreditOpen(true);
  };

  const handleCreditAdjust = () => {
    if (!selectedClient) return;
    const amount = parseFloat(creditAmount);
    if (!amount || amount <= 0) { toast.error('Enter a valid amount'); return; }
    
    setClientData(prev => prev.map(c => {
      if (c.id === selectedClient.id) {
        if (creditType === 'add') {
          return { ...c, balance: c.balance + amount };
        } else {
          return { ...c, balance: Math.max(0, c.balance - amount) };
        }
      }
      return c;
    }));

    toast.success(`${creditType === 'add' ? 'Added' : 'Deducted'} $${amount.toFixed(2)} ${creditType === 'add' ? 'to' : 'from'} ${selectedClient.name}'s balance`);
    setCreditOpen(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Clients</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg border border-border bg-card p-4 shadow-card">
          <p className="text-sm text-muted-foreground">Total Clients</p>
          <p className="text-2xl font-bold text-foreground">{clientData.length}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 shadow-card">
          <p className="text-sm text-muted-foreground">Total Balance (all)</p>
          <p className="text-2xl font-bold text-foreground">${clientData.reduce((a, c) => a + c.balance, 0).toFixed(2)}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 shadow-card">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <p className="text-2xl font-bold text-foreground">${clientData.reduce((a, c) => a + c.totalSpent, 0).toFixed(2)}</p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card shadow-card overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Client</TableHead>
              <TableHead className="text-muted-foreground">Email</TableHead>
              <TableHead className="text-muted-foreground">Balance</TableHead>
              <TableHead className="text-muted-foreground">Orders</TableHead>
              <TableHead className="text-muted-foreground">Total Spent</TableHead>
              <TableHead className="text-muted-foreground">Joined</TableHead>
              <TableHead className="text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientData.map(c => (
              <TableRow key={c.id} className="border-border">
                <TableCell
                  className="font-medium text-primary cursor-pointer hover:underline"
                  onClick={() => navigate(`/admin/clients/${c.id}`)}
                >
                  {c.name}
                </TableCell>
                <TableCell className="text-muted-foreground">{c.email}</TableCell>
                <TableCell className="font-semibold text-foreground">${c.balance.toFixed(2)}</TableCell>
                <TableCell className="text-foreground">{c.orders}</TableCell>
                <TableCell className="text-foreground">${c.totalSpent.toFixed(2)}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{new Date(c.joined).toLocaleDateString()}</TableCell>
                <TableCell className="flex gap-1">
                  <Button variant="outline" size="sm" onClick={() => navigate(`/admin/clients/${c.id}`)}><Eye className="h-3 w-3" /></Button>
                  <Button variant="outline" size="sm" onClick={() => openCreditDialog(c)}><DollarSign className="h-3 w-3" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Credit Dialog */}
      <Dialog open={creditOpen} onOpenChange={setCreditOpen}>
        <DialogContent className="bg-card border-border sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              Adjust Balance for <span className="text-primary">{selectedClient?.name}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Current Balance</p>
              <p className="text-3xl font-black text-primary font-mono">${selectedClient?.balance.toFixed(2)}</p>
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
  );
};

export default AdminClients;
