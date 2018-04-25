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
import { userLoggedIn } from './actions/AuthAction';
import setAuthorizationToken from './utils/setAuthorizationToken';

if (localStorage.weconnectToken) {
  const token = localStorage.weconnectToken;
  const payload = decode(token);
  const user = { token, currentUser: payload.id };
  setAuthorizationToken(token);
  store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
  (<BrowserRouter>
    <Provider store={store}>
      <Route  component={App} />
    </Provider>
  </BrowserRouter>),
  document.getElementById('app')
);
