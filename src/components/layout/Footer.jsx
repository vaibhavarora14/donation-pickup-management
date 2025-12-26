import React from 'react';
import { Link } from 'react-router-dom';
import { FOOTER_LINKS, LOGO_URLS } from '../../constants';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <img
            src={LOGO_URLS.footer}
            alt="Logo"
            className="footer-logo"
          />
        </div>
        <div className="footer-section">
          <h4 className="footer-title">Usefull Link</h4>
          <ul className="footer-links">
            {FOOTER_LINKS.useful.map((link) => (
              <li key={link.label}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-section">
          <h4 className="footer-title">Information for</h4>
          <ul className="footer-links">
            {FOOTER_LINKS.information.map((link) => (
              <li key={link.label}>
                <a href={link.path}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-section">
          <h4 className="footer-title">How to Help</h4>
          <ul className="footer-links">
            {FOOTER_LINKS.help.map((link) => (
              <li key={link.label}>
                <a href={link.path}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 happieesouls. All Rights Reseved</p>
      </div>
    </footer>
  );
};

export default Footer;

