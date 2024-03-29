import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import AdminDetails from '../../../components/Admin/Dashboard/MainComponents/Admins/AdminDetails';
import Stats from '../../../components/Admin/Dashboard/MainComponents/DashboardStats/Stats';
import IssuerDetails from '../../../components/Admin/Dashboard/MainComponents/Issuers/IssuerDetails';
import AdminProfile from '../../../components/Admin/Dashboard/MainComponents/Profile/Profile';
import NavAdmin from '../../../components/Admin/Dashboard/Navbar/NavAdmin';
import SideBar from '../../../components/Admin/Dashboard/SideBar/SideBar';
import useAdminDetect from '../../../hooks/useAdminDetect';
import NonDismissableModal from '../../../UI/NonDismissableModal';

const AdminDashboard = () => {
  useAdminDetect();
  const location = useLocation();
  const [currMenu, setCurrMenu] = useState('Dashboard');
  const sidebarCollapsed = useSelector((state) => state.admin.sidebarCollapsed);
  useEffect(() => {
    const pathName = location.pathname.replace('/admin/', '').replaceAll('/', '');
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

  const isLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isAccountChanged = useSelector((state) => state.admin.isAccountChanged);
  const isNetworkChanged = useSelector((state) => state.admin.isNetworkChanged);

  function renderInnerComponent() {
    switch (currMenu) {
      case 'Dashboard':
        return <Stats />;
      case 'Admins':
        return <AdminDetails />;
      case 'Issuers':
        return <IssuerDetails />;
      case 'Profile':
        return <AdminProfile />;
      default:
        return <></>;
    }
  }
  return (
    <div className="flex bg-gray-200 select-none h-screen">
      {isLoggedIn && (isAccountChanged || isNetworkChanged) ? <NonDismissableModal text={`Please Switch to Correct ${isAccountChanged ? 'Account' : 'Network'} to Continue...`} /> : null}
      <div className="fixed">
        <SideBar />
      </div>
      <div className={`${sidebarCollapsed ? 'ml-20' : 'ml-72'} flex-auto h-full`}>
        <NavAdmin />
        <div className="text-3xl py-4 px-6 font-light text-gray-700 font-ubuntu">{currMenu}</div>
        <span className="sidebar-tooltip hidden">Dashboard</span>
        {renderInnerComponent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
