import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ServicesPage from "./pages/ServicesPage.tsx";
import NewOrderPage from "./pages/NewOrderPage.tsx";
import ClientOrders from "./pages/ClientOrders.tsx";
import WalletPage from "./pages/WalletPage.tsx";
import SupportPage from "./pages/SupportPage.tsx";
import ClientProfile from "./pages/ClientProfile.tsx";
import OrderDetailView from "./pages/OrderDetailView.tsx";
import AdminOrders from "./pages/AdminOrders.tsx";
import AdminServices from "./pages/AdminServices.tsx";
import AdminClients from "./pages/AdminClients.tsx";
import AdminTickets from "./pages/AdminTickets.tsx";
import AdminSettings from "./pages/AdminSettings.tsx";
import ClientDetailView from "./pages/ClientDetailView.tsx";

const queryClient = new QueryClient();

const LayoutWrap = ({ children }: { children: React.ReactNode }) => (
  <DashboardLayout>{children}</DashboardLayout>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<LayoutWrap><ServicesPage /></LayoutWrap>} />
            <Route path="/new-order" element={<LayoutWrap><NewOrderPage /></LayoutWrap>} />
            <Route path="/orders" element={<LayoutWrap><ClientOrders /></LayoutWrap>} />
            <Route path="/orders/:orderId" element={<LayoutWrap><OrderDetailView /></LayoutWrap>} />
            <Route path="/wallet" element={<LayoutWrap><WalletPage /></LayoutWrap>} />
            <Route path="/support" element={<LayoutWrap><SupportPage /></LayoutWrap>} />
            <Route path="/profile" element={<LayoutWrap><ClientProfile /></LayoutWrap>} />
            <Route path="/admin/orders" element={<LayoutWrap><AdminOrders /></LayoutWrap>} />
            <Route path="/admin/orders/:orderId" element={<LayoutWrap><OrderDetailView /></LayoutWrap>} />
            <Route path="/admin/services" element={<LayoutWrap><AdminServices /></LayoutWrap>} />
            <Route path="/admin/clients" element={<LayoutWrap><AdminClients /></LayoutWrap>} />
            <Route path="/admin/clients/:clientId" element={<LayoutWrap><ClientDetailView /></LayoutWrap>} />
            <Route path="/admin/tickets" element={<LayoutWrap><AdminTickets /></LayoutWrap>} />
            <Route path="/admin/settings" element={<LayoutWrap><AdminSettings /></LayoutWrap>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
