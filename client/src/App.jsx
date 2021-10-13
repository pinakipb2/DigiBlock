import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="h-screen">
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
