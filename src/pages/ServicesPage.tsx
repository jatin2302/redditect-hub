import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, Zap, Star, TrendingUp, CheckCircle2, MessageSquare, Clock, RefreshCw, ShieldCheck } from 'lucide-react';
import { services } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const categoryIcons: Record<string, React.ElementType> = {
  Engagement: TrendingUp,
  Growth: Zap,
  Content: MessageSquare,
};

const ServicesPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Derive categories from actual data
  const categories = useMemo(() => {
    const cats = Array.from(new Set(services.map(s => s.category)));
    return ['All', ...cats];
  }, []);

  const filteredServices = services.filter(service => {
    const matchesCategory = activeCategory === 'All' || service.category === activeCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const getCategoryIcon = (cat: string) => {
    const Icon = categoryIcons[cat] || Zap;
    return <Icon className="h-6 w-6" />;
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold font-sans tracking-tight text-foreground mb-2">Our Services</h1>
          <p className="text-muted-foreground">Boost your Reddit presence with our premium, organic-looking engagement services. All actions are performed by high-karma aged accounts.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search services..." 
              className="pl-9 bg-card border-border shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0" onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2 rounded-full text-sm font-semibold font-sans whitespace-nowrap transition-all ${
              activeCategory === category 
                ? 'bg-[hsl(var(--upvote))] text-white shadow-glow' 
                : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground border border-border/50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredServices.length > 0 ? (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredServices.map(service => (
            <motion.div key={service.id} variants={item} className="flex flex-col rounded-xl border border-border bg-card shadow-card hover:shadow-glow hover:border-[hsl(var(--upvote))]/30 transition-all duration-300 overflow-hidden group">
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    {getCategoryIcon(service.category)}
                  </div>
                  <div className="flex items-center gap-2">
                    {service.popular && (
                      <span className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full">
                        <Star className="h-3 w-3 fill-amber-500" /> Popular
                      </span>
                    )}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold font-sans text-foreground mb-2 group-hover:text-[hsl(var(--upvote))] transition-colors">{service.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{service.description}</p>

                {/* Guarantee & delivery badges */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>Delivery: <span className="text-foreground font-semibold">{service.estimatedTime}</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <RefreshCw className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span className="text-foreground font-semibold">30-Day Refill Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span className="text-foreground font-semibold">Drip-feed available</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-border/50 bg-secondary/20 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Starting at</p>
                  <p className="text-2xl font-bold font-mono text-foreground">${service.price.toFixed(2)} <span className="text-xs font-sans text-muted-foreground font-medium">/{service.unit}</span></p>
                </div>
                <Button className="bg-foreground text-background hover:bg-[hsl(var(--upvote))] hover:text-white transition-colors" asChild>
                  <Link to={`/new-order?service=${service.id}`}>
                    Order Now
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-20 bg-card rounded-xl border border-border shadow-card">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-30" />
          <h3 className="text-lg font-bold font-sans text-foreground">No services found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your search or category filter.</p>
          <Button variant="outline" className="mt-6" onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
