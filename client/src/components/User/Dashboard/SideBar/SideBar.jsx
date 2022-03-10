import React, { useState, useEffect } from 'react';

import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import CollapsedSideBar from './CollapsedSideBar';
import FullSideBar from './FullSideBar';

const SideBar = () => {
  const [currSidebarMenu, setCurrSidebarMenu] = useState(0);
  const [urlPath, setUrlPath] = useState(null);
  const sidebarCollapsed = useSelector((state) => state.user.sidebarCollapsed);
  const userName = useSelector((state) => state.user.userName);

  const [sidebarMenuData] = useState([
    {
      id: 0,
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'fas fa-tachometer-alt',
    },
    {
      id: 1,
      name: 'Documents',
      url: '/documents',
      icon: 'fas fa-file-pdf',
    },
    {
      id: 2,
      name: 'Pending Approval',
      url: '/pending-approval',
      icon: 'fas fa-clock',
    },
    {
      id: 3,
      name: 'Access Granted',
      url: '/access-granted',
      icon: 'fas fa-check-circle',
    },
    {
      id: 4,
      name: 'Access Rejected',
      url: '/access-rejected',
      icon: 'fas fa-times-circle',
    },
    {
      id: 5,
      name: 'Access Revoked',
      url: '/access-revoked',
      icon: 'fas fa-history',
    },
    {
      id: 6,
      name: 'Profile',
      url: '/profile',
      icon: 'fas fa-id-badge',
    },
  ]);

  const changeSidebarIconColor = () => {
    const location = useLocation();
    useEffect(() => {
      const path = location.pathname.replaceAll('/', '');
      const capitalizeFirstLetter = (str) => {
        const splitStr = str.toLowerCase().split(' ');
        for (let i = 0; i < splitStr.length; i++) {
          splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
      };
      const pathName = capitalizeFirstLetter(path.split('-').join(' '));
      setUrlPath(`${pathName} | DigiBlock`);
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
        <CollapsedSideBar currSidebarMenu={currSidebarMenu} sidebarMenuData={sidebarMenuData} userName={userName} />
      ) : (
        <FullSideBar currSidebarMenu={currSidebarMenu} sidebarMenuData={sidebarMenuData} userName={userName} />
      )}
    </>
  );
};

export default SideBar;
