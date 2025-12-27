import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Menu, X } from "lucide-react";
import { Button, Badge } from "../ui";
import { NAVIGATION_LINKS } from "../../constants";

const Header = ({ showHappieeBox = true }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const prevLocationRef = useRef(location);

  const isActive = (link) => {
    if (link.hash) {
      return location.hash === link.hash;
    }
    return currentPath === link.path;
  };

  // Close mobile menu when route changes
  useEffect(() => {
    const prevPath = prevLocationRef.current.pathname;
    if (prevPath !== location.pathname) {
      setIsMobileMenuOpen(false);
    }
    prevLocationRef.current = location;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="bg-white py-3 md:py-4 flex items-center justify-center border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between w-full max-w-[1440px] px-4 md:px-5">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              <img
                src={"/assests/icons/happieesouls-logo.svg"}
                alt="Logo"
                className="h-12 sm:h-12 md:h-14 lg:h-[77px] w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.path + (link.hash || "")}
                className={`text-sm xl:text-base font-semibold transition-colors ${
                  isActive(link)
                    ? "text-accent"
                    : "text-heading hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Happiee Box - Only visible on desktop (lg and above) */}
            {showHappieeBox && (
              <div className="hidden lg:flex items-center gap-2">
                <span className="text-xs md:text-sm text-heading whitespace-nowrap">
                  Happiee Box
                </span>
                <div className="relative w-[32px] h-[32px] md:w-[36px] md:h-[36px]">
                  <div className="absolute inset-0 bg-bg-dark rounded-full"></div>
                  <Heart
                    size={17}
                    fill="white"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[19px] md:h-[19px]"
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

            {/* Login Button - Only visible on desktop (lg and above) */}
            <div className="hidden lg:block">
              <Button
                variant="dark"
                size="small"
                className="bg-bg-dark text-bg-light rounded-[26px] px-4 md:px-5 py-2 text-xs md:text-sm h-8 md:h-9"
              >
                Ngo Login
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-heading hover:text-accent transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X size={24} className="text-heading" />
              ) : (
                <Menu size={24} className="text-heading" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              <img
                src={"/assests/icons/happieesouls-logo.svg"}
                alt="Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-heading hover:text-accent transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="flex flex-col">
              {NAVIGATION_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.path + (link.hash || "")}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-6 py-4 text-base font-semibold transition-colors border-b border-gray-100 ${
                    isActive(link)
                      ? "text-accent bg-accent/5"
                      : "text-heading hover:text-accent hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Mobile Menu Footer */}
          <div className="border-t border-gray-200 p-4 space-y-4">
            {showHappieeBox && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="relative w-[36px] h-[36px]">
                  <div className="absolute inset-0 bg-bg-dark rounded-full"></div>
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
                <span className="text-sm font-semibold text-heading">
                  Happiee Box
                </span>
              </div>
            )}
            <Button
              variant="dark"
              size="small"
              className="w-full bg-bg-dark text-bg-light rounded-[26px] py-3 text-sm h-auto"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Ngo Login
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
