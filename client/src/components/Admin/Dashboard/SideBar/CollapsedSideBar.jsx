import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Scrollbars from 'react-custom-scrollbars-2';

const CollapsedSideBar = ({ currSidebarMenu }) => (
  <div className="h-screen w-20 flex flex-col bg-gray-700">
    <div className="py-5 border-b border-gray-500 text-center">
      <Link to="/admin/dashboard" className="text-2xl font-semibold text-gray-300">
        AP
      </Link>
    </div>
    <div className="py-4 border-b border-gray-500 text-center flex justify-center items-center">
      <img className="rounded-full w-10 h-10 mr-2" src="https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png" alt="Admin Profile" />
    </div>
    <Scrollbars
      style={{ width: '100%', height: '100%' }}
                // autoHide={true}
                // autoHideTimeout={1300}
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
      <div className="text-center p-3 flex flex-col justify-center items-center space-y-2 cursor-pointer">
        <NavLink exact to="/admin/dashboard" className={(isActive) => `${!isActive ? 'text-gray-400' : 'bg-blue-600 rounded-md text-gray-100'}`}>
          <div className="flex py-2 px-4 items-center">
            <i className={`fas fa-tachometer-alt ${currSidebarMenu === 0 ? 'text-white' : 'text-gray-400'} text-xl`} />
          </div>
        </NavLink>
        <NavLink exact to="/admin/admins" className={(isActive) => `${!isActive ? 'text-gray-400' : 'bg-blue-600 rounded-md text-gray-100'}`}>
          <div className="flex py-2 px-4 items-center">
            <i className={`fas fa-user-secret ${currSidebarMenu === 1 ? 'text-white' : 'text-gray-400'} text-xl`} />
          </div>
        </NavLink>
        <NavLink exact to="/admin/users" className={(isActive) => `${!isActive ? 'text-gray-400' : 'bg-blue-600 rounded-md text-gray-100'}`}>
          <div className="flex py-2 px-4 items-center">
            <i className={`fas fa-user-alt ${currSidebarMenu === 2 ? 'text-white' : 'text-gray-400'} text-xl`} />
          </div>
        </NavLink>
        <NavLink exact to="/admin/issuers" className={(isActive) => `${!isActive ? 'text-gray-400' : 'bg-blue-600 rounded-md text-gray-100'}`}>
          <div className="flex py-2 px-4 items-center">
            <i className={`fas fa-user-tie ${currSidebarMenu === 3 ? 'text-white' : 'text-gray-400'} text-xl`} />
          </div>
        </NavLink>
        <NavLink exact to="/admin/verifiers" className={(isActive) => `${!isActive ? 'text-gray-400' : 'bg-blue-600 rounded-md text-gray-100'}`}>
          <div className="flex py-2 px-4 items-center">
            <i className={`fas fa-user-check ${currSidebarMenu === 4 ? 'text-white' : 'text-gray-400'} text-xl`} />
          </div>
        </NavLink>
        <NavLink exact to="/admin/profile" className={(isActive) => `${!isActive ? 'text-gray-400' : 'bg-blue-600 rounded-md text-gray-100'}`}>
          <div className="flex py-2 px-4 items-center">
            <i className={`fas fa-id-badge ${currSidebarMenu === 5 ? 'text-white' : 'text-gray-400'} text-xl`} />
          </div>
        </NavLink>
      </div>
    </Scrollbars>
  </div>
);

export default CollapsedSideBar;
