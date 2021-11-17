import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavAdmin from '../../../components/Admin/Dashboard/Navbar/NavAdmin';
import SideBar from '../../../components/Admin/Dashboard/SideBar/SideBar';
import Stats from '../../../components/Admin/Dashboard/MainComponents/DashboardStats/Stats';
import AdminProfile from '../../../components/Admin/Dashboard/MainComponents/Profile/Profile';
import AdminDetails from '../../../components/Admin/Dashboard/MainComponents/Admins/AdminDetails';
import UserDetails from '../../../components/Admin/Dashboard/MainComponents/Users/UserDetails';
import IssuerDetails from '../../../components/Admin/Dashboard/MainComponents/Issuers/IssuerDetails';
import VerifierDetails from '../../../components/Admin/Dashboard/MainComponents/Verifiers/VerifierDetails';

const AdminDashboard = () => {
  const location = useLocation();
  const [currMenu, setCurrMenu] = useState('Dashboard');
  const sidebarCollapsed = useSelector((state) => state.admin.sidebarCollapsed);
  useEffect(() => {
    const pathName = location.pathname.replace('/admin/', '');
    setCurrMenu(`${pathName.charAt(0).toUpperCase() + pathName.slice(1)}`);
    return () => {
      setCurrMenu('Dashboard');
    };
  }, [location]);

  function renderInnerComponent() {
    switch (currMenu) {
      case 'Dashboard':
        return <Stats />;
      case 'Admins':
        return <AdminDetails />;
      case 'Users':
        return <UserDetails />;
      case 'Issuers':
        return <IssuerDetails />;
      case 'Verifiers':
        return <VerifierDetails />;
      case 'Profile':
        return <AdminProfile />;
      default:
        return <></>;
    }
  }

  return (
    <div className="flex bg-gray-200 select-none">
      <div className="fixed">
        <SideBar />
      </div>
      <div className={`${sidebarCollapsed ? 'ml-20' : 'ml-72'} flex-auto h-screen`}>
        <NavAdmin />
        <div className="text-3xl py-4 px-6 font-light text-gray-700 font-ubuntu">{currMenu}</div>
        <span className="sidebar-tooltip hidden">Dashboard</span>
        {renderInnerComponent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
