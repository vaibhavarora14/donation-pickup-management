import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { CONTACT_INFO } from '../../constants';
import './TopBar.css';

const TopBar = ({ showLogin = true }) => {
  return (
    <div className="top-bar">
      <div className="top-bar-content">
        <div className="top-bar-left">
          <Phone size={16} />
          <span className="top-bar-text">{CONTACT_INFO.phone}</span>
          <Mail size={16} />
          <span className="top-bar-text">{CONTACT_INFO.email}</span>
        </div>
        {showLogin && (
          <div className="top-bar-right">
            <button className="top-bar-login">Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;

