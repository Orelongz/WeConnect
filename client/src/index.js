// import required modules
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';
import 'bootstrap';
import 'rc-pagination/assets/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'alertifyjs/build/css/alertify.min.css';
import 'alertifyjs/build/css/themes/default.min.css';
import store from './store/store';
import App from './components/App.jsx';
import './../public/style/index.scss';
import { userDetails, logout } from './actions/AuthAction';
import setAuthorizationToken from './utils/setAuthorizationToken';

// get the value of SECRET from environment variables
const { SECRET } = process.env;

// check if token is in the local storage
if (localStorage.weconnectToken) {
  const token = localStorage.weconnectToken;
  jwt.verify(token, SECRET, (err) => {
    if (err) {
      // if token is not valid or expired, log user out
      store.dispatch(logout());
    } else {
      // log the user in
      setAuthorizationToken(token);
      store.dispatch(userDetails());
    }
  });
}

// render react app to the browser
ReactDOM.render(
  (<BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>),
  document.getElementById('app')
);
