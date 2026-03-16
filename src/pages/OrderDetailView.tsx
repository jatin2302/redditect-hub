import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { orders as initialOrders } from '@/lib/mock-data';
import { useAuth } from '@/contexts/AuthContext';
import StatusBadge from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, ExternalLink, Clock, Package, DollarSign, Target, CalendarDays, Activity, CheckCircle2, ShieldAlert, LockIcon, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

const OrderDetailView = () => {
  const { role } = useAuth();
  const { orderId } = useParams();
  const navigate = useNavigate();
  const initialOrder = initialOrders.find(o => o.id === orderId);

  const [orderStatus, setOrderStatus] = useState(initialOrder?.status || 'pending');
  const [orderProgress, setOrderProgress] = useState(initialOrder?.progress || 0);
  const [refundOpen, setRefundOpen] = useState(false);
  const [refundAmount, setRefundAmount] = useState('');

  if (!initialOrder) {
    return (
      <div className="space-y-4 max-w-3xl mx-auto py-12 text-center">
        <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <h2 className="text-xl font-bold font-sans text-foreground">Order not found</h2>
        <p className="text-muted-foreground">The order you are looking for does not exist or you don't have permission to view it.</p>
        <Button variant="outline" onClick={() => navigate(-1)} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  const order = { ...initialOrder, status: orderStatus, progress: orderProgress };

  const handleStatusUpdate = (newStatus: string) => {
    setOrderStatus(newStatus as typeof orderStatus);
    if (newStatus === 'completed') setOrderProgress(100);
    if (newStatus === 'cancelled') setOrderProgress(0);
    toast.success(`Order status updated to ${newStatus.replace('_', ' ')}`);
  };

  const handleProgressUpdate = (value: string) => {
    const num = Math.min(100, Math.max(0, parseInt(value) || 0));
    setOrderProgress(num);
  };

  const handleRefund = () => {
    const amount = parseFloat(refundAmount);
    if (!amount || amount <= 0 || amount > order.totalPrice) {
      toast.error('Enter a valid refund amount');
      return;
    }
    setOrderStatus('refunded');
    setRefundOpen(false);
    setRefundAmount('');
    toast.success(`Refund of $${amount.toFixed(2)} processed for ${order.id}`);
  };

  const details = [
    { label: 'Service', value: order.serviceName, icon: Package },
    { label: 'Target URL', value: order.targetUrl, icon: Target, isLink: true },
    { label: 'Quantity', value: order.quantity.toLocaleString(), icon: Activity },
    { label: 'Total Price', value: `$${order.totalPrice.toFixed(2)}`, icon: DollarSign },
    { label: 'Created On', value: new Date(order.createdAt).toLocaleString(), icon: CalendarDays },
    { label: 'Last Updated', value: new Date(order.updatedAt).toLocaleString(), icon: Clock },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="outline" size="icon" onClick={() => navigate(-1)} className="shrink-0 h-12 w-12 rounded-2xl border-border/50 bg-card shadow-sm hover:bg-secondary">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </motion.div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black tracking-widest text-primary uppercase bg-primary/10 px-2 py-0.5 rounded-md">LOG ENTRY</span>
                <h1 className="text-3xl font-black font-sans tracking-tight text-foreground">{order.id}</h1>
              </div>
              <StatusBadge status={order.status} />
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground/60 tracking-widest uppercase">
              <Activity className="h-3 w-3" />
              SESSION LIVE • UPDATED {new Date(order.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {role === 'admin' && (
            <Dialog open={refundOpen} onOpenChange={setRefundOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-destructive/30 text-destructive hover:bg-destructive/10 rounded-xl gap-2 h-11 px-5">
                  <RotateCcw className="h-4 w-4" /> Refund
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border sm:max-w-[400px]">
                <DialogHeader><DialogTitle className="text-foreground">Process Refund</DialogTitle></DialogHeader>
                <div className="space-y-4 pt-2">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Order Total</p>
                    <p className="text-2xl font-black text-foreground font-mono">${order.totalPrice.toFixed(2)}</p>
                  </div>
                  <div>
                    <Label className="text-foreground">Refund Amount ($)</Label>
                    <Input type="number" min="0" max={order.totalPrice} step="0.01" className="mt-1" value={refundAmount} onChange={e => setRefundAmount(e.target.value)} placeholder="0.00" />
                  </div>
                  <Button variant="destructive" className="w-full" onClick={handleRefund}>
                    Process Refund
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
          <Button variant="outline" className="border-border/50 rounded-xl font-bold gap-2 h-11 px-5" asChild>
            <Link to="/support">
              <ShieldAlert className="h-4 w-4 text-muted-foreground" /> Report Issue
            </Link>
          </Button>
          {role === 'client' && (
            <Button className="bg-primary hover:bg-primary/90 text-white shadow-glow rounded-xl font-black uppercase tracking-widest text-[10px] h-11 px-8">
              RE-ORDER SERVICE
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Admin Status Controls */}
          {role === 'admin' && (
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-card">
              <h2 className="text-sm font-black uppercase tracking-widest text-primary mb-4">Admin Controls</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-foreground text-xs font-bold uppercase tracking-wider">Update Status</Label>
                  <Select value={orderStatus} onValueChange={handleStatusUpdate}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-foreground text-xs font-bold uppercase tracking-wider">Progress (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    className="mt-1"
                    value={orderProgress}
                    onChange={e => handleProgressUpdate(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Progress Card */}
          <div className="rounded-2xl border border-border/50 bg-card p-8 md:p-10 shadow-card overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors pointer-events-none" />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
              <div className="space-y-6 flex-1">
                <div className="space-y-2">
                  <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground/60">Fulfillment Status</h2>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black font-sans tracking-tighter text-foreground">{order.progress}%</span>
                    <span className="text-sm font-bold text-muted-foreground uppercase opacity-40">Complete</span>
                  </div>
                </div>
                <div className="relative pt-8 pb-4">
                  <div className="absolute left-[11px] top-8 bottom-4 w-0.5 bg-secondary" />
                  <div className="space-y-8 relative">
                    {[
                      { step: 'Order Received', status: 'completed', desc: 'Campaign log initialized' },
                      { step: 'Processing', status: order.progress > 0 ? 'completed' : 'pending', desc: 'Allocating specialized assets' },
                      { step: 'In Fulfillment', status: order.status === 'in_progress' ? 'active' : order.status === 'completed' ? 'completed' : 'pending', desc: 'Active Reddit engagement ongoing' },
                      { step: 'Final Verification', status: order.status === 'completed' ? 'completed' : 'pending', desc: 'Quality audit and completion sync' }
                    ].map((s, i) => (
                      <div key={i} className="flex gap-4 items-start pl-1">
                        <div className={`h-[22px] w-[22px] rounded-full border-4 flex items-center justify-center relative z-10 bg-card transition-colors ${
                          s.status === 'completed' ? 'border-primary bg-primary' :
                          s.status === 'active' ? 'border-primary bg-card animate-pulse' : 'border-secondary'
                        }`}>
                          {s.status === 'completed' && <CheckCircle2 className="h-3 w-3 text-white" />}
                        </div>
                        <div className="space-y-0.5">
                          <p className={`text-sm font-black uppercase tracking-widest ${s.status === 'pending' ? 'text-muted-foreground/40' : 'text-foreground'}`}>{s.step}</p>
                          <p className="text-[10px] font-bold text-muted-foreground/60">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 flex flex-col items-center justify-center p-8 bg-secondary/10 rounded-3xl border border-border/50 min-w-[220px]">
                <div className="relative h-32 w-32 mb-4">
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle className="text-secondary stroke-current" strokeWidth="8" fill="transparent" r="40" cx="50" cy="50" />
                    <motion.circle
                      className="text-primary stroke-current"
                      strokeWidth="8"
                      strokeLinecap="round"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      initial={{ strokeDasharray: "251.2", strokeDashoffset: "251.2" }}
                      animate={{ strokeDashoffset: `${251.2 - (251.2 * order.progress) / 100}` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Activity className={`h-8 w-8 text-primary ${order.status === 'in_progress' ? 'animate-pulse' : ''}`} />
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Target Velocity</p>
                  <p className="text-lg font-black font-sans text-foreground">Standard Delivery</p>
                </div>
              </div>
            </div>
          </div>

          {/* Details Card */}
          <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
            <div className="p-6 border-b border-border/50 bg-secondary/10">
              <h2 className="text-lg font-semibold font-sans text-foreground">Order Details</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                {details.map(d => (
                  <div key={d.label} className="space-y-1.5">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <d.icon className="h-4 w-4" />
                      <span className="text-xs font-medium uppercase tracking-wider">{d.label}</span>
                    </div>
                    {d.isLink ? (
                      <a
                        href={d.value.startsWith('http') ? d.value : `https://reddit.com/${d.value}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium text-primary hover:underline flex items-center gap-1 group"
                      >
                        <span className="truncate max-w-[200px]">{d.value}</span>
                        <ExternalLink className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <p className={`text-sm font-medium ${d.label === 'Total Price' ? 'text-lg font-bold text-foreground font-mono' : 'text-foreground'}`}>
                        {d.value}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* Summary Card */}
          <div className="rounded-2xl border border-border/50 bg-card shadow-card overflow-hidden">
            <div className="p-6 bg-secondary/10 border-b border-border/50 flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              <h3 className="text-[10px] font-black uppercase tracking-widest text-foreground">Pricing Context</h3>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex justify-between items-center group">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Base Service</span>
                <span className="text-xs font-bold font-sans text-foreground">{order.serviceName}</span>
              </div>
              <div className="flex justify-between items-center group">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Campaign Size</span>
                <span className="text-xs font-bold font-sans text-foreground">{order.quantity.toLocaleString()} Units</span>
              </div>
              <div className="flex justify-between items-center group">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Client</span>
                <span className="text-xs font-bold font-sans text-foreground">{order.clientName}</span>
              </div>
              <div className="pt-5 border-t border-border/50 flex justify-between items-end">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 grayscale opacity-50">
                    <CheckCircle2 className="h-3 w-3 text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-tighter">SECURE</span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Total Value</span>
                </div>
                <div className="text-3xl font-black font-mono tracking-tighter text-primary">
                  ${order.totalPrice.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {/* Security Banner */}
          <div className="rounded-2xl bg-secondary/20 p-6 border border-border/50 flex items-start gap-4">
            <div className="h-10 w-10 shrink-0 rounded-xl bg-card border border-border/50 flex items-center justify-center">
              <LockIcon className="h-5 w-5 text-muted-foreground/40" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-foreground uppercase tracking-widest">Protected Order</p>
              <p className="text-[10px] text-muted-foreground leading-relaxed">This campaign is backed by our security protocols and money-back guarantee.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderDetailView;
