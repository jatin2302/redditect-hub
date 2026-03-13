import { motion } from 'framer-motion';
import { DollarSign, Package, Users, MessageSquare, TrendingUp, Clock } from 'lucide-react';
import StatsCard from '@/components/StatsCard';
import StatusBadge from '@/components/StatusBadge';
import { adminStats, orders, tickets } from '@/lib/mock-data';

const AdminDashboard = () => {
  const recentOrders = orders.slice(0, 5);
  const openTickets = tickets.filter(t => t.status === 'open');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of your business metrics.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Revenue" value={`$${adminStats.totalRevenue.toLocaleString()}`} icon={DollarSign} variant="primary" trend="+18% vs last month" trendUp />
        <StatsCard title="Monthly Revenue" value={`$${adminStats.monthlyRevenue.toLocaleString()}`} icon={TrendingUp} trend="+12% vs last month" trendUp />
        <StatsCard title="Active Orders" value={adminStats.activeOrders} icon={Clock} />
        <StatsCard title="Total Clients" value={adminStats.totalClients} icon={Users} trend={`+${adminStats.newClients} this month`} trendUp />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="lg:col-span-2 rounded-lg border border-border bg-card p-5 shadow-card">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Orders</h2>
          <div className="space-y-2">
            {recentOrders.map(order => (
              <div key={order.id} className="flex items-center justify-between rounded-md bg-secondary/50 p-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-sm font-mono text-muted-foreground">{order.id}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{order.serviceName}</p>
                    <p className="text-xs text-muted-foreground">{order.clientName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={order.status} />
                  <span className="text-sm font-semibold text-foreground">${order.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="rounded-lg border border-border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Open Tickets</h2>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-destructive/15 text-xs font-semibold text-destructive">
              {openTickets.length}
            </span>
          </div>
          <div className="space-y-2">
            {openTickets.map(ticket => (
              <div key={ticket.id} className="rounded-md bg-secondary/50 p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-muted-foreground">{ticket.id}</span>
                  <StatusBadge status={ticket.priority} />
                </div>
                <p className="text-sm font-medium text-foreground">{ticket.subject}</p>
                <p className="text-xs text-muted-foreground">{ticket.clientName}</p>
              </div>
            ))}
            {openTickets.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No open tickets 🎉</p>}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
