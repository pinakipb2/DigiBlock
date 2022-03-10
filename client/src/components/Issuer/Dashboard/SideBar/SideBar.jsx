import React, { useState, useEffect } from 'react';

import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import CollapsedSideBar from './CollapsedSideBar';
import FullSideBar from './FullSideBar';

const SideBar = () => {
  const [currSidebarMenu, setCurrSidebarMenu] = useState(0);
  const [urlPath, setUrlPath] = useState(null);
  const sidebarCollapsed = useSelector((state) => state.issuer.sidebarCollapsed);
  const issuerName = useSelector((state) => state.issuer.issuerName);

  const [sidebarMenuData] = useState([
    {
      id: 0,
      name: 'Dashboard',
      url: '/issuer/dashboard',
      icon: 'fas fa-tachometer-alt',
    },
    {
      id: 1,
      name: 'Issue Document',
      url: '/issuer/issue-document',
      icon: 'fas fa-file-signature',
    },
    {
      id: 2,
      name: 'Documents',
      url: '/issuer/documents',
      icon: 'fas fa-folder-open',
    },
    {
      id: 3,
      name: 'Profile',
      url: '/issuer/profile',
      icon: 'fas fa-id-badge',
    },
  ]);

  const location = useLocation();
  useEffect(() => {
    const path = location.pathname.replace('/issuer/', '').replaceAll('/', '');
    const capitalizeFirstLetter = (str) => {
      const splitStr = str.toLowerCase().split(' ');
      for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
      }
      return splitStr.join(' ');
    };
    const pathName = capitalizeFirstLetter(path.split('-').join(' '));
    setUrlPath(`${pathName} | (Issuer) - DigiBlock`);
    setCurrSidebarMenu(sidebarMenuData.findIndex((data) => data.name === pathName));
  }, [location]);

  return (
    <>
      <Helmet>
        <title>{urlPath}</title>
      </Helmet>
      {sidebarCollapsed ? (
        <CollapsedSideBar currSidebarMenu={currSidebarMenu} sidebarMenuData={sidebarMenuData} issuerName={issuerName} />
      ) : (
        <FullSideBar currSidebarMenu={currSidebarMenu} sidebarMenuData={sidebarMenuData} issuerName={issuerName} />
      )}
    </>
  );
};

export default SideBar;
