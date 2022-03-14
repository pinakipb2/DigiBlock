/* eslint-disable */

import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import rootReducer from './root-reducer';

import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [thunk, sagaMiddleware];

let store;

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
} else {
  store = createStore(rootReducer, applyMiddleware(...middlewares));
}

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };
