import React from "react";
import { Phone, Mail } from "lucide-react";
import { CONTACT_INFO } from "../../constants";

const TopBar = ({ showLogin = true }) => {
  return (
    <div className="bg-accent h-auto min-h-[37px] flex items-center justify-center text-white text-[11px] sm:text-[13px] py-1.5 sm:py-0">
      <div className="flex flex-wrap justify-between items-center w-full max-w-[1440px] px-4 sm:px-5 gap-2 sm:gap-0">
        <div className="flex flex-wrap flex-col sm:flex-row gap-1.5 sm:gap-2">
          <a
            href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            <Phone size={14} className="sm:w-4 sm:h-4" />
            <span className="flex items-center tracking-[-0.26px] whitespace-nowrap">
              {CONTACT_INFO.phone}
            </span>
          </a>
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            <Mail size={14} className="sm:w-4 sm:h-4" />
            <span className="flex items-center tracking-[-0.26px] whitespace-nowrap">
              {CONTACT_INFO.email}
            </span>
          </a>
        </div>
        {showLogin && (
          <div className="flex items-center">
            <button className="bg-transparent border-none text-white text-xs sm:text-sm cursor-pointer px-2 py-1 transition-opacity hover:opacity-80">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
