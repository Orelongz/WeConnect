import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';
import './style/index.scss';

ReactDOM.render(
  (<BrowserRouter>
    <App />
  </BrowserRouter>),
  document.getElementById('app')
);

module.hot.accept();
 