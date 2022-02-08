import RequestorActionTypes from './requestor.types';

const INITIAL_STATE = {
  web3: null,
  currentRequestor: null,
  isLoggedIn: false,
  isMetaMaskInstalled: false,
  isAccountChanged: false,
  isNetworkChanged: false,
  sidebarCollapsed: false,
  requestorName: null,
  isVerified: false
};

const requestorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RequestorActionTypes.REQUESTOR_WEB3:
      return {
        ...state,
        web3: action.payload,
      };
    case RequestorActionTypes.SET_CURRENT_REQUESTOR:
      return {
        ...state,
        currentRequestor: action.payload,
      };
    case RequestorActionTypes.IS_REQUESTOR_VERIFIED:
      return {
        ...state,
        isVerified: action.payload
      };
    case RequestorActionTypes.SET_REQUESTOR_LOGIN_STATUS:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case RequestorActionTypes.CHECK_REQUESTOR_METAMASK_INSTALLED:
      return {
        ...state,
        isMetaMaskInstalled: action.payload,
      };
    case RequestorActionTypes.CHECK_REQUESTOR_ACCOUNT_CHANGED:
      return {
        ...state,
        isAccountChanged: action.payload,
      };
    case RequestorActionTypes.CHECK_REQUESTOR_NETWORK_CHANGED:
      return {
        ...state,
        isNetworkChanged: action.payload,
      };
    case RequestorActionTypes.CHECK_REQUESTOR_SIDEBAR_COLLAPSED:
      return {
        ...state,
        sidebarCollapsed: !state.sidebarCollapsed,
      };
    case RequestorActionTypes.SET_REQUESTOR_NAME:
      return {
        ...state,
        requestorName: action.payload,
      };
    case RequestorActionTypes.REQUESTOR_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default requestorReducer;
