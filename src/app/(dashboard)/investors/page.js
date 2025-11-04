'use client';

import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ChartClient from '../farmers/ChartClient'; // reuse the chart component

export default function InvestorsPage() {
  const [market, setMarket] = useState({ trend: 'Stable', icon: 'bi-graph-up', color: 'text-success' });
  const [portfolio, setPortfolio] = useState([
    { id: 1, name: 'Greenhouse Hydroponics', value: '$12,400', roi: '+8.5%', status: 'Active' },
    { id: 2, name: 'Smart Irrigation Sensors', value: '$9,250', roi: '+6.3%', status: 'Active' },
    { id: 3, name: 'Organic Vegetable Network', value: '$5,100', roi: '+2.8%', status: 'Pending' },
  ]);

  // Simulate fetching live market trend
  useEffect(() => {
    const timer = setInterval(() => {
      const trends = [
        { trend: 'Stable', icon: 'bi-graph-up', color: 'text-success' },
        { trend: 'Volatile', icon: 'bi-activity', color: 'text-warning' },
        { trend: 'Bullish', icon: 'bi-arrow-up-right', color: 'text-success' },
        { trend: 'Bearish', icon: 'bi-arrow-down-right', color: 'text-danger' },
      ];
      const random = trends[Math.floor(Math.random() * trends.length)];
      setMarket(random);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    { title: 'Total Investment', value: '$26,750' },
    { title: 'Active Projects', value: 2 },
    { title: 'Pending Projects', value: 1 },
    { 
      title: 'Market Trend', 
      value: (
        <span className={`d-inline-flex align-items-center gap-2 ${market.color}`}>
          <i className={`bi ${market.icon}`}></i> {market.trend}
        </span>
      )
    },
  ];

  return (
    <div className="container py-5">
      {/* Header */}
      <header className="d-flex flex-wrap align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center gap-3">
          <div>
            <h1 className="display-6 text-heading mb-0">Investor Dashboard</h1>
            <small className="text-muted">Smart Farming Network</small>
          </div>
        </div>
        <div>
          <i className="bi bi-person-circle fs-3 text-secondary"></i>
        </div>
      </header>

      {/* Stats */}
      <div className="row mb-4 g-3">
        {stats.map((s, idx) => (
          <div key={idx} className="col-6 col-md-3">
            <div className="card stat-card h-100">
              <div className="card-body text-center">
                <div className="stat-title">{s.title}</div>
                <div className="stat-value">{s.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Portfolio Chart */}
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="section-heading">Investment Growth Overview</h2>
          <div className="card chart-card p-3">
            <ChartClient />
          </div>
        </div>
      </div>

      {/* Portfolio List */}
      <div className="row">
        <div className="col-12">
          <h2 className="section-heading">My Portfolio</h2>
          <div className="project-list">
            {portfolio.map((p) => (
              <div key={p.id} className="card project-item mb-3">
                <div className="card-body d-flex justify-content-between align-items-center flex-wrap">
                  <div className="d-flex align-items-center gap-3">
                    <div className="project-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-cash-coin"></i>
                    </div>
                    <div>
                      <div className="fw-bold project-title">{p.name}</div>
                      <div className="text-muted small">Status: {p.status}</div>
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="fw-bold">{p.value}</div>
                    <div className={`small ${p.roi.startsWith('+') ? 'text-success' : 'text-danger'}`}>
                      ROI: {p.roi}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
