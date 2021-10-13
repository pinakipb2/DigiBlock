import React from 'react';

const Explore = () => (
  <div className="bg-gradient-to-b from-gradient1 to-gradient2 w-full h-auto flex flex-col md:flex-row justify-center items-center p-2">
    <img src="/assets/partner.svg" alt="parterns" className="w-64 p-4 mr-24" />
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col font-bold font-sans text-center md:text-left pb-8">
        <h1 className="text-4xl text-blue-900 leading-9 pb-4">Become a DigiLocker Partner Organization</h1>
        <p className="text-lg text-blue-900">Get registered as a DigiLocker Issuer or Requester!</p>
      </div>
      <div className="bg-blue-900 px-3 py-2 w-1/3 text-white font-bold text-center rounded-lg mb-4 cursor-pointer hover:bg-blue-700 hover:text-gray-100">
        EXPLORE NOW
      </div>
    </div>
  </div>
);

export default Explore;
