import React from 'react';

import Avatar from 'react-avatar';
import { useSelector } from 'react-redux';

const AdminProfile = () => {
  const adminName = useSelector((state) => state.admin.adminName);
  const { account } = useSelector((state) => state.admin.currentAdmin);
  return (
    <div className="container flex justify-center items-center">
      <div className="flex flex-col bg-white justify-center items-center mt-10 py-6 sm:w-1/3 text-center rounded-2xl shadow-xl">
        <Avatar className="w-20 h-20 rounded-full inline-flex items-center justify-center shadow-lg" name={adminName} size="70" />
        <div className="flex flex-col items-center text-center justify-center">
          <h2 className="font-medium title-font mt-2 text-gray-900 text-2xl">{adminName}</h2>
          <div className="font-normal text-gray-500 text-sm font-ubuntu">{account}</div>
          <div className="flex mt-3 bg-green-500 rounded-md px-2 py-1 items-center">
            <div className="text-white mr-2 font-semibold text-sm">Verified</div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="w-12 h-1 bg-gray-500 rounded mt-4" />
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
