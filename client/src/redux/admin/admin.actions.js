import { toast } from 'react-toastify';
import AdminActionTypes from './admin.types';

export const setWeb3 = (web3) => ({
  type: AdminActionTypes.WEB3,
  payload: web3,
});

export const setCurrentAdmin = (account, balance, networkId) => (dispatch) => {
  dispatch(
    {
      type: AdminActionTypes.SET_CURRENT_ADMIN,
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
    type: AdminActionTypes.CHECK_METAMASK_INSTALLED,
    payload: status,
  });
  if (!status) {
    toast.error('MetaMask not installed', { autoClose: false, toastId: 'Not-installed', closeButton: false });
  }
};

export const setIsAccountChange = (verdict) => ({
  type: AdminActionTypes.CHECK_ACCOUNT_CHANGED,
  payload: verdict,
});

export const setIsNetworkChange = (verdict) => ({
  type: AdminActionTypes.CHECK_NETWORK_CHANGED,
  payload: verdict,
});

export const checkSidebarCollapsed = () => ({
  type: AdminActionTypes.CHECK_SIDEBAR_COLLAPSED,
});
