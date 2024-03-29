import React from 'react';

import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Footer from '../../../components/Common/Footer';
import Navbar from '../../../components/Common/Navbar';
import Login from '../../../components/User/Login/Login';
import getWeb3 from '../../../getWeb3';
import useUserDetect from '../../../hooks/useUserDetect';
import { setUserWeb3, setIsUserAccountChange, setIsUserNetworkChange } from '../../../redux/user/user.actions';

const UserLogin = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  useUserDetect();

  const checkAccountChange = () => {
    if (window.ethereum || window.web3) {
      window.ethereum.on('accountsChanged', async () => {
        const web3 = await getWeb3();
        dispatch(setUserWeb3(web3));
        const account = web3.currentProvider.selectedAddress;
        if (account !== user?.account && user !== null) {
          dispatch(setIsUserAccountChange(true));
          toast.warn('Account has been changed', { toastId: 'account-changed' });
        } else if (account === user?.account && user !== null) {
          dispatch(setIsUserNetworkChange(false));
        }
      });
    }
  };
  checkAccountChange();

  const checkNetworkChange = () => {
    if (window.ethereum || window.web3) {
      window.ethereum.on('chainChanged', async () => {
        const web3 = await getWeb3();
        dispatch(setUserWeb3(web3));
        const networkId = await web3.eth.net.getId();
        if (networkId !== user?.networkId && user !== null) {
          dispatch(setIsUserAccountChange(true));
          toast.warn('Network has been changed', { toastId: 'network-changed' });
          toast.warn('Please switch to Rinkeby Network', { toastId: 'network-wrong' });
        } else if (networkId === user?.networkId && user !== null) {
          dispatch(setIsUserNetworkChange(false));
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

export default UserLogin;
