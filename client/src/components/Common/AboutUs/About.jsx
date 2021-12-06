import React, { useState } from 'react';

import Profile from './Profile';

const About = () => {
  const [members] = useState([
    {
      id: 1,
      name: 'Chandra Prakash',
      username: 'chandra8226',
      linkedinUsername: 'chandra-prakash-105225200',
      emailID: 'chandra8226@gmail.com',
    },
    {
      id: 2,
      name: 'Pinaki Bhattacharjee',
      username: 'pinakipb2',
      linkedinUsername: 'pinakipb2',
      emailID: 'pinakipb2@gmail.com',
    },
    {
      id: 3,
      name: 'Sakshi Gairola',
      username: 'grsakshi',
      linkedinUsername: 'sakshi-gairola-1188271a9',
      emailID: 'sakshi.g642001@gmail.com',
    },
  ]);
  return (
    <div>
      <div className="text-center mt-10 mb-3 text-4xl font-bold text-white font-ubuntu">About Us</div>
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-wrap -m-4">
          {
            members.map(({ id, ...otherProps }) => <Profile key={id} {...otherProps} />)
          }
        </div>
      </div>
    </div>
  );
};

export default About;
