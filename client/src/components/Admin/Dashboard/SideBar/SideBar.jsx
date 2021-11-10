/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';

const SideBar = () => {
  const [active, setActive] = useState(false);
  return (
    <div className="overflow-y-scroll h-screen w-80 flex flex-col bg-gray-800 scrollbar-hide">
      <div className="py-4 border-b border-gray-500 text-center">
        <h1 className="text-2xl font-semibold text-gray-300">Admin Panel</h1>
      </div>
      <div className="py-4 border-b border-gray-500 text-center flex px-4 justify-start items-center">
        <img className="rounded-full w-10 h-10 mr-2" src="https://media.istockphoto.com/photos/learn-to-love-yourself-first-picture-id1291208214?s=612x612" alt="profile" />
        <h1 className="text-lg text-gray-300 hover:text-gray-100 cursor-pointer">Name of admin</h1>
      </div>
      <div className="text-center p-3 flex flex-col space-y-4 cursor-pointer">
        <div className="bg-blue-600 rounded-md flex py-3 px-4 items-center">
          <i className="fas fa-tachometer-alt mx-2 text-white text-xl" />
          <h1 className="text-lg text-gray-100">Dashboard</h1>
        </div>
        <div
          onClick={() => setActive(!active)}
          className={`${active ? 'bg-blue-600 rounded-md' : ''} flex py-3 px-4 items-center`}
        >
          <i className={`${active ? 'text-white' : 'text-gray-300'} fas fa-user mx-2 text-xl`} />
          <h1 className={`${active ? 'text-gray-100' : 'text-gray-400'} text-lg`}>Admins</h1>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
