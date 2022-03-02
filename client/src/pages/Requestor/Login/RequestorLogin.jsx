import React from 'react';

import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Footer from '../../../components/Common/Footer';
import Navbar from '../../../components/Common/Navbar';
import Login from '../../../components/Requestor/Login/Login';
import getWeb3 from '../../../getWeb3';
// import useDetect from '../../../hooks/useDetect';
import useRequestorDetect from '../../../hooks/useRequestorDetect';
import { setRequestorWeb3, setIsRequestorAccountChange, setIsRequestorNetworkChange } from '../../../redux/requestor/requestor.actions';

const RequestorLogin = () => {
  const dispatch = useDispatch();
  // const isMetaMask = useSelector((state) => state.user.isMetaMaskInstalled);
  const requestor = useSelector((state) => state.requestor.currentRequestor);

  // useDetect();
  useRequestorDetect();

  // useEffect(() => {
  //   const getMetaMaskStatus = () => {
  //     if (window.web3 || window.ethereum) {
  //       dispatch(setMetmaskInstalled(true));
  //     } else {
  //       dispatch(setMetmaskInstalled(false));
  //     }
  //   };
  //   getMetaMaskStatus();

  //   const checkAccountChangeOnStart = async () => {
  //     if (window.ethereum || window.web3) {
  //       const web3 = await getWeb3();
  //       dispatch(setWeb3(web3));
  //       const account = web3.currentProvider.selectedAddress;
  //       if (account !== user?.account && user !== null) {
  //         dispatch(setIsAccountChange(true));
  //         toast.warn('Account has been changed', { toastId: 'account-changed' });
  //       } else if (account === user?.account && user !== null) {
  //         dispatch(setIsAccountChange(false));
  //         // toast.success('Connected account retrieved', { toastId: 'account-retrieved' });
  //       }
  //     }
  //   };

  //   checkAccountChangeOnStart();
  //   const checkNetworkChangeOnStart = async () => {
  //     if (window.ethereum || window.web3) {
  //       const web3 = await getWeb3();
  //       dispatch(setWeb3(web3));
  //       const networkId = await web3.eth.net.getId();
  //       if (networkId !== user?.networkId && user !== null) {
  //         dispatch(setIsNetworkChange(true));
  //         toast.warn('Network has been changed', { toastId: 'network-changed' });
  //       } else if (networkId === user?.networkId && user !== null) {
  //         dispatch(setIsNetworkChange(false));
  //         // toast.success('Connected Network retrieved', { toastId: 'network-retrieved' });
  //       }
  //     }
  //   };
  //   checkNetworkChangeOnStart();
  // }, [isMetaMask]);

  const checkAccountChange = () => {
    if (window.ethereum || window.web3) {
      window.ethereum.on('accountsChanged', async () => {
        const web3 = await getWeb3();
        dispatch(setRequestorWeb3(web3));
        const account = web3.currentProvider.selectedAddress;
        if (account !== requestor?.account && requestor !== null) {
          dispatch(setIsRequestorAccountChange(true));
          toast.warn('Account has been changed', { toastId: 'account-changed' });
        } else if (account === requestor?.account && requestor !== null) {
          dispatch(setIsRequestorNetworkChange(false));
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
        dispatch(setRequestorWeb3(web3));
        const networkId = await web3.eth.net.getId();
        if (networkId !== requestor?.networkId && requestor !== null) {
          dispatch(setIsRequestorAccountChange(true));
          toast.warn('Network has been changed', { toastId: 'network-changed' });
          toast.warn('Please switch to Rinkeby Network', { toastId: 'network-wrong' });
        } else if (networkId === requestor?.networkId && requestor !== null) {
          dispatch(setIsRequestorNetworkChange(false));
          // toast.success('Connected Network retrieved', { toastId: 'network-retrieved' });
        }
      });
    }
  };
  checkNetworkChange();

  return (
    <>
      <Navbar />
      <div className="bg-blue1 flex justify-center items-center pt-28 pb-7">
        <Helmet>
          <title>Login - DigiBlock</title>
        </Helmet>
        <Login />
      </div>
      <Footer />
    </>
  );
};

export default RequestorLogin;
