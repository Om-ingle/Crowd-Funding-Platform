import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Campaigns = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulated API call - replace with your actual API
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        const mockCampaigns = Array(9).fill().map((_, index) => ({
          id: index + 1,
          title: `Campaign ${index + 1}`,
          description: 'This is a sample campaign description. Help support this important cause.',
          category: ['Education', 'Health', 'Environment'][index % 3],
          raised: Math.floor(Math.random() * 8000) + 2000,
          goal: 10000,
          daysLeft: Math.floor(Math.random() * 30) + 1,
          image: `https://source.unsplash.com/random/400x200?sig=${index}`
        }));
        
        setCampaigns(mockCampaigns);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-lg-8">
          <h1 className="fw-bold mb-3">All Campaigns</h1>
          <p className="lead">Browse and support these worthy causes</p>
        </div>
        <div className="col-lg-4 d-flex align-items-center justify-content-lg-end mt-3 mt-lg-0">
          <div className="dropdown">
            <button className="btn btn-outline-primary dropdown-toggle" type="button" id="filterDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              Filter by Category
            </button>
            <ul className="dropdown-menu" aria-labelledby="filterDropdown">
              <li><button className="dropdown-item">All Categories</button></li>
              <li><button className="dropdown-item">Education</button></li>
              <li><button className="dropdown-item">Health</button></li>
              <li><button className="dropdown-item">Environment</button></li>
            </ul>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading campaigns...</p>
        </div>
      ) : (
        <div className="row g-4">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 shadow-sm campaign-card">
                <img 
                  src={campaign.image}
                  className="card-img-top campaign-image" 
                  alt={campaign.title} 
                />
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="badge bg-primary">{campaign.category}</span>
                    <small className="text-muted">{campaign.daysLeft} days left</small>
                  </div>
                  <h5 className="card-title fw-bold">{campaign.title}</h5>
                  <p className="card-text">{campaign.description}</p>
                  <div className="mb-3">
                    <div className="campaign-progress">
                      <div 
                        className="progress-bar" 
                        role="progressbar" 
                        style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }} 
                        aria-valuenow={(campaign.raised / campaign.goal) * 100} 
                        aria-valuemin="0" 
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                      <small className="fw-bold">${campaign.raised.toLocaleString()}</small>
                      <small className="text-muted">of ${campaign.goal.toLocaleString()}</small>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate(`/campaigns/${campaign.id}/donate`)}
                    className="btn btn-primary w-100"
                  >
                    Donate Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Campaigns;