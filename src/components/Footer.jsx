import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4 mb-lg-0">
            <h5 className="fw-bold mb-3">GiveHope</h5>
            <p className="mb-3">Connecting donors with causes that matter. Make a difference today with your contribution.</p>
            <div className="social-links">
              <a href="#" className="text-white me-3"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white me-3"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-white me-3"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
          
          <div className="col-lg-2 col-6 mb-4 mb-lg-0">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className="text-white text-decoration-none">Home</Link></li>
              <li className="mb-2"><Link to="/campaigns" className="text-white text-decoration-none">Campaigns</Link></li>
              <li className="mb-2"><Link to="/discover" className="text-white text-decoration-none">Discover</Link></li>
              <li className="mb-2"><Link to="/community-chat" className="text-white text-decoration-none">Community</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-6 mb-4 mb-lg-0">
            <h6 className="fw-bold mb-3">Resources</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className="text-white text-decoration-none">About Us</Link></li>
              <li className="mb-2"><Link to="/" className="text-white text-decoration-none">Contact</Link></li>
              <li className="mb-2"><Link to="/" className="text-white text-decoration-none">FAQ</Link></li>
              <li className="mb-2"><Link to="/" className="text-white text-decoration-none">Blog</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-4">
            <h6 className="fw-bold mb-3">Subscribe to Our Newsletter</h6>
            <p className="mb-3">Get updates on new campaigns and events.</p>
            <form>
              <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="Your email" aria-label="Your email" />
                <button className="btn btn-primary" type="button">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
        
        <hr className="my-4" />
        
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0">&copy; {new Date().getFullYear()} GiveHope. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <Link to="/" className="text-white me-3 text-decoration-none">Terms of Service</Link>
            <Link to="/" className="text-white text-decoration-none">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;