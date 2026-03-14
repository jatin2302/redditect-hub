import {
  LayoutDashboard, ShoppingCart, Package, Wallet, MessageSquare,
  Users, Settings, Zap, ArrowLeftRight, UserCircle
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarFooter, useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const clientNav = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Services', url: '/services', icon: Zap },
  { title: 'My Orders', url: '/orders', icon: Package },
  { title: 'Wallet', url: '/wallet', icon: Wallet },
  { title: 'Support', url: '/support', icon: MessageSquare },
  { title: 'My Profile', url: '/profile', icon: UserCircle },
];

const adminNav = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Orders', url: '/admin/orders', icon: Package },
  { title: 'Services', url: '/admin/services', icon: Zap },
  { title: 'Clients', url: '/admin/clients', icon: Users },
  { title: 'Tickets', url: '/admin/tickets', icon: MessageSquare },
  { title: 'Settings', url: '/admin/settings', icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const { role, setRole, userName } = useAuth();
  const location = useLocation();
  const items = role === 'admin' ? adminNav : clientNav;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className={`px-4 py-5 ${collapsed ? 'px-2' : ''}`}>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            {!collapsed && (
              <span className="text-lg font-bold text-foreground">RedditBoost</span>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>{role === 'admin' ? 'Admin Panel' : 'Client Panel'}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === '/'}
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        {!collapsed && (
          <div className="mb-2 rounded-md bg-secondary p-3">
            <p className="text-xs text-muted-foreground">Logged in as</p>
            <p className="text-sm font-medium text-foreground">{userName}</p>
            <p className="text-xs text-muted-foreground capitalize">{role}</p>
          </div>
        )}
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2 text-xs"
          onClick={() => setRole(role === 'admin' ? 'client' : 'admin')}
        >
          <ArrowLeftRight className="h-3 w-3" />
          {!collapsed && `Switch to ${role === 'admin' ? 'Client' : 'Admin'}`}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
