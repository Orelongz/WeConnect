// import required modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validate } from './../../utils';
import InLineError from './../messages/InLineError.jsx';

// define proptypes for BusinessTransferForm component
const propTypes = {
  submit: PropTypes.func.isRequired
};

/**
 * @class BusinessTransferForm
 * @desc renders the BusinessTransferForm component
 * @return {*} void
 */
class BusinessTransferForm extends Component {
  /**
   * constructor
   * @desc constructor for the BusinessTransferForm component
   * @return {*} void
   */
  constructor() {
    super();
    this.state = {
      email: '',
      error: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * onChange
   * @desc handles state change when value of input fields change
   * @param {Object} event DOM event
   * @return {func} new state object
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * onSubmit
   * @desc handles submit of the business transfer form
   * @param {Object} event DOM event
   * @return {func} submit
   */
  onSubmit(event) {
    event.preventDefault();
    const { email } = this.state;
    const error = validate({ email });


    this.setState({ error });

    if (Object.keys(error).length === 0) {
      return this.props.submit({ email });
    }
  }

  /**
   * render
   * @desc renders the BusinessTransferForm component
   * @return {Object} the BusinessTransferForm component
   */
  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-row">
          <label className="col-xs-12 col-md-2" htmlFor="email">Email: </label>
          <div className="col-xs-12 col-md-6">
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
