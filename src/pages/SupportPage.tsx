import { useState } from 'react';
import { motion } from 'framer-motion';
import { tickets } from '@/lib/mock-data';
import StatusBadge from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, MessageSquare, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';
import TrustBadges from '@/components/TrustBadges';

const SupportPage = () => {
  const myTickets = tickets.filter(t => t.clientId === 'c1').sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const [selected, setSelected] = useState<string | null>(myTickets[0]?.id || null);
  const selectedTicket = tickets.find(t => t.id === selected);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Ticket created successfully!', {
      description: 'Our support team will get back to you shortly.'
    });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-sans text-foreground tracking-tight">Support Operations</h1>
          <p className="text-muted-foreground font-medium">Get assistance with your campaigns from our specialized agents.</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-white shadow-glow gap-2 h-11 px-6 rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98]">
              <Plus className="h-5 w-5 bg-white/20 rounded-full p-0.5" /> Open New Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border/50 sm:max-w-[480px] rounded-2xl">
            <DialogHeader className="pb-4 border-b border-border/50">
              <DialogTitle className="text-xl font-black font-sans text-foreground">Initiate Support Context</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateTicket} className="space-y-5 pt-6">
              <div className="space-y-2">
                <Label className="text-foreground font-black uppercase tracking-widest text-[10px]">Context / Subject</Label>
                <Input placeholder="e.g., Question about Order #ORD-1234" className="bg-background border-border/60 focus:border-primary/50 focus:ring-primary/10 rounded-xl" required />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground font-black uppercase tracking-widest text-[10px]">Transmission / Message</Label>
                <Textarea placeholder="Describe your request in detail for our agents..." className="bg-background border-border/60 focus:border-primary/50 focus:ring-primary/10 rounded-xl resize-none" rows={5} required />
              </div>
              <div className="bg-secondary/30 rounded-xl p-4 flex items-start gap-4 border border-border/50">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <ShieldAlert className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-foreground">Secure Transmission</p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Our team typically responds within 2-4 hours. All communications are encrypted and private.
                  </p>
                </div>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-black h-12 shadow-glow rounded-xl">
                Transmit Ticket
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <TrustBadges className="bg-card p-6 rounded-2xl border border-border/50 shadow-card flex justify-center h-full" />
        <div className="bg-card p-6 rounded-2xl border border-border/50 shadow-card space-y-4 h-full">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-black uppercase tracking-widest text-foreground">Common Inquiries</h3>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {[
              "When will my order start?",
              "Is this safe for my account?",
              "Can I change the target URL?"
            ].map((q, i) => (
              <div key={i} className="group cursor-pointer p-3 rounded-xl hover:bg-secondary/30 border border-transparent hover:border-border/50 transition-all flex items-center justify-between">
                <span className="text-xs font-bold text-muted-foreground group-hover:text-foreground">{q}</span>
                <Plus className="h-3 w-3 text-muted-foreground group-hover:text-primary" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[10px] font-black font-sans text-muted-foreground uppercase tracking-widest">Communication Logs</h2>
            <span className="text-[10px] font-bold text-primary font-mono">{myTickets.length} ACTIVE</span>
          </div>
          <div className="space-y-3">
            {myTickets.map(ticket => (
              <motion.button
                whileHover={{ x: 4 }}
                key={ticket.id}
                onClick={() => setSelected(ticket.id)}
                className={`w-full text-left rounded-2xl border p-5 transition-all relative overflow-hidden group ${
                  selected === ticket.id 
                    ? 'border-primary bg-primary/5 shadow-[0_0_20px_rgba(255,69,0,0.05)]' 
                    : 'border-border/50 bg-card hover:border-primary/30 hover:bg-secondary/30 shadow-card'
                }`}
              >
                {selected === ticket.id && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                  />
                )}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-mono font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                    selected === ticket.id ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground'
                  }`}>{ticket.id.substring(0, 8)}</span>
                  <StatusBadge status={ticket.status} />
                </div>
                <p className={`text-sm font-bold font-sans transition-colors ${
                  selected === ticket.id ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                } truncate`}>{ticket.subject}</p>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-[10px] font-black uppercase text-muted-foreground/40 tracking-tighter">
                    {new Date(ticket.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </p>
                  <StatusBadge status={ticket.priority} />
                </div>
              </motion.button>
            ))}
          </div>
          {myTickets.length === 0 && (
            <div className="text-center py-16 bg-card rounded-2xl border border-border/50 shadow-card border-dashed">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">Channels Empty</p>
              <p className="text-xs text-muted-foreground/60 mt-2 px-10 leading-relaxed">No support sessions active. Open a ticket if you need assistance.</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-2 rounded-2xl border border-border/50 bg-card shadow-card flex flex-col min-h-[600px] overflow-hidden">
          {selectedTicket ? (
            <div className="space-y-0 flex-1 flex flex-col">
              <div className="p-6 bg-secondary/10 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black tracking-widest text-primary uppercase bg-primary/10 px-2 py-0.5 rounded-md">SESSION ACTIVE</span>
                    <h2 className="text-lg font-black font-sans text-foreground tracking-tight">{selectedTicket.subject}</h2>
                  </div>
                  <p className="text-xs font-bold text-muted-foreground/60 tracking-widest uppercase">ID: {selectedTicket.id}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end mr-3">
                    <span className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest">PRIORITY</span>
                    <StatusBadge status={selectedTicket.priority} />
                  </div>
                  <div className="h-10 w-[1px] bg-border/50" />
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest">STATUS</span>
                    <StatusBadge status={selectedTicket.status} />
                  </div>
                </div>
              </div>
              
              <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-card/50 no-scrollbar">
                {/* Initial Message */}
                <div className="flex justify-start">
                  <div className="max-w-[85%] space-y-2">
                    <div className="flex items-center gap-2 px-1">
                      <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center border border-border/50">
                        <span className="text-[10px] font-black">{selectedTicket.clientName.charAt(0)}</span>
                      </div>
                      <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{selectedTicket.clientName}</p>
                      <span className="text-[10px] text-muted-foreground/40 font-bold">• {new Date(selectedTicket.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="rounded-2xl rounded-tl-none bg-secondary/30 p-5 border border-border/50 shadow-sm">
                      <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{selectedTicket.message}</p>
                    </div>
                  </div>
                </div>
                
                {/* Replies */}
                {selectedTicket.replies.map((r, i) => (
                  <div key={i} className={`flex ${r.sender === 'Support' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] space-y-2 ${r.sender === 'Support' ? 'items-end flex flex-col' : ''}`}>
                      <div className={`flex items-center gap-2 px-1 ${r.sender === 'Support' ? 'flex-row-reverse' : ''}`}>
                        <div className={`h-6 w-6 rounded-full flex items-center justify-center border ${
                          r.sender === 'Support' ? 'bg-primary/20 border-primary/20 text-primary' : 'bg-secondary border-border/50'
                        }`}>
                          {r.sender === 'Support' ? <ShieldAlert className="h-3 w-3" /> : <span className="text-[10px] font-black">{r.sender.charAt(0)}</span>}
                        </div>
                        <p className={`text-[10px] font-black uppercase tracking-widest ${r.sender === 'Support' ? 'text-primary' : 'text-muted-foreground'}`}>{r.sender}</p>
                        <span className="text-[10px] text-muted-foreground/40 font-bold">• {new Date(r.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className={`rounded-2xl p-5 shadow-sm border ${
                        r.sender === 'Support' 
                          ? 'bg-primary/10 border-primary/20 rounded-tr-none text-foreground' 
                          : 'bg-secondary/30 border-border/50 rounded-tl-none text-foreground'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{r.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedTicket.status !== 'closed' && (
                <div className="p-6 bg-secondary/10 border-t border-border/50">
                  <div className="flex gap-3 bg-card p-2 rounded-2xl border border-border/50 focus-within:border-primary/50 transition-colors shadow-inner">
                    <Input 
                      placeholder="Type a message to support..." 
                      className="flex-1 bg-transparent border-none focus-visible:ring-0 shadow-none font-medium"
                    />
                    <Button className="bg-primary hover:bg-primary/90 text-white shadow-glow rounded-xl font-black uppercase tracking-widest text-[10px] h-10 px-6">
                      Send Reply
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground text-center p-12 bg-secondary/5">
              <div className="h-20 w-20 rounded-3xl bg-secondary/20 flex items-center justify-center mb-6 animate-pulse">
                <MessageSquare className="h-10 w-10 text-muted-foreground/30" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-widest text-foreground/80">Support Archive</h3>
              <p className="text-sm mt-2 max-w-[300px] leading-relaxed">Choose a transmission log from the terminal on the left to review the support session details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
