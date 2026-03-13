import { useState } from 'react';
import { tickets } from '@/lib/mock-data';
import StatusBadge from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

const SupportPage = () => {
  const myTickets = tickets.filter(t => t.clientId === 'c1');
  const [selected, setSelected] = useState<string | null>(null);
  const selectedTicket = tickets.find(t => t.id === selected);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Support</h1>
          <p className="text-sm text-muted-foreground">Get help with your orders and account.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90 gap-2">
              <Plus className="h-4 w-4" /> New Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader><DialogTitle className="text-foreground">Create Support Ticket</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <div><Label className="text-foreground">Subject</Label><Input placeholder="Brief description" className="mt-1" /></div>
              <div><Label className="text-foreground">Message</Label><Textarea placeholder="Describe your issue..." className="mt-1" rows={4} /></div>
              <Button className="w-full bg-gradient-primary text-primary-foreground" onClick={() => toast.success('Ticket created!')}>Submit</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-2">
          {myTickets.map(ticket => (
            <button
              key={ticket.id}
              onClick={() => setSelected(ticket.id)}
              className={`w-full text-left rounded-lg border p-4 transition-colors ${
                selected === ticket.id ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/30'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono text-muted-foreground">{ticket.id}</span>
                <StatusBadge status={ticket.status} />
              </div>
              <p className="text-sm font-medium text-foreground">{ticket.subject}</p>
              <p className="text-xs text-muted-foreground mt-1">{new Date(ticket.createdAt).toLocaleDateString()}</p>
            </button>
          ))}
          {myTickets.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No tickets yet.</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-2 rounded-lg border border-border bg-card p-5 shadow-card">
          {selectedTicket ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">{selectedTicket.subject}</h2>
                <div className="flex gap-2">
                  <StatusBadge status={selectedTicket.priority} />
                  <StatusBadge status={selectedTicket.status} />
                </div>
              </div>
              <div className="rounded-md bg-secondary/50 p-3">
                <p className="text-xs text-muted-foreground mb-1">{selectedTicket.clientName} — {new Date(selectedTicket.createdAt).toLocaleString()}</p>
                <p className="text-sm text-foreground">{selectedTicket.message}</p>
              </div>
              {selectedTicket.replies.map((r, i) => (
                <div key={i} className={`rounded-md p-3 ${r.sender === 'Support' ? 'bg-primary/5 border border-primary/20' : 'bg-secondary/50'}`}>
                  <p className="text-xs text-muted-foreground mb-1">{r.sender} — {new Date(r.date).toLocaleString()}</p>
                  <p className="text-sm text-foreground">{r.message}</p>
                </div>
              ))}
              {selectedTicket.status !== 'closed' && (
                <div className="flex gap-2">
                  <Input placeholder="Type a reply..." className="flex-1" />
                  <Button className="bg-gradient-primary text-primary-foreground">Reply</Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 text-muted-foreground">
              <p className="text-sm">Select a ticket to view details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
