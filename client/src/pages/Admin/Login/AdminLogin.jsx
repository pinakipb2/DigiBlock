import React from 'react';

import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Login from '../../../components/Admin/Login/Login';
import Footer from '../../../components/Common/Footer';
import Navbar from '../../../components/Common/Navbar';
import getWeb3 from '../../../getWeb3';
import useAdminDetect from '../../../hooks/useAdminDetect';
// import useDetect from '../../../hooks/useDetect';
import { setWeb3, setIsAccountChange, setIsNetworkChange } from '../../../redux/admin/admin.actions';

const AdminLogin = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin.currentAdmin);

  useAdminDetect();

  const checkAccountChange = () => {
    if (window.ethereum || window.web3) {
      window.ethereum.on('accountsChanged', async () => {
        const web3 = await getWeb3();
        dispatch(setWeb3(web3));
        const account = web3.currentProvider.selectedAddress;
        if (account !== admin?.account && admin !== null) {
          dispatch(setIsAccountChange(true));
          toast.warn('Account has been changed', { toastId: 'account-changed' });
        } else if (account === admin?.account && admin !== null) {
          dispatch(setIsAccountChange(false));
        }
      });
    }
  };
  checkAccountChange();

  const checkNetworkChange = () => {
    if (window.ethereum || window.web3) {
      window.ethereum.on('chainChanged', async () => {
        const web3 = await getWeb3();
        dispatch(setWeb3(web3));
        const networkId = await web3.eth.net.getId();
        if (networkId !== admin?.networkId && admin !== null) {
          dispatch(setIsNetworkChange(true));
          toast.warn('Network has been changed', { toastId: 'network-changed' });
          toast.warn('Please switch to Rinkeby Network', { toastId: 'network-wrong' });
        } else if (networkId === admin?.networkId && admin !== null) {
          dispatch(setIsNetworkChange(false));
        }
      });
    }
  };
  checkNetworkChange();

  return (
    <>
      <Navbar />
      <div className="bg-red-700 flex justify-center items-center pt-28 pb-7">
        <Helmet>
          <title>Admin Login - DigiBlock</title>
        </Helmet>
        <Login />
      </div>
      <Footer />
    </>
  );
};

export default AdminLogin;
