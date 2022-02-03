import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { setUserLoginStatus, setUserName, isUserVerified } from '../../../redux/user/user.actions';
import ConnectWallet from './ConnectWallet';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isConnected = useSelector((state) => state.user.currentUser);
  const isAccountChanged = useSelector((state) => state.user.isAccountChanged);
  const isNetworkChanged = useSelector((state) => state.user.isNetworkChanged);
  const user = useSelector((state) => state.user.currentUser);
  const instance = useSelector((state) => state.contract.instance);

  const userLogin = async () => {
    try {
      const userDetails = await instance.methods.singleUser(user.account).call();
      console.log(userDetails);
      dispatch(setUserLoginStatus(true));
      const isVerified = await instance.methods.isUserVerified(user.account).call();
      dispatch(isUserVerified(isVerified));
      dispatch(setUserName(`${userDetails[0]} ${userDetails[1]}`));
      history.push('/dashboard');
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
            userLogin();
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
