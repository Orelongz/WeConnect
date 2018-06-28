// import required modules
import React from 'react';
import PropTypes from 'prop-types';

// define proptypes for InlineError component
const propTypes = {
  text: PropTypes.string.isRequired
};

/**
 * InlineError
 * @desc display errors inline for forms
 * @param {String} text error text
 * @return {Object} rendered error component
 */
function InlineError({ text }) {
  return (<p className="small text-white bg-info px-2">{text}</p>);
}

InlineError.propTypes = propTypes;

export default InlineError;
