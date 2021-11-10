import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/Common/HomePage';
import ScrollToTop from './components/Common/ScrollToTop';
import UserLogin from './pages/User/UserLogin';
import AdminLogin from './pages/Admin/Login/AdminLogin';
import AdminDashboard from './pages/Admin/Dashboard/AdminDashboard';
import Footer from './components/Common/Footer';
import Navbar from './components/Common/Navbar';
import AboutUs from './pages/Common/AboutUsPage';
import ErrorPage from './components/Common/404/404';

function App() {
  const [admin] = useState(true);
  return (
    <div className="h-screen">
      {
        admin ? null : <Navbar />
      }
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={UserLogin} />
        <Route exact path="/about-us" component={AboutUs} />
        <Route exact path="/admin" component={AdminDashboard} />
        <Route exact path="/admin/login" component={AdminLogin} />
        <Route component={ErrorPage} />
      </Switch>
      {
        admin ? null : <Footer />
      }
    </div>
  );
}

export default App;
