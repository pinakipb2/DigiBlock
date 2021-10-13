import React from 'react';

const ConnectWallet = () => (
  <div className="bg-white h-auto m-6 p-4 w-1/3 rounded-2xl flex flex-col justify-center items-center">
    <h1 className="font-bold text-gray-900 text-xl text-center mb-8">
      CONNECT YOUR WALLET
    </h1>
    <div className="bg-gray-300 w-5/6 mb-3 rounded-md flex justify-between p-3 text-gray-700">
      <h2>Connection Status</h2>
      <div className="flex justify-center items-center">
        <div className="bg-red-600 rounded-full h-3 w-3" />
        <div className="pl-2">Metamask</div>
      </div>
    </div>
    <div className="p-3 mb-3 bg-blue-500 hover:bg-blue-600 flex justify-center items-center w-5/6 rounded-lg cursor-pointer">
      <img src="/assets/metamask.png" alt="metamask_logo" className="h-9 w-9 mr-2 rounded-full" />
      <div className="text-sm text-gray-50 hover:text-gray-100 font-bold">CONNECT TO METAMASK</div>
    </div>
    <div className="flex flex-col justify-center items-center divide-y-2 divide-dashed divide-gray-400 text-gray-900">
      <div className="text-lg p-2">
        Wallet Details
      </div>
      <div className="text-lg p-2">
        Address
        <div className="text-center">-</div>
      </div>
      <div className="text-lg p-2">
        Balance
        <div className="text-center">-</div>
      </div>
    </div>
  </div>
);

export default ConnectWallet;
