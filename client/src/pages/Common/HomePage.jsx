import React from 'react';

import { Helmet } from 'react-helmet';

import Footer from '../../components/Common/Footer';
import Documents from '../../components/Common/HomePage/Documents/Documents';
import Explore from '../../components/Common/HomePage/Explore/Explore';
import Hero from '../../components/Common/HomePage/Hero/Hero';
import Info from '../../components/Common/HomePage/Info/Info';
import Navbar from '../../components/Common/Navbar';

const HomePage = () => (
  <>
    <Navbar />
    <Helmet>
      <title>DigiBlock</title>
    </Helmet>
    <Hero />
    <Info />
    <Documents />
    <Explore />
    <Footer />
  </>
);

export default HomePage;
