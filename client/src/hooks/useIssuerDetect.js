// Checks Account and newtwork change

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import getWeb3 from '../getWeb3';
import { setInstanceStart } from '../redux/contract/contract.actions';
import { setIssuerWeb3, setIssuerMetmaskInstalled, setIsIssuerAccountChange, setIsIssuerNetworkChange } from '../redux/issuer/issuer.actions';

const useIssuerDetect = () => {
  const dispatch = useDispatch();
  const isIssuerMetaMask = useSelector((state) => state.issuer.isMetaMaskInstalled);
  const issuer = useSelector((state) => state.issuer.currentIssuer);
  const isIssuerPresent = useSelector((state) => !!state.issuer.currentIssuer);
  const isIssuerWeb3 = useSelector((state) => !!state.issuer.web3);
  const dependencyWeb3Issuer = useSelector((state) => state.issuer.web3);
  const isIssuerLoggedIn = useSelector((state) => state.issuer.isLoggedIn);
  const isIssuerAccountChanged = useSelector((state) => state.issuer.isAccountChanged);
  const isIssuerNetworkChanged = useSelector((state) => state.issuer.isNetworkChanged);

  useEffect(() => {
    const getMetaMaskStatus = () => {
      if (!isIssuerMetaMask) {
        if (window.web3 || window.ethereum) {
          dispatch(setIssuerMetmaskInstalled(true));
        } else {
          dispatch(setIssuerMetmaskInstalled(false));
        }
      }
    };
    getMetaMaskStatus();

    const checkIssuerAccountAndNetworkChangeOnStart = async () => {
      if (window.web3 || window.ethereum) {
        const web3 = await getWeb3();
        if (!isIssuerWeb3) {
          dispatch(setIssuerWeb3(web3));
        }
        const account = web3.currentProvider.selectedAddress;
        if (account !== issuer?.account && issuer !== null) {
          dispatch(setIsIssuerAccountChange(true));
          if (!isIssuerLoggedIn) {
            toast.warn('Account has been changed', { toastId: 'account-changed' });
          }
        } else if (account === issuer?.account && issuer !== null) {
          dispatch(setIsIssuerAccountChange(false));
        }
        const networkId = await web3.eth.net.getId();
        if (networkId !== issuer?.networkId && issuer !== null) {
          dispatch(setIsIssuerNetworkChange(true));
          if (!isIssuerLoggedIn) {
            toast.warn('Network has been changed', { toastId: 'network-changed' });
          }
        } else if (networkId === issuer?.networkId && issuer !== null) {
          dispatch(setIsIssuerNetworkChange(false));
        }
        dispatch(setInstanceStart());
      }
    };

    if (isIssuerPresent) {
      checkIssuerAccountAndNetworkChangeOnStart();
    }

    if (window.ethereum && isIssuerPresent) {
      window.ethereum.on('accountsChanged', () => {
        checkIssuerAccountAndNetworkChangeOnStart();
      });
      window.ethereum.on('chainChanged', () => {
        checkIssuerAccountAndNetworkChangeOnStart();
      });
    }

    return () => {
      if (window.ethereum && isIssuerPresent) {
        window.ethereum.removeListener('accountsChanged', () => {
          checkIssuerAccountAndNetworkChangeOnStart();
        });
        window.ethereum.removeListener('chainChanged', () => {
          checkIssuerAccountAndNetworkChangeOnStart();
        });
      }
    };
  }, [isIssuerMetaMask, isIssuerAccountChanged, isIssuerNetworkChanged, dependencyWeb3Issuer, isIssuerLoggedIn]);
};

export default useIssuerDetect;
