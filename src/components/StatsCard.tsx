import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  variant?: 'default' | 'primary' | 'accent';
  action?: React.ReactNode;
  pulse?: boolean;
}

const StatsCard = ({ title, value, icon: Icon, trend, trendUp, variant = 'default', action, pulse }: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-xl border border-border p-5 shadow-card ${
        variant === 'primary' ? 'bg-gradient-primary' : variant === 'accent' ? 'bg-gradient-accent' : 'bg-card'
      }`}
    >
      <div className="flex items-center justify-between">
        <p className={`text-sm font-medium ${variant !== 'default' ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>
          {title}
        </p>
        <div className="flex items-center gap-2">
          {pulse && <span className="relative flex h-2.5 w-2.5 mr-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
          </span>}
          <div className={`p-2 rounded-lg ${variant !== 'default' ? 'bg-white/20 text-white' : 'bg-secondary text-muted-foreground'}`}>
            <Icon className="h-4 w-4" />
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className={`text-3xl font-bold font-sans tracking-tight ${variant !== 'default' ? 'text-white' : 'text-foreground'}`}>
            {value}
          </p>
          {trend && (
            <p className={`mt-1 text-xs font-medium ${
              variant !== 'default'
                ? 'text-white/80'
                : trendUp ? 'text-success' : 'text-destructive'
            }`}>
              {trend}
            </p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
    </motion.div>
  );
};

export default StatsCard;
