// import required modules
import React from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route } from 'react-router-dom';
import UserRoute from './common/UserRoute.jsx';
import GuestRoute from './common/GuestRoute.jsx';
import NavBar from './common/NavBar.jsx';
import Footer from './common/Footer.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import SignUpPage from './pages/SignUp/SignUpPage.jsx';
import SignInPage from './pages/SignIn/SignInPage.jsx';
import BusinessesPage from './pages/Businesses/BusinessesPage.jsx';
import RegisterOrEditPage from './pages/RegisterOrEditBusiness/RegisterOrEditPage.jsx';
import BusinessProfilePage from './pages/BusinessProfile/BusinessProfilePage.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import VerifyEmail from './pages/VerifyEmail.jsx';

/**
 * App
 * @desc renders components based on the path in the url
 * @return {Object} rendered components
 */
function App() {
  return (
  <div className="bg-light holder">
    <NavBar />
    <Switch>
      <Route path='/' exact component={HomePage} />
      <GuestRoute path='/signup' exact component={SignUpPage} />
      <GuestRoute path='/signin' exact component={SignInPage} />
      <Route path='/businesses' exact component={BusinessesPage} />
      <UserRoute path='/businesses/new' exact component={RegisterOrEditPage} />
      <Route path='/businesses/:businessId' exact component={BusinessProfilePage} />
      <UserRoute path='/businesses/:businessId/edit' exact component={RegisterOrEditPage} />
      <UserRoute path='/dashboard' exact component={Dashboard} />
      <Route path='/verify/:verificationToken' exact component={VerifyEmail} />
    </Switch>
    <Footer />
  </div>
  );
}

export default hot(module)(App);
