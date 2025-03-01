import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Check if user is logged in (replace with your actual auth logic)
  const isLoggedIn = false;

  // Handle scrolling effect on navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const closeOffcanvas = () => {
    setIsOffcanvasOpen(false);
  };

  const handleNavigate = (path) => {
    navigate(path);
    closeOffcanvas();
  };

  // Function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Prevent body scroll when offcanvas is open
  useEffect(() => {
    if (isOffcanvasOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOffcanvasOpen]);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="brand-text">GiveHope</span>
        </Link>
        
        {/* Hamburger menu for mobile */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsOffcanvasOpen(true)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Desktop menu */}
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/') ? 'active' : ''}`} 
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/campaigns') ? 'active' : ''}`} 
                to="/campaigns"
              >
                Campaigns
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/discover') ? 'active' : ''}`} 
                to="/discover"
              >
                Discover
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/community-chat') ? 'active' : ''}`} 
                to="/community-chat"
              >
                Community
              </Link>
            </li>
          </ul>

          {/* Auth buttons for desktop */}
          <div className="auth-buttons ms-auto">
            {!isLoggedIn ? (
              <>
                <button 
                  className="btn btn-outline-primary me-2" 
                  onClick={() => navigate('/signin')}
                >
                  Sign In
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <div className="dropdown">
                <button 
                  className="btn btn-light dropdown-toggle d-flex align-items-center" 
                  type="button" 
                  id="userDropdown" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle me-2"></i>
                  <span>My Account</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0" aria-labelledby="userDropdown">
                  <li><button className="dropdown-item" onClick={() => navigate('/profile')}>Profile</button></li>
                  <li><button className="dropdown-item" onClick={() => navigate('/donations')}>My Donations</button></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger" onClick={() => {
                    console.log('Logging out');
                    /* Add actual logout logic here */
                  }}>Sign Out</button></li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Mobile offcanvas menu */}
        {isOffcanvasOpen && (
          <>
            <div className="offcanvas offcanvas-end show">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title fw-bold">GiveHope</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={closeOffcanvas}
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav">
                  <li className="nav-item mb-2">
                    <button 
                      className={`nav-link btn btn-link text-start w-100 px-3 py-2 rounded ${isActive('/') ? 'active' : ''}`} 
                      onClick={() => handleNavigate('/')}
                    >
                      <i className="bi bi-house-door me-2"></i>
                      Home
                    </button>
                  </li>
                  <li className="nav-item mb-2">
                    <button 
                      className={`nav-link btn btn-link text-start w-100 px-3 py-2 rounded ${isActive('/campaigns') ? 'active' : ''}`} 
                      onClick={() => handleNavigate('/campaigns')}
                    >
                      <i className="bi bi-megaphone me-2"></i>
                      Campaigns
                    </button>
                  </li>
                  <li className="nav-item mb-2">
                    <button 
                      className={`nav-link btn btn-link text-start w-100 px-3 py-2 rounded ${isActive('/discover') ? 'active' : ''}`} 
                      onClick={() => handleNavigate('/discover')}
                    >
                      <i className="bi bi-compass me-2"></i>
                      Discover
                    </button>
                  </li>
                  <li className="nav-item mb-3">
                    <button 
                      className={`nav-link btn btn-link text-start w-100 px-3 py-2 rounded ${isActive('/community-chat') ? 'active' : ''}`} 
                      onClick={() => handleNavigate('/community-chat')}
                    >
                      <i className="bi bi-people me-2"></i>
                      Community
                    </button>
                  </li>
                  <li><hr className="my-3" /></li>
                  {!isLoggedIn ? (
                    <div className="d-grid gap-2">
                      <button 
                        className="btn btn-outline-primary py-2" 
                        onClick={() => handleNavigate('/signin')}
                      >
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Sign In
                      </button>
                      <button 
                        className="btn btn-primary py-2" 
                        onClick={() => handleNavigate('/signup')}
                      >
                        <i className="bi bi-person-plus me-2"></i>
                        Sign Up
                      </button>
                    </div>
                  ) : (
                    <>
                      <li className="nav-item mb-2">
                        <button 
                          className="nav-link btn btn-link text-start w-100 px-3 py-2 rounded"
                          onClick={() => handleNavigate('/profile')}
                        >
                          <i className="bi bi-person-circle me-2"></i>
                          My Profile
                        </button>
                      </li>
                      <li className="nav-item mb-2">
                        <button 
                          className="nav-link btn btn-link text-start w-100 px-3 py-2 rounded"
                          onClick={() => handleNavigate('/donations')}
                        >
                          <i className="bi bi-heart me-2"></i>
                          My Donations
                        </button>
                      </li>
                      <li className="nav-item">
                        <button 
                          className="btn btn-outline-danger w-100"
                          onClick={() => {
                            console.log('Logging out');
                            closeOffcanvas();
                          }}
                        >
                          <i className="bi bi-box-arrow-right me-2"></i>
                          Sign Out
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            <div className="offcanvas-backdrop fade show" onClick={closeOffcanvas}></div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
