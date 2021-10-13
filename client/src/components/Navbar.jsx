import React from 'react';

const Navbar = () => (
  <nav className="items-center">
    <div className="bg-white w-full px-4 py-3 flex justify-evenly fixed z-50">
      <div className="w-full flex justify-between sm:px-10 px-6 items-center">
        <div className="flex">
          <img src="assets/nav_logo.png" alt="logo" className="h-16 ml-4" />
        </div>
        <div className="flex-row">
          <a href="signin" className="ml-2 px-6 py-3 rounded-xl text-sm text-blue-600 border border-gray-400 font-bold cursor-pointer">
            <span>LOGIN</span>
          </a>
          <a href="register" className="ml-2 px-6 py-3 rounded-xl text-sm text-white bg-blue-600 border border-blue-500 font-bold cursor-pointer">
            <span>SIGNUP</span>
          </a>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
