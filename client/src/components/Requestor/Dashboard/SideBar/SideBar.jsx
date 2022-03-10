import React, { useState, useEffect } from 'react';

import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import CollapsedSideBar from './CollapsedSideBar';
import FullSideBar from './FullSideBar';

const SideBar = () => {
  const [currSidebarMenu, setCurrSidebarMenu] = useState(0);
  const [urlPath, setUrlPath] = useState(null);
  const sidebarCollapsed = useSelector((state) => state.requestor.sidebarCollapsed);
  const requestorName = useSelector((state) => state.requestor.requestorName);

  const [sidebarMenuData] = useState([
    {
      id: 0,
      name: 'Dashboard',
      url: '/requestor/dashboard',
      icon: 'fas fa-tachometer-alt',
    },
    {
      id: 1,
      name: 'Request Documents',
      url: '/requestor/request-documents',
      icon: 'fas fa-file-import',
    },
    {
      id: 2,
      name: 'Pending Documents',
      url: '/requestor/pending-documents',
      icon: 'fas fa-clock',
    },
    {
      id: 3,
      name: 'Accepted Documents',
      url: '/requestor/accepted-documents',
      icon: 'fas fa-check-circle',
    },
    {
      id: 4,
      name: 'Rejected Documents',
      url: '/requestor/rejected-documents',
      icon: 'fas fa-times-circle',
    },
    {
      id: 5,
      name: 'Revoked Documents',
      url: '/requestor/revoked-documents',
      icon: 'fas fa-history',
    },
    {
      id: 6,
      name: 'Profile',
      url: '/requestor/profile',
      icon: 'fas fa-id-badge',
    },
  ]);

  const changeSidebarIconColor = () => {
    const location = useLocation();
    useEffect(() => {
      const path = location.pathname.replace('/requestor/', '').replace('/', '');
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
        <CollapsedSideBar currSidebarMenu={currSidebarMenu} sidebarMenuData={sidebarMenuData} requestorName={requestorName} />
      ) : (
        <FullSideBar currSidebarMenu={currSidebarMenu} sidebarMenuData={sidebarMenuData} requestorName={requestorName} />
      )}
    </>
  );
};

export default SideBar;
