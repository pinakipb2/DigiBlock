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
  if (account) { toast.success('Connected to MetaMask'); }
};

export const setMetmaskInstalled = (status) => (dispatch) => {
  dispatch({
    type: UserActionTypes.CHECK_METAMASK_INSTALLED,
    payload: status,
  });
  if (!status) {
    toast.error('MetaMask not installed', { autoClose: false, toastId: 'Not-installed', closeButton: false });
  }
};

export const setIsAccountChange = (verdict) => ({
  type: UserActionTypes.CHECK_ACCOUNT_CHANGED,
  payload: verdict,
});

export const setIsNetworkChange = (verdict) => ({
  type: UserActionTypes.CHECK_NETWORK_CHANGED,
  payload: verdict,
});
