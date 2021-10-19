import { toast } from 'react-toastify';
import UserActionTypes from './user.types';

export const setWeb3 = (web3) => ({
  type: UserActionTypes.WEB3,
  payload: web3,
});

export const setCurrentUser = (account, balance, networkId) => (dispatch) => {
  dispatch(
    {
      type: UserActionTypes.SET_CURRENT_USER,
      payload: {
        account,
        balance,
        networkId,
      },
    },
  );
  if (account) { toast.success('MetaMask wallet connected successfully'); }
};

export const setMetmaskInstalled = (status) => (dispatch) => {
  dispatch({
    type: UserActionTypes.CHECK_METAMASK_INSTALLED,
    payload: status,
  });
  if (!status) {
    toast.warn('MetaMask not installed', { autoClose: 10000, toastId: 'Not-installed' });
  }
};
