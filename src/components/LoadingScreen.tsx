import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export const LoadingScreen = () => {
  return (
    <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
        <Loader2 className="h-10 w-10 text-[hsl(var(--upvote))]" />
      </motion.div>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg font-medium text-muted-foreground"
      >
        Loading...
      </motion.p>
    </div>
  );
};
