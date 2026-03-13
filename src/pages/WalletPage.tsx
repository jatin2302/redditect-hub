import { motion } from 'framer-motion';
import { Wallet, ArrowUpRight, ArrowDownLeft, RefreshCw, Plus } from 'lucide-react';
import { transactions, clientStats } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const iconMap = { deposit: ArrowDownLeft, order: ArrowUpRight, refund: RefreshCw };

const WalletPage = () => {
  const myTx = transactions.filter(t => t.clientId === 'c1');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Wallet</h1>
          <p className="text-sm text-muted-foreground">Manage your balance and transactions.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90 gap-2">
              <Plus className="h-4 w-4" /> Add Funds
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader><DialogTitle className="text-foreground">Add Funds</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <Label className="text-foreground">Amount ($)</Label>
                <Input type="number" placeholder="100.00" className="mt-1" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[25, 50, 100].map(a => (
                  <Button key={a} variant="outline" size="sm">${a}</Button>
                ))}
              </div>
              <Button className="w-full bg-gradient-primary text-primary-foreground" onClick={() => toast.success('Funds added!')}>
                Add Funds
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg bg-gradient-primary p-6 shadow-glow">
        <div className="flex items-center gap-3">
          <Wallet className="h-8 w-8 text-primary-foreground/80" />
          <div>
            <p className="text-sm text-primary-foreground/70">Available Balance</p>
            <p className="text-3xl font-bold text-primary-foreground">${clientStats.balance.toFixed(2)}</p>
          </div>
        </div>
      </motion.div>

      <div className="rounded-lg border border-border bg-card p-5 shadow-card">
        <h2 className="text-lg font-semibold text-foreground mb-4">Transaction History</h2>
        <div className="space-y-2">
          {myTx.map(tx => {
            const Icon = iconMap[tx.type];
            return (
              <div key={tx.id} className="flex items-center gap-3 rounded-md bg-secondary/50 p-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  tx.type === 'deposit' ? 'bg-success/15' : tx.type === 'refund' ? 'bg-info/15' : 'bg-muted'
                }`}>
                  <Icon className={`h-4 w-4 ${
                    tx.type === 'deposit' ? 'text-success' : tx.type === 'refund' ? 'text-info' : 'text-muted-foreground'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{tx.description}</p>
                  <p className="text-xs text-muted-foreground">{new Date(tx.date).toLocaleDateString()}</p>
                </div>
                <span className={`text-sm font-semibold font-mono ${tx.amount > 0 ? 'text-success' : 'text-foreground'}`}>
                  {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
