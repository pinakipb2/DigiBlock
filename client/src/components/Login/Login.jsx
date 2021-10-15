import React from 'react';
import LoginToDashboard from './LoginToDashboard';
import ConnectWallet from './ConnectWallet';

const Login = () => (
  <div className="flex flex-col justify-center items-center w-1/2 bg-white rounded-2xl">
    <div className="flex flex-col justify-center w-1/2 py-16">
      <div className="flex items-center justify-center w-full">
        <div className="relative bg-red-700 rounded-full h-8 w-10 font-bold text-white text-center flex items-center justify-center">
          1
          <div className="absolute -bottom-12 -left-3 text-black font-bold text-center">Connect Wallet</div>
        </div>
        <div className="h-1 mx-2 w-full bg-gray-400" />
        <div className="relative bg-gray-400 rounded-full h-8 w-10 font-bold text-white text-center flex items-center justify-center">
          2
          <div className="absolute -bottom-7 text-black font-bold text-center">Login</div>
        </div>
      </div>
    </div>
    <ConnectWallet />
    <button type="button" className="bg-blue-700 rounded-md px-3 py-2 text-white w-32 h-12 text-center text-lg font-bold hover:bg-blue-500 select-none mb-10">Next</button>
    <LoginToDashboard />
    <div className="flex justify-between items-center w-2/5 pb-10">
      <button type="button" className="bg-blue-700 rounded-md px-3 py-2 text-white w-32 h-12 text-center text-lg font-bold hover:bg-blue-500 select-none">Back</button>
      <button type="button" className="bg-blue-700 rounded-md px-3 py-2 text-white w-32 h-12 text-center text-lg font-bold hover:bg-blue-500 select-none">Login</button>
    </div>
  </div>
);

export default Login;
