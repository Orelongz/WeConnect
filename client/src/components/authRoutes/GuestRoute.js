import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

const GuestRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => 
      !isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to='/businesses' />
      )
    }
  />
);

GuestRoute.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.userReducer.id
  };
}

export default connect(mapStateToProps)(GuestRoute);