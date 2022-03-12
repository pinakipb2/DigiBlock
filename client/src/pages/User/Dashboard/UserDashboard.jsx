import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import AccessGranted from '../../../components/User/Dashboard/MainComponents/AccessGranted/AccessGranted';
import AccessRejected from '../../../components/User/Dashboard/MainComponents/AccessRejected/AccessRejected';
import AccessRevoked from '../../../components/User/Dashboard/MainComponents/AccessRevoked/AccessRevoked';
import UserGuide from '../../../components/User/Dashboard/MainComponents/DashboardGuide/UserGuide';
import UserDocuments from '../../../components/User/Dashboard/MainComponents/Documents/UserDocuments';
import PendingApproval from '../../../components/User/Dashboard/MainComponents/PendingApproval/PendingApproval';
import UserProfile from '../../../components/User/Dashboard/MainComponents/Profile/Profile';
import NavUser from '../../../components/User/Dashboard/Navbar/NavUser';
import SideBar from '../../../components/User/Dashboard/SideBar/SideBar';
import useUserDetect from '../../../hooks/useUserDetect';
import NonDismissableModal from '../../../UI/NonDismissableModal';

const UserDashboard = () => {
  useUserDetect();
  const location = useLocation();
  const [currMenu, setCurrMenu] = useState('Dashboard');
  const sidebarCollapsed = useSelector((state) => state.user.sidebarCollapsed);
  useEffect(() => {
    const pathName = location.pathname.replaceAll('/', '');
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
        return <UserGuide />;
      case 'Documents':
        return <UserDocuments />;
      case 'Profile':
        return <UserProfile />;
      case 'Pending Approval':
        return <PendingApproval />;
      case 'Access Granted':
        return <AccessGranted />;
      case 'Access Rejected':
        return <AccessRejected />;
      case 'Access Revoked':
        return <AccessRevoked />;
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
        <NavUser />
        <div className="text-3xl py-4 px-6 font-light text-gray-700 font-ubuntu">{currMenu}</div>
        <span className="sidebar-tooltip hidden">Dashboard</span>
        {renderInnerComponent()}
      </div>
    </div>
  );
};

export default UserDashboard;
