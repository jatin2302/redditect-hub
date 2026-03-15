import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

interface TrustBadgesProps {
  className?: string;
}

const TrustBadges = ({ className = "" }: TrustBadgesProps) => {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-6 ${className}`}>
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-secondary/30 px-3 py-1.5 rounded-full border border-border/50">
        <Lock className="h-4 w-4 text-[hsl(var(--upvote))]" />
        <span>SSL Secure Payment</span>
      </div>
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-secondary/30 px-3 py-1.5 rounded-full border border-border/50">
        <ShieldCheck className="h-4 w-4 text-info" />
        <span>Buyer Protection</span>
      </div>
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-secondary/30 px-3 py-1.5 rounded-full border border-border/50">
        <CheckCircle2 className="h-4 w-4 text-success" />
        <span>Guaranteed Delivery</span>
      </div>
    </div>
  );
};

export default TrustBadges;
