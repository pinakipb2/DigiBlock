/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars-2';

const SideBar = () => (
  <div className="h-screen w-72 flex flex-col bg-gray-700">
    <div className="py-3.5 border-b border-gray-500 text-center">
      <h1 className="text-2xl font-semibold text-gray-300">Admin Panel</h1>
    </div>
    <div className="py-4 border-b border-gray-500 text-center flex justify-center items-center">
      <img className="rounded-full w-10 h-10 mr-2" src="https://media.istockphoto.com/photos/learn-to-love-yourself-first-picture-id1291208214?s=612x612" alt="profile" />
      <h1 className="text-lg text-gray-300 hover:text-gray-100 cursor-pointer">Name of admin</h1>
    </div>
    <Scrollbars
      style={{ width: '100%', height: '100%' }}
        // autoHide={true}
        // autoHideTimeout={1300}
      renderThumbVertical={({ style, ...props }) => (
        <div
            // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
          style={{
            ...style, backgroundColor: '#FFF', width: '5px', opacity: '0.6', borderRadius: '50px',
          }}
        />
      )}
    >
      <div className="text-center p-3 flex flex-col space-y-2 cursor-pointer">
        <NavLink
          to="/admin/dashboard"
          className={(isActive) => `${!isActive ? 'text-gray-400' : 'bg-blue-600 rounded-md text-gray-100'}`}
        >
          <div className="flex py-2 px-4 items-center">
            <i className="fas fa-tachometer-alt mr-3 ml-1 text-white text-xl" />
            <h1 className="text-lg">Dashboard</h1>
          </div>
        </NavLink>
        <NavLink
          to="/admin/admins"
          className={(isActive) => `${!isActive ? 'text-gray-400' : 'bg-blue-600 rounded-md text-gray-100'}`}
        >
          <div className="flex py-2 px-4 items-center">
            <i className="text-white fas fa-user mr-3 ml-1 text-xl" />
            <h1 className="text-lg">Admins</h1>
          </div>
        </NavLink>
        <NavLink
          to="/admin/profile"
          className={(isActive) => `${!isActive ? 'text-gray-400' : 'bg-blue-600 rounded-md text-gray-100'}`}
        >
          <div className="flex py-2 px-4 items-center">
            <i className="text-white fas fa-id-badge mr-3 ml-1 text-xl" />
            <h1 className="text-lg">Profile</h1>
          </div>
        </NavLink>
      </div>
    </Scrollbars>
  </div>
);

export default SideBar;
