import React from 'react';
import PropTypes from 'prop-types';

const propTypes  = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

function InfoMessages({ text, type }) {
  const className = `alert alert-${type} text-center`;
  return (
    <div className={className} role="alert">
      {text}
    </div>
  );
};

InfoMessages.propTypes = propTypes;

export default InfoMessages;