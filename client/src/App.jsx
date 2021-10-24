import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ScrollToTop from './components/ScrollToTop';
import LoginPage from './pages/LoginPage';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AboutUs from './pages/AboutUsPage';
// import ErrorPage from './components/404/404';

function App() {
  return (
    <div className="h-screen">
      <Navbar />
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/about-us" component={AboutUs} />
        {/* <Route exact path="/404" component={ErrorPage} /> */}
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
