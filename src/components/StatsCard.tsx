import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  variant?: 'default' | 'primary' | 'accent';
}

const StatsCard = ({ title, value, icon: Icon, trend, trendUp, variant = 'default' }: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg border border-border p-5 shadow-card ${
        variant === 'primary' ? 'bg-gradient-primary' : variant === 'accent' ? 'bg-gradient-accent' : 'bg-card'
      }`}
    >
      <div className="flex items-center justify-between">
        <p className={`text-sm ${variant !== 'default' ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
          {title}
        </p>
        <Icon className={`h-5 w-5 ${variant !== 'default' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`} />
      </div>
      <p className={`mt-2 text-2xl font-bold ${variant !== 'default' ? 'text-primary-foreground' : 'text-foreground'}`}>
        {value}
      </p>
      {trend && (
        <p className={`mt-1 text-xs ${
          variant !== 'default'
            ? 'text-primary-foreground/70'
            : trendUp ? 'text-success' : 'text-destructive'
        }`}>
          {trend}
        </p>
      )}
    </motion.div>
  );
};

export default StatsCard;
