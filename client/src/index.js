import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import rootReducer from './rootReducer';
import App from './components/App';
import './style/index.scss';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  (<BrowserRouter>
    <Provider store={store}>
      <App />
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
 