import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import ConnectWallet from './ConnectWallet';
import SignUpUser from './SignUpUser';

const SignUp = () => {
  const [currentFormStep, setCurrentFormStep] = useState(1);
  const stepOne = () => {
    setCurrentFormStep(1);
  };
  const stepTwo = () => {
    setCurrentFormStep(2);
  };

  const isConnected = useSelector((state) => state.user.currentUser);
  const isAccountChanged = useSelector((state) => state.user.isAccountChanged);
  const isNetworkChanged = useSelector((state) => state.user.isNetworkChanged);

  return (
    <div className="flex flex-col justify-center items-center w-1/2 h-auto bg-white rounded-2xl">
      {currentFormStep === 1 && (
        <>
          <div className="flex flex-col justify-center w-1/2 py-10">
            <div className="flex items-center justify-center w-full">
              <div className="relative bg-red-700 rounded-full h-8 w-11 font-bold text-white text-center flex items-center justify-center font-ubuntu">
                1<div className="absolute -bottom-12 -left-3 text-black font-bold text-center">Connect Wallet</div>
              </div>
              <div className="h-1 mx-2 w-full bg-gray-400" />
              <div className="relative bg-gray-400 rounded-full h-8 w-11 font-bold text-white text-center flex items-center justify-center font-ubuntu">
                2<div className="absolute -bottom-12 text-black font-bold text-center">Sign Up</div>
              </div>
            </div>
          </div>
          <ConnectWallet />
          {isConnected && isAccountChanged === false && isNetworkChanged === false ? (
            <button type="button" className="bg-prime rounded-md px-3 py-2 text-white w-32 h-12 text-center text-lg font-bold hover:bg-indigo-600 select-none mb-10" onClick={() => stepTwo()}>
              Next
            </button>
          ) : (
            <button type="button" disabled className="cursor-not-allowed bg-prime rounded-md px-3 py-2 text-white w-32 h-12 text-center text-lg font-bold hover:bg-indigo-600 select-none mb-10">
              Next
            </button>
          )}
        </>
      )}
      {currentFormStep === 2 && (
        <>
          <div className="flex flex-col justify-center w-1/2 py-10">
            <div className="flex items-center justify-center w-full">
              {isAccountChanged === false && isNetworkChanged === false ? (
                <div className="relative bg-green-600 rounded-full h-8 w-11 font-bold text-white text-center flex items-center justify-center font-ubuntu">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    />
                  </svg>
                  <div className="absolute -bottom-12 -left-3 text-black font-bold text-center">Connect Wallet</div>
                </div>
              ) : (
                <div className="relative bg-yellow-500 rounded-full h-8 w-11 font-bold text-white text-center flex items-center justify-center font-ubuntu">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div className="absolute -bottom-12 -left-3 text-black font-bold text-center">Connect Wallet</div>
                </div>
              )}
              <div className="h-1 mx-2 w-full bg-gray-400" />
              <div className="relative bg-red-700 rounded-full h-8 w-11 font-bold text-white text-center flex items-center justify-center font-ubuntu">
                2<div className="absolute -bottom-12 text-black font-bold text-center">Sign Up</div>
              </div>
            </div>
          </div>
          <SignUpUser isConnected={isConnected} isAccountChanged={isAccountChanged} isNetworkChanged={isNetworkChanged} stepOne={stepOne} />
        </>
      )}
    </div>
  );
};

export default SignUp;
