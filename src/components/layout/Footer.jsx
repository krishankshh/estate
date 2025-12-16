import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer component
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="font-display font-bold text-xl text-white">
                Haven<span className="text-accent-500">Estate</span>
              </span>
            </div>
            <p className="text-neutral-400 max-w-md">
              Transforming the way you find your dream home. Experience luxury living 
              with our immersive 3D virtual tours and premium real estate offerings.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-accent-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-accent-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-accent-500 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/floor-plans" className="hover:text-accent-500 transition-colors">
                  Floor Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-neutral-400">
              <li>📧 info@havenestate.com</li>
              <li>📱 +1 (555) 123-4567</li>
              <li>📍 123 Real Estate Ave<br />Suite 100, City, State 12345</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm">
            © {currentYear} HavenEstate. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-neutral-500 hover:text-accent-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-neutral-500 hover:text-accent-500 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
