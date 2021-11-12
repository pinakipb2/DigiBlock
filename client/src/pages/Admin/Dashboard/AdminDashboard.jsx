import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavAdmin from '../../../components/Admin/Dashboard/Navbar/NavAdmin';
import SideBar from '../../../components/Admin/Dashboard/SideBar/SideBar';
import Stats from '../../../components/Admin/Dashboard/MainComponents/DashboardStats/Stats';
import AdminProfile from '../../../components/Admin/Dashboard/MainComponents/Profile/Profile';
import AdminDetails from '../../../components/Admin/Dashboard/MainComponents/Admins/AdminDetails';

const AdminDashboard = () => {
  const location = useLocation();
  const [name, setName] = useState('Dashboard');
  useEffect(() => {
    const pathName = location.pathname.replace('/admin/', '');
    setName(`${pathName.charAt(0).toUpperCase() + pathName.slice(1)}`);
    return (() => {
      setName('Dashboard');
    });
  }, [location]);

  function renderInnerComponent() {
    switch (name) {
      case 'Dashboard':
        return <Stats />;
      case 'Admins':
        return <AdminDetails />;
      case 'Profile':
        return <AdminProfile />;
      default:
        return <></>;
    }
  }

  return (
    <div className="flex bg-gray-200">
      <div className="">
        <SideBar />
      </div>
      <div className="flex-auto">
        <NavAdmin />
        <div className="text-3xl py-4 px-6 font-bold text-gray-700 font-roboto">{name}</div>
        {
         renderInnerComponent()
        }
      </div>
    </div>
  );
};

export default AdminDashboard;
