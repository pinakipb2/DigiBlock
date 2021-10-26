import React from 'react';
import { Helmet } from 'react-helmet';
import AboutUs from '../../components/Common/AboutUs/About';

const AboutUsPage = () => (
  <div className="bg-blue1 flex justify-center items-center pt-28 pb-7">
    <Helmet>
      <title>About Us - DigiBlock</title>
    </Helmet>
    <AboutUs />
  </div>
);

export default AboutUsPage;
