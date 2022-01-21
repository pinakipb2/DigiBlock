import React from 'react';

import { Global, css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import ErrorPage from './components/Common/404/404';
import ScrollToTop from './components/Common/ScrollToTop';
import AdminDashboard from './pages/Admin/Dashboard/AdminDashboard';
import AdminLogin from './pages/Admin/Login/AdminLogin';
import AboutUs from './pages/Common/AboutUsPage';
import HomePage from './pages/Common/HomePage';
import IssuerDashboard from './pages/Issuer/Dashboard/IssuerDashboard';
import IssuerLogin from './pages/Issuer/Login/IssuerLogin';
import UserLogin from './pages/User/UserLogin';
import AdminProtectedRoute from './routes/AdminProtectedRoute';
import IssuerProtectedRoute from './routes/IssuerProtectedRoute';

function App() {
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isIssuerLoggedIn = useSelector((state) => state.issuer.isLoggedIn);
  return (
    <div className="h-screen">
      <Global
        styles={css`
          .show-disabled-cursor-pagination {
            cursor: not-allowed;
          }
        `}
      />
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={UserLogin} />
        <Route exact path="/about-us" component={AboutUs} />

        <AdminProtectedRoute exact path="/admin/login" component={AdminLogin} isAuth={!isAdminLoggedIn} goTo="/admin/dashboard" />
        <AdminProtectedRoute exact path="/admin/dashboard" component={AdminDashboard} isAuth={isAdminLoggedIn} goTo="/admin/login" />
        <AdminProtectedRoute exact path="/admin/admins" component={AdminDashboard} isAuth={isAdminLoggedIn} goTo="/admin/login" />
        <AdminProtectedRoute exact path="/admin/users" component={AdminDashboard} isAuth={isAdminLoggedIn} goTo="/admin/login" />
        <AdminProtectedRoute exact path="/admin/issuers" component={AdminDashboard} isAuth={isAdminLoggedIn} goTo="/admin/login" />
        <AdminProtectedRoute exact path="/admin/verifiers" component={AdminDashboard} isAuth={isAdminLoggedIn} goTo="/admin/login" />
        <AdminProtectedRoute exact path="/admin/profile" component={AdminDashboard} isAuth={isAdminLoggedIn} goTo="/admin/login" />

        <IssuerProtectedRoute exact path="/issuer/login" component={IssuerLogin} isAuth={!isIssuerLoggedIn} goTo="/issuer/dashboard" />
        <IssuerProtectedRoute exact path="/issuer/dashboard" component={IssuerDashboard} isAuth={isIssuerLoggedIn} goTo="/issuer/login" />
        <IssuerProtectedRoute exact path="/issuer/profile" component={IssuerDashboard} isAuth={isIssuerLoggedIn} goTo="/issuer/login" />
        <IssuerProtectedRoute exact path="/issuer/documents" component={IssuerDashboard} isAuth={isIssuerLoggedIn} goTo="/issuer/login" />

        <Route component={ErrorPage} />
      </Switch>
    </div>
  );
}

export default App;
