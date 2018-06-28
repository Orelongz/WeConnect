// import required modules
import React, { Component } from 'react';
import { validate } from './../../utils';
import InlineError from './../messages/InLineError.jsx';

/**
 * @class ContactForm
 * @desc renders the ContactForm component
 * @return {*} void
 */
class ContactForm extends Component {
  /**
   * constructor
   * @desc constructor for the ContactForm component
   * @return {*} void
   */
  constructor() {
    super();
    this.state = {
      data: {
        name: '',
        email: '',
        message: ''
      },
      errors: ''
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
    return this.setState({
      data: { ...this.state.data, [event.target.name]: event.target.value }
    });
  }

  /**
   * onSubmit
   * @desc handles submit of the contact form
   * @param {Object} event DOM event
   * @return {func} submit
   */
  onSubmit(event) {
    event.preventDefault();
    const { name, email, message } = this.state.data;
    const errors = validate({ name, email, message });
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      alert(`Dear ${name}, your message has been sent`);
    }
  }

  /**
   * render
   * @desc renders the ContactForm component
   * @return {Object} the ContactForm component
   */
  render() {
    const { data, errors } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-row">
          <div className="col">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
              onChange={this.onChange}
            />
            {errors.name && <InlineError text={errors.name} />}
          </div>
          <div className="col">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="email@domain.com"
              name="email"
              onChange={this.onChange}
            />
            {errors.email && <InlineError text={errors.email} />}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="name">Message</label>
          <textarea
            type="text"
            className="form-control"
            placeholder="Message" 
            name="message"
            rows="4"
            value={data.message}
            onChange={this.onChange}
          />
          {errors.message && <InlineError text={errors.message} />}
        </div>
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
    );
  }
}

export default ContactForm;
