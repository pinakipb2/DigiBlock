/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Helmet } from 'react-helmet';

const SideBar = () => {
  const [currSidebarMenu, setCurrSidebarMenu] = useState(0);
  const [urlPath, setUrlPath] = useState(null);

  function changeSidebarIconColor() {
    const location = useLocation();
    useEffect(() => {
      const pathName = location.pathname.replace('/admin/', '');
      setUrlPath(`${pathName.charAt(0).toUpperCase() + pathName.slice(1)} (Admin) - DigiBlock`);
      switch (pathName) {
        case 'dashboard':
          setCurrSidebarMenu(0);
          break;
        case 'admins':
          setCurrSidebarMenu(1);
          break;
        case 'profile':
          setCurrSidebarMenu(2);
          break;
        default:
          break;
      }
      return (() => {
        setCurrSidebarMenu(0);
      });
    }, [location]);
  }
  changeSidebarIconColor();

  return (
    <>
      <Helmet>
        <title>{urlPath}</title>
      </Helmet>
      <div className="h-screen w-72 flex flex-col bg-gray-700">
        <div className="py-3.5 border-b border-gray-500 text-center">
          <Link to="/admin/dashboard" className="text-2xl font-semibold text-gray-300">Admin Panel</Link>
        </div>
        <div className="py-4 border-b border-gray-500 text-center flex justify-center items-center">
          <img className="rounded-full w-10 h-10 mr-2" src="https://adminlte.io/themes/v3/dist/img/user2-160x160.jpg" alt="Admin Profile" />
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
              exact
              to="/admin/dashboard"
              className={(isActive) => `${!isActive ? 'text-gray-400' : 'bg-blue-600 rounded-md text-gray-100'}`}
            >
              <div className="flex py-2 px-4 items-center">
                <i className={`fas fa-tachometer-alt mr-3 ml-1 ${currSidebarMenu !== 0 ? 'text-gray-400' : 'text-white'} text-xl`} />
                <h1 className="text-lg">Dashboard</h1>
              </div>
            </NavLink>
            <NavLink
              exact
              to="/admin/admins"
              className={(isActive) => `${!isActive ? 'text-gray-400' : 'bg-blue-600 rounded-md text-gray-100'}`}
            >
              <div className="flex py-2 px-4 items-center">
                <i className={`fas fa-user-alt mr-3 ml-1 ${currSidebarMenu !== 1 ? 'text-gray-400' : 'text-white'} text-xl`} />
                <h1 className="text-lg">Admins</h1>
              </div>
            </NavLink>
            <NavLink
              exact
              to="/admin/profile"
              className={(isActive) => `${!isActive ? 'text-gray-400' : 'bg-blue-600 rounded-md text-gray-100'}`}
            >
              <div className="flex py-2 px-4 items-center">
                <i className={`fas fa-id-badge mr-3 ml-1 ${currSidebarMenu !== 2 ? 'text-gray-400' : 'text-white'} text-xl`} />
                <h1 className="text-lg">Profile</h1>
              </div>
            </NavLink>
          </div>
        </Scrollbars>
      </div>
    </>
  );
};

export default SideBar;
