import React from 'react';
import PropTypes from 'prop-types';

const propTypes  = {
  text: PropTypes.string.isRequired
};

function InlineError({ text }) {
  return <span className="text-danger">{text}</span>
};

InlineError.propTypes = propTypes;

export default InlineError;