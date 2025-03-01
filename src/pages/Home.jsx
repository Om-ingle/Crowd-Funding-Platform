import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

// Using a placeholder image URL instead of a local file
const heroImage = "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";

const Home = () => {
  const navigate = useNavigate();

  // Button click handlers using proper navigation
  const handleExploreClick = () => {
    navigate('/campaigns');
  };

  const handleDonateClick = () => {
    navigate('/discover');
  };

  const handleChatClick = () => {
    navigate('/community-chat');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section py-5">
        <div className="container">
          <div className="row align-items-center g-5 py-5">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold lh-1 mb-3">Join hands for a better world</h1>
              <p className="lead mb-4">
                Support causes you care about, connect with like-minded individuals, and make a real difference in the world.
              </p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <button onClick={handleExploreClick} className="btn btn-primary btn-lg px-4 me-md-2">
                  Explore Campaigns
                </button>
                <button onClick={handleDonateClick} className="btn btn-outline-primary btn-lg px-4">
                  Donate Now
                </button>
              </div>
            </div>
            <div className="col-lg-6">
              <img 
                src={heroImage} 
                className="d-block mx-lg-auto img-fluid rounded-3 shadow"
                alt="Hero" 
                loading="lazy" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-lg-8 mx-auto">
              <h2 className="fw-bold">How it works</h2>
              <p className="lead">Simple steps to make a big impact</p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4 p-lg-5">
                  <div className="feature-icon bg-primary bg-opacity-10 mb-4">
                    <i className="bi bi-search fs-2 text-primary"></i>
                  </div>
                  <h3 className="fw-bold mb-3">Discover Causes</h3>
                  <p className="mb-0">Find campaigns and organizations that align with your values and interests.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4 p-lg-5">
                  <div className="feature-icon bg-primary bg-opacity-10 mb-4">
                    <i className="bi bi-heart fs-2 text-primary"></i>
                  </div>
                  <h3 className="fw-bold mb-3">Make a Donation</h3>
                  <p className="mb-0">Contribute any amount to support the causes you believe in.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4 p-lg-5">
                  <div className="feature-icon bg-primary bg-opacity-10 mb-4">
                    <i className="bi bi-people fs-2 text-primary"></i>
                  </div>
                  <h3 className="fw-bold mb-3">Connect &amp; Share</h3>
                  <p className="mb-0">Join communities and spread the word to amplify your impact.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5 bg-primary text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h2 className="fw-bold mb-3">Ready to make a difference?</h2>
              <p className="lead mb-0">Join our community of donors and changemakers today.</p>
            </div>
            <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
              <button onClick={handleSignUpClick} className="btn btn-light btn-lg px-4 me-2">
                Sign Up
              </button>
              <button onClick={handleChatClick} className="btn btn-outline-light btn-lg px-4">
                Join Chat
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Campaigns Preview */}
      <section className="py-5">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-lg-8 mx-auto">
              <h2 className="fw-bold">Featured Campaigns</h2>
              <p className="lead">Support these worthy causes</p>
            </div>
          </div>
          <div className="row g-4">
            {/* This would dynamically render from your API */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="col-lg-4">
                <div className="card h-100 border-0 shadow-sm campaign-card">
                  <img 
                    src={`https://source.unsplash.com/random/400x200?sig=${item}`}
                    className="card-img-top campaign-image" 
                    alt="Campaign" 
                  />
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="badge bg-primary">Education</span>
                      <small className="text-muted">3 days left</small>
                    </div>
                    <h5 className="card-title fw-bold">Example Campaign {item}</h5>
                    <p className="card-text">Help support this important cause with your donation.</p>
                    <div className="mb-3">
                      <div className="campaign-progress">
                        <div 
                          className="progress-bar" 
                          role="progressbar" 
                          style={{ width: `${30 + (item * 20)}%` }} 
                          aria-valuenow={30 + (item * 20)} 
                          aria-valuemin="0" 
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between mt-2">
                        <small className="fw-bold">${(5000 * item).toLocaleString()}</small>
                        <small className="text-muted">of ${(10000 * item).toLocaleString()}</small>
                      </div>
                    </div>
                    <button 
                      onClick={() => navigate(`/campaigns/${item}/donate`)}
                      className="btn btn-primary w-100"
                    >
                      Donate Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <button 
              onClick={handleExploreClick}
              className="btn btn-outline-primary btn-lg px-4"
            >
              View All Campaigns
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
