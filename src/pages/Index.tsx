import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import ClientDashboard from '@/pages/ClientDashboard';
import AdminDashboard from '@/pages/AdminDashboard';

const Index = () => {
  const { role } = useAuth();
  return (
    <DashboardLayout>
      {role === 'admin' ? <AdminDashboard /> : <ClientDashboard />}
    </DashboardLayout>
  );
};

export default Index;
