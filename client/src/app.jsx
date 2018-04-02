import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  (<h1>First react app render</h1>),
  document.getElementById('app')
);

module.hot.accept();