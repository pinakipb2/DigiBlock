/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { checkSidebarCollapsed } from '../../../../redux/admin/admin.actions';
import NavProfile from './NavProfile';

const NavAdmin = () => {
  const dispatch = useDispatch();
  const [toggleProfile, setToggleProfile] = useState(false);

  function changeSidebarIconColor() {
    const location = useLocation();
    useEffect(() => () => {
      setToggleProfile(false);
    }, [location]);
  }
  changeSidebarIconColor();

  return (
    <nav className="items-center">
      <div className="bg-white w-full px-4 py-1 flex justify-evenly z-50 border-b border-gray-300">
        <div className="w-full flex justify-between px-2 py-3.5 items-center">
          <div className="flex-row">
            <div
              role="button"
              onClick={() => {
                dispatch(checkSidebarCollapsed());
              }}
              className="cursor-pointer text-gray-500 hover:text-gray-900"
            >
              <i className="fas fa-bars fa-lg" />
            </div>
          </div>
          <div
            role="button"
            onClick={() => setToggleProfile(!toggleProfile)}
            onFocusOut={() => setToggleProfile(false)}
            className="text-center flex justify-center items-center pr-24"
          >
            <img className="rounded-full w-10 h-10 mr-2" src="https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png" alt="Admin Profile" />
            <h1 className="text-lg text-gray-900 cursor-pointer">Name of admin</h1>
          </div>
          {
            toggleProfile ? <NavProfile /> : null
          }
        </div>
      </div>
    </nav>
  );
};

export default NavAdmin;
