import { tickets } from '@/lib/mock-data';
import StatusBadge from '@/components/StatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const AdminTickets = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Support Tickets</h1>

      <div className="rounded-lg border border-border bg-card shadow-card overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Ticket ID</TableHead>
              <TableHead className="text-muted-foreground">Client</TableHead>
              <TableHead className="text-muted-foreground">Subject</TableHead>
              <TableHead className="text-muted-foreground">Priority</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Date</TableHead>
              <TableHead className="text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map(t => (
              <TableRow key={t.id} className="border-border">
                <TableCell className="font-mono text-sm text-foreground">{t.id}</TableCell>
                <TableCell className="text-foreground">{t.clientName}</TableCell>
                <TableCell className="text-foreground">{t.subject}</TableCell>
                <TableCell><StatusBadge status={t.priority} /></TableCell>
                <TableCell><StatusBadge status={t.status} /></TableCell>
                <TableCell className="text-muted-foreground text-sm">{new Date(t.createdAt).toLocaleDateString()}</TableCell>
                <TableCell><Button variant="outline" size="sm">Reply</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminTickets;
