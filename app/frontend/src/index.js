import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
// import allReducers from './reducers'
import isLoggedReducer from './reducers/isLogged';

const root = ReactDOM.createRoot(document.getElementById('root'));


//STORE
let store = configureStore({
  reducer: {
    isLoggedIn: isLoggedReducer,
  }},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

//ACTION
// const login = () => {
//   return {
//     type: 'LOGIN'
//   }
// }
// const register = () => {
//   return {
//     type: 'REGISTER'
//   }
// }
// const logout = () => {
//   return {
//     type: 'LOGOUT'
//   }
// }
// const update = () => {
//   return {
//     type: 'UPDATE'
//   }
// }
// const search = () => {
//   return {
//     type: 'SEARCH'
//   }
// }

// const details = (state = {email: ''}) => {

// }

//DISPATCH



root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
