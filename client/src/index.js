import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store/store';
import App from './components/App.jsx';
import './../public/style/index.scss';
import { userDetails, logout } from './actions/AuthAction';
import setAuthorizationToken from './utils/setAuthorizationToken';

const SECRET = process.env.SECRET;

if (localStorage.weconnectToken) {
  const token = localStorage.weconnectToken;
  jwt.verify(token, SECRET, function(err, decoded) {
    if (err) {
      store.dispatch(logout());
    } else {
      setAuthorizationToken(token);
      store.dispatch(userDetails());
    }
  });
}

ReactDOM.render(
  (<BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>),
  document.getElementById('app')
);
