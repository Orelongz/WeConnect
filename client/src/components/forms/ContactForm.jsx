// import required modules
import React from 'react';
import PropTypes from 'prop-types';
import InlineError from './../messages/InLineError.jsx';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

/**
 * ContactForm()
 * @desc renders the ContactForm component
 * @return {*} void
 */
function ContactForm({
  errors, onChange, onSubmit, data, isLoading
}) {
  return (

    <form
      className="col-sm-12 col-md-8 col-lg-6 text-center"
      onSubmit={onSubmit}
    >
      <div>
        <input
          type="text"
          className="form-control mt-3"
          placeholder="*Name"
          name="name"
          value={data.name}
          onChange={onChange}
        />
        {errors.name && <InlineError text={errors.name} />}
      </div>
      <div>
        <input
          type="text"
          className="form-control mt-3"
          placeholder="*email@domain.com"
          name="email"
          value={data.email}
          onChange={onChange}
        />
        {errors.email && <InlineError text={errors.email} />}
      </div>
      <textarea
        type="text"
        className="form-control mt-3"
        placeholder="*Message"
        rows="7"
        name="message"
        value={data.message}
        onChange={onChange}
      />
      {errors.message && <InlineError text={errors.message} />}
      <button disabled={isLoading} type="submit" className="btn btn-danger w-100 py-2 mt-3">Send</button>
    </form>
  );
}

ContactForm.propTypes = propTypes;

export default ContactForm;
