// import required modules
import React from 'react';
import PropTypes from 'prop-types';
import InLineError from './../messages/InLineError.jsx';

// define proptypes for SignUpForm component
const propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

/**
 * SignUpForm()
 * @desc renders the SignUpForm of the app
 * @return {void}
 */
function SignUpForm({
  isLoading, data, errors, onSubmit, onChange
}) {
  return (

    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Name</label>
        <div className="form-row">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              id="firstname"
              name="firstname"
              placeholder="*Firstname"
              value={data.firstname}
              onChange={onChange}
            />
            {errors.firstname && <InLineError text={errors.firstname} />}
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              id="lastname"
              name="lastname"
              placeholder="*Lastname"
              value={data.lastname}
              onChange={onChange}
            />
            {errors.lastname && <InLineError text={errors.lastname} />}
          </div>
        </div>
      </div>              

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          className="form-control"
          id="email"
          name="email"
          placeholder="*example@domain.com"
          value={data.email}
          onChange={onChange}
        />
        {errors.email && <InLineError text={errors.email} />}
      </div>

      <div className="form-group">
        <label>Password</label>
        <div className="form-row">
          <div className="col-md-6">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="*Password"
              value={data.password}
              onChange={onChange}
            />
            {errors.password && <InLineError text={errors.password} />}
          </div>
    
          <div className="col-md-6">
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="*Confirm Password"
              value={data.confirmPassword}
              onChange={onChange}
            />
            {errors.confirmPassword && <InLineError text={errors.confirmPassword} />}
          </div>
        </div>
      </div>

      <button disabled={isLoading} className="btn btn-primary w-100">
        <i className="fa fa-user-plus" aria-hidden="true"></i>
        &nbsp;Join Now
      </button>
    </form>
  );
}

SignUpForm.propTypes = propTypes;

export default SignUpForm;
