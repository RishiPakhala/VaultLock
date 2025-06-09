import React from 'react';
import { Lock, Shield, Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-8">
      <div className="container-padding mx-auto">
        <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
          {/* Logo and Tagline */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-blue-800" />
              <span className="text-lg font-bold text-blue-800">VaultLock</span>
            </div>
            <p className="mt-2 max-w-xs text-sm text-gray-600">
              Secure your digital life with military-grade encryption and seamless access.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <div className="flex flex-col space-y-2">
              <h3 className="font-semibold text-gray-900">Product</h3>
              <Link to="/" className="text-gray-600 hover:text-blue-800">Features</Link>
              <Link to="/" className="text-gray-600 hover:text-blue-800">Pricing</Link>
              <Link to="/" className="text-gray-600 hover:text-blue-800">FAQ</Link>
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="font-semibold text-gray-900">Company</h3>
              <Link to="/" className="text-gray-600 hover:text-blue-800">About</Link>
              <Link to="/" className="text-gray-600 hover:text-blue-800">Blog</Link>
              <Link to="/" className="text-gray-600 hover:text-blue-800">Careers</Link>
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="font-semibold text-gray-900">Legal</h3>
              <Link to="/" className="text-gray-600 hover:text-blue-800">Privacy</Link>
              <Link to="/" className="text-gray-600 hover:text-blue-800">Terms</Link>
              <Link to="/" className="text-gray-600 hover:text-blue-800">Security</Link>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center space-y-3 md:items-end">
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-800">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-800">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-800">
                <Shield className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-gray-600">© 2025 VaultLock. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
