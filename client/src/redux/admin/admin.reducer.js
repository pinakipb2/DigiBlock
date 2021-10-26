import AdminActionTypes from './admin.types';

const INITIAL_STATE = {
  web3: null,
  currentAdmin: null,
  isMetaMaskInstalled: false,
  isAccountChanged: false,
  isNetworkChanged: false,
};

const adminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AdminActionTypes.WEB3:
      return {
        ...state,
        web3: action.payload,
      };
    case AdminActionTypes.SET_CURRENT_ADMIN:
      return {
        ...state,
        currentAdmin: action.payload,
      };
    case AdminActionTypes.CHECK_METAMASK_INSTALLED:
      return {
        ...state,
        isMetaMaskInstalled: action.payload,
      };
    case AdminActionTypes.CHECK_ACCOUNT_CHANGED:
      return {
        ...state,
        isAccountChanged: action.payload,
      };
    case AdminActionTypes.CHECK_NETWORK_CHANGED:
      return {
        ...state,
        isNetworkChanged: action.payload,
      };
    default:
      return state;
  }
};

export default adminReducer;
