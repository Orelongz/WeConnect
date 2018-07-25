import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

/**
 * ErrorPage
 * @desc displays the error page when path cannot be recognized
 * @param {Object} props
 * @return {Object} react component
 */
function ErrorPage({ isAuthenticated }) {
  return (
    <div className="fill-page d-flex">
      <div className="container align-self-center">
        <div>
          <h1 className="text-center display-2">Page Not Found</h1>
        </div>
        <div>
          <p className="lead text-center">The page you are requesting does not exist. Apologies for the inconvieniences. </p>
        </div>
        <ul className="nav justify-content-center">
          <li>
            {isAuthenticated ?
            <Link to='/dashboard' className="nav-link btn btn-lg btn-outline-dark mx-1">Dashboard</Link> :
            <Link to='/signin' className="nav-link btn btn-lg btn-outline-dark mx-1">Signin</Link>
            }
          </li>
          <li className="nav-item">
            <Link to='/businesses' className="nav-link btn btn-lg btn-outline-dark mx-1">Businesses</Link>
          </li>
          <li className="nav-item">
            {isAuthenticated ? (
              <Link to='/businesses/new' className="nav-link btn btn-lg btn-outline-dark mx-1">Register Business</Link>
            ) : (
              <Link to='/signup' className="nav-link btn btn-lg btn-outline-dark mx-1">Signup</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

ErrorPage.propTypes = propTypes;

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

export default connect(mapStateToProps, {})(ErrorPage);
