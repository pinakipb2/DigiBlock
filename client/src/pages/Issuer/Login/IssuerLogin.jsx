import React from 'react';

import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Footer from '../../../components/Common/Footer';
import Navbar from '../../../components/Common/Navbar';
import Login from '../../../components/Issuer/Login/Login';
import getWeb3 from '../../../getWeb3';
// import useDetect from '../../../hooks/useDetect';
import useIssuerDetect from '../../../hooks/useIssuerDetect';
import { setIssuerWeb3, setIsIssuerAccountChange, setIsIssuerNetworkChange } from '../../../redux/issuer/issuer.actions';

const IssuerLogin = () => {
  const dispatch = useDispatch();
  // const isMetaMask = useSelector((state) => state.issuer.isMetaMaskInstalled);
  const issuer = useSelector((state) => state.issuer.currentIssuer);

  // useDetect();
  useIssuerDetect();

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
  //       if (account !== issuer?.account && issuer !== null) {
  //         dispatch(setIsAccountChange(true));
  //         toast.warn('Account has been changed', { toastId: 'account-changed' });
  //       } else if (account === issuer?.account && issuer !== null) {
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
  //       if (networkId !== issuer?.networkId && issuer !== null) {
  //         dispatch(setIsNetworkChange(true));
  //         toast.warn('Network has been changed', { toastId: 'network-changed' });
  //       } else if (networkId === issuer?.networkId && issuer !== null) {
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
        dispatch(setIssuerWeb3(web3));
        const account = web3.currentProvider.selectedAddress;
        if (account !== issuer?.account && issuer !== null) {
          dispatch(setIsIssuerAccountChange(true));
          toast.warn('Account has been changed', { toastId: 'account-changed' });
        } else if (account === issuer?.account && issuer !== null) {
          dispatch(setIsIssuerAccountChange(false));
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
        dispatch(setIssuerWeb3(web3));
        const networkId = await web3.eth.net.getId();
        if (networkId !== issuer?.networkId && issuer !== null) {
          dispatch(setIsIssuerNetworkChange(true));
          toast.warn('Network has been changed', { toastId: 'network-changed' });
          toast.warn('Please switch to Rinkeby Network', { toastId: 'network-wrong' });
        } else if (networkId === issuer?.networkId && issuer !== null) {
          dispatch(setIsIssuerNetworkChange(false));
          // toast.success('Connected Network retrieved', { toastId: 'network-retrieved' });
        }
      });
    }
  };
  checkNetworkChange();

  return (
    <>
      <Navbar />
      <div className="bg-green-700 flex justify-center items-center pt-28 pb-7">
        <Helmet>
          <title>Issuer Login - DigiBlock</title>
        </Helmet>
        <Login />
      </div>
      <Footer />
    </>
  );
};

export default IssuerLogin;
