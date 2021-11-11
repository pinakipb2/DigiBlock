import React from 'react';
import { Link } from 'react-router-dom';

const NavAdmin = () => (
  <nav className="items-center">
    <div className="bg-white w-full px-4 py-1 flex justify-evenly z-50 border-b border-gray-300">
      <div className="w-full flex justify-between sm:px-10 px-6 py-3 items-center">
        <div className="flex-row">
          <Link to="/home" className="text-lg font-semibold cursor-pointer text-gray-500 hover:text-gray-900 pr-6">
            <span>Home</span>
          </Link>
          <Link to="/contact" className="text-lg font-semibold cursor-pointer text-gray-500 hover:text-gray-900">
            <span>Contact</span>
          </Link>
        </div>
      </div>
    </div>
  </nav>
);

export default NavAdmin;
