import { toast } from 'react-toastify';

import RequestorActionTypes from './requestor.types';

export const setRequestorWeb3 = (web3) => ({
  type: RequestorActionTypes.REQUESTOR_WEB3,
  payload: web3,
});

export const setCurrentRequestor = (account, balance, networkId) => (dispatch) => {
  dispatch({
    type: RequestorActionTypes.SET_CURRENT_REQUESTOR,
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

export const setRequestorLoginStatus = (verdict) => ({
  type: RequestorActionTypes.SET_REQUESTOR_LOGIN_STATUS,
  payload: verdict,
});

export const setRequestorMetmaskInstalled = (status) => (dispatch) => {
  dispatch({
    type: RequestorActionTypes.CHECK_REQUESTOR_METAMASK_INSTALLED,
    payload: status,
  });
  if (!status) {
    toast.error('MetaMask not installed', { autoClose: false, toastId: 'Not-installed', closeButton: false });
  }
};

export const setIsRequestorAccountChange = (verdict) => ({
  type: RequestorActionTypes.CHECK_REQUESTOR_ACCOUNT_CHANGED,
  payload: verdict,
});

export const setIsRequestorNetworkChange = (verdict) => ({
  type: RequestorActionTypes.CHECK_REQUESTOR_NETWORK_CHANGED,
  payload: verdict,
});

export const setRequestorName = (requestorName) => ({
  type: RequestorActionTypes.SET_REQUESTOR_NAME,
  payload: requestorName,
});

export const checkRequestorSidebarCollapsed = () => ({
  type: RequestorActionTypes.CHECK_REQUESTOR_SIDEBAR_COLLAPSED,
});

export const logoutRequestor = () => ({
  type: RequestorActionTypes.REQUESTOR_LOGOUT,
});
