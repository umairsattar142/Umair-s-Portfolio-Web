import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive(path)
        ? 'bg-blue-600 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  const mobileLinkClass = (path) =>
    `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
      isActive(path)
        ? 'bg-blue-600 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  return (
    <nav className="bg-gray-900 bg-opacity-95 backdrop-blur-sm text-white shadow-lg fixed w-full z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Umair's Portfolio</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <Link to="/" className={linkClass('/')}>Home</Link>
            <Link to="/about" className={linkClass('/about')}>About</Link>
            <Link to="/projects" className={linkClass('/projects')}>Projects</Link>
            <Link to="/contact" className={linkClass('/contact')}>Contact</Link>
            <Link
              to="/resume"
              className="ml-3 px-4 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Resume
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none transition-colors"
            >
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu with smooth transition */}
      <div className={`${isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'} md:hidden overflow-hidden transition-all duration-300 ease-in-out`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900 bg-opacity-95">
          <Link to="/" className={mobileLinkClass('/')} onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" className={mobileLinkClass('/about')} onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/projects" className={mobileLinkClass('/projects')} onClick={() => setIsOpen(false)}>Projects</Link>
          <Link to="/contact" className={mobileLinkClass('/contact')} onClick={() => setIsOpen(false)}>Contact</Link>
          <Link
            to="/resume"
            className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 hover:bg-blue-700 mt-2 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Resume
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
