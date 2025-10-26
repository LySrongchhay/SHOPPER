import React, { useContext, useState } from 'react';
import logo from '../assets/logo.png';
import cart_icon from '../assets/cart_icon.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiSearch } from 'react-icons/fi';
import { ShopContext } from '../../contexts/ShopContext';

const Navbar = () => {
  const {getTotalCartItems, searchTerm, handleSearch, clearSearch} = useContext(ShopContext);
  const location = useLocation();
  const currentPath = location.pathname;
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Men', path: '/mens' },
    { name: 'Women', path: '/womens' },
    { name: 'Kids', path: '/kids' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      navigate('/search');
      setIsOpen(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <div className="w-full sticky top-0 bg-white shadow z-50">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Left: Logo + Navigation Links (Desktop) */}
        <div className="flex items-center space-x-12">
          {/* Logo - FIXED: Wrap both logo and text in Link */}
          <Link to="/" className="flex items-center space-x-2 no-underline">
            <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />
            <p className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors cursor-pointer">
              SHOPPER
            </p>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden lg:flex space-x-10 text-gray-700 font-medium">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`cursor-pointer transition duration-200 ${
                    currentPath === link.path
                      ? "text-blue-600 font-semibold relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-blue-600"
                      : "hover:text-blue-600"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Center: Search Bar (Tablet & Desktop) - Hidden on mobile */}
        <div className="hidden md:block flex-1 max-w-lg mx-8">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search products..."
              className="w-full px-4 py-2 pl-10 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <FiSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            
            <button
              onClick={handleSearchSubmit}
              className="absolute right-10 top-2.5 text-gray-400 hover:text-blue-600 transition-colors"
            >
              <FiSearch className="h-5 w-5" />
            </button>
            
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18-6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Right: Login + Cart + Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Tablet & Desktop: Login + Cart */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link to='/login'>
              <button className="px-4 py-1.5 border border-blue-600 text-blue-600 font-medium rounded-lg 
                    hover:bg-blue-600 hover:text-white hover:shadow-md 
                    active:scale-95 transition-all duration-300 cursor-pointer">
                Login
              </button>
            </Link>

            <div className="relative cursor-pointer group">
              <Link to='/cart'>
                <img
                  src={cart_icon}
                  alt="Cart"
                  className="h-8 w-8 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-lg"
                />
              </Link>
              <div className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold 
                        rounded-full h-4 w-4 flex items-center justify-center 
                        group-hover:scale-110 transition-transform duration-300">
                {getTotalCartItems()}
              </div>
            </div>
          </div>

          {/* Mobile: Cart Icon Only */}
          <div className="sm:hidden relative cursor-pointer group mr-2">
            <Link to='/cart'>
              <img
                src={cart_icon}
                alt="Cart"
                className="h-7 w-7 transition-transform duration-300 group-hover:scale-110"
              />
            </Link>
            <div className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold 
                      rounded-full h-4 w-4 flex items-center justify-center">
              {getTotalCartItems()}
            </div>
          </div>

          {/* Hamburger Icon (Mobile & Tablet) - Hidden on desktop */}
          <div className="lg:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Menu - Only show on mobile/tablet */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-lg border-t border-gray-200">
          {/* Search Bar in Mobile Menu - Only show on mobile (not tablet) */}
          <div className="md:hidden px-4 py-4 border-b border-gray-100">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-10 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <FiSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              
              <button
                onClick={handleSearchSubmit}
                className="absolute right-10 top-2.5 text-gray-400 hover:text-blue-600 transition-colors"
              >
                <FiSearch className="h-5 w-5" />
              </button>
              
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18-6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="px-4 py-2">
            <ul className="flex flex-col space-y-3 text-gray-700 font-medium">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block py-2 cursor-pointer transition duration-200 ${
                      currentPath === link.path
                        ? "text-blue-600 font-semibold"
                        : "hover:text-blue-600"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Login Button */}
          <div className="px-4 py-4 border-t border-gray-100">
            <Link to='/login' onClick={() => setIsOpen(false)}>
              <button className="w-full px-4 py-2 border border-blue-600 text-blue-600 font-medium rounded-lg 
                    hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer">
                Login
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;