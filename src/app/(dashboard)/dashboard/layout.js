import DashboardLayout from '../DashboardLayout';
import { requireAuth, getCurrentUser } from '@/libs/authGuard';
import { redirect } from 'next/navigation';

export default async function DashboardLayoutRoot({ children }) {
    await requireAuth();
    const user = await getCurrentUser();

    // Verified users never stay on general dashboard
    if (user.verificationStatus === 'APPROVED') {
        if (user.role === 'ADMIN') redirect('/admin');
        if (user.role === 'FARMER') redirect('/dashboard/farmer');
        if (user.role === 'INVESTOR') redirect('/dashboard/investor');
    }

    const menuItems = [
        { label: 'Dashboard', icon: 'fa fa-home', href: '/dashboard', active: true },
        { label: 'Profile', icon: 'fa fa-user', href: '/dashboard/profile' },
    ];

    return (
        <DashboardLayout title="User Dashboard" menuItems={menuItems}>
            {children}
        </DashboardLayout>
    );
}
