'use client';

import React, { useEffect, useState } from 'react';
import ChartClient from './ChartClient';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function FarmersPage() {
  const [weather, setWeather] = useState({ temp: '', condition: '', icon: 'bi-cloud' });
  const [verificationStatus, setVerificationStatus] = useState('success'); 
  // options: 'success', 'warning', 'danger'

  // Get live weather using browser location + Open-Meteo API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode`
          );
          const data = await res.json();
          const temp = data?.current?.temperature_2m;
          const code = data?.current?.weathercode;

          let condition = 'Clear', icon = 'bi-sun';
          if (code >= 45 && code < 60) { condition = 'Cloudy'; icon = 'bi-cloud'; }
          else if (code >= 60 && code < 80) { condition = 'Rainy'; icon = 'bi-cloud-rain'; }
          else if (code >= 80) { condition = 'Stormy'; icon = 'bi-cloud-lightning'; }

          setWeather({ temp: `${temp}°C`, condition, icon });
        } catch (err) {
          console.error('Weather fetch failed', err);
        }
      });
    }
  }, []);

  const stats = [
    { title: 'Total Farms', value: 12 },
    { title: 'Active Crops', value: 34 },
    { title: 'Avg Moisture', value: '42%' },
    { 
      title: 'Weather', 
      value: (
        <span className="d-inline-flex align-items-center gap-2">
          <i className={`bi ${weather.icon} fs-5`}></i> 
          {weather.temp || '--'} {weather.condition || ''}
        </span>
      )
    },
  ];

  const projects = [
    { id: 1, title: 'Organic Vegetable Plot', subtitle: 'Tomatoes, Lettuce', amount: '$1,200' },
    { id: 2, title: 'Smart Irrigation', subtitle: 'Drip + Sensors', amount: '$3,500' },
    { id: 3, title: 'Greenhouse Expansion', subtitle: 'Hydroponics', amount: '$2,000' },
    { id: 5, title: 'Greenhouse Expansion 2', subtitle: 'Hydroponics', amount: '$2,000' },
  ];


  return (
    <div className="container py-5">
      {/* Header */}
      <header className="d-flex flex-wrap align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center gap-3">
          <div>
            <h1 className="display-6 text-heading mb-0">Farmers Dashboard</h1>
            <small className="text-muted">Smart Farming Network</small>
          </div>
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

      {/* Chart */}
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="section-heading">Soil Moisture Overview</h2>
          <div className="card chart-card p-3">
            <ChartClient />
          </div>
        </div>
      </div>

      {/* Projects */}
      <div className="row">
        <div className="col-12">
          <h2 className="section-heading">Projects</h2>
          <div className="project-list">
            {projects.map((p) => (
              <div key={p.id} className="card project-item mb-3">
                <div className="card-body d-flex justify-content-between align-items-center flex-wrap">
                  <div className="d-flex align-items-center gap-3">
                    <div className="project-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="fa fa-seedling"></i>
                    </div>
                    <div>
                      <div className="fw-bold project-title">{p.title}</div>
                      <div className="text-muted small">{p.subtitle}</div>
                    </div>
                  </div>
                  <div className="project-amount fw-bold">{p.amount}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
