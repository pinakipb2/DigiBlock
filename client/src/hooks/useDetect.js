// Checks Account and newtwork change

import { useEffect } from 'react';

// import { useDisclosure } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// import DigiBlockContract from '../contracts/DigiBlock.json';
import getWeb3 from '../getWeb3';
import { setWeb3, setMetmaskInstalled, setIsAccountChange, setIsNetworkChange } from '../redux/admin/admin.actions';
import { setInstanceStart } from '../redux/contract/contract.actions';
import { setIssuerMetmaskInstalled } from '../redux/issuer/issuer.actions';

const useDetect = () => {
  const dispatch = useDispatch();
  const isMetaMask = useSelector((state) => state.admin.isMetaMaskInstalled);
  const admin = useSelector((state) => state.admin.currentAdmin);
  const isAdminPresent = useSelector((state) => !!state.admin.currentAdmin);
  const isIssuerPresent = useSelector((state) => !!state.issuer.currentIssuer);
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
          dispatch(setIssuerMetmaskInstalled(true));
        } else {
          dispatch(setMetmaskInstalled(false));
          dispatch(setIssuerMetmaskInstalled(false));
        }
      }
    };
    getMetaMaskStatus();

    const checkAccountAndNetworkChangeOnStart = async () => {
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
          // toast.success('Connected account retrieved', { toastId: 'account-retrieved' });
        }
        const networkId = await web3.eth.net.getId();
        if (networkId !== admin?.networkId && admin !== null) {
          dispatch(setIsNetworkChange(true));
          if (!isLoggedIn) {
            toast.warn('Network has been changed', { toastId: 'network-changed' });
          }
        } else if (networkId === admin?.networkId && admin !== null) {
          dispatch(setIsNetworkChange(false));
          // toast.success('Connected Network retrieved', { toastId: 'network-retrieved' });
        }
        dispatch(setInstanceStart());
      }
    };

    // If admin, user, issuer, verifier present
    if (isAdminPresent || isIssuerPresent) {
      checkAccountAndNetworkChangeOnStart();
    }
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => {
        checkAccountAndNetworkChangeOnStart();
      });
      window.ethereum.on('chainChanged', () => {
        checkAccountAndNetworkChangeOnStart();
      });
    }

    // const checkNetworkChangeOnStart = async () => {
    //   if (window.ethereum || window.web3) {
    //     const web3 = await getWeb3();
    //     if (!isWeb3) {
    //       dispatch(setWeb3(web3));
    //     }
    //     const networkId = await web3.eth.net.getId();
    //     if (networkId !== admin?.networkId && admin !== null) {
    //       dispatch(setIsNetworkChange(true));
    //       toast.warn('Network has been changed', { toastId: 'network-changed' });
    //     } else if (networkId === admin?.networkId && admin !== null) {
    //       dispatch(setIsNetworkChange(false));
    //       // toast.success('Connected Network retrieved', { toastId: 'network-retrieved' });
    //     }
    //     // setInstance
    //     dispatch(setInstanceStart());
    //   }
    // };
    // if (admin) {
    //   checkNetworkChangeOnStart();
    // }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {
          checkAccountAndNetworkChangeOnStart();
        });
        window.ethereum.removeListener('chainChanged', () => {
          checkAccountAndNetworkChangeOnStart();
        });
      }
    };
  }, [isMetaMask, isAccountChanged, isNetworkChanged, dependencyWeb3, isLoggedIn]);
};

export default useDetect;
