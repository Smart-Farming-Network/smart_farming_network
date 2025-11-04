'use client';

import React, { useState } from 'react';
import '../../dashboard.css';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Image from 'next/image';

export default function FarmerProfilePage() {
  // Farmer info
  const [farmer, setFarmer] = useState({
    name: 'John Doe',
    location: 'Corn & Wheat Farmer | Central Valley, California',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    badgeLevel: 'Pro Level',
    badgeTitle: 'Outstanding Agricultural Innovator',
    badgeDescription: 'Keep innovating and inspiring others!',
    profileCompleteness: 85,
    communityEngagement: 72,
  });

  // Edit form state
  const [isEditing, setIsEditing] = useState(false);

  // Badge verification status
  const [verificationStatus, setVerificationStatus] = useState('success');
  // options: 'success', 'warning', 'danger'

  // Handle form update
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFarmer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  // Badge Display Switch
  const getBadge = (status) => {
    switch (status) {
      case 'success':
        return (
          <div className="verified-badge bg-success text-white">
            <i className="bi bi-check-lg"></i>
          </div>
        );
      case 'warning':
        return (
          <div className="verified-badge bg-warning text-dark">
            <i className="bi bi-hourglass-split"></i>
          </div>
        );
      case 'danger':
        return (
          <div className="verified-badge bg-danger text-white">
            <i className="bi bi-x-lg"></i>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container py-4">
      {/* Header */}
      <div className="profile-header card p-4 mb-4 shadow-sm rounded-4 text-center bg-light-green">
        <div className="d-flex flex-column align-items-center">
          <div className="profile-img-wrapper mb-2">
            <Image
              src="https://media.istockphoto.com/id/2208264034/photo/portrait-of-confident-farmer-in-agriculture-field.webp?a=1&b=1&s=612x612&w=0&k=20&c=SXe0T5TlAhr-B7-Oh-VVslVNr2KMiAAiY53RzrhofcE="
              alt="Farmer"
              className="rounded-circle border border-3 border-success"
              style={{ width: '90px', height: '90px', objectFit: 'cover' }}
            />
          </div>
          <h4 className="fw-bold text-success mb-0">{farmer.name}</h4>
          <p className="text-muted small">{farmer.location}</p>
        </div>
      </div>

      {/* Farmer Badge */}
      <div className="card p-4 mb-4 shadow-sm rounded-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-bold mb-0 text-success">Farmer Badge</h6>
          <span className="badge bg-warning text-white px-3 py-2 rounded-pill">
            {farmer.badgeLevel}
          </span>
        </div>

        <div className="text-center">
          {getBadge(verificationStatus)}
          <h6 className="fw-bold text-success mt-3">{farmer.badgeTitle}</h6>
          <p className="text-muted small">{farmer.badgeDescription}</p>
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="card p-4 mb-4 shadow-sm rounded-4">
        <h6 className="fw-bold text-success mb-3">Progress Tracker</h6>

        <div className="mb-3">
          <div className="d-flex justify-content-between small mb-1">
            <span>Profile Completeness</span>
            <span>{farmer.profileCompleteness}%</span>
          </div>
          <ProgressBar
            now={farmer.profileCompleteness}
            variant="success"
            style={{ height: '7px', borderRadius: '10px' }}
          />
        </div>

        <div className="mb-3">
          <div className="d-flex justify-content-between small mb-1">
            <span>Community Engagement</span>
            <span>{farmer.communityEngagement}%</span>
          </div>
          <ProgressBar
            now={farmer.communityEngagement}
            variant="warning"
            style={{ height: '7px', borderRadius: '10px' }}
          />
        </div>

        <p className="text-muted small mb-0">Keep engaging and growing!</p>
      </div>

      {/* Edit Profile Form */}
      <div className="card p-4 shadow-sm rounded-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-bold text-success mb-0">Edit Profile</h6>
          <button
            className="btn btn-outline-success btn-sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small fw-bold">Full Name</label>
              <input
                type="text"
                name="name"
                value={farmer.name}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold">Location</label>
              <input
                type="text"
                name="location"
                value={farmer.location}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold">Email</label>
              <input
                type="email"
                name="email"
                value={farmer.email}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold">Phone</label>
              <input
                type="text"
                name="phone"
                value={farmer.phone}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <button type="submit" className="btn btn-success w-100 fw-bold">
              Save Changes
            </button>
          </form>
        ) : (
          <div>
            <p className="mb-1">
              <strong>Name:</strong> {farmer.name}
            </p>
            <p className="mb-1">
              <strong>Email:</strong> {farmer.email}
            </p>
            <p className="mb-1">
              <strong>Phone:</strong> {farmer.phone}
            </p>
            <p className="mb-0">
              <strong>Location:</strong> {farmer.location}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
