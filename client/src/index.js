import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import decode from 'jwt-decode';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import rootReducer from './rootReducer';
import App from './components/App.jsx';
import './style/index.scss';
import { userLoggedIn } from './actions/AuthAction';
import setAuthorizationToken from './utils/setAuthorizationToken';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

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

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./rootReducer', () => {
    const nextRootReducer = rootReducer;
    store.replaceReducer(nextRootReducer);
  });
}
