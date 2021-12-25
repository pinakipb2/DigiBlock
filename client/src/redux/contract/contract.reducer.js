import ContractActionTypes from './contract.types';

const INITIAL_STATE = {
  instance: null,
  error: null,
  owner: null,
};

const contractReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ContractActionTypes.SET_INSTANCE_SUCCESS:
      return {
        ...state,
        instance: action.payload,
        error: null,
      };
    case ContractActionTypes.SET_INSTANCE_FAILURE:
      return {
        ...state,
        instance: null,
        error: action.payload,
      };
    case ContractActionTypes.SET_OWNER:
      return {
        ...state,
        owner: action.payload,
      };
    default:
      return state;
  }
};

export default contractReducer;
