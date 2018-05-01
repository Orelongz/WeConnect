import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserRoute from './authRoutes/UserRoute';
import GuestRoute from './authRoutes/GuestRoute';
import NavBar from './pages/NavBar.jsx';
import Footer from './pages/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import BusinessesPage from './pages/BusinessesPage.jsx';
import RegisterBusinessPage from './pages/RegisterBusinessPage.jsx';
import EditBusinessPage from './pages/EditBusinessPage.jsx';
import BusinessProfilePage from './pages/BusinessProfilePage.jsx';
import Dashboard from './pages/Dashboard.jsx';

const propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

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

export default App;
