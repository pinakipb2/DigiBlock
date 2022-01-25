import UserActionTypes from './user.types';

const INITIAL_STATE = {
  web3: null,
  currentUser: null,
  isLoggedIn: false,
  isMetaMaskInstalled: false,
  isAccountChanged: false,
  isNetworkChanged: false,
  sidebarCollapsed: false,
  userName: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.USER_WEB3:
      return {
        ...state,
        web3: action.payload,
      };
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case UserActionTypes.SET_USER_LOGIN_STATUS:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case UserActionTypes.CHECK_USER_METAMASK_INSTALLED:
      return {
        ...state,
        isMetaMaskInstalled: action.payload,
      };
    case UserActionTypes.CHECK_USER_ACCOUNT_CHANGED:
      return {
        ...state,
        isAccountChanged: action.payload,
      };
    case UserActionTypes.CHECK_USER_NETWORK_CHANGED:
      return {
        ...state,
        isNetworkChanged: action.payload,
      };
    case UserActionTypes.CHECK_USER_SIDEBAR_COLLAPSED:
      return {
        ...state,
        sidebarCollapsed: !state.sidebarCollapsed,
      };
    case UserActionTypes.SET_USER_NAME:
      return {
        ...state,
        userName: action.payload,
      };
    case UserActionTypes.USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default userReducer;
