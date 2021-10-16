import UserActionTypes from './user.types';

export const setWeb3 = (web3) => ({
  type: UserActionTypes.WEB3,
  payload: web3,
});

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const setCurrentUserAccount = (account) => ({
  type: UserActionTypes.SET_CURRENT_USER_ACCOUNT,
  payload: account,
});

export const setCurrentUserBalance = (balance) => ({
  type: UserActionTypes.SET_CURRENT_USER_BALANCE,
  payload: balance,
});

export const setCurrentUserNetworkId = (networkID) => ({
  type: UserActionTypes.SET_CURRENT_USER_NETWORK_ID,
  payload: networkID,
});

export const setMetmaskInstalled = (status) => ({
  type: UserActionTypes.CHECK_METAMASK_INSTALLED,
  payload: status,
});
