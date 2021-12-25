/* eslint-disable */

import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import rootReducer from './root-reducer';

import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga';

// const middlewares = [thunk];

const sagaMiddleware = createSagaMiddleware();

const middlewares = [thunk, sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

// const store = createStore(rootReducer, applyMiddleware(...middlewares));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };
