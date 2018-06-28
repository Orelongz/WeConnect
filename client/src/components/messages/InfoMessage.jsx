// import required modules
import React from 'react';
import PropTypes from 'prop-types';

// define proptypes for InfoMessages component
const propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

/**
 * InfoMessages
 * @desc display errors from api
 * @param {String} text error text
 * @param {String} type error type
 * @return {Object} rendered message component
 */
function InfoMessages({ text, type }) {
  const className = `alert alert-${type} text-center`;
  return (
    <div className={className} role="alert">
      {text}
    </div>
  );
}

InfoMessages.propTypes = propTypes;

export default InfoMessages;
