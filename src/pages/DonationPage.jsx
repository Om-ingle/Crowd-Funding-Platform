import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DonationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const predefinedAmounts = ['₹100', '₹500', '₹1000', '₹5000'];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement payment gateway integration here
    alert(`Thank you for your donation of ${amount}`);
    navigate('/campaigns');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Support This Campaign</h2>
              
              <form onSubmit={handleSubmit}>
                {/* Donation Amount */}
                <div className="mb-4">
                  <label className="form-label">Select Amount</label>
                  <div className="d-flex gap-2 mb-3">
                    {predefinedAmounts.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        className={`btn ${amount === preset ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setAmount(preset)}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter custom amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                {/* Personal Information */}
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Payment Method */}
                <div className="mb-4">
                  <label className="form-label">Payment Method</label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label className="form-check-label">Card</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="paymentMethod"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label className="form-check-label">UPI</label>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="mb-4">
                  <label className="form-label">Message (Optional)</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-100 py-2">
                  Proceed to Pay {amount}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
