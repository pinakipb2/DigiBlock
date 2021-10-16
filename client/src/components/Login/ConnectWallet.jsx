import React from 'react';
import { useDispatch } from 'react-redux';
import getWeb3 from '../../getWeb3';
import {
  setWeb3, setCurrentUserAccount, setMetmaskInstalled, setCurrentUserBalance, setCurrentUserNetworkId,
} from '../../redux/user/user.actions';

const ConnectWallet = () => {
  const dispatch = useDispatch();

  const ConnectToMetamask = async () => {
    try {
      const web3 = await getWeb3();
      dispatch(setWeb3(web3));
      dispatch(setMetmaskInstalled(true));
      const account = web3.currentProvider.selectedAddress;
      dispatch(setCurrentUserAccount(account));
      const balance = parseFloat((web3.utils.fromWei(await web3.eth.getBalance(account)))).toFixed(4);
      dispatch(setCurrentUserBalance(balance));
      const networkId = await web3.eth.net.getId();
      dispatch(setCurrentUserNetworkId(networkId));
    } catch (error) {
      dispatch(setMetmaskInstalled(false));
      console.log(error.message);
    }
  };

  return (
    <div className="bg-green-600 h-auto m-6 p-2 w-2/3 rounded-2xl flex flex-col justify-center items-center">
      <h1 className="font-bold text-gray-900 text-xl text-center mb-8 mt-3">
        CONNECT YOUR WALLET
      </h1>
      <div className="bg-gray-300 w-5/6 mb-2 rounded-md flex justify-between p-2 text-gray-700">
        <h2>Connection Status</h2>
        <div className="flex justify-center items-center">
          <div className="bg-red-600 rounded-full h-3 w-3" />
          <div className="pl-2">MetaMask</div>
        </div>
      </div>
      <button
        type="button"
        className="p-3 mb-3 bg-blue-700 hover:bg-blue-600 flex justify-center items-center w-5/6 rounded-lg"
        onClick={() => ConnectToMetamask()}
      >
        <img src="/assets/metamask.png" alt="metamask_logo" className="h-9 w-9 mr-2 rounded-full" />
        <div className="text-sm text-gray-50 hover:text-gray-100 font-bold">CONNECT TO METAMASK</div>
      </button>
      <div className="flex flex-col w-5/6 mb-3 justify-between text-gray-900 divide-y-2 divide-dashed divide-red-600 text-center">
        <div className="text-lg p-1 font-semibold">
          Wallet Details
        </div>
        <div className="text-lg p-1">
          Address
          <div className="text-center text-base">0x9061caee3a886caf21f596325d36993237af34ce</div>
        </div>
        {/* <div className="text-lg p-2">
          Balance
          <div className="text-center text-base">392.44 ETH</div>
        </div> */}
        <hr />
      </div>
    </div>
  );
};

export default ConnectWallet;
