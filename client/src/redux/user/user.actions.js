import UserActionTypes from './user.types';

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const getMetmaskStatus = (web3) => {
  let status = false;
  if (typeof web3 !== 'undefined') {
    console.log('web3 is enabled');
    if (web3.currentProvider.isMetaMask === true) {
      status = true;
    }
  }
  return {
    type: UserActionTypes.CHECK_METAMASK,
    payload: status,
  };
};
