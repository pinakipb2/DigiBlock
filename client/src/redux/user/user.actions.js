import UserActionTypes from './user.types';

export const setWeb3 = (web3) => ({
  type: UserActionTypes.WEB3,
  payload: web3,
});

export const setCurrentUser = (account, balance, networkId) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: {
    account,
    balance,
    networkId,
  },
});

export const setMetmaskInstalled = (status) => ({
  type: UserActionTypes.CHECK_METAMASK_INSTALLED,
  payload: status,
});
