import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Discover = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Simulated API call to fetch campaigns and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock categories
        const mockCategories = [
          { id: 'education', name: 'Education' },
          { id: 'health', name: 'Healthcare' },
          { id: 'environment', name: 'Environment' },
          { id: 'animals', name: 'Animal Welfare' },
          { id: 'community', name: 'Community' },
          { id: 'disaster', name: 'Disaster Relief' },
        ];
        
        // Mock campaigns data
        const mockCampaigns = Array(12).fill().map((_, index) => ({
          id: index + 1,
          title: `Campaign ${index + 1}`,
          description: 'This is a sample campaign description. Help support this important cause with your donation.',
          category: mockCategories[index % mockCategories.length].id,
          raised: Math.floor(Math.random() * 8000) + 2000,
          goal: 10000,
          daysLeft: Math.floor(Math.random() * 30) + 1,
          image: `https://source.unsplash.com/random/400x200?sig=${index + 20}`,
          featured: index < 3,
          location: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][index % 5],
        }));
        
        setCategories(mockCategories);
        setCampaigns(mockCampaigns);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter campaigns based on category and search term
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesCategory = selectedCategory === 'all' || campaign.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // The filtering happens automatically via the filteredCampaigns
  };

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="row mb-5">
        <div className="col-lg-8">
          <h1 className="fw-bold mb-2">Discover Campaigns</h1>
          <p className="lead text-muted">Find and support causes that matter to you</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="row g-3 mb-5">
        <div className="col-lg-6">
          <form onSubmit={handleSearch} className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-primary px-4">
              <i className="bi bi-search me-2"></i>
              Search
            </button>
          </form>
        </div>
        <div className="col-lg-6 d-flex justify-content-lg-end">
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn ${selectedCategory === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleCategoryChange('all')}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`btn ${selectedCategory === category.id ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Campaigns Section (only shown when no filters are applied) */}
      {selectedCategory === 'all' && searchTerm === '' && (
        <div className="mb-5">
          <h2 className="fw-bold mb-4">Featured Campaigns</h2>
          <div className="row g-4">
            {campaigns
              .filter(campaign => campaign.featured)
              .slice(0, 3)
              .map((campaign) => (
                <div key={campaign.id} className="col-lg-4">
                  <div className="card h-100 border-0 shadow-sm campaign-card">
                    <div className="position-absolute top-0 start-0 p-2">
                      <span className="badge bg-warning">Featured</span>
                    </div>
                    <img 
                      src={campaign.image} 
                      className="card-img-top campaign-image" 
                      alt={campaign.title} 
                    />
                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="badge bg-primary">{categories.find(cat => cat.id === campaign.category)?.name}</span>
                        <small className="text-muted">{campaign.daysLeft} days left</small>
                      </div>
                      <h5 className="card-title fw-bold">{campaign.title}</h5>
                      <p className="card-text">{campaign.description}</p>
                      <div className="mb-3">
                        <div className="progress" style={{ height: '10px' }}>
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
        </div>
      )}

      {/* All Campaigns or Filtered Results */}
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">
            {selectedCategory !== 'all' 
              ? `${categories.find(cat => cat.id === selectedCategory)?.name} Campaigns` 
              : searchTerm 
                ? 'Search Results' 
                : 'All Campaigns'}
          </h2>
          <div className="text-muted">
            {filteredCampaigns.length} {filteredCampaigns.length === 1 ? 'campaign' : 'campaigns'} found
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading campaigns...</p>
          </div>
        ) : filteredCampaigns.length === 0 ? (
          <div className="alert alert-info text-center py-5">
            <i className="bi bi-search fs-1 mb-3"></i>
            <h4>No campaigns found</h4>
            <p className="mb-0">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredCampaigns.map((campaign) => (
              <div key={campaign.id} className="col-lg-4 col-md-6">
                <div className="card h-100 border-0 shadow-sm campaign-card">
                  <img 
                    src={campaign.image} 
                    className="card-img-top campaign-image" 
                    alt={campaign.title} 
                  />
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="badge bg-primary">{categories.find(cat => cat.id === campaign.category)?.name}</span>
                      <small className="text-muted">{campaign.daysLeft} days left</small>
                    </div>
                    <h5 className="card-title fw-bold">{campaign.title}</h5>
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-geo-alt text-muted me-1"></i>
                      <small className="text-muted">{campaign.location}</small>
                    </div>
                    <p className="card-text">{campaign.description}</p>
                    <div className="mb-3">
                      <div className="progress" style={{ height: '10px' }}>
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
    </div>
  );
};

export default Discover;