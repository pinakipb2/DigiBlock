import React from 'react';

import Tippy from '@tippyjs/react';
import Avatar from 'react-avatar';
import Scrollbars from 'react-custom-scrollbars-2';
import { Link, NavLink } from 'react-router-dom';

const CollapsedSideBar = ({ currSidebarMenu, sidebarMenuData, issuerName }) => (
  <div className="h-screen w-20 flex flex-col bg-gray-700">
    <div className="py-4 border-b border-gray-500 text-center">
      <Link to="/issuer/dashboard" className="text-2xl font-semibold text-gray-300">
        IP
      </Link>
    </div>
    <div className="py-4 border-b border-gray-500 text-center flex justify-center items-center">
      <Avatar className="rounded-full mr-2" name={issuerName} size="50" />
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
      <div className="text-center p-3 flex flex-col justify-center items-center space-y-2 cursor-pointer">
        {sidebarMenuData.map(({ id, name, url, icon }) => (
          <Tippy
            key={id}
            placement="right"
            content={<span className="w-auto p-2 m-2 min-w-max bg-gray-900 text-white left-14 rounded-md shadow-md text-xs font-bold transition-all duration-100 origin-left">{name}</span>}
          >
            <NavLink exact to={url} className={(isActive) => `${!isActive ? 'text-gray-400' : 'bg-blue-600 rounded-md text-gray-100'}`}>
              <div className="flex py-2 px-4 items-center">
                <i className={`${icon} ${currSidebarMenu === id ? 'text-white' : 'text-gray-400'} text-xl`} />
              </div>
            </NavLink>
          </Tippy>
        ))}
      </div>
    </Scrollbars>
  </div>
);

export default CollapsedSideBar;
