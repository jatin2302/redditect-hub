import { motion } from 'framer-motion';
import { DollarSign, Package, ShoppingCart, Clock } from 'lucide-react';
import StatsCard from '@/components/StatsCard';
import StatusBadge from '@/components/StatusBadge';
import { clientStats, orders, transactions } from '@/lib/mock-data';
import { Progress } from '@/components/ui/progress';

const ClientDashboard = () => {
  const myOrders = orders.filter(o => o.clientId === 'c1').slice(0, 3);
  const myTransactions = transactions.slice(0, 4);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back! Here's your overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Balance" value={`$${clientStats.balance.toFixed(2)}`} icon={DollarSign} variant="primary" />
        <StatsCard title="Total Spent" value={`$${clientStats.totalSpent.toFixed(2)}`} icon={ShoppingCart} />
        <StatsCard title="Active Orders" value={clientStats.activeOrders} icon={Clock} trend="2 in progress" trendUp />
        <StatsCard title="Completed" value={clientStats.completedOrders} icon={Package} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="rounded-lg border border-border bg-card p-5 shadow-card">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {myOrders.map(order => (
              <div key={order.id} className="flex items-center justify-between rounded-md bg-secondary/50 p-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-muted-foreground">{order.id}</span>
                    <StatusBadge status={order.status} />
                  </div>
                  <p className="text-sm font-medium text-foreground mt-1">{order.serviceName}</p>
                  {order.status === 'in_progress' && (
                    <Progress value={order.progress} className="mt-2 h-1.5" />
                  )}
                </div>
                <span className="text-sm font-semibold text-foreground ml-4">${order.totalPrice.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="rounded-lg border border-border bg-card p-5 shadow-card">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Transactions</h2>
          <div className="space-y-3">
            {myTransactions.map(tx => (
              <div key={tx.id} className="flex items-center justify-between rounded-md bg-secondary/50 p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{tx.description}</p>
                  <p className="text-xs text-muted-foreground">{new Date(tx.date).toLocaleDateString()}</p>
                </div>
                <span className={`text-sm font-semibold font-mono ${tx.amount > 0 ? 'text-success' : 'text-foreground'}`}>
                  {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ClientDashboard;
