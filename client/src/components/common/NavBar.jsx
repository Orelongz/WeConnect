// import required modules
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from './../../actions/AuthAction';

// define proptypes for NavBar component
const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userLogout: PropTypes.func.isRequired
};

/**
 * NavBar
 * @desc renders the navbar of the app
 * @param {Object} props
 * @return {Object} rendered Navbar component
 */
function NavBar({ isAuthenticated, userLogout }) {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to='/' className="navbar-brand">WeConnect</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ml-auto">

            {/* render dashboard link if authenticated */}
            {isAuthenticated ? (
              <li>
                <Link to='/dashboard' className="nav-link">Dashboard</Link>
              </li>
            ) : null}
            <li className="nav-item">
              <Link to='/businesses' className="nav-link">Businesses</Link>
            </li>
            <li className="nav-item">

              {/* render 'register business' link if authenticated */}
              {isAuthenticated ? (
                <Link to='/businesses/new' className="nav-link">Register Business</Link>
              ) : (
                <Link to='/signup' className="nav-link">Signup</Link>
              )}

            </li>
            <li className="nav-item">

              {/* render logout link if authenticated */}
              {isAuthenticated ? (
                <Link to="/" className="nav-link" onClick={() => userLogout()}>Logout</Link>
              ) : (
                <Link to='/signin' className="nav-link">Signin</Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

NavBar.propTypes = propTypes;

/**
 * mapStateToProps
 * @param {Object} state redux state
 * @return {Object} NavBar props
 */
function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.userReducer.id
  };
}

export default connect(mapStateToProps, { userLogout: logout })(NavBar);