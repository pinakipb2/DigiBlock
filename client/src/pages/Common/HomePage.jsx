import React from 'react';
import { Helmet } from 'react-helmet';
import Documents from '../../components/Common/HomePage/Documents/Documents';
import Explore from '../../components/Common/HomePage/Explore/Explore';
import Hero from '../../components/Common/HomePage/Hero/Hero';
import Info from '../../components/Common/HomePage/Info';

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
