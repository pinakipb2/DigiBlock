import { toast } from 'react-toastify';

import IssuerActionTypes from './issuer.types';

export const setWeb3 = (web3) => ({
  type: IssuerActionTypes.ISSUER_WEB3,
  payload: web3,
});

export const setCurrentIssuer = (account, balance, networkId) => (dispatch) => {
  dispatch(
    {
      type: IssuerActionTypes.SET_CURRENT_ISSUER,
      payload: {
        account,
        balance,
        networkId,
      },
    },
  );
  if (account) { toast.success('Connected to MetaMask'); }
};

export const setLoginStatus = (verdict) => ({
  type: IssuerActionTypes.SET_ISSUER_LOGIN_STATUS,
  payload: verdict,
});

export const setMetmaskInstalled = (status) => (dispatch) => {
  dispatch({
    type: IssuerActionTypes.CHECK_ISSUER_METAMASK_INSTALLED,
    payload: status,
  });
  if (!status) {
    toast.error('MetaMask not installed', { autoClose: false, toastId: 'Not-installed', closeButton: false });
  }
};

export const setIsAccountChange = (verdict) => ({
  type: IssuerActionTypes.CHECK_ISSUER_ACCOUNT_CHANGED,
  payload: verdict,
});

export const setIsNetworkChange = (verdict) => ({
  type: IssuerActionTypes.CHECK_ISSUER_NETWORK_CHANGED,
  payload: verdict,
});

export const setIssuerName = (issuerName) => ({
  type: IssuerActionTypes.SET_ISSUER_NAME,
  payload: issuerName,
});

export const checkSidebarCollapsed = () => ({
  type: IssuerActionTypes.CHECK_ISSUER_SIDEBAR_COLLAPSED,
});

export const logoutIssuer = () => ({
  type: IssuerActionTypes.ISSUER_LOGOUT,
});
