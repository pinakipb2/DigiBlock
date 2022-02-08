import { stringify, parse } from 'flatted';
import localforage from 'localforage';
import { combineReducers } from 'redux';
import { persistReducer, createTransform } from 'redux-persist';

import adminReducer from './admin/admin.reducer';
import contractReducer from './contract/contract.reducer';
import issuerReducer from './issuer/issuer.reducer';
import requestorReducer from './requestor/requestor.reducer';
import userReducer from './user/user.reducer';

export const transformCircular = createTransform(
  (inboundState) => stringify(inboundState),
  (outboundState) => parse(outboundState),
);

const persistConfig = {
  key: 'root',
  storage: localforage,
  transforms: [transformCircular],
  whitelist: ['user', 'admin', 'contract', 'issuer', 'requestor'],
};

const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
  contract: contractReducer,
  issuer: issuerReducer,
  requestor: requestorReducer
});

export default persistReducer(persistConfig, rootReducer);
