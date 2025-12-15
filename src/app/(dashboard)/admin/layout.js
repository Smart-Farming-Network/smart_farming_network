import DashboardLayout from '../DashboardLayout';
import { requireRole } from '@/libs/authGuard';

// Server Component – hard guard
export default async function FarmersLayout({ children }) {
  await requireRole(['ADMIN']);

  const adminMenu = [
    { label: 'Overview', icon: 'fa fa-home', href: '/admin' },
    { label: 'Users', icon: 'fa fa-users', href: '/admin/users' },
    { label: 'Roles', icon: 'fa fa-id-badge', href: '/admin/roles' },
    { label: 'Permissions', icon: 'fa fa-key', href: '/admin/permissions' },
    { label: 'Farms', icon: 'fa fa-leaf', href: '/admin/farms' },
    { label: 'Projects', icon: 'fa fa-diagram-project', href: '/admin/projects' },
    { label: 'Analytics', icon: 'fa fa-chart-line', href: '/admin/analytics' },
    { label: 'System Logs', icon: 'fa fa-file-lines', href: '/admin/logs' },
    { label: 'Settings', icon: 'fa fa-gear', href: '/admin/settings' },
  ];

  return (
    <DashboardLayout title="Admin Control Panel" menuItems={adminMenu}>
      {children}
    </DashboardLayout>
  );
}
