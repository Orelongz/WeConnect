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
export function NavBar({ isAuthenticated, userLogout }) {
  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-lg custom-nav">
        <div className="container">
          <Link to='/' className="navbar-brand">
            <h2>WeConnect</h2>
          </Link>

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
                  <Link to='/signup' id="signup" className="nav-link">Signup</Link>
                )}

              </li>
              <li className="nav-item">

                {/* render logout link if authenticated */}
                {isAuthenticated ? (
                  <Link to="/" className="nav-link" id="logout" onClick={userLogout}>Logout</Link>
                ) : (
                  <Link to='/signin' id="signin" className="nav-link">Signin</Link>
                )}
              </li>
            </ul>
          </div>
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
const mapStateToProps = state => ({
  isAuthenticated: !!state.userReducer.id
});

export default connect(mapStateToProps, { userLogout: logout })(NavBar);
