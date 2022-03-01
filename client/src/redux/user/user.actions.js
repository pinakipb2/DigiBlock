import { toast } from 'react-toastify';

import UserActionTypes from './user.types';

export const setUserWeb3 = (web3) => ({
  type: UserActionTypes.USER_WEB3,
  payload: web3,
});

export const setCurrentUser = (account, balance, networkId) => (dispatch) => {
  dispatch({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: {
      account,
      balance,
      networkId,
    },
  });
  if (account) {
    toast.success('Connected to MetaMask');
  }
};

export const setUserLoginStatus = (verdict) => ({
  type: UserActionTypes.SET_USER_LOGIN_STATUS,
  payload: verdict,
});

export const setUserMetmaskInstalled = (status) => (dispatch) => {
  dispatch({
    type: UserActionTypes.CHECK_USER_METAMASK_INSTALLED,
    payload: status,
  });
  if (!status) {
    toast.error('MetaMask not installed', { autoClose: false, toastId: 'Not-installed', closeButton: false });
  }
};

export const setIsUserAccountChange = (verdict) => ({
  type: UserActionTypes.CHECK_USER_ACCOUNT_CHANGED,
  payload: verdict,
});

export const setIsUserNetworkChange = (verdict) => ({
  type: UserActionTypes.CHECK_USER_NETWORK_CHANGED,
  payload: verdict,
});

export const setUserName = (userName) => ({
  type: UserActionTypes.SET_USER_NAME,
  payload: userName,
});

export const checkUserSidebarCollapsed = () => ({
  type: UserActionTypes.CHECK_USER_SIDEBAR_COLLAPSED,
});

export const logoutUser = () => ({
  type: UserActionTypes.USER_LOGOUT,
});

export const isUserVerified = (isVerified) => ({
  type: UserActionTypes.IS_USER_VERIFIED,
  payload: isVerified
});
