import ContractActionTypes from './contract.types';

const setInstance = (instance) => ({
  type: ContractActionTypes.SET_INSTANCE,
  payload: instance,
});

export default setInstance;
