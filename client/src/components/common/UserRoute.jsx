// import required modules
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// define proptypes for UserRoute
const propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

/**
 * UserRoute
 * @desc renders the footer of the app
 * @param {Object} props
 * @return {Object} authenticated route components
 */
const UserRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to='/signin' />
      ))
    }
  />
);

UserRoute.propTypes = propTypes;

/**
 * mapStateToProps
 * @param {Object} state redux state
 * @return {Object} UserRoute props
 */
function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.userReducer.id
  };
}

export default connect(mapStateToProps)(UserRoute);
