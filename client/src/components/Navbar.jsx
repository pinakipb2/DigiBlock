import React from 'react';

const Navbar = () => (
  <nav className="items-center">
    <div className="bg-white w-full px-4 py-3 flex justify-around fixed z-50">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center">
          <img src="assets/nav_logo.png" alt="logo" className="h-16 ml-4" />
        </div>
        <div className="flex-row">
          <a href="signin" className="ml-2 px-4 py-2 rounded-xl text-black font-bold hover:text-blue-900 hover:bg-blue-200 cursor-pointer">
            <span>SIGNIN</span>
          </a>
          <a href="register" className="ml-2 px-4 py-2 rounded-xl text-black font-bold hover:text-blue-900 hover:bg-blue-200 cursor-pointer">
            <span>SIGNUP</span>
          </a>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
