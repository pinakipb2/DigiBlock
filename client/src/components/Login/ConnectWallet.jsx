import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import getWeb3 from '../../getWeb3';
import {
  setWeb3, setMetmaskInstalled, setCurrentUser,
} from '../../redux/user/user.actions';

const ConnectWallet = () => {
  const dispatch = useDispatch();
  const isMetaMask = useSelector((state) => state.user.isMetaMaskInstalled);
  const user = useSelector((state) => state.user.currentUser);
  // const web3AccountChange = useSelector((state) => state.user.web3);
  useEffect(() => {
    const getMetaMaskStatus = () => {
      if (window.web3 || window.ethereum) {
        dispatch(setMetmaskInstalled(true));
      } else {
        dispatch(setMetmaskInstalled(false));
      }
    };
    // const checkAccountChange = () => {
    //   const account = web3AccountChange?.currentProvider.selectedAddress;
    //   if (account && account !== user.account) {
    //     toast.warn('Account has been changed');
    //   }
    // };
    getMetaMaskStatus();
    // checkAccountChange();
  }, [isMetaMask]);
  const ConnectToMetamask = async () => {
    try {
      const web3 = await getWeb3();
      dispatch(setWeb3(web3));
      dispatch(setMetmaskInstalled(true));
      const account = web3.currentProvider.selectedAddress;
      const balance = parseFloat((web3.utils.fromWei(await web3.eth.getBalance(account)))).toFixed(4);
      const networkId = await web3.eth.net.getId();
      dispatch(setCurrentUser(account, balance, networkId));
    } catch (error) {
      dispatch(setMetmaskInstalled(false));
      console.log(error.message);
    }
  };

  const checkAccountChange = () => {
    if (window.ethereum || window.web3) {
      window.ethereum.on('accountsChanged', async () => {
        const web3 = await getWeb3();
        dispatch(setWeb3(web3));
        /* after login, if account is changed give a alert of 10 sec to return to the logged in account, and hold the website in loading state or else logout after 10 sec, if user is logged in again dismiss the toast and dismiss loading state */
        const account = web3.currentProvider.selectedAddress; // if this account is not equal to the logged in account, logout
        const change = account !== user?.account
          ? toast.warn('Account has been changed', { toastId: 'Account-changed' })
          : toast.success('Connected account retrieved', { toastId: 'Account-retrieved' });
        console.log(change);
      });
    }
  };

  checkAccountChange();

  const checkNetworkChange = () => {
    if (window.ethereum || window.web3) {
      window.ethereum.on('chainChanged', async () => {
        const web3 = await getWeb3();
        dispatch(setWeb3(web3));
        /* after login, if account is changed give a alert of 10 sec to return to the logged in account, and hold the website in loading state or else logout after 10 sec, if user is logged in again dismiss the toast and dismiss loading state */
        const networkId = await web3.eth.net.getId();// if this account is not equal to the logged in account, logout
        const change = networkId !== user?.networkId
          ? toast.warn('Account has been changed', { toastId: 'Network-changed' })
          : toast.success('Connected account retrieved', { toastId: 'Network-retrieved' });
        console.log(change);
      });
    }
  };

  checkNetworkChange();

  return (
    <div className="bg-white h-auto m-6 p-2 w-2/3 rounded-2xl flex flex-col justify-center items-center">
      <h1 className="font-bold text-gray-900 text-2xl text-center mb-8 mt-1 font-roboto">
        CONNECT YOUR WALLET
      </h1>
      <div className="bg-gray-300 w-5/6 mb-2 rounded-md flex justify-between p-2 text-gray-800">
        <h2 className="font-raleway font-bold">Connection Status</h2>
        <div className="flex justify-center items-center">
          <div className={`${user ? 'bg-green-500' : 'bg-red-600'} rounded-full h-3 w-3`} />
          <div className="pl-2 font-semibold">MetaMask</div>
        </div>
      </div>
      {
        isMetaMask ? (
          <button
            type="button"
            className="p-3 mb-3 bg-blue-700 hover:bg-blue-600 flex justify-center items-center w-5/6 rounded-lg"
            onClick={() => ConnectToMetamask()}
          >
            <img src="/assets/metamask.png" alt="metamask_logo" className="h-9 w-9 mr-2 rounded-full" />
            <div className="text-base text-gray-50 hover:text-gray-100 font-bold font-roboto">CONNECT TO METAMASK</div>
          </button>
        )
          : (
            <Link to={{ pathname: 'https://metamask.io/' }} target="_blank" className="w-5/6">
              <button
                type="button"
                className="p-3 mb-3 bg-blue-700 hover:bg-blue-600 flex justify-center items-center w-full rounded-lg"
              >
                <img src="/assets/metamask.png" alt="metamask_logo" className="h-9 w-9 mr-2 rounded-full" />
                <div className="text-base text-gray-50 hover:text-gray-100 font-bold font-roboto">CONNECT TO METAMASK</div>
              </button>
            </Link>
          )
      }
      <div className="flex flex-col w-5/6 mb-3 justify-between text-gray-900 divide-y-2 divide-dashed divide-red-600 text-center">
        <div className="text-lg p-1 font-semibold font-ubuntu">
          Wallet Details
        </div>
        <div className="text-lg p-1 font-sans">
          Address
          <div className="text-center text-base">{user ? user.account : '-'}</div>
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
