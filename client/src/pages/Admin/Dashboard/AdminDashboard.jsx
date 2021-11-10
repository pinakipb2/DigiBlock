import React from 'react';
import NavAdmin from '../../../components/Admin/Dashboard/Navbar/NavAdmin';
import SideBar from '../../../components/Admin/Dashboard/SideBar/SideBar';

const AdminDashboard = () => (
  <div className="flex bg-gray-200">
    <div className="">
      <SideBar />
    </div>
    <div className="flex-auto">
      <NavAdmin />
    </div>
  </div>
);

export default AdminDashboard;
