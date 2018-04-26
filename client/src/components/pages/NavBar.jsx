import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from './../../actions/AuthAction';

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

const NavBar = ({ isAuthenticated, logout }) => (
<header>
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <Link to='/' className="navbar-brand">WeConnect</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to='/businesses' className="nav-link">Businesses</Link>
        </li>
        <li className="nav-item">
          {isAuthenticated ? (
            <Link to='/businesses/new' className="nav-link">Register Business</Link>
          ): (
            <Link to='/signup' className="nav-link">Signup</Link>
          )}
        </li>
        <li className="nav-item">
          {isAuthenticated ? (
            <Link to="/" className="nav-link" onClick={() => logout()}>Logout</Link>
          ): (
            <Link to='/signin' className="nav-link">Signin</Link>
          )}
        </li>
      </ul>
    </div>
  </nav>
</header>
);

NavBar.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.userReducer.id
  }
}

export default connect(mapStateToProps, { logout })(NavBar);