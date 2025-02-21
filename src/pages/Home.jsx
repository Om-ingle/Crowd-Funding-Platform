import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Import images
import heroImage from '../assets/hero-image.png';
import campaignPlaceholder from '../assets/campaign-placeholder.png';

const Home = () => {
  const navigate = useNavigate();
  
 

  const featuredCampaigns = [
    {
      id: 1,
      title: "Help Build a School",
      description: "Providing education for underprivileged children in rural areas.",
      image: campaignPlaceholder, // Using imported image
      raised: "₹5,00,000",
      goal: "₹10,00,000",
      progress: 50
    },
    {
      id: 2,
      title: "Clean Water Initiative",
      description: "Installing water purification systems in affected communities.",
      image: campaignPlaceholder,
      raised: "₹3,00,000",
      goal: "₹8,00,000",
      progress: 37.5
    },
    {
      id: 3,
      title: "Medical Aid Project",
      description: "Supporting healthcare facilities with essential equipment.",
      image: campaignPlaceholder,
      raised: "₹7,50,000",
      goal: "₹12,00,000",
      progress: 62.5
    }
  ];

  const handleStartCampaign = () => {
    navigate('/signup');
  };

  const handleExploreCampaigns = () => {
    navigate('/campaigns');
  };

  const handleSupportCampaign = (campaignId) => {
    navigate(`/campaigns/${campaignId}`);
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section py-5 mb-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-3 fw-bold mb-4">
                Empower Ideas,<br />Fund Dreams
              </h1>
              <p className="lead mb-4">
                Join our platform to create, support, and bring innovations to life.
                Together, we can make a difference.
              </p>
              <div className="d-flex gap-3">
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={handleStartCampaign}
                >
                  <i className="bi bi-rocket-takeoff me-2"></i>
                  Start a Campaign
                </button>
                <button 
                  className="btn btn-outline-primary btn-lg"
                  onClick={handleExploreCampaigns}
                >
                  <i className="bi bi-search me-2"></i>
                  Explore Campaigns
                </button>
              </div>
            </div>
            <div className="col-lg-6">
              <img 
                src={heroImage} 
                alt="Crowdfunding Hero" 
                className="img-fluid rounded-3 shadow-lg" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="bg-light py-5 mb-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <h2 className="display-4 fw-bold text-primary">₹10Cr+</h2>
              <p className="lead">Total Funds Raised</p>
            </div>
            <div className="col-md-4 mb-4">
              <h2 className="display-4 fw-bold text-primary">1000+</h2>
              <p className="lead">Successful Campaigns</p>
            </div>
            <div className="col-md-4 mb-4">
              <h2 className="display-4 fw-bold text-primary">50K+</h2>
              <p className="lead">Active Supporters</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mb-5">
        <h2 className="text-center display-5 mb-5">How It Works</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="bi bi-rocket-takeoff fs-1 text-primary"></i>
                </div>
                <h3 className="h4 mb-3">Start a Campaign</h3>
                <p>Create your fundraising campaign in minutes. Share your story and set your goals.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="bi bi-heart fs-1 text-primary"></i>
                </div>
                <h3 className="h4 mb-3">Share & Support</h3>
                <p>Share your campaign with friends and family. Every contribution makes a difference.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="bi bi-shield-check fs-1 text-primary"></i>
                </div>
                <h3 className="h4 mb-3">Track Progress</h3>
                <p>Monitor your campaign's progress and keep supporters updated with regular updates.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Campaigns Section with Error Handling */}
      <section className="container mb-5">
        <h2 className="text-center display-5 mb-5">Featured Campaigns</h2>
        <div className="row g-4">
          {featuredCampaigns.map(campaign => (
            <div key={campaign.id} className="col-md-4">
              <div className="card h-100 border-0 shadow-sm campaign-card">
                <img 
                  src={campaign.image} 
                  className="card-img-top campaign-image" 
                  alt={campaign.title}
                  onError={(e) => {
                    e.target.src = campaignPlaceholder;
                  }}
                />
                <div className="card-body">
                  <h3 className="h5 mb-3">{campaign.title}</h3>
                  <p className="text-muted">{campaign.description}</p>
                  <div className="progress mb-3 campaign-progress">
                    <div 
                      className="progress-bar" 
                      role="progressbar" 
                      style={{width: `${campaign.progress}%`}}
                      aria-valuenow={campaign.progress} 
                      aria-valuemin="0" 
                      aria-valuemax="100"
                    />
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-success fw-bold">
                      <i className="bi bi-graph-up-arrow me-1"></i>
                      Raised: {campaign.raised}
                    </span>
                    <span className="text-primary fw-bold">
                      <i className="bi bi-flag me-1"></i>
                      Goal: {campaign.goal}
                    </span>
                  </div>
                  <button 
                    className="btn btn-outline-primary w-100"
                    onClick={() => handleSupportCampaign(campaign.id)}
                  >
                    <i className="bi bi-heart me-2"></i>
                    Support Campaign
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <div className="bg-primary text-white py-5 mb-5">
        <div className="container text-center">
          <h2 className="display-5 mb-4">Ready to Make a Difference?</h2>
          <p className="lead mb-4">Join thousands of people who are already making their dreams come true.</p>
          <button 
            className="btn btn-light btn-lg px-5"
            onClick={handleStartCampaign}
          >
            Start Your Campaign
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
