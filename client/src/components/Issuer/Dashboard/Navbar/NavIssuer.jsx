import React, { useState, useEffect, useRef } from 'react';

import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { checkIssuerSidebarCollapsed } from '../../../../redux/issuer/issuer.actions';
import NavProfile from './NavProfile';

const NavIssuer = () => {
  const dispatch = useDispatch();
  const [toggleProfile, setToggleProfile] = useState(false);
  const issuerName = useSelector((state) => state.issuer.issuerName);

  const collapseProfileOnURLChange = () => {
    const location = useLocation();
    useEffect(
      () => () => {
        setToggleProfile(false);
      },
      [location]
    );
  };
  collapseProfileOnURLChange();

  const checkClickOutside = (handler) => {
    const domNode = useRef();
    useEffect(() => {
      const updateToogle = (event) => {
        if (domNode.current && !domNode.current.contains(event.target)) {
          handler();
        }
      };
      document.addEventListener('mousedown', updateToogle);
      return () => {
        document.removeEventListener('mousedown', updateToogle);
      };
    }, []);
    return domNode;
  };

  const domNode = checkClickOutside(() => {
    setToggleProfile(false);
  });

  return (
    <nav className="items-center">
      <div className="bg-white w-full px-4 py-0 flex justify-evenly z-50 border-b border-gray-300">
        <div className="w-full flex justify-between px-2 py-3 items-center" ref={domNode}>
          <div className="flex-row">
            <div
              role="button"
              onClick={() => {
                dispatch(checkIssuerSidebarCollapsed());
                setToggleProfile(false);
              }}
              className="cursor-pointer text-gray-500 hover:text-gray-900"
            >
              <i className="fas fa-bars fa-lg" />
            </div>
          </div>
          <div role="button" onClick={() => setToggleProfile(!toggleProfile)} className="text-center flex justify-center items-center pr-24 cursor-pointer">
            <Avatar className="rounded-full mr-2" name={issuerName} size="41" />
            <h1 className="text-lg text-gray-900">{issuerName}</h1>
          </div>
          {toggleProfile ? <NavProfile /> : null}
        </div>
      </div>
    </nav>
  );
};

export default NavIssuer;
