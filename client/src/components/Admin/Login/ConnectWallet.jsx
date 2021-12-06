import React from 'react';

import Tippy from '@tippyjs/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import getWeb3 from '../../../getWeb3';
import {
  setWeb3, setMetmaskInstalled, setCurrentAdmin, setIsAccountChange, setIsNetworkChange,
} from '../../../redux/admin/admin.actions';

const ConnectWallet = () => {
  const dispatch = useDispatch();
  const isMetaMask = useSelector((state) => state.admin.isMetaMaskInstalled);
  const admin = useSelector((state) => state.admin.currentAdmin);
  const isAccountChanged = useSelector((state) => state.admin.isAccountChanged);
  const isNetworkChanged = useSelector((state) => state.admin.isNetworkChanged);

  const ConnectToMetamask = async () => {
    try {
      const web3 = await getWeb3();
      dispatch(setWeb3(web3));
      dispatch(setMetmaskInstalled(true));
      const networkId = await web3.eth.net.getId();
      if (networkId === 4) {
        const account = web3.currentProvider.selectedAddress;
        const balance = parseFloat(web3.utils.fromWei(await web3.eth.getBalance(account))).toFixed(4);
        dispatch(setCurrentAdmin(account, balance, networkId));
        dispatch(setIsAccountChange(false));
        dispatch(setIsNetworkChange(false));
      } else {
        toast.warn('Please switch to Rinkeby Network', { toastId: 'network-wrong' });
        dispatch(setIsNetworkChange(true));
      }
    } catch (error) {
      dispatch(setMetmaskInstalled(false));
      console.log(error.message);
    }
  };

  return (
    <div className="bg-white h-auto m-6 p-2 w-2/3 rounded-2xl flex flex-col justify-center items-center">
      <h1 className="font-bold text-gray-900 text-2xl text-center mb-8 mt-1 font-roboto">CONNECT YOUR WALLET</h1>
      <div className="bg-gray-300 w-5/6 mb-2 rounded-md flex justify-between p-2 text-gray-800">
        <h2 className="font-raleway font-bold">Connection Status</h2>
        <div className="flex justify-center items-center">
          {isAccountChanged || isNetworkChanged ? (
            <Tippy
              placement="right"
              content={<span className="w-auto p-2 m-2 min-w-max bg-gray-900 text-white left-14 rounded-md shadow-md text-xs font-bold transition-all duration-100 origin-left">Not Connected</span>}
            >
              <div className="bg-yellow-500 rounded-full h-3 w-3" />
            </Tippy>
          ) : (
            <Tippy
              placement="right"
              content={(
                <span className="w-auto p-2 m-2 min-w-max bg-gray-900 text-white left-14 rounded-md shadow-md text-xs font-bold transition-all duration-100 origin-left">
                  {`${admin ? 'Coonected' : 'Not Connected'}`}
                </span>
              )}
            >
              <div className={`${admin ? 'bg-healthy' : 'bg-red-600'} rounded-full h-3 w-3`} />
            </Tippy>
          )}
          <div className="pl-2 font-semibold">MetaMask</div>
        </div>
      </div>
      {isMetaMask ? (
        <button type="button" className="p-3 mb-3 bg-blue-700 hover:bg-blue-600 flex justify-center items-center w-5/6 rounded-lg" onClick={() => ConnectToMetamask()}>
          <img src="/assets/metamask.png" alt="metamask_logo" className="h-9 w-9 mr-2 rounded-full" />
          <div className="text-base text-gray-50 hover:text-gray-100 font-bold font-roboto">CONNECT TO METAMASK</div>
        </button>
      ) : (
        <Link to={{ pathname: 'https://metamask.io/' }} target="_blank" className="w-5/6">
          <button type="button" className="p-3 mb-3 bg-blue-700 hover:bg-blue-600 flex justify-center items-center w-full rounded-lg">
            <img src="/assets/metamask.png" alt="metamask_logo" className="h-9 w-9 mr-2 rounded-full" />
            <div className="text-base text-gray-50 hover:text-gray-100 font-bold font-roboto">CONNECT TO METAMASK</div>
          </button>
        </Link>
      )}
      <div className="flex flex-col w-5/6 mb-3 justify-between text-gray-900 divide-y-2 divide-dashed divide-red-600 text-center">
        <div className="text-lg p-1 font-semibold font-ubuntu">Wallet Details</div>
        <div className="text-lg p-1 font-sans">
          Address
          <div className="text-center text-base">{admin ? admin.account : '-'}</div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default ConnectWallet;
