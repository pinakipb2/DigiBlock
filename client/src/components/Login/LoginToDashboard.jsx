import React from 'react';
import { useSelector } from 'react-redux';

const LoginToDashboard = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <div className="bg-white h-auto m-6 p-4 w-2/3 rounded-2xl flex flex-col justify-center items-center">
      <h1 className="font-bold text-gray-900 text-2xl text-center mb-8 mt-3 font-roboto">
        LOGIN TO DASHBOARD
      </h1>
      <div className="mb-4 w-5/6">
        <div className="block text-grey-darker text-sm font-bold mb-2 font-ubuntu">
          Address
        </div>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker bg-gray-200" type="text" value={user.account} readOnly />
      </div>
      <div className="mb-6 w-5/6">
        <div className="block text-grey-darker text-sm font-bold mb-2 font-ubuntu">
          Name
        </div>
        <input className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3 bg-gray-200" type="text" placeholder="Name" />
        <p className="text-red-600 text-xs italic font-ubuntu">Enter your name if you are a verified user.</p>
      </div>
      {/* <div className="flex items-center justify-between">
        <button className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="button">
          Sign In
        </button>
      </div> */}
    </div>
  );
};
export default LoginToDashboard;
