import React, { useState } from 'react';
import '../styles/Discover.css';

const Discover = () => {
  const [activeTab, setActiveTab] = useState('featured');

  const categories = [
    { id: 'education', name: 'Education', icon: 'bi-book' },
    { id: 'medical', name: 'Medical', icon: 'bi-heart-pulse' },
    { id: 'technology', name: 'Technology', icon: 'bi-laptop' },
    { id: 'environment', name: 'Environment', icon: 'bi-tree' },
    { id: 'community', name: 'Community', icon: 'bi-people' },
    { id: 'arts', name: 'Arts & Culture', icon: 'bi-palette' },
  ];

  return (
    <div className="discover-container">
      {/* Header Section */}
      <div className="discover-header text-center py-5 mb-5">
        <h1 className="display-4 fw-bold mb-4">Discover Amazing Projects</h1>
        <p className="lead mb-4">Find and support innovative campaigns that matter to you</p>
        <div className="search-bar mx-auto mb-4">
          <div className="input-group">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search projects..."
              aria-label="Search projects" 
            />
            <button className="btn btn-primary" type="button">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mb-5">
        <div className="row g-4">
          {categories.map((category) => (
            <div key={category.id} className="col-md-4 col-lg-2">
              <div className="category-card text-center p-3">
                <i className={`bi ${category.icon} category-icon`}></i>
                <h3 className="h5 mt-3 mb-0">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs Section */}
      <div className="container mb-5">
        <ul className="nav nav-tabs justify-content-center mb-4">
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'featured' ? 'active' : ''}`}
              onClick={() => setActiveTab('featured')}
            >
              <i className="bi bi-star me-2"></i>Featured
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'trending' ? 'active' : ''}`}
              onClick={() => setActiveTab('trending')}
            >
              <i className="bi bi-graph-up me-2"></i>Trending
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'new' ? 'active' : ''}`}
              onClick={() => setActiveTab('new')}
            >
              <i className="bi bi-clock me-2"></i>New
            </button>
          </li>
        </ul>

        <div className="row g-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="col-md-6 col-lg-4">
              <div className="campaign-card">
                <div className="campaign-image"></div>
                <div className="campaign-content p-4">
                  <h3 className="h5 mb-3">Campaign Title {item}</h3>
                  <p className="text-muted mb-3">Brief description of the campaign goes here...</p>
                  <div className="progress mb-3">
                    <div className="progress-bar" style={{ width: '65%' }}></div>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-success">₹65,000 raised</span>
                    <span className="text-primary">Goal: ₹100,000</span>
                  </div>
                  <button className="btn btn-outline-primary w-100">Learn More</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover;