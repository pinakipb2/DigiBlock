import React from 'react';

import Avatar from 'react-avatar';
import Scrollbars from 'react-custom-scrollbars-2';
import { Link, NavLink } from 'react-router-dom';

const FullSideBar = ({ currSidebarMenu, sidebarMenuData, userName }) => (
  <div className="h-screen w-72 flex flex-col bg-gray-700">
    <div className="py-4 border-b border-gray-500 text-center">
      <Link to="/admin/dashboard" className="text-2xl font-semibold text-gray-300">
        User Panel
      </Link>
    </div>
    <div className="py-4 border-b border-gray-500 text-center flex justify-center items-center">
      <Avatar className="rounded-full mr-2" name={userName} size="41" />
      <h1 className="text-lg text-gray-300 hover:text-gray-100 cursor-pointer">{userName}</h1>
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
        {sidebarMenuData.map(({ id, name, url, icon }) => (
          <NavLink key={id} exact to={url} className={(isActive) => `${!isActive ? 'text-gray-400' : 'bg-blue-600 rounded-md text-gray-100'}`}>
            <div className="flex py-2 px-4 items-center">
              <i className={`${icon} mr-3 ml-1 ${currSidebarMenu === id ? 'text-white' : 'text-gray-400'} text-xl`} />
              <h1 className="text-lg">{name}</h1>
            </div>
          </NavLink>
        ))}
      </div>
    </Scrollbars>
  </div>
);

export default FullSideBar;
