// import required modules
import React from 'react';
import PropTypes from 'prop-types';
import InlineError from './../messages/InLineError.jsx';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object,
  data: PropTypes.object
};

/**
 * ContactForm()
 * @desc renders the ContactForm component
 * @return {*} void
 */
function ContactForm({
  errors, onChange, onSubmit, data
}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-row">
        <div className="col">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            name="name"
            value={data.name}
            onChange={onChange}
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
            value={data.email}
            onChange={onChange}
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
          onChange={onChange}
        />
        {errors.message && <InlineError text={errors.message} />}
      </div>
      <button type="submit" className="btn btn-primary">Send</button>
    </form>
  );
}

ContactForm.propTypes = propTypes;

export default ContactForm;
