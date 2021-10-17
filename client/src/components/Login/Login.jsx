import React, { useState } from 'react';
import LoginToDashboard from './LoginToDashboard';
import ConnectWallet from './ConnectWallet';

const Login = () => {
  const [currentFormStep, setCurrentFormStep] = useState(1);
  const stepTwo = () => {
    setCurrentFormStep(currentFormStep + 1);
  };
  const stepOne = () => {
    setCurrentFormStep(currentFormStep - 1);
  };
  return (
    <div className="flex flex-col justify-center items-center w-1/2 bg-white rounded-2xl" style={{ height: '35rem' }}>
      {currentFormStep === 1 && (
      <>
        <div className="flex flex-col justify-center w-1/2 py-10">
          <div className="flex items-center justify-center w-full">
            <div className="relative bg-red-700 rounded-full h-8 w-10 font-bold text-white text-center flex items-center justify-center font-ubuntu">
              1
              <div className="absolute -bottom-12 -left-3 text-black font-bold text-center">Connect Wallet</div>
            </div>
            <div className="h-1 mx-2 w-full bg-gray-400" />
            <div className="relative bg-gray-400 rounded-full h-8 w-10 font-bold text-white text-center flex items-center justify-center font-ubuntu">
              2
              <div className="absolute -bottom-7 text-black font-bold text-center">Login</div>
            </div>
          </div>
        </div>

        <ConnectWallet />
        <button type="button" className="bg-prime rounded-md px-3 py-2 text-white w-32 h-12 text-center text-lg font-bold hover:bg-indigo-600 select-none mb-10 cursor-not-allowed" onClick={() => stepTwo()}>Next</button>
      </>
      )}
      {currentFormStep === 2 && (
      <>
        <div className="flex flex-col justify-center w-1/2 py-10">
          <div className="flex items-center justify-center w-full">
            <div className="relative bg-green-600 rounded-full h-8 w-10 font-bold text-white text-center flex items-center justify-center font-ubuntu">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" fillRule="evenodd" />
              </svg>
              <div className="absolute -bottom-12 -left-3 text-black font-bold text-center">Connect Wallet</div>
            </div>
            <div className="h-1 mx-2 w-full bg-gray-400" />
            <div className="relative bg-red-700 rounded-full h-8 w-10 font-bold text-white text-center flex items-center justify-center font-ubuntu">
              2
              <div className="absolute -bottom-7 text-black font-bold text-center">Login</div>
            </div>
          </div>
        </div>

        <LoginToDashboard />
        <div className="flex justify-between items-center w-2/5 pb-10">
          <button type="button" className="bg-prime rounded-md px-3 py-2 text-white w-32 h-12 text-center text-lg font-bold hover:bg-indigo-600 select-none" onClick={() => stepOne()}>Back</button>
          <button type="button" className="bg-prime rounded-md px-3 py-2 text-white w-32 h-12 text-center text-lg font-bold hover:bg-indigo-600 select-none">Login</button>
        </div>
      </>
      )}
    </div>
  );
};

export default Login;
