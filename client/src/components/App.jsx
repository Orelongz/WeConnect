import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './pages/NavBar.jsx';
import Footer from './pages/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import BusinessesPage from './pages/BusinessesPage.jsx';
import RegisterBusinessPage from './pages/RegisterBusinessPage.jsx';
import EditBusinessPage from './pages/EditBusinessPage.jsx';
import BusinessProfilePage from './pages/BusinessProfilePage.jsx';

const App = () => (
  <div className="bg-light holder">
    <NavBar />
    <Switch>
      <Route path='/' exact component={HomePage} />
      <Route path='/signup' exact component={SignUpPage} />
      <Route path="/signin" exact component={SignInPage} />
      <Route path='/businesses' exact component={BusinessesPage} />
      <Route path='/register-business' exact component={RegisterBusinessPage} />
      <Route path='/edit-business' exact component={EditBusinessPage} />
      <Route path='/buiness-profile' exact component={BusinessProfilePage} />
    </Switch>
    <Footer />
  </div>
);

export default App;
