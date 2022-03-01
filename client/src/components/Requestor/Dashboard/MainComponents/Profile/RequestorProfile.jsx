import React from 'react';

import Avatar from 'react-avatar';
import { useSelector } from 'react-redux';

const RequestorProfile = () => {
  const requestorName = useSelector((state) => state.requestor.requestorName);
  const { account } = useSelector((state) => state.requestor.currentRequestor);
  return (
    <div className="container flex justify-center items-center">
      <div className="flex flex-col bg-white justify-center items-center mt-10 py-6 sm:w-1/3 text-center rounded-2xl shadow-xl">
        <Avatar className="w-20 h-20 rounded-full inline-flex items-center justify-center shadow-lg" name={requestorName} size="70" />
        <div className="flex flex-col items-center text-center justify-center">
          <h2 className="font-medium title-font mt-2 text-gray-900 text-2xl">{requestorName}</h2>
          <div className="font-normal text-gray-500 text-sm font-ubuntu">{account}</div>
          <div className="w-12 h-1 bg-gray-500 rounded mt-4" />
        </div>
      </div>
    </div>
  );
};

export default RequestorProfile;
