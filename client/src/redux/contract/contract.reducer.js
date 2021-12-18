import ContractActionTypes from './contract.types';

const INITIAL_STATE = {
  instance: null,
};

const contractReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ContractActionTypes.SET_INSTANCE:
      return {
        ...state,
        instance: action.payload,
      };
    default:
      return state;
  }
};

export default contractReducer;
