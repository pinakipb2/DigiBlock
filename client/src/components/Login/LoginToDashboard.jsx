import React from 'react';

const LoginToDashboard = () => (
  <div className="bg-green-600 h-auto m-6 p-4 w-2/3 rounded-2xl flex flex-col justify-center items-center">
    <h1 className="font-bold text-gray-900 text-xl text-center mb-8 mt-3">
      LOGIN TO DASHBOARD
    </h1>
    <div className="mb-4 w-5/6">
      <div className="block text-grey-darker text-sm font-bold mb-2">
        Address
      </div>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" type="text" placeholder="-" readOnly />
    </div>
    <div className="mb-6 w-5/6">
      <div className="block text-grey-darker text-sm font-bold mb-2">
        Name
      </div>
      <input className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" type="text" placeholder="Name" />
      <p className="text-red text-xs italic">Enter your name if you are a verified user.</p>
    </div>
    {/* <div className="flex items-center justify-between">
      <button className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="button">
        Sign In
      </button>
    </div> */}
  </div>
);

export default LoginToDashboard;
