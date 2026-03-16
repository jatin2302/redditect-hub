import { useState } from 'react';
import { services as initialServices, Service } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Pencil, Star } from 'lucide-react';
import { toast } from 'sonner';

interface ServiceWithEnabled extends Service {
  enabled: boolean;
}

const AdminServices = () => {
  const [servicesList, setServicesList] = useState<ServiceWithEnabled[]>(
    initialServices.map(s => ({ ...s, enabled: true }))
  );
  const [editService, setEditService] = useState<ServiceWithEnabled | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const [form, setForm] = useState({ name: '', category: '', description: '', price: '', unit: '', minOrder: '', maxOrder: '' });

  const resetForm = () => setForm({ name: '', category: '', description: '', price: '', unit: '', minOrder: '', maxOrder: '' });

  const openEdit = (s: ServiceWithEnabled) => {
    setEditService(s);
    setForm({
      name: s.name,
      category: s.category,
      description: s.description,
      price: s.price.toString(),
      unit: s.unit,
      minOrder: s.minOrder.toString(),
      maxOrder: s.maxOrder.toString(),
    });
    setEditOpen(true);
  };

  const handleCreate = () => {
    if (!form.name || !form.price) { toast.error('Name and price are required'); return; }
    const newService: ServiceWithEnabled = {
      id: `s${Date.now()}`,
      name: form.name,
      category: form.category,
      description: form.description,
      price: parseFloat(form.price) || 0,
      unit: form.unit,
      minOrder: parseInt(form.minOrder) || 1,
      maxOrder: parseInt(form.maxOrder) || 1000,
      estimatedTime: '1-3 days',
      enabled: true,
    };
    setServicesList(prev => [...prev, newService]);
    resetForm();
    toast.success('Service created!');
  };

  const handleUpdate = () => {
    if (!editService || !form.name || !form.price) { toast.error('Name and price are required'); return; }
    setServicesList(prev => prev.map(s => s.id === editService.id ? {
      ...s,
      name: form.name,
      category: form.category,
      description: form.description,
      price: parseFloat(form.price) || 0,
      unit: form.unit,
      minOrder: parseInt(form.minOrder) || 1,
      maxOrder: parseInt(form.maxOrder) || 1000,
    } : s));
    setEditOpen(false);
    setEditService(null);
    resetForm();
    toast.success('Service updated!');
  };

  const toggleEnabled = (id: string) => {
    setServicesList(prev => prev.map(s => {
      if (s.id === id) {
        const newState = !s.enabled;
        toast.success(`${s.name} ${newState ? 'enabled' : 'disabled'}`);
        return { ...s, enabled: newState };
      }
      return s;
    }));
  };

  const ServiceForm = ({ onSubmit, submitLabel }: { onSubmit: () => void; submitLabel: string }) => (
    <div className="space-y-3 pt-2">
      <div><Label className="text-foreground">Name</Label><Input className="mt-1" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
      <div><Label className="text-foreground">Category</Label><Input className="mt-1" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} /></div>
      <div><Label className="text-foreground">Description</Label><Textarea className="mt-1" rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label className="text-foreground">Price ($)</Label><Input type="number" className="mt-1" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} /></div>
        <div><Label className="text-foreground">Unit</Label><Input placeholder="per 100" className="mt-1" value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label className="text-foreground">Min Order</Label><Input type="number" className="mt-1" value={form.minOrder} onChange={e => setForm(f => ({ ...f, minOrder: e.target.value }))} /></div>
        <div><Label className="text-foreground">Max Order</Label><Input type="number" className="mt-1" value={form.maxOrder} onChange={e => setForm(f => ({ ...f, maxOrder: e.target.value }))} /></div>
      </div>
      <Button className="w-full bg-gradient-primary text-primary-foreground" onClick={onSubmit}>{submitLabel}</Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manage Services</h1>
          <p className="text-sm text-muted-foreground">{servicesList.filter(s => s.enabled).length} active / {servicesList.length} total</p>
        </div>
        <Dialog onOpenChange={(open) => { if (open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary text-primary-foreground gap-2"><Plus className="h-4 w-4" /> Add Service</Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader><DialogTitle className="text-foreground">Add New Service</DialogTitle></DialogHeader>
            <ServiceForm onSubmit={handleCreate} submitLabel="Create Service" />
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader><DialogTitle className="text-foreground">Edit Service</DialogTitle></DialogHeader>
          <ServiceForm onSubmit={handleUpdate} submitLabel="Save Changes" />
        </DialogContent>
      </Dialog>

      <div className="rounded-lg border border-border bg-card shadow-card overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground w-[60px]">Active</TableHead>
              <TableHead className="text-muted-foreground">Service</TableHead>
              <TableHead className="text-muted-foreground">Category</TableHead>
              <TableHead className="text-muted-foreground">Price</TableHead>
              <TableHead className="text-muted-foreground">Min/Max</TableHead>
              <TableHead className="text-muted-foreground">ETA</TableHead>
              <TableHead className="text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {servicesList.map(s => (
              <TableRow key={s.id} className={`border-border ${!s.enabled ? 'opacity-50' : ''}`}>
                <TableCell>
                  <Switch checked={s.enabled} onCheckedChange={() => toggleEnabled(s.id)} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{s.name}</span>
                    {s.popular && <Star className="h-3 w-3 text-primary fill-primary" />}
                  </div>
                </TableCell>
                <TableCell><Badge variant="outline">{s.category}</Badge></TableCell>
                <TableCell className="font-semibold text-foreground">${s.price.toFixed(2)} <span className="text-xs text-muted-foreground font-normal">{s.unit}</span></TableCell>
                <TableCell className="text-muted-foreground text-sm">{s.minOrder} — {s.maxOrder.toLocaleString()}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{s.estimatedTime}</TableCell>
                <TableCell><Button variant="outline" size="sm" className="gap-1" onClick={() => openEdit(s)}><Pencil className="h-3 w-3" /> Edit</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminServices;
