// store.js

import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import authMiddleware from './authMiddleware';  // 액세스 토큰 갱신 미들웨어
import Reducer from '../_reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, thunk, authMiddleware)(createStore);

const store = createStoreWithMiddleware(
  Reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
