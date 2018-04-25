import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validate } from './../../utils';
import InLineError from './../messages/InLineError';

const propTypes = {
  submit: PropTypes.func.isRequired
};

class BusinessTransferForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      error: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      email: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { email } = this.state;
    const error = validate({ email });
    this.setState({ error });
    if (Object.keys(error).length === 0) {
      return this.props.submit({ email })
    }
  }

  render() {
    const { email, error } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-row">
          <label className="col-xs-12 col-md-2" htmlFor="email">Email: </label>
          <div  className="col-xs-12 col-md-6">
            <input
              type="text"
              className="form-control"
              name="email"
              placeholder="example@domain.com"
              onChange={this.onChange}
            />
            {error.email && <InLineError text={error.email} />}
          </div>
          <button type="submit" className="col-xs-12 col-md-4 btn btn-primary form-control">Transfer</button>
        </div>
      </form>
    );
  }
}

BusinessTransferForm.propTypes = propTypes;

export default BusinessTransferForm;