import AdminActionTypes from './admin.types';

const INITIAL_STATE = {
  web3: null,
  currentAdmin: null,
  isMetaMaskInstalled: false,
  isAccountChanged: false,
  isNetworkChanged: false,
  sidebarCollapsed: false,
  sidebarMenu: [
    {
      id: 0,
      name: 'Dashboard',
      url: '/admin/dashboard',
      icon: 'fas fa-tachometer-alt',
    },
    {
      id: 1,
      name: 'Admins',
      url: '/admin/admins',
      icon: 'fas fa-user-secret',
    },
    {
      id: 2,
      name: 'Users',
      url: '/admin/users',
      icon: 'fas fa-user-alt',
    },
    {
      id: 3,
      name: 'Issuers',
      url: '/admin/issuers',
      icon: 'fas fa-user-tie',
    },
    {
      id: 4,
      name: 'Verifiers',
      url: '/admin/verifiers',
      icon: 'fas fa-user-check',
    },
    {
      id: 5,
      name: 'Profile',
      url: '/admin/profile',
      icon: 'fas fa-id-badge',
    },
  ],
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
    case AdminActionTypes.CHECK_SIDEBAR_COLLAPSED:
      return {
        ...state,
        sidebarCollapsed: !state.sidebarCollapsed,
      };
    default:
      return state;
  }
};

export default adminReducer;
