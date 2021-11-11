import React from 'react';
import { Helmet } from 'react-helmet';
import AboutUs from '../../components/Common/AboutUs/About';
import Footer from '../../components/Common/Footer';
import Navbar from '../../components/Common/Navbar';

const AboutUsPage = () => (
  <>
    <Navbar />
    <div className="bg-blue1 flex justify-center items-center pt-28 pb-7">
      <Helmet>
        <title>About Us - DigiBlock</title>
      </Helmet>
      <AboutUs />
    </div>
    <Footer />
  </>
);

export default AboutUsPage;
