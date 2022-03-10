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
    {
      id: 2,
      name: 'Issuers',
      url: '/admin/issuers',
      icon: 'fas fa-user-tie',
    },
    {
      id: 3,
      name: 'Profile',
      url: '/admin/profile',
      icon: 'fas fa-id-badge',
    },
  ]);

  const changeSidebarIconColor = () => {
    const location = useLocation();
    useEffect(() => {
      const path = location.pathname.replace('/admin/', '').replaceAll('/', '');
      const capitalizeFirstLetter = (str) => {
        const splitStr = str.toLowerCase().split(' ');
        for (let i = 0; i < splitStr.length; i++) {
          splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
      };
      const pathName = capitalizeFirstLetter(path.split('-').join(' '));
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
