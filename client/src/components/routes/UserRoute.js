import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

const UserRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => 
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to='/' />
      )
    }
  />
);

UserRoute.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.userReducer.token
  };
}

export default connect(mapStateToProps)(UserRoute);