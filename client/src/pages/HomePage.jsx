import React from 'react';
import { Helmet } from 'react-helmet';
import Documents from '../components/HomePage/Documents/Documents';
import Explore from '../components/HomePage/Explore/Explore';
import Hero from '../components/HomePage/Hero/Hero';
import Info from '../components/HomePage/Info';

const HomePage = () => (
  <>
    <Helmet>
      <title>DigiBlock</title>
    </Helmet>
    <Hero />
    <Info />
    <Documents />
    <Explore />
  </>
);

export default HomePage;
