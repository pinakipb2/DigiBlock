// Checks Account and newtwork change

import { useEffect } from 'react';

// import { useDisclosure } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// import DigiBlockContract from '../contracts/DigiBlock.json';
import getWeb3 from '../getWeb3';
import { setWeb3, setMetmaskInstalled, setIsAccountChange, setIsNetworkChange } from '../redux/admin/admin.actions';
import { setInstanceStart } from '../redux/contract/contract.actions';
import { setIssuerWeb3, setIssuerMetmaskInstalled, setIsIssuerAccountChange, setIsIssuerNetworkChange } from '../redux/issuer/issuer.actions';
import { setRequestorWeb3, setRequestorMetmaskInstalled, setIsRequestorAccountChange, setIsRequestorNetworkChange } from '../redux/requestor/requestor.actions';
import { setUserWeb3, setUserMetmaskInstalled, setIsUserAccountChange, setIsUserNetworkChange } from '../redux/user/user.actions';

const useDetect = () => {
  const dispatch = useDispatch();
  const isMetaMask = useSelector((state) => state.admin.isMetaMaskInstalled);
  const isIssuerMetaMask = useSelector((state) => state.issuer.isMetaMaskInstalled);
  const isUserMetaMask = useSelector((state) => state.user.isMetaMaskInstalled);
  const isRequestorMetaMask = useSelector((state) => state.requestor.isMetaMaskInstalled);
  const admin = useSelector((state) => state.admin.currentAdmin);
  const user = useSelector((state) => state.user.currentUser);
  const issuer = useSelector((state) => state.issuer.currentIssuer);
  const requestor = useSelector((state) => state.requestor.currentRequestor);
  const isAdminPresent = useSelector((state) => !!state.admin.currentAdmin);
  const isIssuerPresent = useSelector((state) => !!state.issuer.currentIssuer);
  const isUserPresent = useSelector((state) => !!state.user.currentUser);
  const isRequestorPresent = useSelector((state) => !!state.requestor.currentRequestor);
  const isWeb3 = useSelector((state) => !!state.admin.web3);
  const isIssuerWeb3 = useSelector((state) => !!state.issuer.web3);
  const isUserWeb3 = useSelector((state) => !!state.user.web3);
  const isRequestorWeb3 = useSelector((state) => !!state.requestor.web3);
  const dependencyWeb3 = useSelector((state) => state.admin.web3);
  const dependencyWeb3Issuer = useSelector((state) => state.issuer.web3);
  const dependencyWeb3User = useSelector((state) => state.user.web3);
  const dependencyWeb3Requestor = useSelector((state) => state.requestor.web3);
  const isLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isIssuerLoggedIn = useSelector((state) => state.issuer.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isRequestorLoggedIn = useSelector((state) => state.requestor.isLoggedIn);
  const isAccountChanged = useSelector((state) => state.admin.isAccountChanged);
  const isIssuerAccountChanged = useSelector((state) => state.issuer.isAccountChanged);
  const isUserAccountChanged = useSelector((state) => state.user.isAccountChanged);
  const isRequestorAccountChanged = useSelector((state) => state.requestor.isAccountChanged);
  const isNetworkChanged = useSelector((state) => state.admin.isNetworkChanged);
  const isIssuerNetworkChanged = useSelector((state) => state.issuer.isNetworkChanged);
  const isUserNetworkChanged = useSelector((state) => state.user.isNetworkChanged);
  const isRequestorNetworkChanged = useSelector((state) => state.requestor.isNetworkChanged);

  useEffect(() => {
    const getMetaMaskStatus = () => {
      if (!isMetaMask) {
        if (window.web3 || window.ethereum) {
          dispatch(setMetmaskInstalled(true));
        } else {
          dispatch(setMetmaskInstalled(false));
        }
      }
      if (!isIssuerMetaMask) {
        if (window.web3 || window.ethereum) {
          dispatch(setIssuerMetmaskInstalled(true));
        } else {
          dispatch(setIssuerMetmaskInstalled(false));
        }
      }
      if (!isUserMetaMask) {
        if (window.web3 || window.ethereum) {
          dispatch(setUserMetmaskInstalled(true));
        } else {
          dispatch(setUserMetmaskInstalled(false));
        }
      }
      if (!isRequestorMetaMask) {
        if (window.web3 || window.ethereum) {
          dispatch(setRequestorMetmaskInstalled(true));
        } else {
          dispatch(setRequestorMetmaskInstalled(false));
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
          console.log(networkId, requestor.networkId);
          dispatch(setIsRequestorNetworkChange(true));
          if (!isRequestorLoggedIn) {
            toast.warn('Network has been changed', { toastId: 'network-changed' });
          }
        } else if (networkId === requestor?.networkId && requestor !== null) {
          dispatch(setIsIssuerNetworkChange(false));
        }
        dispatch(setInstanceStart());
      }
    };

    // If admin, user, issuer, verifier present
    if (isAdminPresent) {
      checkAdminAccountAndNetworkChangeOnStart();
    } else if (isIssuerPresent) {
      checkIssuerAccountAndNetworkChangeOnStart();
    } else if (isUserPresent) {
      checkUserAccountAndNetworkChangeOnStart();
    } else if (isRequestorPresent) {
      checkRequestorAccountAndNetworkChangeOnStart();
    }

    if (window.ethereum && isAdminPresent) {
      window.ethereum.on('accountsChanged', () => {
        checkAdminAccountAndNetworkChangeOnStart();
      });
      window.ethereum.on('chainChanged', () => {
        checkAdminAccountAndNetworkChangeOnStart();
      });
    } else if (window.ethereum && isIssuerPresent) {
      window.ethereum.on('accountsChanged', () => {
        checkIssuerAccountAndNetworkChangeOnStart();
      });
      window.ethereum.on('chainChanged', () => {
        checkIssuerAccountAndNetworkChangeOnStart();
      });
    } else if (window.ethereum && isUserPresent) {
      window.ethereum.on('accountsChanged', () => {
        checkUserAccountAndNetworkChangeOnStart();
      });
      window.ethereum.on('chainChanged', () => {
        checkUserAccountAndNetworkChangeOnStart();
      });
    } else if (window.ethereum && isRequestorPresent) {
      window.ethereum.on('accountsChanged', () => {
        checkRequestorAccountAndNetworkChangeOnStart();
      });
      window.ethereum.on('chainChanged', () => {
        checkRequestorAccountAndNetworkChangeOnStart();
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
      if (window.ethereum && isAdminPresent) {
        window.ethereum.removeListener('accountsChanged', () => {
          checkAdminAccountAndNetworkChangeOnStart();
        });
        window.ethereum.removeListener('chainChanged', () => {
          checkAdminAccountAndNetworkChangeOnStart();
        });
      } else if (window.ethereum && isIssuerPresent) {
        window.ethereum.removeListener('accountsChanged', () => {
          checkIssuerAccountAndNetworkChangeOnStart();
        });
        window.ethereum.removeListener('chainChanged', () => {
          checkIssuerAccountAndNetworkChangeOnStart();
        });
      } else if (window.ethereum && isUserPresent) {
        window.ethereum.removeListener('accountsChanged', () => {
          checkUserAccountAndNetworkChangeOnStart();
        });
        window.ethereum.removeListener('chainChanged', () => {
          checkUserAccountAndNetworkChangeOnStart();
        });
      } else if (window.ethereum && isRequestorPresent) {
        window.ethereum.on('accountsChanged', () => {
          checkRequestorAccountAndNetworkChangeOnStart();
        });
        window.ethereum.on('chainChanged', () => {
          checkRequestorAccountAndNetworkChangeOnStart();
        });
      }
    };
  }, [isMetaMask, isIssuerMetaMask, isUserMetaMask, isRequestorMetaMask, isAccountChanged, isIssuerAccountChanged, isUserAccountChanged, isRequestorAccountChanged, isNetworkChanged, isIssuerNetworkChanged, isUserNetworkChanged, isRequestorNetworkChanged, dependencyWeb3, dependencyWeb3Issuer, dependencyWeb3User, dependencyWeb3Requestor, isLoggedIn, isIssuerLoggedIn, isUserLoggedIn, isRequestorLoggedIn]);
};

export default useDetect;
