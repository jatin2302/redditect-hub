import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Clients</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg border border-border bg-card p-4 shadow-card">
          <p className="text-sm text-muted-foreground">Total Clients</p>
          <p className="text-2xl font-bold text-foreground">{clients.length}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 shadow-card">
          <p className="text-sm text-muted-foreground">Total Balance (all)</p>
          <p className="text-2xl font-bold text-foreground">${clients.reduce((a, c) => a + c.balance, 0).toFixed(2)}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 shadow-card">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <p className="text-2xl font-bold text-foreground">${clients.reduce((a, c) => a + c.totalSpent, 0).toFixed(2)}</p>
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
            {clients.map(c => (
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
                  <Button variant="outline" size="sm"><DollarSign className="h-3 w-3" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminClients;
