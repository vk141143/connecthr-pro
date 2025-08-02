import { useAuth } from '@/contexts/AuthContext';
import EmployeeDashboard from './EmployeeDashboard';
import HRDashboard from './HRDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  switch (user.role) {
    case 'employee':
      return <EmployeeDashboard />;
    case 'hr':
      return <HRDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <EmployeeDashboard />;
  }
};

export default Dashboard;