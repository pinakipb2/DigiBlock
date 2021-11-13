import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/Common/HomePage';
import ScrollToTop from './components/Common/ScrollToTop';
import UserLogin from './pages/User/UserLogin';
import AdminLogin from './pages/Admin/Login/AdminLogin';
import AdminDashboard from './pages/Admin/Dashboard/AdminDashboard';
import AboutUs from './pages/Common/AboutUsPage';
import ErrorPage from './components/Common/404/404';

function App() {
  return (
    <div className="h-screen">
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
