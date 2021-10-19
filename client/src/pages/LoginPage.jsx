import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Login from '../components/Login/Login';
import getWeb3 from '../getWeb3';
import {
  setWeb3, setMetmaskInstalled, setIsAccountChange, setIsNetworkChange,
} from '../redux/user/user.actions';

const LoginPage = () => {
  const dispatch = useDispatch();
  const isMetaMask = useSelector((state) => state.user.isMetaMaskInstalled);
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const getMetaMaskStatus = () => {
      if (window.web3 || window.ethereum) {
        dispatch(setMetmaskInstalled(true));
      } else {
        dispatch(setMetmaskInstalled(false));
      }
    };
    getMetaMaskStatus();
  }, [isMetaMask]);

  const checkAccountChange = () => {
    if (window.ethereum || window.web3) {
      window.ethereum.on('accountsChanged', async () => {
        const web3 = await getWeb3();
        dispatch(setWeb3(web3));
        const account = web3.currentProvider.selectedAddress;
        if (account !== user?.account && user !== null) {
          dispatch(setIsAccountChange(true));
          toast.warn('Account has been changed', { toastId: 'account-changed' });
        } else if (account === user?.account && user !== null) {
          dispatch(setIsAccountChange(false));
          // toast.success('Connected account retrieved', { toastId: 'account-retrieved' });
        }
      });
    }
  };
  checkAccountChange();

  const checkNetworkChange = () => {
    if (window.ethereum || window.web3) {
      window.ethereum.on('chainChanged', async () => {
        const web3 = await getWeb3();
        dispatch(setWeb3(web3));
        const networkId = await web3.eth.net.getId();
        if (networkId !== user?.networkId && user !== null) {
          dispatch(setIsNetworkChange(true));
          toast.warn('Network has been changed', { toastId: 'network-changed' });
        } else if (networkId === user?.networkId && user !== null) {
          dispatch(setIsNetworkChange(false));
          // toast.success('Connected Network retrieved', { toastId: 'network-retrieved' });
        }
      });
    }
  };
  checkNetworkChange();

  return (
    <div className="bg-blue1 flex justify-center items-center pt-28 pb-7">
      <Login />
    </div>
  );
};

export default LoginPage;
