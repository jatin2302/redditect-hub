import { useState } from 'react';
import { services, Service } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Pencil, Star } from 'lucide-react';
import { toast } from 'sonner';

const AdminServices = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Manage Services</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary text-primary-foreground gap-2"><Plus className="h-4 w-4" /> Add Service</Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader><DialogTitle className="text-foreground">Add New Service</DialogTitle></DialogHeader>
            <div className="space-y-3 pt-2">
              <div><Label className="text-foreground">Name</Label><Input className="mt-1" /></div>
              <div><Label className="text-foreground">Category</Label><Input className="mt-1" /></div>
              <div><Label className="text-foreground">Description</Label><Textarea className="mt-1" rows={3} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="text-foreground">Price ($)</Label><Input type="number" className="mt-1" /></div>
                <div><Label className="text-foreground">Unit</Label><Input placeholder="per 100" className="mt-1" /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="text-foreground">Min Order</Label><Input type="number" className="mt-1" /></div>
                <div><Label className="text-foreground">Max Order</Label><Input type="number" className="mt-1" /></div>
              </div>
              <Button className="w-full bg-gradient-primary text-primary-foreground" onClick={() => toast.success('Service created!')}>Create Service</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border border-border bg-card shadow-card overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Service</TableHead>
              <TableHead className="text-muted-foreground">Category</TableHead>
              <TableHead className="text-muted-foreground">Price</TableHead>
              <TableHead className="text-muted-foreground">Min/Max</TableHead>
              <TableHead className="text-muted-foreground">ETA</TableHead>
              <TableHead className="text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map(s => (
              <TableRow key={s.id} className="border-border">
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
                <TableCell><Button variant="outline" size="sm" className="gap-1"><Pencil className="h-3 w-3" /> Edit</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminServices;
