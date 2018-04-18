import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validate } from './../../helpers';
import InLineError from './../messages/InLineError';

const propTypes = {
  submit: PropTypes.func.isRequired
}

class SignInForm extends Component {
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

  onChange(e) {
    return this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const errors = validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      return this.props.submit(this.state.data);
    }
  }

  render() {
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
        <button className="btn btn-primary w-100"><i className="fa fa-sign-in" aria-hidden="true"></i>&nbsp;Sign In</button>
      </form>
    );
  }
};

SignInForm.propTypes = propTypes;

export default SignInForm;