import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  Package, 
  ShoppingCart, 
  Clock, 
  Plus, 
  WalletCards, 
  MessageSquare, 
  ArrowUpRight, 
  ArrowDownRight, 
  ChevronRight, 
  Activity,
  Zap
} from 'lucide-react';
import StatsCard from '@/components/StatsCard';
import StatusBadge from '@/components/StatusBadge';
import TrustBadges from '@/components/TrustBadges';
import { clientStats, orders, transactions } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LoadingScreen } from '@/components/LoadingScreen';

const ClientDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const activeOrders = orders.filter(o => o.status === 'in_progress').slice(0, 3);
  const myTransactions = transactions.slice(0, 5);

  return (
    <div className="space-y-10">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card p-8 rounded-2xl border border-border/50 shadow-card relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50 transition-opacity group-hover:opacity-70" />
        <div className="absolute right-0 top-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none animate-pulse-slow" />
        
        <div className="z-10 relative">
          <h1 className="text-4xl font-black text-foreground font-sans tracking-tight mb-2">
            Welcome back, <span className="text-primary">John</span> <span className="inline-block animate-bounce origin-bottom">👋</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md leading-relaxed">Your Reddit influence is growing. Ready for the next push?</p>
        </div>
        <Button size="lg" className="z-10 bg-primary hover:bg-primary/90 text-white font-bold h-14 px-8 rounded-xl shadow-glow transition-all active:scale-95 shrink-0" asChild>
          <Link to="/new-order">
            <Plus className="mr-3 h-6 w-6" /> Place New Order
          </Link>
        </Button>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatsCard 
          title="Current Balance" 
          value={`$${clientStats.balance.toFixed(2)}`} 
          icon={DollarSign} 
          variant="primary" 
          action={
            <Button size="sm" variant="secondary" className="h-8 px-4 text-[10px] uppercase font-black tracking-widest rounded-lg bg-white/20 hover:bg-white/30 text-white border-none shadow-sm backdrop-blur-sm" asChild>
              <Link to="/wallet">+ Add Funds</Link>
            </Button>
          }
        />
        <StatsCard title="Total Investment" value={`$${clientStats.totalSpent.toFixed(2)}`} icon={ShoppingCart} />
        <StatsCard title="Active Campaigns" value={clientStats.activeOrders} icon={Activity} pulse />
        <StatsCard title="Impact Delivered" value={clientStats.completedOrders} icon={Package} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {/* Active Campaigns Section */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border border-border/50 bg-card p-6 shadow-card flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Package className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-foreground font-sans tracking-tight">Active Campaigns</h2>
              </div>
              <Link to="/orders" className="text-sm text-primary hover:text-primary/80 font-bold flex items-center group transition-all">
                View All <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {activeOrders.length > 0 ? (
                activeOrders.map((order, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={order.id}
                    whileHover={{ x: 5 }}
                    className="p-4 rounded-xl border border-border/50 bg-secondary/10 hover:bg-secondary/20 transition-all cursor-pointer group relative"
                  >
                    <Link to={`/orders/${order.id}`} className="absolute inset-0 z-0" />
                    <div className="flex items-center justify-between mb-3 relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-card border border-border group-hover:border-primary/50 transition-colors">
                          <Zap className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-foreground">{order.serviceName}</p>
                          <p className="text-xs text-muted-foreground font-mono">{order.id}</p>
                        </div>
                      </div>
                      <StatusBadge status={order.status} />
                    </div>
                    
                    <div className="space-y-2 relative z-10">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        <span>Progress</span>
                        <span className="text-primary">{order.progress}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${order.progress}%` }}
                          className="bg-primary h-full shadow-[0_0_8px_rgba(255,69,0,0.4)]"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="h-48 flex flex-col items-center justify-center text-center p-6 bg-secondary/10 rounded-2xl border border-dashed border-border/60">
                  <Package className="h-12 w-12 text-muted-foreground/30 mb-4" />
                  <p className="text-sm font-bold text-muted-foreground tracking-tight">No active campaigns. Let's start one!</p>
                  <Button variant="link" className="text-primary font-bold mt-2" asChild>
                    <Link to="/new-order">Choose a service</Link>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Quick Actions Row */}
          <div>
            <h2 className="text-lg font-bold text-foreground mb-4 font-sans tracking-tight uppercase tracking-widest text-[10px] opacity-60">Operations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link to="/new-order" className="group flex items-center justify-between gap-3 bg-secondary/20 hover:bg-primary p-4 rounded-xl border border-border/40 transition-all duration-300">
                <span className="font-bold text-foreground group-hover:text-white transition-colors">Start Boost</span>
                <Plus className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
              </Link>
              <Link to="/wallet" className="group flex items-center justify-between gap-3 bg-secondary/20 hover:bg-[hsl(var(--upvote))] p-4 rounded-xl border border-border/40 transition-all duration-300">
                <span className="font-bold text-foreground group-hover:text-white transition-colors">Refill Wallet</span>
                <WalletCards className="h-5 w-5 text-[hsl(var(--upvote))] group-hover:text-white transition-colors" />
              </Link>
              <Link to="/support" className="group flex items-center justify-between gap-3 bg-secondary/20 hover:bg-[hsl(var(--downvote))] p-4 rounded-xl border border-border/40 transition-all duration-300">
                <span className="font-bold text-foreground group-hover:text-white transition-colors">Get Help</span>
                <MessageSquare className="h-5 w-5 text-[hsl(var(--downvote))] group-hover:text-white transition-colors" />
              </Link>
            </div>
          </div>
        </div>

        {/* Activity Feed Column */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl border border-border/50 bg-card p-6 shadow-card h-fit">
          <h2 className="text-xl font-bold text-foreground mb-6 font-sans tracking-tight">Market Activity</h2>
          <div className="space-y-6">
            {myTransactions.map((tx, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (idx * 0.05) }}
                key={tx.id} 
                className="flex gap-4 group cursor-pointer"
              >
                <div className={`mt-0.5 h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${tx.amount > 0 ? 'bg-[hsl(var(--upvote))]/10 text-[hsl(var(--upvote))] border border-[hsl(var(--upvote))]/20' : 'bg-secondary/50 border border-border text-muted-foreground'}`}>
                  {tx.amount > 0 ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
                </div>
                <div className="flex-1 border-b border-border/30 pb-4 group-last:border-0 group-last:pb-0">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">{tx.description}</p>
                      <p className="text-[10px] font-black uppercase text-muted-foreground/60 mt-1 tracking-widest">{new Date(tx.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                    <span className={`text-sm font-black font-mono shrink-0 ${tx.amount > 0 ? 'text-[hsl(var(--upvote))]' : 'text-foreground'}`}>
                      {tx.amount > 0 ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-6 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors" asChild>
            <Link to="/wallet">View Transaction Ledger</Link>
          </Button>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 pt-8 border-t border-border/50"
      >
        <div className="text-center mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-1">Reddit Specialist Verified</p>
          <div className="h-0.5 w-12 bg-primary/30 mx-auto rounded-full" />
        </div>
        <TrustBadges />
      </motion.div>
    </div>
  );
};

export default ClientDashboard;
