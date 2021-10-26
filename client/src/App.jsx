import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/Common/HomePage';
import ScrollToTop from './components/Common/ScrollToTop';
import UserLogin from './pages/User/UserLogin';
import AdminLogin from './pages/Admin/AdminLogin';
import Footer from './components/Common/Footer';
import Navbar from './components/Common/Navbar';
import AboutUs from './pages/Common/AboutUsPage';
import ErrorPage from './components/Common/404/404';

function App() {
  return (
    <div className="h-screen">
      <Navbar />
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={UserLogin} />
        <Route exact path="/about-us" component={AboutUs} />
        <Route exact path="/admin/login" component={AdminLogin} />
        <Route component={ErrorPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
