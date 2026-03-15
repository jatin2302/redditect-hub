import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Package, 
  ShieldCheck, 
  Zap,
  Lock,
  Clock,
  RefreshCw,
  FileText,
  Gauge
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { services } from '@/lib/mock-data';

const steps = [
  { id: 1, title: 'Select Service' },
  { id: 2, title: 'Configure' },
  { id: 3, title: 'Review & Pay' }
];

// Services that need a textarea for custom text input
const TEXT_INPUT_SERVICES = ['s4', 's15', 's8', 's20']; // Custom Post, Comment Writing, Cross-posting, Community Seeding
// Services that need a subreddit name (not a URL)
const SUBREDDIT_INPUT_SERVICES = ['s1', 's5', 's12']; // Subreddit Members, Moderation, Creation
// Services that need a username
const USERNAME_INPUT_SERVICES = ['s6', 's11']; // Karma Boost, Account Aging

const NewOrderPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [url, setUrl] = useState('');
  const [quantity, setQuantity] = useState(100);
  const [notes, setNotes] = useState('');
  const [dripFeedEnabled, setDripFeedEnabled] = useState(false);
  const [dripFeedHours, setDripFeedHours] = useState(12);
  const [customText, setCustomText] = useState('');

  // Pre-select service from query param (from ServicesPage "Order Now" button)
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam && services.find(s => s.id === serviceParam)) {
      setSelectedServiceId(serviceParam);
      setCurrentStep(2); // Skip step 1 if service is pre-selected
    }
  }, [searchParams]);

  const selectedService = services.find(s => s.id === selectedServiceId);

  // Dynamic input type based on service
  const inputConfig = useMemo(() => {
    if (!selectedServiceId) return { label: 'Target Reddit URL', placeholder: 'https://reddit.com/r/...', helpText: '' };
    if (SUBREDDIT_INPUT_SERVICES.includes(selectedServiceId)) {
      return { label: 'Target Subreddit', placeholder: 'r/YourSubreddit', helpText: 'Enter the subreddit name (e.g., r/technology)' };
    }
    if (USERNAME_INPUT_SERVICES.includes(selectedServiceId)) {
      return { label: 'Target Reddit Username', placeholder: 'u/username', helpText: 'Enter the Reddit username to boost' };
    }
    return { label: 'Target Reddit URL', placeholder: 'https://reddit.com/r/subreddit/comments/...', helpText: 'Ensure the post is not removed or locked before ordering.' };
  }, [selectedServiceId]);

  const needsCustomText = TEXT_INPUT_SERVICES.includes(selectedServiceId);

  const getPricePerUnit = (service: any) => {
    return service.price / (service.unit.includes('100') ? 100 : service.unit.includes('1000') ? 1000 : 1);
  };

  const calculateTotal = () => {
    if (!selectedService) return 0;
    return (getPricePerUnit(selectedService) * quantity).toFixed(2);
  };

  const handleNext = () => {
    if (currentStep === 1 && !selectedServiceId) {
      toast.error('Please select a service');
      return;
    }
    if (currentStep === 2 && (!url || !quantity)) {
      toast.error('Please fill in all required details');
      return;
    }
    if (currentStep === 2 && needsCustomText && !customText.trim()) {
      toast.error('Please provide the custom text content');
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      handleNext();
      return;
    }
    
    toast.success('Order placed successfully! 🚀', {
      description: `Your order for ${quantity} ${selectedService?.name} has been received. Starting within ${selectedService?.estimatedTime}.`
    });
    navigate('/orders');
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8 font-sans">
        <Link to="/services" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
        </Link>
        <h1 className="text-3xl font-black tracking-tight text-foreground">Place New Order</h1>
        <p className="text-muted-foreground mt-2 font-medium">Create a new boost order in just a few steps.</p>
      </div>

      {/* Progress Stepper */}
      <div className="mb-12 relative px-4">
        <div className="absolute left-8 right-8 top-5 h-1 bg-secondary/50 rounded-full" />
        <div 
          className="absolute left-8 top-5 h-1 bg-primary rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `calc(${((currentStep - 1) / (steps.length - 1)) * 100}% - 16px)` }}
        />
        
        <div className="relative flex justify-between">
          {steps.map((step) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div 
                  className={`z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-black border-2 transition-all duration-300 ${
                    isActive 
                      ? 'bg-card border-primary text-primary shadow-[0_0_20px_rgba(255,69,0,0.35)] scale-110' 
                      : isCompleted 
                        ? 'bg-primary border-primary text-primary-foreground' 
                        : 'bg-card border-border text-muted-foreground'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : step.id}
                </div>
                <span className={`mt-3 text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-card border border-border/80 rounded-2xl shadow-card overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="p-6 md:p-10 min-h-[420px]">
             <AnimatePresence mode="wait">
               {currentStep === 1 && (
                 <motion.div
                   key="step1"
                   initial={{ opacity: 0, scale: 0.98, y: 10 }}
                   animate={{ opacity: 1, scale: 1, y: 0 }}
                   exit={{ opacity: 0, scale: 0.98, y: -10 }}
                   transition={{ duration: 0.3 }}
                   className="space-y-8"
                 >
                   <div className="flex items-center gap-3">
                     <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <Package className="h-4 w-4" />
                     </div>
                     <h2 className="text-xl font-black font-sans text-foreground tracking-tight">Select a Boost Service</h2>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {services.map(service => (
                       <motion.div 
                         key={service.id}
                         whileHover={{ y: -2 }}
                         whileTap={{ scale: 0.98 }}
                         onClick={() => setSelectedServiceId(service.id)}
                         className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all ${
                           selectedServiceId === service.id 
                             ? 'border-primary bg-primary/[0.03] shadow-[0_0_0_1px_rgba(255,69,0,0.2)]' 
                             : 'border-border/50 bg-background hover:border-primary/40 hover:bg-secondary/10'
                         }`}
                       >
                         {selectedServiceId === service.id && (
                           <motion.div 
                             initial={{ scale: 0 }} 
                             animate={{ scale: 1 }}
                             className="absolute top-3 right-3 text-primary"
                           >
                             <CheckCircle2 className="h-6 w-6 fill-primary/10" />
                           </motion.div>
                         )}
                         <div className="flex items-center gap-3 mb-3">
                           <div className={`p-2 rounded-lg transition-colors ${selectedServiceId === service.id ? 'bg-primary text-white shadow-glow' : 'bg-secondary text-muted-foreground'}`}>
                             {service.name.includes('Upvote') || service.name.includes('Downvote') ? <Zap className="h-4 w-4" /> : <Package className="h-4 w-4" />}
                           </div>
                           <h3 className="font-bold text-foreground font-sans tracking-tight">{service.name}</h3>
                         </div>
                         <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{service.description}</p>
                         <div className="flex items-center justify-between mt-auto">
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Starting from</span>
                            <p className="text-sm font-black font-mono text-foreground">
                              ${service.price.toFixed(2)} <span className="text-[10px] font-sans font-medium text-muted-foreground/60 tracking-normal">/{service.unit}</span>
                            </p>
                         </div>
                       </motion.div>
                     ))}
                   </div>
                 </motion.div>
               )}

               {currentStep === 2 && (
                 <motion.div
                   key="step2"
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   transition={{ duration: 0.3 }}
                   className="space-y-8 max-w-xl mx-auto"
                 >
                   <div className="text-center space-y-2">
                     <h2 className="text-2xl font-black font-sans text-foreground tracking-tight">Configure Your Boost</h2>
                     <p className="text-muted-foreground font-medium">Powering up {selectedService?.name}</p>
                   </div>
                   
                   {/* Dynamic target input */}
                   <div className="space-y-3">
                     <Label htmlFor="url" className="text-xs font-black uppercase tracking-widest text-muted-foreground/80">{inputConfig.label}</Label>
                     <Input 
                       id="url"
                       type="text"
                       placeholder={inputConfig.placeholder}
                       value={url}
                       onChange={(e) => setUrl(e.target.value)}
                       className="h-14 bg-background border-border focus:border-primary focus:ring-primary/20 rounded-xl text-base font-medium transition-all"
                       required
                     />
                     {inputConfig.helpText && (
                       <p className="text-[10px] font-bold text-muted-foreground/60 italic px-1">{inputConfig.helpText}</p>
                     )}
                   </div>

                   {/* Custom text input for content services */}
                   {needsCustomText && (
                     <div className="space-y-3">
                       <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/80 flex items-center gap-2">
                         <FileText className="h-3.5 w-3.5" /> Custom Text / Instructions
                       </Label>
                       <Textarea
                         placeholder={selectedServiceId === 's15' 
                           ? "Enter the comments you want posted (one per line)..." 
                           : "Enter the post content or detailed instructions..."
                         }
                         value={customText}
                         onChange={(e) => setCustomText(e.target.value)}
                         className="bg-background border-border focus:border-primary focus:ring-primary/20 rounded-xl text-sm font-medium resize-none min-h-[120px]"
                         rows={5}
                         required
                       />
                       <p className="text-[10px] font-bold text-muted-foreground/60 px-1">{customText.length} characters</p>
                     </div>
                   )}

                   {/* Quantity slider */}
                   <div className="space-y-6 pt-4">
                     <div className="flex justify-between items-end border-b border-border/50 pb-2">
                       <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/80">Quantity</Label>
                       <div className="text-right flex flex-col items-end">
                         <span className="text-3xl font-black font-mono text-primary leading-none">{quantity}</span>
                         <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tighter">Adjust slider below</span>
                       </div>
                     </div>
                     
                     <div className="px-2 pt-4">
                       <Slider 
                         min={selectedService?.minOrder || 10}
                         max={selectedService?.maxOrder || 5000}
                         step={selectedService?.minOrder === 1 ? 1 : 10}
                         value={[quantity]}
                         onValueChange={(val) => setQuantity(val[0])}
                         className="py-4"
                       />
                       <div className="flex justify-between text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-2">
                         <span>MIN: {selectedService?.minOrder}</span>
                         <span>MAX: {selectedService?.maxOrder}</span>
                       </div>
                     </div>

                     <div className="grid grid-cols-4 gap-2">
                       {[
                         selectedService?.minOrder || 100,
                         Math.round((selectedService?.maxOrder || 5000) * 0.1),
                         Math.round((selectedService?.maxOrder || 5000) * 0.25),
                         Math.round((selectedService?.maxOrder || 5000) * 0.5),
                       ].map(amt => (
                         <Button 
                           key={amt} 
                           type="button" 
                           variant="outline" 
                           size="sm"
                           onClick={() => setQuantity(amt)}
                           className={`h-10 rounded-lg text-xs font-black border-border transition-all ${quantity === amt ? 'bg-primary text-white border-primary shadow-glow ring-2 ring-primary/20' : 'hover:bg-secondary/50'}`}
                         >
                           {amt.toLocaleString()}
                         </Button>
                       ))}
                     </div>
                   </div>

                   {/* Drip-Feed Toggle */}
                   <div className="border border-border/60 rounded-xl p-5 space-y-4 bg-secondary/10">
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                         <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                           <Gauge className="h-4 w-4" />
                         </div>
                         <div>
                           <Label className="text-sm font-black text-foreground cursor-pointer">Drip-Feed Delivery</Label>
                           <p className="text-[10px] font-bold text-muted-foreground/60 mt-0.5">Spread delivery over time for natural-looking growth</p>
                         </div>
                       </div>
                       <Switch
                         checked={dripFeedEnabled}
                         onCheckedChange={setDripFeedEnabled}
                       />
                     </div>
                     
                     {dripFeedEnabled && (
                       <motion.div
                         initial={{ opacity: 0, height: 0 }}
                         animate={{ opacity: 1, height: 'auto' }}
                         className="space-y-3 pt-3 border-t border-border/50"
                       >
                         <div className="flex justify-between items-center">
                           <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/80">Deliver over</Label>
                           <span className="text-sm font-black font-mono text-primary">{dripFeedHours}h</span>
                         </div>
                         <Slider
                           min={1}
                           max={72}
                           step={1}
                           value={[dripFeedHours]}
                           onValueChange={(v) => setDripFeedHours(v[0])}
                         />
                         <div className="flex justify-between text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                           <span>1 hour</span>
                           <span>72 hours</span>
                         </div>
                       </motion.div>
                     )}
                   </div>

                   {/* Notes field */}
                   <div className="space-y-3">
                     <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground/80 flex items-center gap-2">
                       <FileText className="h-3.5 w-3.5" /> Special Instructions <span className="text-muted-foreground/40 font-medium normal-case tracking-normal">(optional)</span>
                     </Label>
                     <Textarea
                       placeholder="Any special instructions for this order..."
                       value={notes}
                       onChange={(e) => setNotes(e.target.value)}
                       className="bg-background border-border focus:border-primary focus:ring-primary/20 rounded-xl text-sm font-medium resize-none"
                       rows={3}
                     />
                   </div>
                 </motion.div>
               )}

               {currentStep === 3 && (
                 <motion.div
                   key="step3"
                   initial={{ opacity: 0, scale: 0.98, y: 10 }}
                   animate={{ opacity: 1, scale: 1, y: 0 }}
                   transition={{ duration: 0.3 }}
                   className="space-y-8 max-w-lg mx-auto"
                 >
                   <div className="text-center space-y-2">
                     <h2 className="text-2xl font-black font-sans text-foreground tracking-tight">Final Confirmation</h2>
                     <p className="text-muted-foreground font-medium">Review your order before deduction</p>
                   </div>

                    <div className="bg-background border border-border/80 rounded-2xl p-6 space-y-5 shadow-inner">
                      <div className="flex justify-between items-center pb-4 border-b border-border/50">
                        <span className="text-xs font-black uppercase text-muted-foreground/60 tracking-widest">Service Type</span>
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                             {selectedService?.name.includes('Upvote') ? <Zap className="h-3 w-3" /> : <Package className="h-3 w-3" />}
                          </div>
                          <span className="font-bold text-foreground font-sans">{selectedService?.name}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-border/50">
                        <span className="text-xs font-black uppercase text-muted-foreground/60 tracking-widest">Target</span>
                        <span className="font-mono text-xs text-foreground bg-secondary/30 px-2 py-1 rounded truncate max-w-[180px]" title={url}>{url}</span>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-border/50">
                        <span className="text-xs font-black uppercase text-muted-foreground/60 tracking-widest">Quantity</span>
                        <span className="font-black font-mono text-foreground text-lg">{quantity.toLocaleString()}</span>
                      </div>
                      {dripFeedEnabled && (
                        <div className="flex justify-between items-center pb-4 border-b border-border/50">
                          <span className="text-xs font-black uppercase text-muted-foreground/60 tracking-widest">Drip-Feed</span>
                          <span className="font-bold text-primary text-sm">Over {dripFeedHours} hours</span>
                        </div>
                      )}
                      {notes && (
                        <div className="pb-4 border-b border-border/50">
                          <span className="text-xs font-black uppercase text-muted-foreground/60 tracking-widest block mb-2">Notes</span>
                          <p className="text-sm text-foreground bg-secondary/20 rounded-lg p-3">{notes}</p>
                        </div>
                      )}
                      <div className="flex justify-between items-center pt-4">
                        <span className="font-black font-sans text-foreground">TOTAL PRICE</span>
                        <motion.span 
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          className="font-black font-mono text-3xl text-[hsl(var(--upvote))] drop-shadow-sm"
                        >
                          ${calculateTotal()}
                        </motion.span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-primary/[0.03] border border-primary/20 rounded-xl p-5 flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <ShieldCheck className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-foreground">Delivery Guarantee</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {dripFeedEnabled 
                              ? `Drip-feed delivery over ${dripFeedHours} hours. ` 
                              : `Standard delivery starting within ${selectedService?.estimatedTime}. `
                            }
                            30-day refill guarantee included. Your credits will be deducted instantly.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center gap-6 py-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                         <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground tracking-widest">
                            <Lock className="h-3.5 w-3.5" /> SECURE SSL
                         </div>
                         <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground tracking-widest">
                            <RefreshCw className="h-3.5 w-3.5" /> 30-DAY REFILL
                         </div>
                         <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground tracking-widest">
                            <CheckCircle2 className="h-3.5 w-3.5" /> GUARANTEED
                         </div>
                      </div>
                    </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>

          {/* Sticky footer with price */}
          <div className="bg-secondary/20 p-6 border-t border-border/50 flex justify-between items-center sticky bottom-0">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={handleBack}
              disabled={currentStep === 1}
              className="w-28 text-muted-foreground font-black uppercase tracking-widest hover:text-foreground disabled:opacity-30"
            >
              Back
            </Button>
            
            <div className="flex items-center gap-6">
              {selectedService && currentStep >= 2 && (
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Total</p>
                  <p className="text-xl font-black font-mono text-primary">${calculateTotal()}</p>
                </div>
              )}
              <Button 
                type="submit" 
                size="lg"
                className={`min-w-[160px] font-black uppercase tracking-widest shadow-glow h-14 rounded-xl transition-all active:scale-95 ${currentStep === 3 ? 'bg-success hover:bg-success/90 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-primary hover:bg-primary/90 text-white'}`}
              >
                {currentStep === 3 ? 'Confirm Order' : (
                  <>Next Step <ArrowRight className="ml-2 h-5 w-5" /></>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewOrderPage;
