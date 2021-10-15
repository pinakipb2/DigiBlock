import UserActionTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  isMetaMask: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case UserActionTypes.CHECK_METAMASK:
      return {
        ...state,
        isMetaMask: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
