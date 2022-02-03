import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import NavIssuer from '../../../components/Issuer/Dashboard/Navbar/NavIssuer';
import SideBar from '../../../components/Issuer/Dashboard/SideBar/SideBar';
import useDetect from '../../../hooks/useDetect';
import NonDismissableModal from '../../../UI/NonDismissableModal';

const UserDashboard = () => {
  useDetect();
  const location = useLocation();
  const [currMenu, setCurrMenu] = useState('Dashboard');
  const sidebarCollapsed = useSelector((state) => state.issuer.sidebarCollapsed);
  useEffect(() => {
    const pathName = location.pathname.replace('/', '');
    const capitalizeFirstLetter = (str) => {
      const splitStr = str.toLowerCase().split(' ');
      for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
      }
      return splitStr.join(' ');
    };
    setCurrMenu(capitalizeFirstLetter(pathName.split('-').join(' ')));
    return () => {
      setCurrMenu('Dashboard');
    };
  }, [location]);

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAccountChanged = useSelector((state) => state.user.isAccountChanged);
  const isNetworkChanged = useSelector((state) => state.user.isNetworkChanged);

  function renderInnerComponent() {
    switch (currMenu) {
      case 'Dashboard':
        return <>Hi</>;
      // case 'Issue Document':
      //   return <IssueDocument />;
      // case 'Documents':
      //   return <IssuerDocuments />;
      // case 'Profile':
      //   return <IssuerProfile />;
      default:
        return <></>;
    }
  }
  return (
    <div className="flex bg-gray-200 select-none">
      {isLoggedIn && (isAccountChanged || isNetworkChanged) ? <NonDismissableModal text={`Please Switch to Correct ${isAccountChanged ? 'Account' : 'Network'} to Continue...`} /> : null}
      <div className="fixed">
        <SideBar />
      </div>
      <div className={`${sidebarCollapsed ? 'ml-20' : 'ml-72'} flex-auto h-screen`}>
        <NavIssuer />
        <div className="text-3xl py-4 px-6 font-light text-gray-700 font-ubuntu">{currMenu}</div>
        <span className="sidebar-tooltip hidden">Dashboard</span>
        {renderInnerComponent()}
      </div>
    </div>
  );
};

export default UserDashboard;
