import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <Link className="navbar-brand brand-gradient" to="/">CrowdFunding</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link nav-link-custom" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-custom" to="/campaigns">Campaigns</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-custom" to="/discover">Discover</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-custom" to="/community-chat">Community</Link>
            </li>
          </ul>
          
          <div className="search-wrapper me-3">
            <i className="bi bi-search search-icon"></i>
            <input type="search" className="form-control search-input" placeholder="Search campaigns..." />
          </div>

          <div className="auth-buttons">
            <Link to="/signin" className="btn btn-outline-primary btn-custom">Sign In</Link>
            <Link to="/signup" className="btn btn-primary btn-custom">Start Campaign</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
