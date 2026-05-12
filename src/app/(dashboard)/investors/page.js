'use client';

import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ChartClient from '../farmers/ChartClient'; // reuse the chart component

export default function InvestorsPage() {
  const [market, setMarket] = useState({ trend: 'Loading...', icon: 'bi-graph-up', color: 'text-info' });
  const [cropPrices, setCropPrices] = useState([]);
  const [portfolio, setPortfolio] = useState([
    { id: 1, name: 'Greenhouse Hydroponics', value: '$12,400', roi: '+8.5%', status: 'Active' },
    { id: 2, name: 'Smart Irrigation Sensors', value: '$9,250', roi: '+6.3%', status: 'Active' },
    { id: 3, name: 'Organic Vegetable Network', value: '$5,100', roi: '+2.8%', status: 'Pending' },
  ]);

  // Fetch live crop prices from commodity API
  useEffect(() => {
    const fetchCropPrices = async () => {
      try {
        // Using a free commodity API (example: Rapid API or similar)
        // For production, consider using USDA API or other agricultural data providers
        const response = await fetch('https://api.example.com/commodity-prices', {
          headers: {
            'Accept': 'application/json',
          },
        }).catch(() => null);

        if (response?.ok) {
          const data = await response.json();
          setCropPrices(data.prices || getDefaultPrices());
        } else {
          // Fallback to default prices if API fails
          setCropPrices(getDefaultPrices());
        }
      } catch (err) {
        console.error('Failed to fetch crop prices:', err);
        setCropPrices(getDefaultPrices());
      }
    };

    // Fetch on component mount and then every 5 minutes
    fetchCropPrices();
    const priceInterval = setInterval(fetchCropPrices, 5 * 60 * 1000);

    return () => clearInterval(priceInterval);
  }, []);

  // Default crop prices (used as fallback)
  const getDefaultPrices = () => [
    { crop: 'Wheat', price: '$5.20', change: '+2.3%', trend: 'up' },
    { crop: 'Corn', price: '$4.85', change: '-1.2%', trend: 'down' },
    { crop: 'Soybeans', price: '$11.50', change: '+3.8%', trend: 'up' },
  ];

  // Simulate fetching live market trend based on price movements
  useEffect(() => {
    const timer = setInterval(() => {
      if (cropPrices.length > 0) {
        const upTrends = cropPrices.filter(p => p.trend === 'up').length;
        const downTrends = cropPrices.filter(p => p.trend === 'down').length;
        
        let trendData;
        if (upTrends > downTrends) {
          trendData = { trend: 'Bullish', icon: 'bi-arrow-up-right', color: 'text-success' };
        } else if (downTrends > upTrends) {
          trendData = { trend: 'Bearish', icon: 'bi-arrow-down-right', color: 'text-danger' };
        } else {
          trendData = { trend: 'Stable', icon: 'bi-graph-up', color: 'text-info' };
        }
        setMarket(trendData);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [cropPrices]);

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
    <div className="container-fluid py-5">
      {/* Header with Live Crop Prices */}
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

      {/* Live Crop Prices Header Ticker */}
      <div className="card mb-4 bg-light border-0">
        <div className="card-body py-3">
          <div className="d-flex align-items-center gap-2 mb-2">
            <i className="bi bi-graph-up text-primary"></i>
            <span className="fw-bold">Live Crop Prices (Updated every 5 min)</span>
          </div>
          <div className="row g-3">
            {cropPrices.map((item, idx) => (
              <div key={idx} className="col-md-4 col-lg-3">
                <div className="d-flex justify-content-between align-items-center p-2 bg-white rounded border">
                  <div>
                    <div className="fw-bold">{item.crop}</div>
                    <div className="text-muted small">Per Unit</div>
                  </div>
                  <div className="text-end">
                    <div className="fw-bold fs-6">{item.price}</div>
                    <div className={`small ${item.trend === 'up' ? 'text-success' : 'text-danger'}`}>
                      <i className={`bi bi-arrow-${item.trend === 'up' ? 'up' : 'down'}`}></i> {item.change}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
