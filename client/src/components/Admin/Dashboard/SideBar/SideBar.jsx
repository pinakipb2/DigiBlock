import React, { useState, useEffect } from 'react';

import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import CollapsedSideBar from './CollapsedSideBar';
import FullSideBar from './FullSideBar';

const SideBar = () => {
  const [currSidebarMenu, setCurrSidebarMenu] = useState(0);
  const [urlPath, setUrlPath] = useState(null);
  const sidebarCollapsed = useSelector((state) => state.admin.sidebarCollapsed);
  const adminName = useSelector((state) => state.admin.adminName);

  const [sidebarMenuData] = useState([
    {
      id: 0,
      name: 'Dashboard',
      url: '/admin/dashboard',
      icon: 'fas fa-tachometer-alt',
    },
    {
      id: 1,
      name: 'Admins',
      url: '/admin/admins',
      icon: 'fas fa-user-secret',
    },
    // {
    //   id: 2,
    //   name: 'Users',
    //   url: '/admin/users',
    //   icon: 'fas fa-user-alt',
    // },
    // {
    //   id: 3,
    //   name: 'Issuers',
    //   url: '/admin/issuers',
    //   icon: 'fas fa-user-tie',
    // },
    // {
    //   id: 4,
    //   name: 'Verifiers',
    //   url: '/admin/verifiers',
    //   icon: 'fas fa-user-check',
    // },
    {
      id: 2,
      name: 'Profile',
      url: '/admin/profile',
      icon: 'fas fa-id-badge',
    },
  ]);

  const changeSidebarIconColor = () => {
    const location = useLocation();
    useEffect(() => {
      const path = location.pathname.replace('/admin/', '');
      const pathName = path.charAt(0).toUpperCase() + path.slice(1);
      setUrlPath(`${pathName} | (Admin) - DigiBlock`);
      setCurrSidebarMenu(sidebarMenuData.findIndex((data) => data.name === pathName));
    }, [location]);
  };
  changeSidebarIconColor();

  return (
    <>
      <Helmet>
        <title>{urlPath}</title>
      </Helmet>
      {sidebarCollapsed ? (
        <CollapsedSideBar currSidebarMenu={currSidebarMenu} sidebarMenuData={sidebarMenuData} adminName={adminName} />
      ) : (
        <FullSideBar currSidebarMenu={currSidebarMenu} sidebarMenuData={sidebarMenuData} adminName={adminName} />
      )}
    </>
  );
};

export default SideBar;
