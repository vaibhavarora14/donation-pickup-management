import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { CONTACT_INFO } from '../../constants';

const TopBar = ({ showLogin = true }) => {
  return (
    <div className="bg-call-to-action h-[37px] flex items-center justify-center text-white text-[13px]">
      <div className="flex justify-between items-center w-full max-w-[1440px] px-5">
        <div className="flex items-center gap-2">
          <Phone size={16} />
          <span className="flex items-center tracking-[-0.26px]">{CONTACT_INFO.phone}</span>
          <Mail size={16} />
          <span className="flex items-center tracking-[-0.26px]">{CONTACT_INFO.email}</span>
        </div>
        {showLogin && (
          <div className="flex items-center">
            <button className="bg-transparent border-none text-white text-sm cursor-pointer px-2 py-1 transition-opacity hover:opacity-80">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;

