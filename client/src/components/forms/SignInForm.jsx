// import required modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validate } from './../../utils';
import InLineError from './../messages/InLineError.jsx';

// define proptypes for SignInForm component
const propTypes = {
  submit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

/**
 * @class SignInForm
 * @desc renders the SignInForm component
 * @return {*} void
 */
class SignInForm extends Component {
  /**
   * constructor
   * @desc constructor for the SignInForm component
   * @return {*} void
   */
  constructor() {
    super();
    this.state = {
      data: {
        email: '',
        password: ''
      },
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * onChange
   * @desc handles state change when value of input fields change
   * @param {Object} event DOM event
   * @return {Object} new state object
   */
  onChange(event) {
    return this.setState({
      data: { ...this.state.data, [event.target.name]: event.target.value }
    });
  }

  /**
   * onSubmit
   * @desc handles submit of the signin form
   * @param {Object} event DOM event
   * @return {func} submit
   */
  onSubmit(event) {
    event.preventDefault();
    const errors = validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      return this.props.submit(this.state.data);
    }
  }

  /**
   * render
   * @desc renders the SignInForm component
   * @return {Object} the SignInForm component
   */
  render() {
    const { isLoading } = this.props;
    const { data, errors } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            placeholder="example@domain.com"
            value={data.email}
            onChange={this.onChange}
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
            onChange={this.onChange}
          />
          {errors.password && <InLineError text={errors.password} />}
        </div>
        <button disabled={isLoading} className="btn btn-primary w-100"><i className="fa fa-sign-in" aria-hidden="true"></i>&nbsp;Sign In</button>
      </form>
    );
  }
}

SignInForm.propTypes = propTypes;

export default SignInForm;
