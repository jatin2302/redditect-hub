import {
  LayoutDashboard, Package, Wallet, MessageSquare,
  Users, Settings, Zap, ArrowLeftRight, UserCircle, Plus, Activity,
  ChevronDown, LogOut, User
} from 'lucide-react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarFooter, useSidebar, SidebarMenuBadge
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

type NavItemType = {
  title: string;
  url: string;
  icon: React.ElementType;
  badge?: number;
};

type NavGroupType = {
  group: string;
  items: NavItemType[];
};

const clientNavGroups: NavGroupType[] = [
  {
    group: 'Main',
    items: [
      { title: 'Dashboard', url: '/', icon: LayoutDashboard },
    ]
  },
  {
    group: 'Orders & Services',
    items: [
      { title: 'Services', url: '/services', icon: Zap },
      { title: 'My Orders', url: '/orders', icon: Package, badge: 2 },
    ]
  },
  {
    group: 'Account',
    items: [
      { title: 'Wallet', url: '/wallet', icon: Wallet },
      { title: 'Support', url: '/support', icon: MessageSquare, badge: 1 },
      { title: 'My Profile', url: '/profile', icon: UserCircle },
    ]
  }
];

const adminNavGroups: NavGroupType[] = [
  {
    group: 'Main',
    items: [
      { title: 'Dashboard', url: '/admin/dashboard', icon: LayoutDashboard },
    ]
  },
  {
    group: 'Management',
    items: [
      { title: 'Orders', url: '/admin/orders', icon: Package },
      { title: 'Services', url: '/admin/services', icon: Zap },
      { title: 'Clients', url: '/admin/clients', icon: Users },
    ]
  },
  {
    group: 'System',
    items: [
      { title: 'Tickets', url: '/admin/tickets', icon: MessageSquare },
      { title: 'Settings', url: '/admin/settings', icon: Settings },
    ]
  }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const { role, setRole, userName, logout } = useAuth();
  const location = useLocation();
  const groups = role === 'admin' ? adminNavGroups : clientNavGroups;

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || 'RB';
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border/40">
      <SidebarContent>
        <div className={`px-6 py-8 ${collapsed ? 'px-2 flex justify-center' : ''}`}>
          <RouterNavLink to="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary shadow-glow ring-4 ring-primary/10">
              <Zap className="h-6 w-6 text-white fill-current" />
            </div>
            {!collapsed && (
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black text-foreground font-sans tracking-tight">RedditBoost</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold mt-1">Specialist</span>
              </div>
            )}
          </RouterNavLink>
        </div>

        {role === 'client' && (
          <div className={`px-4 mb-6 ${collapsed ? 'px-2' : ''}`}>
            {collapsed ? (
              <Button size="icon" className="w-10 h-10 mx-auto bg-primary hover:bg-primary/90 text-white rounded-xl shadow-glow transition-all" asChild>
                <RouterNavLink to="/new-order">
                  <Plus className="h-5 w-5" />
                </RouterNavLink>
              </Button>
            ) : (
              <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl shadow-glow font-bold py-6 group" asChild>
                <RouterNavLink to="/new-order">
                  <Plus className="mr-2 h-5 w-5 bg-white/20 rounded-lg p-0.5 group-hover:rotate-90 transition-transform duration-300" /> 
                  Place New Order
                </RouterNavLink>
              </Button>
            )}
          </div>
        )}

        {groups.map((section, idx) => (
          <SidebarGroup key={idx} className="px-3">
            {!collapsed && (
              <SidebarGroupLabel className="px-3 text-[10px] uppercase tracking-widest font-black text-muted-foreground/60 mb-2">
                {section.group}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const isActive = location.pathname === item.url || (item.url !== '/' && location.pathname.startsWith(item.url));
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        tooltip={item.title} 
                        isActive={isActive}
                        className={`
                          h-11 px-3 rounded-xl transition-all duration-200
                          ${isActive 
                            ? "bg-primary/10 text-primary font-bold shadow-sm" 
                            : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                          }
                        `}
                      >
                        <RouterNavLink to={item.url} className="flex items-center gap-3">
                          <item.icon className={`h-5 w-5 ${isActive ? "text-primary stroke-[2.5px]" : "stroke-[1.5px]"}`} />
                          {!collapsed && <span>{item.title}</span>}
                          {isActive && !collapsed && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
                          )}
                        </RouterNavLink>
                      </SidebarMenuButton>
                      {item.badge && !collapsed && (
                        <SidebarMenuBadge className="bg-primary text-white rounded-lg px-1.5 h-5 min-w-[20px] text-[10px] font-bold ring-2 ring-sidebar-background">
                          {item.badge}
                        </SidebarMenuBadge>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/40 bg-sidebar-background/50 backdrop-blur-sm">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className={`w-full h-14 p-2 justify-start gap-3 rounded-xl hover:bg-secondary/80 focus-visible:ring-0 ${collapsed ? 'justify-center' : ''}`}>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary font-black text-sm border border-primary/20">
                {getInitials(userName || 'User')}
              </div>
              {!collapsed && (
                <div className="flex flex-col flex-1 min-w-0 text-left">
                  <span className="text-sm font-bold text-foreground truncate">{userName}</span>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground/60">{role}</span>
                </div>
              )}
              {!collapsed && <ChevronDown className="h-4 w-4 text-muted-foreground/40" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end" className="w-56 rounded-xl border-border/50 shadow-xl p-1.5">
            <div className="md:hidden px-2 py-1.5">
              <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest px-2 pb-1 pt-1">Logged in as</p>
              <div className="flex items-center gap-2 px-2 pb-2 border-b border-border/40">
                <div className="h-6 w-6 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold">{getInitials(userName || 'User')}</div>
                <span className="text-sm font-bold truncate">{userName}</span>
              </div>
            </div>
            <DropdownMenuItem asChild className="rounded-lg cursor-pointer py-2.5">
              <RouterNavLink to="/profile" className="flex items-center gap-2">
                <User className="h-4 w-4" /> My Profile
              </RouterNavLink>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setRole(role === 'admin' ? 'client' : 'admin')} className="rounded-lg cursor-pointer py-2.5">
              <ArrowLeftRight className="h-4 w-4" /> 
              Switch to {role === 'admin' ? 'Client' : 'Admin'}
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1.5 bg-border/40" />
            <DropdownMenuItem onClick={logout} className="rounded-lg cursor-pointer py-2.5 text-destructive focus:bg-destructive/10 focus:text-destructive">
              <LogOut className="h-4 w-4" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
