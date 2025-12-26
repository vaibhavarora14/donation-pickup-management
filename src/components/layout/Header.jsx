import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button, Badge } from '../ui';
import { NAVIGATION_LINKS, LOGO_URLS } from '../../constants';
import './Header.css';

const Header = ({ logoUrl, showHappieeBox = true }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Determine which logo to use based on current page
  const getLogoUrl = () => {
    if (logoUrl) return logoUrl;
    if (currentPath === '/book-donation') return LOGO_URLS.bookDonation;
    if (currentPath === '/pickup-mode') return LOGO_URLS.pickupMode;
    if (currentPath === '/payment') return LOGO_URLS.payment;
    return LOGO_URLS.landing;
  };

  const isActive = (link) => {
    if (link.hash) {
      return location.hash === link.hash;
    }
    return currentPath === link.path;
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <Link to="/">
            <img src={getLogoUrl()} alt="Logo" className="logo-img" />
          </Link>
        </div>
        <nav className="nav-menu">
          {NAVIGATION_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.path + (link.hash || '')}
              className={`nav-link ${isActive(link) ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          {showHappieeBox && (
            <div className="happiee-box">
              <span>
                Happiee
                <br />
                Box
              </span>
              <div className="heart-icon">
                <Heart size={19} fill="white" />
              </div>
              <Badge variant="success" size="small">0</Badge>
            </div>
          )}
          <Button variant="dark" size="small" className="ngo-login-btn">
            Ngo Login
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

