import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { setRequestorLoginStatus, setRequestorName } from '../../../redux/requestor/requestor.actions';
import ConnectWallet from './ConnectWallet';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isConnected = useSelector((state) => state.requestor.currentRequestor);
  const isAccountChanged = useSelector((state) => state.requestor.isAccountChanged);
  const isNetworkChanged = useSelector((state) => state.requestor.isNetworkChanged);
  const requestor = useSelector((state) => state.requestor.currentRequestor);
  const instance = useSelector((state) => state.contract.instance);

  const requestorLogin = async () => {
    try {
      const requestorDetails = await instance.methods.singleRequestor(requestor.account).call();
      dispatch(setRequestorLoginStatus(true));
      dispatch(setRequestorName(requestorDetails[0]));
      history.push('/requestor/dashboard');
    } catch (err) {
      toast.error('Something Went Wrong', { toastId: `${err.message}` });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-1/2 h-auto bg-white rounded-2xl">
      <ConnectWallet />
      {isConnected && isAccountChanged === false && isNetworkChanged === false ? (
        <button
          type="button"
          className="bg-prime rounded-md px-3 py-2 mb-10 text-white w-32 h-12 text-center text-lg font-bold hover:bg-indigo-600 select-none"
          onClick={() => {
            requestorLogin();
          }}
        >
          Login
        </button>
      ) : (
        <button type="button" className="cursor-not-allowed mb-10 bg-prime rounded-md px-3 py-2 text-white w-32 h-12 text-center text-lg font-bold hover:bg-indigo-600 select-none" disabled>
          Login
        </button>
      )}
    </div>
  );
};

export default Login;
