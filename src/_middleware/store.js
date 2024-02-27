// store.js

import { createStore, applyMiddleware } from 'redux';
import  {thunk } from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import Reducer from '../_reducers';
import authMiddleware from './authMiddleware';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, authMiddleware, thunk)(createStore);

const store = createStoreWithMiddleware(
  Reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
