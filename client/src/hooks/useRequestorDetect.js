// Checks Account and newtwork change

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import getWeb3 from '../getWeb3';
import { setInstanceStart } from '../redux/contract/contract.actions';
import { setRequestorWeb3, setRequestorMetmaskInstalled, setIsRequestorAccountChange, setIsRequestorNetworkChange } from '../redux/requestor/requestor.actions';

const useRequestorDetect = () => {
  const dispatch = useDispatch();
  const isRequestorMetaMask = useSelector((state) => state.requestor.isMetaMaskInstalled);
  const requestor = useSelector((state) => state.requestor.currentRequestor);
  const isRequestorPresent = useSelector((state) => !!state.requestor.currentRequestor);
  const isRequestorWeb3 = useSelector((state) => !!state.requestor.web3);
  const dependencyWeb3Requestor = useSelector((state) => state.requestor.web3);
  const isRequestorLoggedIn = useSelector((state) => state.requestor.isLoggedIn);
  const isRequestorAccountChanged = useSelector((state) => state.requestor.isAccountChanged);
  const isRequestorNetworkChanged = useSelector((state) => state.requestor.isNetworkChanged);

  useEffect(() => {
    const getMetaMaskStatus = () => {
      if (!isRequestorMetaMask) {
        if (window.web3 || window.ethereum) {
          dispatch(setRequestorMetmaskInstalled(true));
        } else {
          dispatch(setRequestorMetmaskInstalled(false));
        }
      }
    };
    getMetaMaskStatus();

    const checkRequestorAccountAndNetworkChangeOnStart = async () => {
      if (window.web3 || window.ethereum) {
        const web3 = await getWeb3();
        if (!isRequestorWeb3) {
          dispatch(setRequestorWeb3(web3));
        }
        const account = web3.currentProvider.selectedAddress;
        if (account !== requestor?.account && requestor !== null) {
          dispatch(setIsRequestorAccountChange(true));
          if (!isRequestorLoggedIn) {
            toast.warn('Account has been changed', { toastId: 'account-changed' });
          }
        } else if (account === requestor?.account && requestor !== null) {
          dispatch(setIsRequestorAccountChange(false));
        }
        const networkId = await web3.eth.net.getId();
        if (networkId !== requestor?.networkId && requestor !== null) {
          dispatch(setIsRequestorNetworkChange(true));
          if (!isRequestorLoggedIn) {
            toast.warn('Network has been changed', { toastId: 'network-changed' });
          }
        } else if (networkId === requestor?.networkId && requestor !== null) {
          dispatch(setIsRequestorNetworkChange(false));
        }
        dispatch(setInstanceStart());
      }
    };

    if (isRequestorPresent) {
      checkRequestorAccountAndNetworkChangeOnStart();
    }

    if (window.ethereum && isRequestorPresent) {
      window.ethereum.on('accountsChanged', () => {
        checkRequestorAccountAndNetworkChangeOnStart();
      });
      window.ethereum.on('chainChanged', () => {
        checkRequestorAccountAndNetworkChangeOnStart();
      });
    }

    return () => {
      if (window.ethereum && isRequestorPresent) {
        window.ethereum.on('accountsChanged', () => {
          checkRequestorAccountAndNetworkChangeOnStart();
        });
        window.ethereum.on('chainChanged', () => {
          checkRequestorAccountAndNetworkChangeOnStart();
        });
      }
    };
  }, [isRequestorMetaMask, isRequestorAccountChanged, isRequestorNetworkChanged, dependencyWeb3Requestor, isRequestorLoggedIn]);
};

export default useRequestorDetect;
