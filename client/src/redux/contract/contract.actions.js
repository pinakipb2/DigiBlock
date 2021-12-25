import ContractActionTypes from './contract.types';

export const setInstanceStart = () => ({
  type: ContractActionTypes.SET_INSTANCE_START
});

export const setInstanceSuccess = (instance) => ({
  type: ContractActionTypes.SET_INSTANCE_SUCCESS,
  payload: instance,
});

export const setInstanceFailure = (error) => ({
  type: ContractActionTypes.SET_INSTANCE_FAILURE,
  payload: error,
});

export const setOwner = (owner) => ({
  type: ContractActionTypes.SET_OWNER,
  payload: owner,
});
