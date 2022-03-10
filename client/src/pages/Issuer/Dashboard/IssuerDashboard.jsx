import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Guide from '../../../components/Issuer/Dashboard/MainComponents/DashboardGuide/Guide';
import IssuerDocuments from '../../../components/Issuer/Dashboard/MainComponents/Documents/IssuerDocuments';
import IssueDocument from '../../../components/Issuer/Dashboard/MainComponents/IssueDocument/IssueDocument';
import IssuerProfile from '../../../components/Issuer/Dashboard/MainComponents/Profile/Profile';
import NavIssuer from '../../../components/Issuer/Dashboard/Navbar/NavIssuer';
import SideBar from '../../../components/Issuer/Dashboard/SideBar/SideBar';
// import useDetect from '../../../hooks/useDetect';
import useIssuerDetect from '../../../hooks/useIssuerDetect';
import NonDismissableModal from '../../../UI/NonDismissableModal';

const IssuerDashboard = () => {
  // useDetect();
  useIssuerDetect();
  const location = useLocation();
  const [currMenu, setCurrMenu] = useState('Dashboard');
  const sidebarCollapsed = useSelector((state) => state.issuer.sidebarCollapsed);
  useEffect(() => {
    const pathName = location.pathname.replace('/issuer/', '').replaceAll('/', '');
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

  const isLoggedIn = useSelector((state) => state.issuer.isLoggedIn);
  const isAccountChanged = useSelector((state) => state.issuer.isAccountChanged);
  const isNetworkChanged = useSelector((state) => state.issuer.isNetworkChanged);

  function renderInnerComponent() {
    switch (currMenu) {
      case 'Dashboard':
        return <Guide />;
      case 'Issue Document':
        return <IssueDocument />;
      case 'Documents':
        return <IssuerDocuments />;
      case 'Profile':
        return <IssuerProfile />;
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

export default IssuerDashboard;
