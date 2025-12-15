import React from 'react';
import DashboardLayout from '../DashboardLayout';
import { requireRole } from '@/libs/authGuard';

export default async function InvestorsLayout({ children }) {

  // Protect all routes under investors/
  const session = await requireRole(['INVESTOR']);
  const investorMenu = [
    { label: 'Dashboard', icon: 'fa fa-chart-bar', href: '/investors', active: true },
    { label: 'Portfolio', icon: 'fa fa-wallet', href: '#' },
    { label: 'Market Trends', icon: 'fa fa-chart', href: '#' },
    { label: 'Opportunities', icon: 'fa fa-lightbulb', href: '#' },
    { label: 'Transactions', icon: 'fa fa-exchange-alt', href: '#' },
    { label: 'Profile', icon: 'fa fa-user', href: '/investors/profile' },
  ];

  return (
    <DashboardLayout title="Investors Board" menuItems={investorMenu}>
      {children}
    </DashboardLayout>
  );
}
