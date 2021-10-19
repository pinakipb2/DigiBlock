import UserActionTypes from './user.types';

const INITIAL_STATE = {
  web3: null,
  currentUser: null,
  isMetaMaskInstalled: false,
  isAccountChanged: false,
  isNetworkChanged: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.WEB3:
      return {
        ...state,
        web3: action.payload,
      };
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case UserActionTypes.CHECK_METAMASK_INSTALLED:
      return {
        ...state,
        isMetaMaskInstalled: action.payload,
      };
    case UserActionTypes.CHECK_ACCOUNT_CHANGED:
      return {
        ...state,
        isAccountChanged: action.payload,
      };
    case UserActionTypes.CHECK_NETWORK_CHANGED:
      return {
        ...state,
        isNetworkChanged: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
