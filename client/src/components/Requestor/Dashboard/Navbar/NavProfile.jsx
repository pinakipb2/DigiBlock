import React from 'react';

import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { logoutRequestor } from '../../../../redux/requestor/requestor.actions';

const NavProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loggingOut = () => {
    dispatch(logoutRequestor());
    history.push('/requestor/login');
  };
  const requestorName = useSelector((state) => state.requestor.requestorName);
  const { account } = useSelector((state) => state.requestor.currentRequestor);
  return (
    <div className="absolute top-8 right-32 z-50 flex justify-center items-center w-44">
      <div className="flex flex-col bg-white justify-center items-center mt-10 py-4 text-center rounded-2xl shadow-xl">
        <Avatar className="w-20 h-20 rounded-full inline-flex items-center justify-center shadow-lg" name={requestorName} size="60" />
        <div className="flex flex-col items-center px-4 text-center justify-center">
          <h2 className="font-semibold title-font mt-2 text-gray-900 text-xl">{requestorName}</h2>
          <div className="font-normal text-gray-500 text-xs font-ubuntu">{account}</div>
          <div className="w-18 h-1 bg-gray-500 rounded mt-4" />
          <div className="flex justify-between items-center w-3/4">
            <Link to="/requestor/profile" className="bg-prime hover:bg-blue-500 cursor-pointer font-semibold px-2.5 py-1.5 text-white rounded-md">
              Profile
            </Link>
            <div
              className="bg-prime hover:bg-blue-500 cursor-pointer font-semibold px-2.5 py-1.5 text-white rounded-md"
              role="button"
              onClick={() => {
                loggingOut();
              }}
            >
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavProfile;
