import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DonationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [donationAmount, setDonationAmount] = useState('');
  const [customAmount, setCustomAmount] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  useEffect(() => {
    // Simulate fetching campaign details
    const fetchCampaign = async () => {
      try {
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data for the specific campaign
        setCampaign({
          id,
          title: `Campaign ${id}`,
          description: 'This campaign aims to make a difference by providing support for those in need. Your donation will directly impact lives and help create positive change.',
          category: 'Education',
          raised: 5000 * parseInt(id),
          goal: 10000 * parseInt(id),
          daysLeft: 14,
          image: `https://source.unsplash.com/random/800x400?sig=${id}`,
          organizer: 'Jane Smith',
          location: 'New York, NY'
        });
      } catch (error) {
        console.error('Error fetching campaign:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  const handleDonationAmount = (amount) => {
    setCustomAmount(false);
    setDonationAmount(amount);
  };

  const handleCustomAmount = (e) => {
    setCustomAmount(true);
    setDonationAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate donation amount
    if (!donationAmount || isNaN(donationAmount) || parseFloat(donationAmount) <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }
    
    // Handle donation logic here
    console.log('Processing donation:', {
      campaignId: id,
      amount: parseFloat(donationAmount),
      paymentMethod
    });
    
    // Show success message and redirect
    alert(`Thank you for your donation of $${donationAmount}!`);
    navigate('/campaigns');
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading campaign details...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-lg-8">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#" onClick={(e) => {e.preventDefault(); navigate('/campaigns');}}>Campaigns</a></li>
              <li className="breadcrumb-item active" aria-current="page">Donate to {campaign.title}</li>
            </ol>
          </nav>
          
          <div className="card border-0 shadow-sm mb-4">
            <img 
              src={campaign.image} 
              className="card-img-top" 
              alt={campaign.title} 
              style={{ height: '300px', objectFit: 'cover' }}
            />
            <div className="card-body p-4">
              <h1 className="card-title fw-bold mb-3">{campaign.title}</h1>
              <div className="d-flex align-items-center mb-3">
                <span className="badge bg-primary me-2">{campaign.category}</span>
                <span className="text-muted">Organized by {campaign.organizer}</span>
                <span className="ms-auto text-danger">{campaign.daysLeft} days left</span>
              </div>
              
              <div className="mb-4">
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
                  <strong>${campaign.raised.toLocaleString()}</strong>
                  <span className="text-muted">raised of ${campaign.goal.toLocaleString()} goal</span>
                </div>
              </div>
              
              <p className="card-text">{campaign.description}</p>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h3 className="fw-bold mb-4">Make a Donation</h3>
              
              <form onSubmit={handleSubmit} className="donation-form">
                <div className="mb-4">
                  <label className="form-label">Donation Amount</label>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {['10', '25', '50', '100'].map((amount) => (
                      <button 
                        key={amount}
                        type="button" 
                        className={`btn ${donationAmount === amount && !customAmount ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => handleDonationAmount(amount)}
                      >
                        ${amount}
                      </button>
                    ))}
                    
                    <button 
                      type="button" 
                      className={`btn ${customAmount ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setCustomAmount(true)}
                    >
                      Custom
                    </button>
                  </div>
                  
                  {customAmount && (
                    <div className="input-group mb-3">
                      <span className="input-group-text">$</span>
                      <input 
                        type="number" 
                        className="form-control" 
                        placeholder="Enter amount" 
                        value={donationAmount}
                        onChange={handleCustomAmount}
                        min="1"
                        step="1"
                      />
                    </div>
                  )}
                </div>
                
                <div className="mb-4">
                  <label className="form-label">Payment Method</label>
                  <div className="form-check mb-2">
                    <input 
                      className="form-check-input" 
                      type="radio" 
                      name="paymentMethod" 
                      id="paymentCard" 
                      value="card" 
                      checked={paymentMethod === 'card'} 
                      onChange={() => setPaymentMethod('card')}
                    />
                    <label className="form-check-label" htmlFor="paymentCard">
                      <i className="bi bi-credit-card me-2"></i>
                      Credit / Debit Card
                    </label>
                  </div>
                  
                  <div className="form-check mb-2">
                    <input 
                      className="form-check-input" 
                      type="radio" 
                      name="paymentMethod" 
                      id="paymentPaypal" 
                      value="paypal" 
                      checked={paymentMethod === 'paypal'} 
                      onChange={() => setPaymentMethod('paypal')}
                    />
                    <label className="form-check-label" htmlFor="paymentPaypal">
                      <i className="bi bi-paypal me-2"></i>
                      PayPal
                    </label>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="anonymousDonation" />
                    <label className="form-check-label" htmlFor="anonymousDonation">
                      Make this donation anonymous
                    </label>
                  </div>
                </div>
                
                <button type="submit" className="btn btn-primary w-100 py-2">
                  Donate ${donationAmount || '0'}
                </button>
                
                <div className="text-center mt-3">
                  <small className="text-muted">
                    <i className="bi bi-shield-lock me-1"></i>
                    Your payment information is secure
                  </small>
                </div>
              </form>
            </div>
          </div>
          
          <div className="card border-0 shadow-sm mt-4">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3">Share This Campaign</h5>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-primary flex-grow-1">
                  <i className="bi bi-facebook me-2"></i>
                  Facebook
                </button>
                <button className="btn btn-outline-info flex-grow-1">
                  <i className="bi bi-twitter me-2"></i>
                  Twitter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
