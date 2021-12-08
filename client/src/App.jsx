import React from 'react';

import { Global, css } from '@emotion/react';
import { Route, Switch } from 'react-router-dom';

import ErrorPage from './components/Common/404/404';
import ScrollToTop from './components/Common/ScrollToTop';
import AdminDashboard from './pages/Admin/Dashboard/AdminDashboard';
import AdminLogin from './pages/Admin/Login/AdminLogin';
import AboutUs from './pages/Common/AboutUsPage';
import HomePage from './pages/Common/HomePage';
import UserLogin from './pages/User/UserLogin';

function App() {
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
        <Route exact path="/admin/login" component={AdminLogin} />
        <Route exact path="/admin/dashboard" component={AdminDashboard} />
        <Route exact path="/admin/admins" component={AdminDashboard} />
        <Route exact path="/admin/users" component={AdminDashboard} />
        <Route exact path="/admin/issuers" component={AdminDashboard} />
        <Route exact path="/admin/verifiers" component={AdminDashboard} />
        <Route exact path="/admin/profile" component={AdminDashboard} />
        <Route component={ErrorPage} />
      </Switch>
    </div>
  );
}

export default App;
