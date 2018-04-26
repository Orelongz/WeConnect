import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import decode from 'jwt-decode';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store/store';
import App from './components/App.jsx';
import './../public/style/index.scss';
import { userDetails, logout } from './actions/AuthAction';
import setAuthorizationToken from './utils/setAuthorizationToken';

if (localStorage.weconnectToken) {
  const token = localStorage.weconnectToken;
  const expiry = decode(token).exp.toString();
  const timeNow = new Date().getTime().toString().substring(0, 10);
  if (expiry > timeNow) {
    setAuthorizationToken(token);
    store.dispatch(userDetails());
  } else {
    store.dispatch(logout());
  }
}

ReactDOM.render(
  (<BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>),
  document.getElementById('app')
);
