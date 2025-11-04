'use client';

import React from 'react';
import DashboardLayout from '../DashboardLayout';

export default function FarmersLayout({ children }) {
  const farmerMenu = [
    { label: 'Dashboard', icon: 'fa fa-home', href: '/farmers', active: true },
    { label: 'Farms', icon: 'fa fa-leaf', href: '#' },
    { label: 'Tasks', icon: 'fa fa-tasks', href: '#' },
    { label: 'Analytics', icon: 'fas fa-chart-line', href: '#' },
    { label: 'Reviews', icon: 'fa fa-star', href: '#' },
    { label: 'Profile', icon: 'fa fa-user', href: '/farmers/profile' },
  ];

  return (
    <DashboardLayout title="Farmers Board" menuItems={farmerMenu}>
      {children}
    </DashboardLayout>
  );
}
