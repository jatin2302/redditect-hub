import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Package, Users, MessageSquare, TrendingUp, Clock, Download, Megaphone, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import StatsCard from '@/components/StatsCard';
import StatusBadge from '@/components/StatusBadge';
import { adminStats, orders, tickets } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

const revenueData = [
  { name: 'Mon', revenue: 420, orders: 5 },
  { name: 'Tue', revenue: 680, orders: 8 },
  { name: 'Wed', revenue: 510, orders: 6 },
  { name: 'Thu', revenue: 890, orders: 12 },
  { name: 'Fri', revenue: 760, orders: 9 },
  { name: 'Sat', revenue: 340, orders: 4 },
  { name: 'Sun', revenue: 280, orders: 3 },
];

const monthlyData = [
  { name: 'Jan', revenue: 2400 },
  { name: 'Feb', revenue: 3100 },
  { name: 'Mar', revenue: 3280 },
  { name: 'Apr', revenue: 2800 },
  { name: 'May', revenue: 3600 },
  { name: 'Jun', revenue: 4100 },
];

const activityLog = [
  { id: 1, action: 'Order ORD-1001 status updated to In Progress', time: '2 min ago', type: 'order' },
  { id: 2, action: 'New client Mike R. registered', time: '15 min ago', type: 'client' },
  { id: 3, action: 'Ticket TK-202 received — Refund request', time: '1 hour ago', type: 'ticket' },
  { id: 4, action: 'Payment of $250.00 received from John D.', time: '2 hours ago', type: 'payment' },
  { id: 5, action: 'Service "Viral Post Package" edited', time: '3 hours ago', type: 'service' },
  { id: 6, action: 'Order ORD-1002 completed successfully', time: '5 hours ago', type: 'order' },
  { id: 7, action: 'Refund of $50.00 issued to John D.', time: '1 day ago', type: 'payment' },
  { id: 8, action: 'New ticket TK-203 from Alex K.', time: '1 day ago', type: 'ticket' },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const recentOrders = orders.slice(0, 5);
  const openTickets = tickets.filter(t => t.status === 'open');
  const [chartView, setChartView] = useState<'weekly' | 'monthly'>('weekly');
  const [announcementOpen, setAnnouncementOpen] = useState(false);
  const [announcement, setAnnouncement] = useState({ title: '', message: '' });

  const handleSendAnnouncement = () => {
    if (!announcement.title || !announcement.message) { toast.error('Fill in title and message'); return; }
    toast.success(`Announcement "${announcement.title}" sent to all clients`);
    setAnnouncement({ title: '', message: '' });
    setAnnouncementOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Overview of your business metrics.</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={announcementOpen} onOpenChange={setAnnouncementOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Megaphone className="h-4 w-4" /> Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border sm:max-w-[450px]">
              <DialogHeader><DialogTitle className="text-foreground">Send Announcement</DialogTitle></DialogHeader>
              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-sm font-medium text-foreground">Title</label>
                  <Input className="mt-1" value={announcement.title} onChange={e => setAnnouncement(a => ({ ...a, title: e.target.value }))} placeholder="e.g. System Maintenance" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Message</label>
                  <Textarea className="mt-1" rows={4} value={announcement.message} onChange={e => setAnnouncement(a => ({ ...a, message: e.target.value }))} placeholder="Write your announcement..." />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleSendAnnouncement}>Send to All Clients</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Revenue" value={`$${adminStats.totalRevenue.toLocaleString()}`} icon={DollarSign} variant="primary" trend="+18% vs last month" trendUp />
        <StatsCard title="Monthly Revenue" value={`$${adminStats.monthlyRevenue.toLocaleString()}`} icon={TrendingUp} trend="+12% vs last month" trendUp />
        <StatsCard title="Active Orders" value={adminStats.activeOrders} icon={Clock} />
        <StatsCard title="Total Clients" value={adminStats.totalClients} icon={Users} trend={`+${adminStats.newClients} this month`} trendUp />
      </div>

      {/* Revenue Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg border border-border bg-card p-5 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Revenue Overview</h2>
          <div className="flex gap-1 rounded-lg bg-secondary p-1">
            <button
              onClick={() => setChartView('weekly')}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${chartView === 'weekly' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >Weekly</button>
            <button
              onClick={() => setChartView('monthly')}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${chartView === 'monthly' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >Monthly</button>
          </div>
        </div>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartView === 'weekly' ? (
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={v => `$${v}`} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))' }}
                  formatter={(value: number) => [`$${value}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fill="url(#revenueGrad)" strokeWidth={2} />
              </AreaChart>
            ) : (
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={v => `$${v}`} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))' }}
                  formatter={(value: number) => [`$${value}`, 'Revenue']}
                />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="lg:col-span-2 rounded-lg border border-border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Recent Orders</h2>
            <Button variant="ghost" size="sm" className="text-primary" onClick={() => navigate('/admin/orders')}>View All</Button>
          </div>
          <div className="space-y-2">
            {recentOrders.map(order => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-md bg-secondary/50 p-3 cursor-pointer hover:bg-secondary/80 transition-colors"
                onClick={() => navigate(`/admin/orders/${order.id}`)}
              >
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

        {/* Open Tickets */}
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

      {/* Activity Log */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-lg border border-border bg-card p-5 shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Activity Log</h2>
        </div>
        <div className="space-y-1">
          {activityLog.map(entry => (
            <div key={entry.id} className="flex items-center justify-between rounded-md py-2.5 px-3 hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full ${
                  entry.type === 'order' ? 'bg-primary' :
                  entry.type === 'client' ? 'bg-green-500' :
                  entry.type === 'ticket' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`} />
                <span className="text-sm text-foreground">{entry.action}</span>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{entry.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
