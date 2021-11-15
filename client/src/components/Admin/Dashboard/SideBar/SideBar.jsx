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

  function changeSidebarIconColor() {
    const location = useLocation();
    useEffect(() => {
      const pathName = location.pathname.replace('/admin/', '');
      setUrlPath(`${pathName.charAt(0).toUpperCase() + pathName.slice(1)} (Admin) - DigiBlock`);
      switch (pathName) {
        case 'dashboard':
          setCurrSidebarMenu(0);
          break;
        case 'admins':
          setCurrSidebarMenu(1);
          break;
        case 'users':
          setCurrSidebarMenu(2);
          break;
        case 'issuers':
          setCurrSidebarMenu(3);
          break;
        case 'verifiers':
          setCurrSidebarMenu(4);
          break;
        case 'profile':
          setCurrSidebarMenu(5);
          break;
        default:
          break;
      }
      return () => {
        setCurrSidebarMenu(0);
      };
    }, [location]);
  }
  changeSidebarIconColor();

  return (
    <>
      <Helmet>
        <title>{urlPath}</title>
      </Helmet>
      {
        sidebarCollapsed ? <CollapsedSideBar currSidebarMenu={currSidebarMenu} /> : <FullSideBar currSidebarMenu={currSidebarMenu} />
      }
    </>
  );
};

export default SideBar;
