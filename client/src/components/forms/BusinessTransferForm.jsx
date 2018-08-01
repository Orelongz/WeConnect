// import required modules
import React from 'react';
import PropTypes from 'prop-types';
import InLineError from './../messages/InLineError.jsx';

// define proptypes for BusinessTransferForm component
const propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  transferData: PropTypes.object.isRequired
};

/**
 * @class BusinessTransferForm
 * @desc renders the BusinessTransferForm component
 * @return {*} void
 */
function BusinessTransferForm({
  onSubmit, onChange, transferData
}) {
  const { email, error } = transferData;

  return (
    <form onSubmit={onSubmit}>
      <div className="form-row">
        <label className="col-xs-12 col-md-2" htmlFor="email">Email: </label>
        <div className="col-xs-12 col-md-6">
          <input
            type="text"
            className="form-control"
            name="email"
            placeholder="example@domain.com"
            onChange={onChange}
            value={email}
          />
          {error.email && <InLineError text={error.email} />}
        </div>
        <button type="submit" className="col-xs-12 col-md-4 btn btn-primary form-control">Transfer</button>
      </div>
    </form>
  );
}

BusinessTransferForm.propTypes = propTypes;

export default BusinessTransferForm;
