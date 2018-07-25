// import required modules
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

// define proptypes for UserRoute
const propTypes = {
  component: PropTypes.func.isRequired
};

/**
 * UserRoute
 * @desc renders the footer of the app
 * @param {Object} props
 * @return {Object} authenticated route components
 */
const UserRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('weconnectToken');
  return (
    <Route
      {...rest}
      render={props =>
        (token ? (
          <Component {...props} />
        ) : (
          <Redirect to='/signin' />
        ))
      }
    />
  );
};

UserRoute.propTypes = propTypes;

export default (UserRoute);
