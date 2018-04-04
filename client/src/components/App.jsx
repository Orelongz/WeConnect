import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';
import NavBar from './pages/NavBar';
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';

const App = () => (
  <div>
    <NavBar />
    <Switch>
      <Route path='/' exact component={HomePage} />
      <Route path='/signup' exact component={SignUp} />
    </Switch>
  </div>
);

export default App;