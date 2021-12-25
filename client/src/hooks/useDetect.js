// Checks Account and newtwork change

import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// import DigiBlockContract from '../contracts/DigiBlock.json';
import getWeb3 from '../getWeb3';
import { setWeb3, setMetmaskInstalled, setIsAccountChange, setIsNetworkChange } from '../redux/admin/admin.actions';
import { setInstanceStart } from '../redux/contract/contract.actions';

const useDetect = () => {
  const dispatch = useDispatch();
  const isMetaMask = useSelector((state) => state.admin.isMetaMaskInstalled);
  const admin = useSelector((state) => state.admin.currentAdmin);
  const isWeb3 = useSelector((state) => !!(state.admin.web3));

  useEffect(() => {
    const getMetaMaskStatus = () => {
      if (!isMetaMask) {
        if (window.web3 || window.ethereum) {
          dispatch(setMetmaskInstalled(true));
        } else {
          dispatch(setMetmaskInstalled(false));
        }
      }
    };
    getMetaMaskStatus();

    // const initContractInstance = async (web3) => {
    //   const networkId = await web3.eth.net.getId();
    //   const deployedNetwork = DigiBlockContract.networks[networkId];
    //   const instance = new web3.eth.Contract(DigiBlockContract.abi, deployedNetwork && deployedNetwork.address);
    //   dispatch(setInstance(instance));
    //   console.log('running');
    // };

    const checkAccountChangeOnStart = async () => {
      if (window.ethereum || window.web3) {
        const web3 = await getWeb3();
        if (!isWeb3) {
          dispatch(setWeb3(web3));
        }
        const account = web3.currentProvider.selectedAddress;
        if (account !== admin?.account && admin !== null) {
          dispatch(setIsAccountChange(true));
          toast.warn('Account has been changed', { toastId: 'account-changed' });
        } else if (account === admin?.account && admin !== null) {
          dispatch(setIsAccountChange(false));
          // toast.success('Connected account retrieved', { toastId: 'account-retrieved' });
        }
        // setInstance
        dispatch(setInstanceStart());
      }
    };
    checkAccountChangeOnStart();

    const checkNetworkChangeOnStart = async () => {
      if (window.ethereum || window.web3) {
        const web3 = await getWeb3();
        if (!isWeb3) {
          dispatch(setWeb3(web3));
        }
        const networkId = await web3.eth.net.getId();
        if (networkId !== admin?.networkId && admin !== null) {
          dispatch(setIsNetworkChange(true));
          toast.warn('Network has been changed', { toastId: 'network-changed' });
        } else if (networkId === admin?.networkId && admin !== null) {
          dispatch(setIsNetworkChange(false));
          // toast.success('Connected Network retrieved', { toastId: 'network-retrieved' });
        }
        // setInstance
        dispatch(setInstanceStart());
      }
    };
    checkNetworkChangeOnStart();
  }, [isMetaMask]);
};

export default useDetect;
