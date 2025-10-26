import React from 'react';
import footer_logo from '../assets/logo_big.png';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 py-12 px-6 flex flex-col items-center gap-8">
      
      {/* Logo and Name */}
      <div className="flex items-center gap-3">
        <img src={footer_logo} alt="Shopper Logo" className="h-10 w-10 object-contain" />
        <span className="text-2xl md:text-3xl font-bold text-white">SHOPPER</span>
      </div>

      {/* Quick Links */}
      <div className="flex flex-wrap justify-center gap-8 text-gray-400 text-sm">
        <Link to={'/'}><p className="hover:text-white transition-colors">Home</p></Link>
        
        <Link to={'/about'}><p className="hover:text-white transition-colors">About Us</p></Link>
        <Link to={'/contact'}><p className="hover:text-white transition-colors">Contact</p></Link>
        <p className="hover:text-white transition-colors">Privacy Policy</p>
        <p className="hover:text-white transition-colors">Terms of Service</p>
      </div>

      {/* Copyright */}
      <div className="text-center">
        <p className="text-gray-500 text-sm">
          © 2024 SHOPPER. All rights reserved.
        </p>
        <p className="text-gray-600 text-xs mt-2">
          Made with heart for fashion lovers
        </p>
      </div>

    </footer>
  );
};

export default Footer;