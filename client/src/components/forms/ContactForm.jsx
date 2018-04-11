import React, { Component } from 'react';
import validator from 'validator';
import InlineError from './../messages/InLineError';

class ContactForm extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        name: '',
        email: '',
        message: ''
      },
      errors: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    if (!e.target.name) {
      return this.setState({
        data: { ...this.state.data, message: e.target.value }
      });
    }
    return this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { name, email, message } = this.state.data;
    const errors = this.vaidate({ name, email, message });
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      alert(`Dear ${name}, your message has been sent`);
    }
  }

  vaidate(data) {
    const errors = {};
    if (data.name === '') errors.name = 'Please provide your name';
    if (!validator.isEmail(data.email)) errors.email = 'Please a valid email';
    if (data.message === '') errors.message = 'Please provide your name';
    return errors
  }

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
            id="message"
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
