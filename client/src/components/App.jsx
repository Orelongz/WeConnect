// import required modules
import React from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import alertify from 'alertifyjs';
import UserRoute from './common/UserRoute.jsx';
import GuestRoute from './common/GuestRoute.jsx';
import NavBar from './common/NavBar.jsx';
import Footer from './common/Footer.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import SignUpPage from './pages/SignUp/SignUpPage.jsx';
import SignInPage from './pages/SignIn/SignInPage.jsx';
import BusinessesPage from './pages/Businesses/BusinessesPage.jsx';
import RegisterBusinessPage from './pages/RegisterBusiness/RegisterBusinessPage.jsx';
import EditBusinessPage from './pages/EditBusiness/EditBusinessPage.jsx';
import BusinessProfilePage from './pages/BusinessProfile/BusinessProfilePage.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';

// set alertify notifications to be top-center at globally
alertify.set('notifier', 'position', 'top-center');

// define proptypes for App component
const propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

/**
 * App
 * @desc renders components based on the path in the url
 * @param {Object} location
 * @return {Object} rendered components
 */
const App = ({ location }) => (
  <div className="bg-light holder">
    <NavBar />
    <Switch>
      <Route location={location} path='/' exact component={HomePage} />
      <GuestRoute location={location} path='/signup' exact component={SignUpPage} />
      <GuestRoute location={location} path='/signin' exact component={SignInPage} />
      <Route location={location} path='/businesses' exact component={BusinessesPage} />
      <UserRoute location={location} path='/businesses/new' exact component={RegisterBusinessPage} />
      <Route location={location} path='/businesses/:businessId' exact component={BusinessProfilePage} />
      <UserRoute location={location} path='/businesses/:businessId/edit' exact component={EditBusinessPage} />
      <UserRoute location={location} path='/dashboard' exact component={Dashboard} />
    </Switch>
    <Footer />
  </div>
);

App.propTypes = propTypes;

export default hot(module)(App);
