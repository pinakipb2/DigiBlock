import React from 'react';

import Tippy from '@tippyjs/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { NETWORKID, NETWORKNAME } from '../../../config';
import getWeb3 from '../../../getWeb3';
import { setRequestorWeb3, setRequestorMetmaskInstalled, setCurrentRequestor, setIsRequestorAccountChange, setIsRequestorNetworkChange } from '../../../redux/requestor/requestor.actions';

const ConnectWallet = () => {
  const dispatch = useDispatch();
  const isMetaMask = useSelector((state) => state.requestor.isMetaMaskInstalled);
  const requestor = useSelector((state) => state.requestor.currentRequestor);
  const isAccountChanged = useSelector((state) => state.requestor.isAccountChanged);
  const isNetworkChanged = useSelector((state) => state.requestor.isNetworkChanged);

  const ConnectToMetamask = async () => {
    try {
      const web3 = await getWeb3();
      dispatch(setRequestorWeb3(web3));
      dispatch(setRequestorMetmaskInstalled(true));
      const networkId = await web3.eth.net.getId();
      if (networkId === NETWORKID) {
        const account = web3.currentProvider.selectedAddress;
        const balance = parseFloat(web3.utils.fromWei(await web3.eth.getBalance(account))).toFixed(4);
        dispatch(setCurrentRequestor(account, balance, networkId));
        dispatch(setIsRequestorAccountChange(false));
        dispatch(setIsRequestorNetworkChange(false));
      } else {
        toast.warn(`Please switch to ${NETWORKNAME}`, { toastId: 'network-wrong' });
        dispatch(setIsRequestorNetworkChange(true));
      }
    } catch (error) {
      dispatch(setIsRequestorNetworkChange(false));
    }
  };

  return (
    <div className="bg-white h-auto m-6 p-2 w-2/3 rounded-2xl flex flex-col justify-center items-center">
      <h1 className="font-bold text-gray-900 text-2xl text-center mb-8 mt-1 font-roboto">SIGN UP</h1>
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
              content={
                <span className="w-auto p-2 m-2 min-w-max bg-gray-900 text-white left-14 rounded-md shadow-md text-xs font-bold transition-all duration-100 origin-left">
                  {`${requestor ? 'Connected' : 'Not Connected'}`}
                </span>
              }
            >
              <div className={`${requestor ? 'bg-healthy' : 'bg-red-600'} rounded-full h-3 w-3`} />
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
          <div className="text-center text-base">{requestor ? requestor.account : '-'}</div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default ConnectWallet;
