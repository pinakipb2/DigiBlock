import React from 'react';

// eslint-disable-next-line react/prop-types
const Card = ({ title, sub, description }) => (
  <div className="xl:w-1/4 md:w-1/2 p-4">
    <div className="bg-gray-100 p-6 rounded-lg">
      <img className="h-40 rounded w-full object-cover object-center mb-6" src="https://dummyimage.com/723x403" alt="content" />
      <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font capitalize">{sub}</h3>
      <h2 className="text-lg text-gray-900 font-medium title-font mb-4">{title}</h2>
      <p className="leading-relaxed text-base">{description}</p>
    </div>
  </div>
);

export default Card;
