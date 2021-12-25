import { all, call } from 'redux-saga/effects';

import { onSetInstanceStart } from './contract/contract.saga';

export default function* rootSaga() {
  yield all([
    call(onSetInstanceStart),
  ]);
}
