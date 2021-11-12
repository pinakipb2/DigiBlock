import React from 'react';

const NavAdmin = () => (
  <nav className="items-center">
    <div className="bg-white w-full px-4 py-1 flex justify-evenly z-50 border-b border-gray-300">
      <div className="w-full flex justify-between px-2 py-3.5 items-center">
        <div className="flex-row">
          <div className="cursor-pointer text-gray-500 hover:text-gray-900">
            <i className="fas fa-bars fa-lg" />
          </div>
        </div>
      </div>
    </div>
  </nav>
);

export default NavAdmin;
