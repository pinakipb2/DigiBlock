// Checks Account and newtwork change

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import getWeb3 from '../getWeb3';
import { setWeb3, setMetmaskInstalled, setIsAccountChange, setIsNetworkChange } from '../redux/admin/admin.actions';
import { setInstanceStart } from '../redux/contract/contract.actions';

const useAdminDetect = () => {
  const dispatch = useDispatch();
  const isMetaMask = useSelector((state) => state.admin.isMetaMaskInstalled);
  const admin = useSelector((state) => state.admin.currentAdmin);
  const isAdminPresent = useSelector((state) => !!state.admin.currentAdmin);
  const isWeb3 = useSelector((state) => !!state.admin.web3);
  const dependencyWeb3 = useSelector((state) => state.admin.web3);
  const isLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isAccountChanged = useSelector((state) => state.admin.isAccountChanged);
  const isNetworkChanged = useSelector((state) => state.admin.isNetworkChanged);

  useEffect(() => {
    const getMetaMaskStatus = () => {
      if (!isMetaMask) {
        if (window.web3 || window.ethereum) {
          dispatch(setMetmaskInstalled(true));
        } else {
          dispatch(setMetmaskInstalled(false));
        }
      }
    };
    getMetaMaskStatus();

    const checkAdminAccountAndNetworkChangeOnStart = async () => {
      if (window.ethereum || window.web3) {
        const web3 = await getWeb3();
        if (!isWeb3) {
          dispatch(setWeb3(web3));
        }
        const account = web3.currentProvider.selectedAddress;
        if (account !== admin?.account && admin !== null) {
          dispatch(setIsAccountChange(true));
          if (!isLoggedIn) {
            toast.warn('Account has been changed', { toastId: 'account-changed' });
          }
        } else if (account === admin?.account && admin !== null) {
          dispatch(setIsAccountChange(false));
        }
        const networkId = await web3.eth.net.getId();
        if (networkId !== admin?.networkId && admin !== null) {
          dispatch(setIsNetworkChange(true));
          if (!isLoggedIn) {
            toast.warn('Network has been changed', { toastId: 'network-changed' });
          }
        } else if (networkId === admin?.networkId && admin !== null) {
          dispatch(setIsNetworkChange(false));
        }
        dispatch(setInstanceStart());
      }
    };

    if (isAdminPresent) {
      checkAdminAccountAndNetworkChangeOnStart();
    }

    if (window.ethereum && isAdminPresent) {
      window.ethereum.on('accountsChanged', () => {
        checkAdminAccountAndNetworkChangeOnStart();
      });
      window.ethereum.on('chainChanged', () => {
        checkAdminAccountAndNetworkChangeOnStart();
      });
    }

    return () => {
      if (window.ethereum && isAdminPresent) {
        window.ethereum.removeListener('accountsChanged', () => {
          checkAdminAccountAndNetworkChangeOnStart();
        });
        window.ethereum.removeListener('chainChanged', () => {
          checkAdminAccountAndNetworkChangeOnStart();
        });
      }
    };
  }, [isMetaMask, isAccountChanged, isNetworkChanged, dependencyWeb3, isLoggedIn]);
};

export default useAdminDetect;
