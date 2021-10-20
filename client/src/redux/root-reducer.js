import { combineReducers } from 'redux';
import { persistReducer, createTransform } from 'redux-persist';
import localforage from 'localforage';
import { stringify, parse } from 'flatted';
import userReducer from './user/user.reducer';

export const transformCircular = createTransform(
  (inboundState) => stringify(inboundState),
  (outboundState) => parse(outboundState),
);

const persistConfig = {
  key: 'root',
  storage: localforage,
  transforms: [transformCircular],
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
