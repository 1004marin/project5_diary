import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

//import "antd/dist/antd.js";//전역으로 넣어주기


import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from'redux-promise';
import {thunk} from 'redux-thunk';
import authMiddleware from '../src/_middleware/authMiddleware';//액세스토큰 갱신

import Reducer from './_reducers';



const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, thunk, authMiddleware)(createStore)
//원래는 createstore만 해서 store를 redux에서 생성하는데, 그냥 store는 객체만 못받으니까
//promise와 function도 함께 받게 하기 위해

const store = createStoreWithMiddleware(
  Reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),


)
export default store;



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={store}>

  <BrowserRouter>
    <App />
  </BrowserRouter>

</Provider>
  //index.html의 root 안에 보여줄 것이 <app/>라고 정의해둔 것임
);

reportWebVitals();
