import React from "react";
import { Link } from "react-router-dom";
import { FOOTER_LINKS } from "../../constants";

const Footer = () => {
  return (
    <footer className="bg-main text-white py-16">
      <div className="max-w-[1440px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-15 mb-12">
          <div>
            <img
              src={"/assests/icons/happieesouls-logo.svg"}
              alt="Logo"
              className="h-12 w-auto mb-4"
            />
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Usefull Link</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.useful.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Information for</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.information.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.path}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">How to Help</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.help.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.path}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 happieesouls. All Rights Reseved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
