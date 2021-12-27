import React from 'react';

import { Global, css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import ErrorPage from './components/Common/404/404';
import ScrollToTop from './components/Common/ScrollToTop';
import useDetect from './hooks/useDetect';
import AdminDashboard from './pages/Admin/Dashboard/AdminDashboard';
import AdminLogin from './pages/Admin/Login/AdminLogin';
import AboutUs from './pages/Common/AboutUsPage';
import HomePage from './pages/Common/HomePage';
import UserLogin from './pages/User/UserLogin';
import AdminProtectedRoute from './routes/AdminProtectedRoute';

function App() {
  useDetect();
  const isLoggedIn = useSelector((state) => state.admin.isLoggedIn);
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

        <AdminProtectedRoute exact path="/admin/login" component={AdminLogin} isAuth={!isLoggedIn} goTo="/admin/dashboard" />
        <AdminProtectedRoute exact path="/admin/dashboard" component={AdminDashboard} isAuth={isLoggedIn} goTo="/admin/login" />
        <AdminProtectedRoute exact path="/admin/admins" component={AdminDashboard} isAuth={isLoggedIn} goTo="/admin/login" />
        <AdminProtectedRoute exact path="/admin/users" component={AdminDashboard} isAuth={isLoggedIn} goTo="/admin/login" />
        <AdminProtectedRoute exact path="/admin/issuers" component={AdminDashboard} isAuth={isLoggedIn} goTo="/admin/login" />
        <AdminProtectedRoute exact path="/admin/verifiers" component={AdminDashboard} isAuth={isLoggedIn} goTo="/admin/login" />
        <AdminProtectedRoute exact path="/admin/profile" component={AdminDashboard} isAuth={isLoggedIn} goTo="/admin/login" />

        <Route component={ErrorPage} />
      </Switch>
    </div>
  );
}

export default App;
