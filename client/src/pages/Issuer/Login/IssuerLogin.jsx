import React from 'react';

import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Footer from '../../../components/Common/Footer';
import Navbar from '../../../components/Common/Navbar';
import Login from '../../../components/Issuer/Login/Login';
import getWeb3 from '../../../getWeb3';
import useIssuerDetect from '../../../hooks/useIssuerDetect';
import { setIssuerWeb3, setIsIssuerAccountChange, setIsIssuerNetworkChange } from '../../../redux/issuer/issuer.actions';

const IssuerLogin = () => {
  const dispatch = useDispatch();
  const issuer = useSelector((state) => state.issuer.currentIssuer);

  useIssuerDetect();

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
