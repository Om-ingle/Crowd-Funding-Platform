import React from 'react';
import { useNavigate } from 'react-router-dom';

const Campaigns = () => {
  const navigate = useNavigate();
  const campaigns = [
    { 
      id: 1, 
      title: "Education Fund", 
      goal: "₹50,000", 
      raised: "₹30,000",
      description: "Supporting education for underprivileged children",
      daysLeft: 15
    },
    { 
      id: 2, 
      title: "Community Project", 
      goal: "₹25,000", 
      raised: "₹15,000",
      description: "Building a community center",
      daysLeft: 20
    }
  ];

  const handleSupport = (campaignId) => {
    navigate(`/campaigns/${campaignId}/donate`);
  };

  return (
    <div className="container py-4">
      <h1 className="display-4 fw-bold mb-4">Active Campaigns</h1>
      <div className="row g-4">
        {campaigns.map(campaign => (
          <div key={campaign.id} className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body p-4">
                <h2 className="h4 fw-bold mb-3">{campaign.title}</h2>
                <p className="text-muted mb-3">{campaign.description}</p>
                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Goal: {campaign.goal}</span>
                    <span>Raised: {campaign.raised}</span>
                  </div>
                  <div className="progress">
                    <div 
                      className="progress-bar bg-primary" 
                      role="progressbar" 
                      style={{
                        width: `${(parseInt(campaign.raised.replace(/[^\d]/g, '')) / 
                        parseInt(campaign.goal.replace(/[^\d]/g, ''))) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
                <p className="text-muted">Days Left: {campaign.daysLeft}</p>
                <button 
                  className="btn btn-primary w-100"
                  onClick={() => handleSupport(campaign.id)}
                >
                  Support Campaign
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Campaigns;