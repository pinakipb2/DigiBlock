import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Scrollbars from 'react-custom-scrollbars-2';

const FullSideBar = ({ currSidebarMenu }) => (
  <div className="h-screen w-72 flex flex-col bg-gray-700">
    <div className="py-4 border-b border-gray-500 text-center">
      <Link to="/admin/dashboard" className="text-2xl font-semibold text-gray-300">
        Admin Panel
      </Link>
    </div>
    <div className="py-4 border-b border-gray-500 text-center flex justify-center items-center">
      <img className="rounded-full w-10 h-10 mr-2" src="https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png" alt="Admin Profile" />
      <h1 className="text-lg text-gray-300 hover:text-gray-100 cursor-pointer">Name of admin</h1>
    </div>
    <Scrollbars
      style={{ width: '100%', height: '100%' }}
      renderThumbVertical={({ style, ...props }) => (
        <div
          {...props}
          style={{
            ...style,
            backgroundColor: '#FFF',
            width: '5px',
            opacity: '0.6',
            borderRadius: '50px',
          }}
        />
      )}
    >
      <div className="text-center p-3 flex flex-col space-y-2 cursor-pointer">
        <NavLink exact to="/admin/dashboard" className={(isActive) => `${!isActive ? 'text-gray-400' : 'bg-blue-600 rounded-md text-gray-100'}`}>
          <div className="flex py-2 px-4 items-center">
            <i className={`fas fa-tachometer-alt mr-3 ml-1 ${currSidebarMenu === 0 ? 'text-white' : 'text-gray-400'} text-xl`} />
            <h1 className="text-lg">Dashboard</h1>
          </div>
        </NavLink>
        <NavLink exact to="/admin/admins" className={(isActive) => `${!isActive ? 'text-gray-400' : 'bg-blue-600 rounded-md text-gray-100'}`}>
          <div className="flex py-2 px-4 items-center">
            <i className={`fas fa-user-secret mr-3 ml-1 ${currSidebarMenu === 1 ? 'text-white' : 'text-gray-400'} text-xl`} />
            <h1 className="text-lg">Admins</h1>
          </div>
        </NavLink>
        <NavLink exact to="/admin/users" className={(isActive) => `${!isActive ? 'text-gray-400' : 'bg-blue-600 rounded-md text-gray-100'}`}>
          <div className="flex py-2 px-4 items-center">
            <i className={`fas fa-user-alt mr-3 ml-1 ${currSidebarMenu === 2 ? 'text-white' : 'text-gray-400'} text-xl`} />
            <h1 className="text-lg">Users</h1>
          </div>
        </NavLink>
        <NavLink exact to="/admin/issuers" className={(isActive) => `${!isActive ? 'text-gray-400' : 'bg-blue-600 rounded-md text-gray-100'}`}>
          <div className="flex py-2 px-4 items-center">
            <i className={`fas fa-user-tie mr-3 ml-1 ${currSidebarMenu === 3 ? 'text-white' : 'text-gray-400'} text-xl`} />
            <h1 className="text-lg">Issuers</h1>
          </div>
        </NavLink>
        <NavLink exact to="/admin/verifiers" className={(isActive) => `${!isActive ? 'text-gray-400' : 'bg-blue-600 rounded-md text-gray-100'}`}>
          <div className="flex py-2 px-4 items-center">
            <i className={`fas fa-user-check mr-3 ml-1 ${currSidebarMenu === 4 ? 'text-white' : 'text-gray-400'} text-xl`} />
            <h1 className="text-lg">Verifiers</h1>
          </div>
        </NavLink>
        <NavLink exact to="/admin/profile" className={(isActive) => `${!isActive ? 'text-gray-400' : 'bg-blue-600 rounded-md text-gray-100'}`}>
          <div className="flex py-2 px-4 items-center">
            <i className={`fas fa-id-badge mr-3 ml-1 ${currSidebarMenu === 5 ? 'text-white' : 'text-gray-400'} text-xl`} />
            <h1 className="text-lg">Profile</h1>
          </div>
        </NavLink>
      </div>
    </Scrollbars>
  </div>
);

export default FullSideBar;
