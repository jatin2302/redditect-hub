import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Plus, Search, Filter } from 'lucide-react';
import { orders } from '@/lib/mock-data';
import StatusBadge from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { LoadingScreen } from '@/components/LoadingScreen';

const ClientOrders = () => {
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter orders based on current user (mocked as 'c1' for now)
  const myOrders = orders.filter(order => order.clientId === 'c1');
  const filtered = filter === 'all' ? myOrders : myOrders.filter(o => o.status === filter);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-sans text-foreground tracking-tight">Order Management</h1>
          <p className="text-muted-foreground font-medium">Monitor and manage your active Reddit boosts.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search by ID or Service..." 
              className="pl-10 w-full sm:w-[300px] bg-card border-border/60 focus:border-primary/50 focus:ring-primary/10 rounded-xl"
            />
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-white shadow-glow gap-2 h-10 px-6 rounded-xl font-bold" asChild>
            <Link to="/new-order">
              <Plus className="h-4 w-4 bg-white/20 rounded-full p-0.5" /> New Order
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex gap-2 border-b border-border/50 pb-2 overflow-x-auto no-scrollbar">
        {['all', 'pending', 'in_progress', 'completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 text-sm font-semibold font-sans rounded-full whitespace-nowrap transition-colors ${
              filter === f ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/50'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1).replace('_', ' ')}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-border/50 bg-card shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-separate border-spacing-0">
            <thead className="bg-secondary/30 text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px]">Reference</th>
                <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px]">Service Configuration</th>
                <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px]">Status</th>
                <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px]">Progress Ring</th>
                <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px]">Date Placed</th>
                <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] text-right">Actions</th>
              </tr>
            </thead>
            <motion.tbody 
              variants={container}
              initial="hidden"
              animate="show"
              className="divide-y divide-border/50"
            >
              {filtered.map(order => (
                <motion.tr 
                  variants={item} 
                  key={order.id} 
                  className="hover:bg-secondary/20 transition-all group cursor-pointer relative"
                >
                  <td className="px-6 py-5 font-mono text-xs font-bold text-muted-foreground/80">{order.id}</td>
                  <td className="px-6 py-5">
                    <div className="font-bold text-foreground font-sans group-hover:text-primary transition-colors">{order.serviceName}</div>
                    <div className="text-[10px] text-muted-foreground/60 font-medium truncate max-w-[200px] mt-0.5">Quantity: {order.quantity || 'Variable'}</div>
                  </td>
                  <td className="px-6 py-5"><StatusBadge status={order.status} /></td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1.5 min-w-[120px]">
                      <div className="flex justify-between text-[10px] font-black uppercase text-muted-foreground/60 tracking-wider">
                        <span>{order.progress}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${order.progress}%` }}
                          className="bg-primary h-full shadow-[0_0_8px_rgba(255,69,0,0.3)] transition-all"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-xs font-bold text-muted-foreground">{new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <Button variant="ghost" size="sm" asChild className="opacity-0 group-hover:opacity-100 transition-all rounded-lg group-hover:bg-primary/10 group-hover:text-primary font-black uppercase tracking-widest text-[10px]">
                      <Link to={`/orders/${order.id}`} className="gap-2">
                        <Eye className="h-4 w-4" /> DETAILS
                      </Link>
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientOrders;
