// import required modules
import React from 'react';
import PropTypes from 'prop-types';
import InLineError from './../messages/InLineError.jsx';

// define proptypes for SignInForm component
const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.object,
  data: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

/**
 * SignInForm
 * @desc renders the SignInForm component
 * @return {*} void
 */
function SignInForm({
  isLoading, errors, onSubmit, onChange, data
}) {
  return (

    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          className="form-control"
          id="email"
          name="email"
          placeholder="example@domain.com"
          value={data.email}
          onChange={onChange}
        />
        {errors.email && <InLineError text={errors.email} />}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={onChange}
        />
        {errors.password && <InLineError text={errors.password} />}
      </div>
      <button
        disabled={isLoading}
        className="btn btn-primary w-100">
          <i className="fa fa-sign-in" aria-hidden="true"></i>&nbsp;Sign In
      </button>
    </form>
  );
}

SignInForm.propTypes = propTypes;

export default SignInForm;
