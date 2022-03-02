// Checks Account and newtwork change

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import getWeb3 from '../getWeb3';
import { setInstanceStart } from '../redux/contract/contract.actions';
import { setUserWeb3, setUserMetmaskInstalled, setIsUserAccountChange, setIsUserNetworkChange } from '../redux/user/user.actions';

const useUserDetect = () => {
  const dispatch = useDispatch();
  const isUserMetaMask = useSelector((state) => state.user.isMetaMaskInstalled);
  const user = useSelector((state) => state.user.currentUser);
  const isUserPresent = useSelector((state) => !!state.user.currentUser);
  const isUserWeb3 = useSelector((state) => !!state.user.web3);
  const dependencyWeb3User = useSelector((state) => state.user.web3);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isUserAccountChanged = useSelector((state) => state.user.isAccountChanged);
  const isUserNetworkChanged = useSelector((state) => state.user.isNetworkChanged);

  useEffect(() => {
    const getMetaMaskStatus = () => {
      if (!isUserMetaMask) {
        if (window.web3 || window.ethereum) {
          dispatch(setUserMetmaskInstalled(true));
        } else {
          dispatch(setUserMetmaskInstalled(false));
        }
      }
    };
    getMetaMaskStatus();

    const checkUserAccountAndNetworkChangeOnStart = async () => {
      if (window.web3 || window.ethereum) {
        const web3 = await getWeb3();
        if (!isUserWeb3) {
          dispatch(setUserWeb3(web3));
        }
        const account = web3.currentProvider.selectedAddress;
        if (account !== user?.account && user !== null) {
          dispatch(setIsUserAccountChange(true));
          if (!isUserLoggedIn) {
            toast.warn('Account has been changed', { toastId: 'account-changed' });
          }
        } else if (account === user?.account && user !== null) {
          dispatch(setIsUserAccountChange(false));
        }
        const networkId = await web3.eth.net.getId();
        if (networkId !== user?.networkId && user !== null) {
          console.log(networkId, user.networkId);
          dispatch(setIsUserNetworkChange(true));
          if (!isUserLoggedIn) {
            toast.warn('Network has been changed', { toastId: 'network-changed' });
          }
        } else if (networkId === user?.networkId && user !== null) {
          dispatch(setIsUserNetworkChange(false));
        }
        dispatch(setInstanceStart());
      }
    };

    if (isUserPresent) {
      checkUserAccountAndNetworkChangeOnStart();
    }

    if (window.ethereum && isUserPresent) {
      window.ethereum.on('accountsChanged', () => {
        checkUserAccountAndNetworkChangeOnStart();
      });
      window.ethereum.on('chainChanged', () => {
        checkUserAccountAndNetworkChangeOnStart();
      });
    }
    return () => {
      if (window.ethereum && isUserPresent) {
        window.ethereum.removeListener('accountsChanged', () => {
          checkUserAccountAndNetworkChangeOnStart();
        });
        window.ethereum.removeListener('chainChanged', () => {
          checkUserAccountAndNetworkChangeOnStart();
        });
      }
    };
  }, [isUserMetaMask, isUserAccountChanged, isUserNetworkChanged, dependencyWeb3User, isUserLoggedIn]);
};

export default useUserDetect;
