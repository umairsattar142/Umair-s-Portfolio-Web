import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-12">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl">Umair's Portfolio</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
            >
              About
            </Link>
            <Link 
              to="/projects" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
            >
              Projects
            </Link>
            
            <Link 
              to="/contact" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
            >
              Contact
            </Link>
            
            {/* Use the router Link instead of an anchor tag */}
            <Link 
              to="/resume" 
              className="ml-4 px-4 py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700"
              onClick={() => console.log('Resume link clicked')}
            >
              Resume
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
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
      
      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            to="/" 
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
          >
            About
          </Link>
          <Link 
            to="/projects" 
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
          >
            Projects
          </Link>
          
          <Link 
            to="/contact" 
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
          >
            Contact
          </Link>
          
          <Link 
            to="/resume" 
            className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 hover:bg-blue-700 mt-4"
          >
            Resume
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;