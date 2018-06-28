// import required modules
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// define proptypes for GuestRoute
const propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

/**
 * GuestRoute
 * @desc renders the footer of the app
 * @param {Object} props
 * @return {Object} unauthenticated route components
 */
function GuestRoute({ isAuthenticated, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={ props =>
        (!isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to='/businesses' />
        ))
      }
    />
  );
}

GuestRoute.propTypes = propTypes;

/**
 * mapStateToProps
 * @param {Object} state redux state
 * @return {Object} GuestRoute props
 */
function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.userReducer.id
  };
}

export default connect(mapStateToProps)(GuestRoute);
