import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import PropTypes from 'prop-types';
import InLineError from './../messages/InLineError';

const propTypes = {
  submit: PropTypes.func.isRequired
}

class SignUpForm extends Component {
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

  onChange(e) {
    return this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      return this.props
        .submit(this.state.data);
    }
  }

  validate(data) {
    const errors = {};
    if (!validator.isEmail(data.email)) errors.email = 'Email not valid';
    if (data.firstname.trim() === '') errors.firstname = 'Firstname should not be empty';
    if (data.lastname.trim() === '') errors.lastname = 'Lastname should not be empty';
    if (data.password.trim() === '') errors.password = 'Password can\'t be empty';
    if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    return errors;
  }

  render() {
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
        <button className="btn btn-primary w-100"><i className="fa fa-user-plus" aria-hidden="true"></i>&nbsp;Join Now</button>
      </form>
    );
  }
};

SignUpForm.propTypes = propTypes;

export default SignUpForm;