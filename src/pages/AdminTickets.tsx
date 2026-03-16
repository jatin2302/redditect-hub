import { useState } from 'react';
import { tickets as initialTickets, Ticket } from '@/lib/mock-data';
import StatusBadge from '@/components/StatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Send, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

const AdminTickets = () => {
  const [ticketsList, setTicketsList] = useState<Ticket[]>(initialTickets);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [replyText, setReplyText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = ticketsList.filter(t => statusFilter === 'all' || t.status === statusFilter);

  const handleReply = () => {
    if (!replyText.trim() || !selectedTicket) return;
    setTicketsList(prev => prev.map(t => t.id === selectedTicket.id ? {
      ...t,
      status: 'replied' as const,
      replies: [...t.replies, { sender: 'Admin', message: replyText, date: new Date().toISOString() }],
    } : t));
    setSelectedTicket(prev => prev ? {
      ...prev,
      status: 'replied',
      replies: [...prev.replies, { sender: 'Admin', message: replyText, date: new Date().toISOString() }],
    } : null);
    setReplyText('');
    toast.success('Reply sent');
  };

  const handleCloseTicket = (ticketId: string) => {
    setTicketsList(prev => prev.map(t => t.id === ticketId ? { ...t, status: 'closed' as const } : t));
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket(prev => prev ? { ...prev, status: 'closed' } : null);
    }
    toast.success('Ticket closed');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Support Tickets</h1>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="replied">Replied</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Ticket Detail View */}
      <Dialog open={!!selectedTicket} onOpenChange={(open) => { if (!open) setSelectedTicket(null); }}>
        <DialogContent className="bg-card border-border sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          {selectedTicket && (
            <>
              <DialogHeader>
                <DialogTitle className="text-foreground flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  {selectedTicket.subject}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs font-mono text-muted-foreground">{selectedTicket.id}</span>
                  <StatusBadge status={selectedTicket.status} />
                  <StatusBadge status={selectedTicket.priority} />
                  <span className="text-xs text-muted-foreground ml-auto">{selectedTicket.clientName}</span>
                </div>

                {/* Conversation Thread */}
                <div className="space-y-3 max-h-[300px] overflow-y-auto rounded-lg bg-secondary/20 p-4">
                  {/* Original message */}
                  <div className="rounded-lg bg-secondary/50 p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-foreground">{selectedTicket.clientName}</span>
                      <span className="text-[10px] text-muted-foreground">{new Date(selectedTicket.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-foreground">{selectedTicket.message}</p>
                  </div>

                  {selectedTicket.replies.map((r, i) => (
                    <div key={i} className={`rounded-lg p-3 ${r.sender === 'Admin' || r.sender === 'Support' ? 'bg-primary/10 ml-4' : 'bg-secondary/50'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-bold ${r.sender === 'Admin' || r.sender === 'Support' ? 'text-primary' : 'text-foreground'}`}>{r.sender}</span>
                        <span className="text-[10px] text-muted-foreground">{new Date(r.date).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-foreground">{r.message}</p>
                    </div>
                  ))}
                </div>

                {/* Reply Box */}
                {selectedTicket.status !== 'closed' ? (
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Type your reply..."
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                      rows={3}
                    />
                    <div className="flex items-center gap-2">
                      <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground flex-1" onClick={handleReply} disabled={!replyText.trim()}>
                        <Send className="h-4 w-4" /> Send Reply
                      </Button>
                      <Button variant="outline" onClick={() => handleCloseTicket(selectedTicket.id)}>Close Ticket</Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-3 text-sm text-muted-foreground bg-secondary/20 rounded-lg">
                    This ticket is closed.
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

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
            {filtered.map(t => (
              <TableRow key={t.id} className="border-border cursor-pointer hover:bg-secondary/30" onClick={() => setSelectedTicket(t)}>
                <TableCell className="font-mono text-sm text-foreground">{t.id}</TableCell>
                <TableCell className="text-foreground">{t.clientName}</TableCell>
                <TableCell className="text-foreground">{t.subject}</TableCell>
                <TableCell><StatusBadge status={t.priority} /></TableCell>
                <TableCell><StatusBadge status={t.status} /></TableCell>
                <TableCell className="text-muted-foreground text-sm">{new Date(t.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedTicket(t); }}>
                    {t.status === 'closed' ? 'View' : 'Reply'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">No tickets found</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminTickets;
