import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowUpRight, ArrowDownLeft, RefreshCw, Plus, ShieldCheck, LockIcon } from 'lucide-react';
import { transactions, clientStats } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import TrustBadges from '@/components/TrustBadges';

const iconMap = { deposit: ArrowDownLeft, order: ArrowUpRight, refund: RefreshCw };

const WalletPage = () => {
  const [amount, setAmount] = useState('');
  const myTx = transactions.filter(t => t.clientId === 'c1');

  const handleAddFunds = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    toast.success('Funds added successfully!', {
      description: `$${Number(amount).toFixed(2)} has been added to your balance.`
    });
    setAmount('');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-sans text-foreground tracking-tight">Financial Hub</h1>
          <p className="text-muted-foreground font-medium">Manage your balance and view secure transaction history.</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-white shadow-glow gap-2 h-11 px-6 rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98]">
              <Plus className="h-5 w-5 bg-white/20 rounded-full p-0.5" /> Deposit Funds
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-sans text-foreground">Add Funds to Wallet</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddFunds} className="space-y-6 pt-4">
              <div className="space-y-3">
                <Label className="text-foreground font-black uppercase tracking-widest text-[10px]">Select Amount</Label>
                <div className="grid grid-cols-3 gap-2">
                  {[25, 50, 100, 250, 500, 1000].map(a => (
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      key={a}
                      onClick={() => setAmount(a.toString())}
                      className={`cursor-pointer rounded-xl border-2 text-center py-4 font-mono font-black transition-all ${
                        amount === a.toString() 
                          ? 'border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(255,69,0,0.2)]' 
                          : 'border-border/50 bg-secondary/30 hover:bg-secondary/50 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      ${a}
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-foreground">Or Enter Custom Amount ($)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input 
                    type="number" 
                    min="10" 
                    step="1"
                    placeholder="Min $10.00" 
                    className="pl-7 bg-background border-border font-mono text-lg font-bold"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="bg-secondary/30 rounded-lg p-3 flex items-start gap-3 border border-border/50">
                <LockIcon className="h-4 w-4 text-muted-foreground mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  Payments are processed securely via Stripe. We do not store your credit card information.
                </p>
              </div>

              <Button type="submit" className="w-full bg-[hsl(var(--upvote))] hover:bg-[hsl(var(--upvote))]/90 text-white font-bold h-12 shadow-glow">
                Pay Securely
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="md:col-span-1 rounded-2xl bg-card border border-border/50 overflow-hidden relative shadow-card group"
        >
          {/* Subtle background gradient */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors pointer-events-none" />
          
          <div className="p-8 relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex flex-col items-center justify-center rotate-3 group-hover:rotate-0 transition-transform">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-0.5">
                <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground/80">Current Balance</h2>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-green-500 uppercase tracking-tighter">Live Funds</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-5xl font-black font-sans tracking-tight text-foreground">
                ${clientStats.balance.toFixed(2)}
              </p>
              <p className="text-xs font-bold text-muted-foreground px-1">Available for immediate use</p>
            </div>
            
            <div className="mt-10 pt-8 border-t border-border/50 space-y-4">
              <div className="flex justify-between items-center bg-secondary/20 p-4 rounded-xl">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Lifetime Spend</span>
                  <div className="font-bold text-foreground font-mono">${clientStats.totalSpent.toFixed(2)}</div>
                </div>
                <div className="h-8 w-8 rounded-lg bg-secondary/50 flex items-center justify-center">
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="md:col-span-2 space-y-6">
          <TrustBadges className="bg-card p-4 rounded-xl border border-border shadow-card justify-start md:justify-center overflow-x-auto whitespace-nowrap" />
          
          <div className="rounded-2xl border border-border/50 bg-card shadow-card overflow-hidden">
            <div className="p-6 border-b border-border/50 flex justify-between items-center bg-secondary/10">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-black uppercase tracking-widest text-foreground">Recent Activity</h2>
              </div>
              <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5">View Statement</Button>
            </div>
            <div className="divide-y divide-border/50">
              {myTx.length > 0 ? myTx.map(tx => {
                const Icon = iconMap[tx.type];
                const isPositive = tx.amount > 0;
                return (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={tx.id} 
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-4 hover:bg-secondary/10 transition-colors"
                  >
                    <div className="flex items-center gap-5">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform hover:scale-110 ${
                        isPositive ? 'bg-primary/10 text-primary shadow-glow-sm' : 'bg-background border border-border text-muted-foreground'
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 space-y-1">
                        <p className="text-sm font-bold text-foreground truncate">{tx.description}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground/60">{tx.type}</span>
                          <span className="h-1 w-1 rounded-full bg-border" />
                          <p className="text-[10px] font-medium text-muted-foreground/80">{new Date(tx.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-base font-black font-mono shrink-0 ${isPositive ? 'text-primary' : 'text-foreground'}`}>
                        {isPositive ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                      </span>
                      <span className="text-[10px] font-bold text-muted-foreground/40 font-mono">TX-{tx.id.substring(0, 8)}</span>
                    </div>
                  </motion.div>
                );
              }) : (
                <div className="p-12 text-center text-muted-foreground text-sm font-medium">
                  No activity found in your account yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
