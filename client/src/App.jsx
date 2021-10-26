import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ScrollToTop from './components/Common/ScrollToTop';
import UserLogin from './pages/UserLogin';
import AdminLogin from './pages/AdminLogin';
import Footer from './components/Common/Footer';
import Navbar from './components/Common/Navbar';
import AboutUs from './pages/AboutUsPage';
import ErrorPage from './components/Common/404/404';

function App() {
  return (
    <div className="h-screen">
      <Navbar />
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={UserLogin} />
        <Route exact path="/admin/login" component={AdminLogin} />
        <Route exact path="/about-us" component={AboutUs} />
        <Route component={ErrorPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
