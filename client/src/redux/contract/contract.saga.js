import { takeLatest, put, select } from 'redux-saga/effects';

import DigiBlockContract from '../../contracts/DigiBlock.json';
import getWeb3 from '../../getWeb3';
import { setInstanceSuccess, setInstanceFailure, setOwner } from './contract.actions';
import ContractActionTypes from './contract.types';

export function* setInstance() {
  try {
    if (window.ethereum || window.web3) {
      const web3 = yield getWeb3();
      const networkId = yield web3.eth.net.getId();
      const deployedNetwork = DigiBlockContract.networks[networkId];
      const owner = yield select((state) => !!state.contract.owner);
      if (deployedNetwork) {
        const instance = new web3.eth.Contract(DigiBlockContract.abi, deployedNetwork && deployedNetwork.address);
        yield put(setInstanceSuccess(instance));
        if (!owner) {
          const Owner = yield instance.methods.owner.call().call();
          yield put(setOwner(Owner));
        }
      } else {
        console.log('error in deployment');
      }
    }
  } catch (err) {
    put(setInstanceFailure(err));
  }
}

export function* onSetInstanceStart() {
  yield takeLatest(
    ContractActionTypes.SET_INSTANCE_START,
    setInstance
  );
}

// export function* contractSagas()
