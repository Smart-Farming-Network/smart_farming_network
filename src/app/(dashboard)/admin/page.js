'use client';

import { useEffect, useState } from 'react';
import ChartClient from '../farmers/ChartClient';
import { motion } from 'framer-motion';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function AdminDashboardPage() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`);
      const data = await res.json();
      setWeather(`${data?.current?.temperature_2m ?? '--'}°C`);
    });
  }, []);

  const kpis = [
    { label: 'Total Users', value: 1240, icon: 'bi-people' },
    { label: 'Admins', value: 4, icon: 'bi-shield-lock' },
    { label: 'Farms', value: 86, icon: 'bi-tree' },
    { label: 'Active Projects', value: 32, icon: 'bi-diagram-3' },
    { label: 'System Health', value: '99.98%', icon: 'bi-heart-pulse' },
    { label: 'Weather', value: weather || '--', icon: 'bi-cloud-sun' },
  ];

  const recentActivities = [
    'Admin assigned FARMER role to John Doe',
    'New farm registered – GreenField Ltd',
    'Permission granted: VIEW_ANALYTICS',
    'System backup completed successfully',
  ];

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fs-3 fw-bold">Admin Dashboard</h1>
          <p className="text-muted mb-0">System-wide visibility & control</p>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="row g-3 mb-4">
        {kpis.map((k, i) => (
          <div key={i} className="col-6 col-lg-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card h-100 shadow-sm"
            >
              <div className="card-body text-center">
                <i className={`bi ${k.icon} fs-3 mb-2`}></i>
                <div className="fw-semibold small text-muted">{k.label}</div>
                <div className="fs-5 fw-bold">{k.value}</div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Analytics + Activity */}
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card shadow-sm h-100">
            <div className="card-header fw-semibold">Platform Analytics</div>
            <div className="card-body">
              <ChartClient />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm h-100">
            <div className="card-header fw-semibold">Recent Activity</div>
            <ul className="list-group list-group-flush">
              {recentActivities.map((a, i) => (
                <li key={i} className="list-group-item small">{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Admin Quick Actions */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header fw-semibold">Quick Admin Actions</div>
            <div className="card-body d-flex flex-wrap gap-2">
              <button className="btn btn-outline-primary">Create User</button>
              <button className="btn btn-outline-secondary">Assign Role</button>
              <button className="btn btn-outline-success">Grant Permission</button>
              <button className="btn btn-outline-danger">View Audit Logs</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
