import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button, Badge } from "../ui";
import { NAVIGATION_LINKS } from "../../constants";

const Header = ({ showHappieeBox = true }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (link) => {
    if (link.hash) {
      return location.hash === link.hash;
    }
    return currentPath === link.path;
  };

  return (
    <header className="bg-white h-[77px] flex items-center justify-center border-b border-gray-200">
      <div className="flex items-center justify-between w-full max-w-[1440px] px-5">
        <div className="flex items-center">
          <Link to="/">
            <img
              src={"/assests/icons/happieesouls-logo.svg"}
              alt="Logo"
              className="h-[77px] w-auto object-contain"
            />
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-10">
          {NAVIGATION_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.path + (link.hash || "")}
              className={`text-base font-semibold transition-colors ${
                isActive(link)
                  ? "text-call-to-action"
                  : "text-title hover:text-call-to-action"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          {showHappieeBox && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-title">
                Happiee
                <br />
                Box
              </span>
              <div className="relative w-[36px] h-[36px]">
                <div className="absolute inset-0 bg-main rounded-full"></div>
                <Heart
                  size={19}
                  fill="white"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
                <Badge
                  variant="success"
                  size="small"
                  className="absolute -top-1 -right-1"
                >
                  0
                </Badge>
              </div>
            </div>
          )}
          <Button
            variant="dark"
            size="small"
            className="bg-main text-misc-keyboard rounded-[26px] px-5 py-2 text-sm h-9"
          >
            Ngo Login
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
