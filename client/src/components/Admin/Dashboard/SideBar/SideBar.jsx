import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import FullSideBar from './FullSideBar';
import CollapsedSideBar from './CollapsedSideBar';

const SideBar = () => {
  const [currSidebarMenu, setCurrSidebarMenu] = useState(0);
  const [urlPath, setUrlPath] = useState(null);
  const sidebarCollapsed = useSelector((state) => state.admin.sidebarCollapsed);
  const sidebarMenuData = useSelector((state) => state.admin.sidebarMenu);

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
        <CollapsedSideBar currSidebarMenu={currSidebarMenu} sidebarMenuData={sidebarMenuData} />
      ) : (
        <FullSideBar currSidebarMenu={currSidebarMenu} sidebarMenuData={sidebarMenuData} />
      )}
    </>
  );
};

export default SideBar;
