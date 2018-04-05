import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';
import NavBar from './pages/NavBar';
import Footer from './pages/Footer';
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Businesses from './pages/Businesses';
import RegisterBusiness from './pages/Businesses';
import EditBusiness from './pages/Businesses';
import BusinessProfile from './pages/BusinessProfile';

const App = () => (
  <div className='bg-light holder'>
    <NavBar />
    <Switch>
      <Route path='/' exact component={HomePage} />
      <Route path='/signup' exact component={SignUp} />
      <Route path='/signin' exact component={SignIn} />
      <Route path='/businesses' exact component={Businesses} />
      <Route path='/register-business' exact component={RegisterBusiness} />
      <Route path='/edit-business' exact component={EditBusiness} />
      <Route path='/buiness-profile' exact component={BusinessProfile} />
    </Switch>
    <Footer />
  </div>
);

export default App;