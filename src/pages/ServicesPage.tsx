import { useState } from 'react';
import { motion } from 'framer-motion';
import { services, Service } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Zap, Star, Search } from 'lucide-react';
import { toast } from 'sonner';

const ServicesPage = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('All');
  const categories = ['All', ...new Set(services.map(s => s.category))];

  const filtered = services.filter(s =>
    (category === 'All' || s.category === category) &&
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Services</h1>
        <p className="text-sm text-muted-foreground">Browse our Reddit marketing services.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search services..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <Button key={c} variant={category === c ? 'default' : 'outline'} size="sm" onClick={() => setCategory(c)}>
              {c}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </div>
    </div>
  );
};

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const [quantity, setQuantity] = useState(service.minOrder);
  const total = (service.price / (service.unit.includes('100') ? 100 : service.unit.includes('1000') ? 1000 : 1)) * quantity;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-lg border border-border bg-card p-5 shadow-card hover:border-primary/30 transition-colors relative"
    >
      {service.popular && (
        <Badge className="absolute -top-2 right-3 bg-gradient-primary text-primary-foreground border-0 gap-1">
          <Star className="h-3 w-3" /> Popular
        </Badge>
      )}
      <div className="flex items-start gap-3 mb-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Zap className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">{service.name}</h3>
          <Badge variant="outline" className="text-xs mt-1">{service.category}</Badge>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{service.description}</p>

      <div className="flex items-baseline justify-between mb-4">
        <span className="text-2xl font-bold text-gradient-primary">${service.price.toFixed(2)}</span>
        <span className="text-xs text-muted-foreground">{service.unit}</span>
      </div>

      <div className="text-xs text-muted-foreground space-y-1 mb-4">
        <div className="flex justify-between"><span>Min: {service.minOrder}</span><span>Max: {service.maxOrder.toLocaleString()}</span></div>
        <div>⏱ {service.estimatedTime}</div>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90">Order Now</Button>
        </DialogTrigger>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Order: {service.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <Label className="text-foreground">Target URL / Subreddit</Label>
              <Input placeholder="e.g. r/YourSubreddit or full URL" className="mt-1" />
            </div>
            <div>
              <Label className="text-foreground">Quantity</Label>
              <Input type="number" min={service.minOrder} max={service.maxOrder} value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="mt-1" />
              <p className="text-xs text-muted-foreground mt-1">Min: {service.minOrder} — Max: {service.maxOrder.toLocaleString()}</p>
            </div>
            <div className="rounded-md bg-secondary p-3 flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="text-xl font-bold text-foreground">${total.toFixed(2)}</span>
            </div>
            <Button className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90" onClick={() => toast.success('Order placed successfully!')}>
              Confirm Order
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ServicesPage;
