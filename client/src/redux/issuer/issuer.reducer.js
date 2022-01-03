import IssuerActionTypes from './issuer.types';

const INITIAL_STATE = {
  web3: null,
  currentIssuer: null,
  isLoggedIn: false,
  isMetaMaskInstalled: false,
  isAccountChanged: false,
  isNetworkChanged: false,
  sidebarCollapsed: false,
  issuerName: null,
};

const issuerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IssuerActionTypes.ISSUER_WEB3:
      return {
        ...state,
        web3: action.payload,
      };
    case IssuerActionTypes.SET_CURRENT_ISSUER:
      return {
        ...state,
        currentIssuer: action.payload,
      };
    case IssuerActionTypes.SET_ISSUER_LOGIN_STATUS:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case IssuerActionTypes.CHECK_ISSUER_METAMASK_INSTALLED:
      return {
        ...state,
        isMetaMaskInstalled: action.payload,
      };
    case IssuerActionTypes.CHECK_ISSUER_ACCOUNT_CHANGED:
      return {
        ...state,
        isAccountChanged: action.payload,
      };
    case IssuerActionTypes.CHECK_ISSUER_NETWORK_CHANGED:
      return {
        ...state,
        isNetworkChanged: action.payload,
      };
    case IssuerActionTypes.CHECK_ISSUER_SIDEBAR_COLLAPSED:
      return {
        ...state,
        sidebarCollapsed: !state.sidebarCollapsed,
      };
    case IssuerActionTypes.SET_ISSUER_NAME:
      return {
        ...state,
        issuerName: action.payload,
      };
    case IssuerActionTypes.ISSUER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default issuerReducer;
