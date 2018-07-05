// import required modules
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { validate } from './../../utils';
import InLineError from './../messages/InLineError.jsx';

// define proptypes for SignUpForm component
const propTypes = {
  submit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

/**
 * @class SignUpForm
 * @desc renders the SignUpForm of the app
 * @return {void}
 */
class SignUpForm extends Component {
  /**
   * constructor
   * @desc constructor for the SignUpForm component
   * @return {void}
   */
  constructor() {
    super();
    this.state = {
      data: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
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
   * @desc handles submit of the signup form
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
   * @desc renders the SignUpForm component
   * @return {Object} the SignUpForm component
   */
  render() {
    const { isLoading } = this.props;
    const { data, errors } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label htmlFor="firstname">Firstname</label>
          <input
            type="text"
            className="form-control"
            id="firstname"
            name="firstname"
            placeholder="Firstname"
            value={data.firstname}
            onChange={this.onChange}
          />
          {errors.firstname && <InLineError text={errors.firstname} />}
        </div>

        <div className="form-group">
          <label htmlFor="lastname">Lastname</label>
          <input
            type="text"
            className="form-control"
            id="lastname"
            name="lastname"
            placeholder="Lastname"
            value={data.lastname}
            onChange={this.onChange}
          />
          {errors.lastname && <InLineError text={errors.lastname} />}
        </div>

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

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={data.confirmPassword}
            onChange={this.onChange}
          />
          {errors.confirmPassword && <InLineError text={errors.confirmPassword} />}
        </div>

        <p className="text-center small">By clicking Join Now, you agree to WeConnect <Link to="#">User Agreement</Link> and <Link to="#">Privacy Policy</Link></p>
        <button disabled={isLoading} className="btn btn-primary w-100"><i className="fa fa-user-plus" aria-hidden="true"></i>&nbsp;Join Now</button>
      </form>
    );
  }
}

SignUpForm.propTypes = propTypes;

export default SignUpForm;
