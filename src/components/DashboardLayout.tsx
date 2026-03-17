import { ReactNode, useEffect, useRef } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Bell, Search, ChevronRight, Plus } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  // Simple breadcrumb generator
  const pathnames = location.pathname.split('/').filter((x) => x);
  
  // Keyboard shortcut listener for Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 flex items-center border-b border-border/40 px-6 bg-background/60 backdrop-blur-xl sticky top-0 z-20 transition-all shadow-sm">
            <SidebarTrigger className="mr-4" />
            
            {/* Breadcrumbs */}
            <div className="hidden lg:flex items-center text-sm text-muted-foreground mr-8 shrink-0">
              <span className="capitalize hover:text-foreground cursor-pointer transition-colors duration-200">
                {pathnames.length ? pathnames[0].replace('-', ' ') : 'Dashboard'}
              </span>
              {pathnames.length > 1 && (
                <>
                  <ChevronRight className="h-4 w-4 mx-2 opacity-40 shrink-0" />
                  <span className="capitalize text-foreground font-semibold truncate max-w-[150px]">
                    {pathnames[1].replace('-', ' ')}
                  </span>
                </>
              )}
            </div>
            
            <div className="flex-1 flex items-center max-w-lg px-2">
              {/* Search Bar */}
              <div className="relative w-full max-w-sm hidden md:flex items-center group">
                <Search className="absolute left-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                <Input 
                  ref={searchInputRef}
                  type="search" 
                  placeholder="Ask or search Anything..." 
                  className="w-full bg-secondary/30 border-border/50 pl-10 pr-12 focus-visible:ring-2 focus-visible:ring-primary/40 h-10 rounded-xl shadow-inner transition-all duration-300 group-hover:bg-secondary/50 group-hover:border-primary/20" 
                />
                <div className="absolute right-3 flex items-center pointer-events-none">
                  <kbd className="inline-flex items-center rounded border border-border/60 bg-background/80 px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground shadow-sm">
                    <span className="text-xs mr-0.5">⌘</span>K
                  </kbd>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              {/* Wallet Chip - Only show for clients */}
              {!isAdminRoute && (
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="hidden sm:flex items-center gap-2.5 bg-gradient-to-br from-secondary/50 to-secondary/30 hover:to-secondary/50 transition-all duration-200 rounded-xl px-4 py-2 border border-border/50 cursor-pointer shadow-sm group"
                >
                  <div className="flex flex-col items-start leading-none gap-1">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold opacity-70 group-hover:opacity-100 transition-opacity">Balance</span>
                    <span className="text-sm font-black text-foreground">$1,250.00</span>
                  </div>
                  <div className="h-6 w-[1px] bg-border/50 mx-1" />
                  <Button size="icon" variant="ghost" className="h-6 w-6 rounded-lg text-primary hover:bg-primary/10">
                    <Plus className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
              
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl hover:bg-secondary/80 border border-transparent hover:border-border/50 transition-all group">
                <Bell className="h-5 w-5 text-foreground/80 group-hover:text-primary transition-colors" />
                <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background animate-pulse"></span>
              </Button>
              
              <ThemeToggle />
            </div>
          </header>
          <main className="flex-1 p-6 md:p-8 xl:p-10 overflow-auto bg-background/30 relative">
            {/* Subtle background texture */}
            <div className="absolute inset-0 bg-reddit-pattern pointer-events-none opacity-40 z-[-1]" />
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
